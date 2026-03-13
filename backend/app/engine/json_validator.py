from json_validator_components import *

def validate_json(data: dict):

    if not (temp := check_keys(data, {"setup", "pieces"}, "main"))[0]:
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

    return True, "No errors detected! :)"
