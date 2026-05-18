import uuid

from fastapi import APIRouter
from app.schemas.create_game_request import CreateGameRequest, CreateGameResponse
from app.engine.legal_move_generator.legal_move_generator import Game, Piece
from app.utils.case_converter import convert_camel_to_snake
from app.utils.starting_position_serialiser import serialise_starting_position

active_games = {}

router = APIRouter()

@router.post("/create-game", response_model=CreateGameResponse)
async def create_game(request: CreateGameRequest):
	game_id = str(uuid.uuid4())
	
	setup_rules = {
		"piece_ownership": request.setup_rules.piece_ownership,
		"board_x_size": request.setup_rules.board_x_size,
		"board_y_size": request.setup_rules.board_y_size,
		"starting_position": serialise_starting_position(request.setup_rules.starting_position),
	}

	piece_ruleset = convert_camel_to_snake(request.piece_ruleset, [0])
	movement_rules = convert_camel_to_snake(request.movement_rules, [0])

	rules = {
		"pieces": piece_ruleset,
		"moves": movement_rules,
		"setup": setup_rules,
	}

	game_instance = Game(rules)

	id_counter = 0
	for starting_piece in setup_rules["starting_position"]:
		square = (starting_piece["x_pos"], starting_piece["y_pos"])
		piece_name = starting_piece["piece_name"]

		game_instance._game_state[square] = Piece(
			position=square,
			piece_id=id_counter,
			piece_name=piece_name,
			data={ "has_not_moved": True }
		)

		id_counter += 1

	active_games[game_id] = game_instance

	return CreateGameResponse(game_id=game_id, game_state=game_instance.get_game_state())