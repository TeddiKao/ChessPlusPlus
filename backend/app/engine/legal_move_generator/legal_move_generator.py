import copy
from app.engine.legal_move_generator.custom_errors import *

class Piece:
    def __init__(self, position: tuple, piece_id: int, piece_name: str, data: dict):
        self.position = position
        self.piece_id = piece_id
        self.piece_name = piece_name
        self.data = data

    def __repr__(self):
        return f"PieceObject={{position: {self.position},piece_id: {self.piece_id}, piece_name: {self.piece_name}, data: {self.data}}}"


class Game:
    def __init__(self, rules: dict):
        self._rules = rules
        self._game_state = {}
        self._id_counter = 0

        self.piece_default_start_data = {
            "has_not_moved": True
        }

        for starting_piece in rules["setup"]["starting_position"]:
            self._game_state[(starting_piece["x_pos"], starting_piece["y_pos"])] = Piece((starting_piece["x_pos"], starting_piece["y_pos"]), self._id_counter, starting_piece["piece_name"], copy.deepcopy(self.piece_default_start_data))
            self._id_counter += 1

    def get_game_state(self, include_size: bool = False):
        if include_size:
            return (self._rules["setup"]["board_x_size"], self._rules["setup"]["board_y_size"]), self._game_state
        return self._game_state

    def overwrite_game_state(self, new_game_state: dict): # format is a dictionary with tuple position as the keys, and piece name as the values
        self._game_state = {}
        self._id_counter = 0
        for position, piece_name in new_game_state.items():
            self._game_state[position] = Piece(position, self._id_counter, piece_name, copy.deepcopy(self.piece_default_start_data))
            self._id_counter += 1

    def make_move(self, piece_start_postion: tuple, piece_end_postion: tuple): # note that move will be accepted regardless of whether the move is legal or not

        if piece_start_postion == piece_end_postion:
            raise StationaryMoveError

        piece_object = self._game_state[piece_start_postion]
        if piece_object.data["has_not_moved"] == True:
            piece_object.data["has_not_moved"] = False

        piece_object.position = piece_end_postion

        self._game_state[piece_end_postion] = piece_object
        self._game_state.pop(piece_start_postion)

    def _check_condition(self, condition_name: str, piece_object: Piece):
        # piece_object = self._game_state[piece_position]
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

    def _check_move_stop_condition(self, condition_name: str, piece_object: Piece):
        # piece_object = self._game_state[piece_position]
        match condition_name:
            case "inside_piece":
                if self._inside_piece(piece_object.position):
                    return True
                else:
                    return False
        raise InvalidConditionError

    def _loop_move(self, start_object: Piece, move_name: str, get_termination: bool = False):
        # print(f"Start: {start_position}")

        terminate = False

        legal_moves = []
        move_definition = self._rules["moves"][move_name]

        if move_definition["conditions"] != []:
            pass_conditions = True
            for condition in move_definition["conditions"]:
                if self._check_condition(condition, start_object) == False:
                    pass_conditions = False
                    terminate = True
                    break
            if pass_conditions == False:
                # print("Failed conditions")
                if get_termination == True:
                    return [], terminate
                else:
                    return []

        move_x = move_definition["move_definition"]["move_x"]
        move_y = move_definition["move_definition"]["move_y"]
        move_range = move_definition["move_definition"]["range"]

        move_stop_conditions = move_definition["move_definition"]["move_stop_conditions"]
        for_movement = move_definition["for_movement"]
        for_capture = move_definition["for_capture"]

        current_position = start_object.position
        range_counter = 0
        piece_object = copy.deepcopy(start_object)
        while True:
            # print(f"Moved from {current_position} to ", end="")
            current_position = list(current_position)
            current_position[0] += move_x
            current_position[1] += move_y
            current_position = tuple(current_position)
            # print(current_position)

            if not self._position_within_board(current_position):
                # print("Outside board: break")
                terminate = True
                break
            else:
                stop_loop = False
                if not move_range == "inf":
                    if range_counter == move_range:
                        # print("Reached max range: break")
                        stop_loop = True
                    range_counter += 1
                pass_conditions = True
                # print(f"Checking move_stop_conditions at {current_position}")
                for move_stop_condition in move_stop_conditions:
                    piece_object.position = current_position
                    if self._check_move_stop_condition(move_stop_condition, piece_object):
                        pass_conditions = False
                        break
                if pass_conditions == False:
                    # print("Failed conditions: break")
                    terminate = True
                    stop_loop = True

                if stop_loop == True:
                    if self._inside_piece(current_position) and for_capture:
                        legal_moves.append(current_position)
                        # print(f"Added {current_position} to legal move")
                    break

            if for_movement:
                if not self._inside_piece(current_position):
                    legal_moves.append(current_position)
                    # print(f"Added {current_position} to legal move")

        # print(f"Returned at {current_position}")
        if get_termination == True:
            return legal_moves, terminate
        else:
            return legal_moves

    def get_legal_moves(self, piece_position: tuple):

        legal_moves = {}

        piece_object = self._game_state[piece_position]

        piece_name = self._game_state[piece_position].piece_name
        piece_move_names = self._rules["pieces"][piece_name]["moveset"]
        for move_group in piece_move_names:
            if isinstance(move_group, dict):
                legal_move_group = self._loop_move(piece_object, move_group["move_name"])
                legal_moves[move_group["move_name"]] = legal_move_group

            elif isinstance(move_group, list):
                each_piece_object = copy.deepcopy(piece_object)
                for each_move in move_group:
                    each_legal_moves_both = self._loop_move(each_piece_object, each_move["move_name"], True)
                    each_legal_moves = each_legal_moves_both[0]

                    if each_move["valid_move"]:
                        legal_moves[each_move["move_name"]] = each_legal_moves
                    # print(each_legal_moves[-1])
                    if not each_legal_moves == []:
                        each_piece_object.position = each_legal_moves[-1]
                        print(each_piece_object.data)

                    if each_legal_moves_both[1] and each_move["terminate_on_stop"]:
                        break

        return legal_moves
