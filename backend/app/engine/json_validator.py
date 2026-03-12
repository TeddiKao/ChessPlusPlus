from json_validator_components import *

def validate_json(data: dict):

    if not (temp := key_check(data, {"setup", "pieces"}, "main"))[0]:
        return temp

    if not (temp := key_check(data["setup"], {"piece_ownership", "board_x_size", "board_y_size", "starting_position"}, "main/setup"))[0]:
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

    main_setup_boardxsize__int = data["setup"]["board_x_size"]
    if get_if_wrong_data_type(main_setup_boardxsize__int, int):
        return False, get_wrong_data_type_error_message(type(main_setup_boardxsize__int), int, "main/setup/board_x_size(int)")

    if get_if_int_not_in_range(main_setup_boardxsize__int, 1, 8):
        return False, get_out_of_range_error_message("main/setup/board_x_size(int)")

    main_setup_boardysize__int = data["setup"]["board_y_size"]
    if get_if_wrong_data_type(main_setup_boardysize__int, int):
        return False, get_wrong_data_type_error_message(type(main_setup_boardysize__int), int, "main/setup/board_y_size(int)")

    if get_if_int_not_in_range(main_setup_boardysize__int, 1, 8):
        return False, get_out_of_range_error_message("main/setup/board_y_size(int)")

    return True, "No errors detected! :)"
