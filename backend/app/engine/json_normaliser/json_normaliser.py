import copy
# from helper_functions import *

def normalise_json(simple_json: dict):
    normalised_json = copy.deepcopy(simple_json)

    temp = simple_json
    if "setup" in temp and isinstance(temp["setup"], dict):
        temp = simple_json["setup"]
        if "piece_ownership" not in temp:
            normalised_json["setup"]["piece_ownership"] = {}
        if "board_x_size" not in temp:
            normalised_json["setup"]["board_x_size"] = 8
        if "board_y_size" not in temp:
            normalised_json["setup"]["board_y_size"] = 8
        if "starting_position" not in temp:
            normalised_json["setup"]["starting_position"] = []
    else:
        normalised_json["setup"] = {"piece_ownership": {}, "board_x_size": 8, "board_y_size": 8, "starting_position": []}

    temp = simple_json
    if "moves" in temp and isinstance(temp["moves"], dict):
        temp = temp["moves"]
        for move_name, move in temp.items():
            if isinstance(move, dict):
                if "for_movement" not in move:
                    normalised_json["moves"][move_name]["for_movement"] = True
                if "for_capture" not in move:
                    normalised_json["moves"][move_name]["for_capture"] = True
                if "conditions" not in move:
                    normalised_json["moves"][move_name]["conditions"] = []
                if "move_definition" in move and isinstance(move["move_definition"], dict):
                    temp = move["move_definition"]
                    if "range" not in temp:
                        normalised_json["moves"][move_name]["move_definition"]["range"] = 1
                    if "move_stop_conditions" not in temp:
                        normalised_json["moves"][move_name]["move_definition"]["move_stop_conditions"] = ["inside_piece"]

    return normalised_json
