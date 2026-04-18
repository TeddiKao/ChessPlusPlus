from app.engine.legal_move_generator.legal_move_generator import Game

# Store active games in memory (keyed by a session id)
active_games: dict[str, Game] = {}

def normalise_variant(variant: dict) -> dict:
    """Convert camelCase frontend variant format to snake_case for Game class"""
    rules = variant["variantRules"]
    setup = rules["setupRules"]
    pieces_rules = rules["piecesRules"]

    starting_position = [
        {"piece_name": sq["pieceName"], "x_pos": sq["xPos"], "y_pos": sq["yPos"]}
        for sq in setup["startingPosition"]
    ]

    moves = {}
    pieces = {}

    for piece_name, piece_data in pieces_rules.items():
        moveset = []
        for move in piece_data["moves"]:
            move_name = f"{piece_name}_{len(moves)}"
            moves[move_name] = {
                "conditions": move["conditions"],
                "for_movement": move["forMovement"],
                "for_capture": move["forCapture"],
                "valid_move": move["validMove"],
                "move_definition": {
                    "move_x": move["moveDefinition"]["moveX"],
                    "move_y": move["moveDefinition"]["moveY"],
                    "range": move["moveDefinition"]["range"],
                    "move_stop_conditions": move["moveDefinition"]["moveStopConditions"],
                },
            }
            if move["chainedMoves"]:
                chain = []
                for chained in move["chainedMoves"]:
                    chained_name = f"{piece_name}_{len(moves)}_chained"
                    moves[chained_name] = {
                        "conditions": chained["conditions"],
                        "for_movement": chained["forMovement"],
                        "for_capture": chained["forCapture"],
                        "valid_move": chained["validMove"],
                        "move_definition": {
                            "move_x": chained["moveDefinition"]["moveX"],
                            "move_y": chained["moveDefinition"]["moveY"],
                            "range": chained["moveDefinition"]["range"],
                            "move_stop_conditions": chained["moveDefinition"]["moveStopConditions"],
                        },
                    }
                    chain.append({"move_name": chained_name, "terminate_on_stop": True, "valid_move": chained["validMove"]})
                moveset.append(chain)
            else:
                moveset.append({"move_name": move_name})

        pieces[piece_name] = {"moveset": moveset}

    return {
        "setup": {
            "board_x_size": setup["boardXSize"],
            "board_y_size": setup["boardYSize"],
            "starting_position": starting_position,
        },
        "moves": moves,
        "pieces": pieces,
    }


def create_game(session_id: str, variant: dict) -> dict:
    rules = normalise_variant(variant)
    game = Game(rules)
    active_games[session_id] = game
    return serialise_game_state(game)


def get_legal_moves(session_id: str, x: int, y: int) -> list:
    game = active_games[session_id]
    legal_moves_dict = game.get_legal_moves((x, y))
    # Flatten all moves from all move groups into one list
    all_moves = []
    for moves in legal_moves_dict.values():
        for move in moves:
            all_moves.append({"x": move[0], "y": move[1]})
    return all_moves


def make_move(session_id: str, from_x: int, from_y: int, to_x: int, to_y: int) -> dict:
    game = active_games[session_id]
    game.update_game_state((from_x, from_y), (to_x, to_y))
    return serialise_game_state(game)


def serialise_game_state(game: Game) -> dict:
    (board_x, board_y), state = game.get_game_state(include_size=True)
    pieces = []
    for pos, piece in state.items():
        pieces.append({
            "x": pos[0],
            "y": pos[1],
            "pieceName": piece.piece_name,
            "pieceId": piece.piece_id,
        })
    return {
        "boardXSize": board_x,
        "boardYSize": board_y,
        "pieces": pieces,
    }