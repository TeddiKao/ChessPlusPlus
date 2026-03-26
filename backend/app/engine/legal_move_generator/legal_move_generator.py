from custom_errors import *


class Piece:
    def __init__(self, piece_id: int, piece_name: str, data: dict):
        self.piece_id = piece_id
        self.piece_name = piece_name
        self.data = data

    def __repr__(self):
        return f"PieceObject={{piece_id: {self.piece_id}, piece_name: {self.piece_name}, data: {self.data}}}"


class Game:
    def __init__(self, rules: dict):
        self._rules = rules
        self._game_state = {}
        self._id_counter = 0

        piece_default_start_data = {
            "has_not_moved": True
        }

        for starting_piece in rules["setup"]["starting_position"]:
            self._game_state[(starting_piece["x_pos"], starting_piece["y_pos"])] = Piece(self._id_counter,
                                                                                         starting_piece["piece_name"],
                                                                                         piece_default_start_data)

            self._id_counter += 1

    def get_game_state(self, include_size: bool = False):
        if include_size:
            return (self._rules["setup"]["board_x_size"], self._rules["setup"]["board_x_size"]), self._game_state
        return self._game_state

    def update_game_state(self, piece_start_postion: tuple, piece_end_postion: tuple):

        if piece_end_postion == piece_end_postion:
            raise StationaryMoveError

        piece_object = self._game_state[piece_start_postion]
        if piece_object.data["has_not_moved"] == True:
            piece_object.data["has_not_moved"] = False

        self._game_state[piece_end_postion] = piece_object

    def _check_condition(self, condition_name: str, piece_position: tuple):
        piece_object = self._game_state[piece_position]
        match condition_name:
            case "has_not_moved":
                if piece_object.data["has_not_moved"] == True:
                    return True
                else:
                    return False
        raise InvalidConditionError

    def _position_within_board(self, position: tuple):
        board_x_size = self._rules["setup"]["board_x_size"]
        board_y_size = self._rules["setup"]["board_y_size"]

        if 0 <= position[0] < board_x_size and 0 <= position[1] < board_y_size:
            return True
        else:
            return False

    def _inside_piece(self, position: tuple):
        if position in self._game_state:
            return True
        else:
            return False

    def _check_move_stop_condition(self, condition_name: str, piece_position: tuple):
        # piece_object = self._game_state[piece_position]
        match condition_name:
            case "inside_piece":
                if self._inside_piece(piece_position):
                    return True
                else:
                    return False
        raise InvalidConditionError

    def _loop_moves(self, start_position: tuple, move_name: str):
        legal_moves = []
        move_definition = self._rules["moves"][move_name]

        if move_definition["conditions"] != []:
            pass_conditions = True
            for condition in move_definition["conditions"]:
                if self._check_condition(condition, start_position) == False:
                    pass_conditions = False
                    break
            if pass_conditions == False:
                return []

        move_x = move_definition["move_definition"]["move_x"]
        move_y = move_definition["move_definition"]["move_y"]
        move_range = move_definition["move_definition"]["range"]

        move_stop_conditions = move_definition["move_stop_conditions"]
        for_movement = move_definition["for_movement"]
        for_capture = move_definition["for_capture"]

        current_position = start_position
        range_counter = 0
        while True:
            current_position = list(current_position)
            current_position[0] += move_x
            current_position[1] += move_y
            current_position = tuple(current_position)

            if self._position_within_board(current_position):
                break
            if range_counter == move_range:
                break
            range_counter += 1
            pass_conditions = True
            for move_stop_condition in move_stop_conditions:
                if self._check_move_stop_condition(move_stop_condition, current_position) == False:
                    pass_conditions = False
            if pass_conditions == False:
                break

            if for_movement:
                if not self._inside_piece(current_position):
                    legal_moves.append(current_position)
            elif for_capture:
                if self._inside_piece(current_position):
                    legal_moves.append(current_position)

        return legal_moves

    def get_legal_moves(self, piece_position: tuple):

        legal_moves = {}

        piece_name = self._game_state[piece_position].piece_name
        piece_move_names = self._rules["pieces"][piece_name]["moveset"]
        for move_group in piece_move_names:
            if isinstance(move_group, dict):
                legal_move_group = self._loop_moves(piece_position, move_group["move_name"])
                legal_moves[move_group] = legal_move_group

            elif isinstance(move_group, list):
                starting_positions = {piece_position}
                all_legal_moves = set()
                for each_move in move_group:
                    valid_move = each_move["valid_move"]

                    for starting_position in starting_positions:
                        legal_move_group = self._loop_moves(starting_position, each_move["move_name"])
                        if valid_move:
                            all_legal_moves.update(legal_move_group)
                        starting_positions.update(legal_move_group)

                # CHECK THIS, MIGHT NOT BE CORRECT
