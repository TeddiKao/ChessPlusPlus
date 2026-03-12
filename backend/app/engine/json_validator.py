from json_validator_helper_functions import *
from json_validator_error_messages import *

def validate_json(data: dict):
    main__keys = {"setup", "pieces"}
    if set(data.keys()) != main__keys:
        missing_and_invalid = get_missing_and_invalid(main__keys, set(data))
        return False, get_wrong_keys_error_message(missing_and_invalid, "main(keys)")

    main_setup__keys = {"piece_ownership", "board_x_size", "board_y_size", "starting_position"}
    if set(data["setup"].keys()) != main_setup__keys:
        missing_and_invalid = get_missing_and_invalid(main_setup__keys, set(data))
        return False, get_wrong_keys_error_message(missing_and_invalid, "main/setup(keys)")

    main_pieces__keys = data["pieces"].keys()
    main_setup_pieceownership__items = data["setup"]["piece_ownership"].items()
    for player, pieces_array in main_setup_pieceownership__items:
        wrong_values = get_invalid(set(main_pieces__keys), set(pieces_array))
        if wrong_values != set():
            return False, get_wrong_values_error_message(wrong_values, f"main/setup/piece_ownership/{player}(values)", "Wrong pieces do not exist in \"main/pieces(keys)\"")

    main_setup_boardxsize__int = data["setup"]["board_x_size"]
    if get_if_wrong_data_type(main_setup_boardxsize__int, int) == True:
        return False, get_wrong_data_type_error_message(type(main_setup_boardxsize__int), int, "main/setup/board_x_size(int)")

    if get_if_int_not_in_range(main_setup_boardxsize__int, 0, inf) == True:
        return False, get_out_of_range_error_message("main/setup/board_x_size(int)")

    main_setup_boardysize__int = data["setup"]["board_y_size"]
    if get_if_wrong_data_type(main_setup_boardysize__int, int) == True:
        return False, get_wrong_data_type_error_message(type(main_setup_boardysize__int), int, "main/setup/board_y_size(int)")

    if get_if_int_not_in_range(main_setup_boardysize__int, 0, inf) == True:
        return False, get_out_of_range_error_message("main/setup/board_y_size(int)")

    return True, "No errors detected! :)"
