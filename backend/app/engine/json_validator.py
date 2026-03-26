from app.engine.json_validator_components import *
import app.engine.move_conditions as mc
import app.engine.move_stop_conditions as msc

def validate_json(data: dict):

    if not (temp := check_keys(data, {"setup", "pieces", "moves"}, "main"))[0]:
        return temp

    if not (temp := check_keys(data["setup"], {"piece_ownership", "board_x_size", "board_y_size", "starting_position"}, "main/setup"))[0]:
        return temp

    if get_if_wrong_data_type(data["pieces"], dict):
        return False, get_wrong_data_type_error_message(type(data["pieces"]), dict, "main/pieces (value)")
    if get_if_wrong_data_type(data["setup"]["piece_ownership"], dict):
        return False, get_wrong_data_type_error_message(type(data["setup"]["piece_ownership"]), dict, "main/setup/piece_ownership (value)")
    for player, pieces_array in data["setup"]["piece_ownership"].items():
        wrong_values = get_invalid(set(data["pieces"].keys()), set(pieces_array))
        if wrong_values != set():
            return False, get_wrong_values_error_message(wrong_values, f"main/setup/piece_ownership/{player} (values)", "Wrong pieces do not exist in \"main/pieces (keys)\"")

    if not (temp := check_range(data["setup"]["board_x_size"], 1, 8, "main/setup/board_x_size"))[0]:
        return temp

    if not (temp := check_range(data["setup"]["board_y_size"], 1, 8, "main/setup/board_y_size"))[0]:
        return temp

    if get_if_wrong_data_type(data["setup"]["starting_position"], list):
        return False, get_wrong_data_type_error_message(type(data["setup"]["starting_position"]), list, "main/setup/starting_position (value)")
    for index, piece in enumerate(data["setup"]["starting_position"]):
        if get_if_wrong_data_type(piece, dict):
            return False, get_wrong_data_type_error_message(type(piece), dict, f"main/setup/starting_position/[{index}]")
        if not (temp := check_keys(piece, {"piece_name", "x_pos", "y_pos"}, f"main/setup/starting_position/[{index}]"))[0]:
            return temp
        if get_if_wrong_data_type(piece["piece_name"], str):
            return False, get_wrong_data_type_error_message(type(piece["piece_name"]), str, f"main/setup/starting_position/[{index}]/piece_name (value)")
        if piece["piece_name"] not in data["pieces"].keys():
            return False, get_wrong_values_error_message(piece["piece_name"], f"main/setup/starting_position/[{index}]/piece_name (value)", "Wrong piece does not exist in \"main/pieces (keys)\"")
        if not (temp := check_range(piece["x_pos"], 0, data["setup"]["board_x_size"] - 1, f"main/setup/starting_position/[{index}]/x_pos"))[0]:
            return temp
        if not (temp := check_range(piece["y_pos"], 0, data["setup"]["board_y_size"] - 1, f"main/setup/starting_position/[{index}]/y_pos"))[0]:
            return temp

    if get_if_wrong_data_type(data["moves"], dict):
        return False, get_wrong_data_type_error_message(type(data["moves"]), dict, "main/moves (value)")
    for move_name, move in data["moves"].items():
        if get_if_wrong_data_type(move, dict):
            return False, get_wrong_data_type_error_message(type(move), dict, f"main/moves/{move_name} (value)")
        if not (temp := check_keys(move, {"for_movement", "for_capture", "conditions", "move_definition"}, f"main/moves/{move_name}"))[0]:
            return temp
        if get_if_wrong_data_type(move["for_movement"], bool):
            return False, get_wrong_data_type_error_message(type(move["for_movement"]), bool, f"main/moves/{move_name}/for_movement (value)")
        if get_if_wrong_data_type(move["for_capture"], bool):
            return False, get_wrong_data_type_error_message(type(move["for_capture"]), bool, f"main/moves/{move_name}/for_capture (value)")
        if (move["for_movement"] == False) and (move["for_capture"] == False):
            return False, f"Impossibility error detected. \"for_movement\" and \"for_capture\" cannot both be false. Location: main/moves/{move_name} (value: for_movement, for_capture)"
        if get_if_wrong_data_type(move["conditions"], list):
            return False, get_wrong_data_type_error_message(type(move["conditions"]), list, f"main/moves/{move_name}/conditions (value)")
        if get_invalid(mc.conditions, set(move["conditions"])) != set():
            return False, get_wrong_values_error_message(get_invalid(mc.conditions, set(move["conditions"])), f"main/moves/{move_name}/conditions (value)")

        if get_if_wrong_data_type(move["move_definition"], dict):
            return False, f"main/moves/{move_name}/move_definition (value)"
        check_keys(move["move_definition"], {"move_x", "move_y", "range", "move_stop_conditions"}, f"main/moves/{move_name}/move_definition")
        if get_if_wrong_data_type(move["move_definition"]["move_x"], int):
            return False, f"main/moves/{move_name}/move_definition/move_x (value)"
        if get_if_wrong_data_type(move["move_definition"]["move_y"], int):
            return False, f"main/moves/{move_name}/move_definition/move_y (value)"
        if move["move_definition"]["range"] != "inf":
            if get_if_wrong_data_type(move["move_definition"]["range"], int):
                return False, f"main/moves/{move_name}/move_definition/range (value)"
        if get_if_wrong_data_type(move["move_definition"]["move_stop_conditions"], list):
            return False, get_wrong_data_type_error_message(type(move["move_definition"]["move_stop_conditions"]), list, f"main/moves/{move_name}/move_definition/move_stop_conditions (value)")
        if get_invalid(msc.move_stop_conditions, set(move["move_definition"]["move_stop_conditions"])) != set():
            return False, get_wrong_values_error_message(get_invalid(msc.move_stop_conditions, set(move["move_definition"]["move_stop_conditions"])), f"main/moves/{move_name}/move_stop_conditions (value)")

    for piece_name, piece in data["pieces"].items():
        if get_if_wrong_data_type(piece, dict):
            return False, get_wrong_data_type_error_message(type(piece), dict, f"main/pieces/{piece_name} (value)")
        if not (temp := check_keys(piece, {"moveset"}, f"main/pieces/{piece_name}"))[0]:
            return temp
        if get_if_wrong_data_type(piece["moveset"], list):
            return False, get_wrong_data_type_error_message(type(piece["moveset"]), list, f"main/pieces/{piece_name}/moveset (value)")

        for index, move in enumerate(piece["moveset"]):
            if get_if_wrong_data_type(move, (dict, list), True):
                return False, get_wrong_data_type_error_message(type(move), (dict, list), f"main/pieces/{piece_name}/moveset/[{index}] (value)")
            if isinstance(move, dict):
                if not (temp := check_keys(move, {"move_name"}, f"main/pieces/{piece_name}/moveset/[{index}]"))[0]:
                    return temp
                if get_if_wrong_data_type(move["move_name"], str):
                    return False, get_wrong_data_type_error_message(type(move["move_name"]), str, f"main/pieces/{piece_name}/moveset/[{index}]/move_name (value)")
                if move["move_name"] not in data["moves"].keys():
                    return False, f"\"{move["move_name"]}\" does not exist in \"main/moves\". Location: main/pieces/{piece_name}/moveset/[{index}]/move_name (value)"
            elif isinstance(move, list):
                has_valid_move = False
                for cindex, cmove in enumerate(move):
                    if get_if_wrong_data_type(cmove, dict):
                        return False, get_wrong_data_type_error_message(type(cmove), dict, f"main/pieces/{piece_name}/moveset/[{index}]/[{cindex}] (value)")
                    if not (temp := check_keys(cmove, {"move_name", "valid_move"}, f"main/pieces/{piece_name}/moveset/[{index}]/[{cindex}]"))[0]:
                        return temp
                    if get_if_wrong_data_type(cmove["move_name"], str):
                        return False, get_wrong_data_type_error_message(type(cmove["move_name"]), str, f"main/pieces/{piece_name}/moveset/[{index}]/[{cindex}]/move_name (value)")
                    if cmove["move_name"] not in data["moves"].keys():
                        return False, f"\"{cmove["move_name"]}\" does not exist in \"main/moves\". Location: main/pieces/{piece_name}/moveset/[{index}]/[{cindex}]/move_name (value)"
                    if get_if_wrong_data_type(cmove["valid_move"], bool):
                        return False, f"main/pieces/{piece_name}/moveset/[{index}]/[{cindex}]/valid_move (value)"
                    if cmove["valid_move"] == True:
                        has_valid_move = True
                if has_valid_move == False:
                    return False, f"Impossibility error detected. Chained move must have at least one \"valid_move\" set to True. Location: main/pieces/{piece_name}/moveset/[{index}] (values)"

    return True, "No errors detected! :)"
