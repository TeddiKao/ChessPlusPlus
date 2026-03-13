from json_validator_helper_functions import *
from json_validator_error_messages import *

def check_keys(check_dict, correct_keys: set, location: str):
    if get_if_wrong_data_type(check_dict, dict):
        return False, get_wrong_data_type_error_message(type(check_dict), dict, f"{location} (value)")
    if set(check_dict.keys()) != correct_keys:
        missing_and_invalid = get_missing_and_invalid(correct_keys, set(check_dict))
        return False, get_wrong_keys_error_message(missing_and_invalid, f"{location} (keys)")
    return True, None

def check_range(check_int, min_int: float, max_int: float, location: str):
    if get_if_wrong_data_type(check_int, int):
        return False, get_wrong_data_type_error_message(type(check_int), int, f"{location} (value)")
    if get_if_int_not_in_range(check_int, min_int, max_int):
        return False, get_out_of_range_error_message(min_int, max_int, f"{location} (value)")
    return True, None
