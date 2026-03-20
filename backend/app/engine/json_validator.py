from json_validator_components import *
import move_conditions as mc
import move_stop_conditions as msc

def validate_json(data: dict):

    if not (temp := check_keys(data, {"setup", "pieces", "moves"}, "main"))[0]:
        return temp

    if not (temp := check_keys(data["setup"], {"piece_ownership", "board_x_size", "board_y_size", "starting_position"}, "main/setup"))[0]:
        return temp

    if get_if_wrong_data_type(data["pieces"], dict):
        return False, get_wrong_data_type_error_message(type(data["pieces"]), dict, "main/pieces (value)")
    main_pieces__keys = data["pieces"].keys()
    if get_if_wrong_data_type(data["setup"]["piece_ownership"], dict):
        return False, get_wrong_data_type_error_message(type(data["setup"]["piece_ownership"]), dict, "main/setup/piece_ownership (value)")
    main_setup_pieceownership__items = data["setup"]["piece_ownership"].items()
    for player, pieces_array in main_setup_pieceownership__items:
        wrong_values = get_invalid(set(main_pieces__keys), set(pieces_array))
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
            return False, get_wrong_data_type_error_message(type(piece), dict, f"main/setup/starting_position [{index}]")
        if not (temp := check_keys(piece, {"piece_name", "x_pos", "y_pos"}, f"main/setup/starting_position [{index}]"))[0]:
            return temp
        if get_if_wrong_data_type(piece["piece_name"], str):
            return False, get_wrong_data_type_error_message(type(piece["piece_name"]), str, f"main/setup/starting_position {index}/piece_name (value)")
        if piece["piece_name"] not in main_pieces__keys:
            return False, get_wrong_values_error_message(piece["piece_name"], f"main/setup/starting_position [{index}]/piece_name (value)", "Wrong piece does not exist in \"main/pieces (keys)\"")
        if not (temp := check_range(piece["x_pos"], 0, data["setup"]["board_x_size"] - 1, f"main/setup/starting_position [{index}]/x_pos"))[0]:
            return temp
        if not (temp := check_range(piece["y_pos"], 0, data["setup"]["board_y_size"] - 1, f"main/setup/starting_position [{index}]/y_pos"))[0]:
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

        # Work In Progress -> Currently causes errors

        for index, move in enumerate(piece["moveset"]):
            if get_if_wrong_data_type(move, dict):
                return False, get_wrong_data_type_error_message(type(move), dict, f"main/pieces/{piece_name}/moveset [{index}] (value)")
            if not (temp := check_keys(move, {"move_name", "chained_moves", "valid_move"}, f"main/pieces/{piece_name}/moveset [{index}]"))[0]:
                return temp
            if move["move_name"] not in data["moves"].keys():
                return False, f"\"{move["move_name"]}\" does not exist in \"main/moves\". Location: main/pieces/{piece_name}/moveset [{index}]/move_name (value)"
            if get_if_wrong_data_type(move["chained_moves"], list):
                return False, get_wrong_data_type_error_message(move["chained_moves"], list, f"main/pieces/{piece_name}/moveset [{index}]/chained_moves (value)")
            if get_if_wrong_data_type(move["valid_move"], bool):
                return False, get_wrong_data_type_error_message(move["valid_move"], bool, f"main/pieces/{piece_name}/moveset [{index}]/valid_move (value)")
            if (move["valid_move"] == False) and (move["chained_moves"] == []):
                return False, f"Impossibility error detected. \"valid_move\" cannot be False if \"chained_moves\" is empty. Location: main/pieces/{piece_name}/moveset [{index}]/valid_move (value)"

    return True, "No errors detected! :)"
