
class Piece:
    def __init__(self, piece_id: int, piece_name: str, data: dict):
        self.piece_id = piece_id
        self.piece_name = piece_name
        self.data = data

    # add __repr__

class Game:
    def __init__(self, rules: dict):
        self._rules = rules
        self._game_state = {}
        self._id_counter = 0

        piece_default_start_data = {
            "has_not_moved": True
        }

        for starting_piece in rules["setup"]["starting_position"]:
            self._game_state[(starting_piece["x_pos"], starting_piece["y_pos"])] = Piece(self._id_counter, starting_piece["piece_name"], piece_default_start_data)

            self._id_counter += 1

    def get_game_state(self, include_size: bool = False):
        if include_size:
            return (self._rules["setup"]["board_x_size"], self._rules["setup"]["board_x_size"]), self._game_state
        return self._game_state

    def update_game_state(self, piece_start_postion: tuple, piece_end_postion: tuple):
        self._game_state[piece_end_postion] = self._game_state.pop(piece_start_postion)

    def _loop_moves(self, start_pos: tuple, move_name: str):
        legal_moves = []
        move_definition = self._rules["moves"][move_name]

        if move_definition["conditions"] != []:
            for condition in move_definition["conditions"]:
                match condition:
                    case "has_not_moved":
                        pass

    def get_legal_moves(self, piece_position: tuple):
        piece_name = self._game_state[piece_position].piece_name
        piece_move_names = self._rules["pieces"][piece_name]["moveset"]
        for move_name in piece_move_names:
            if isinstance(move_name, dict):
                self._loop_moves(piece_position, move_name["move_name"])

            elif isinstance(move_name, list):
                for each_move in move_name:
                    each_move_definition = self._rules["moves"][each_move["move_name"]]
                    valid_move = each_move["valid_move"]
