from json_validator_helper_functions import *
from json_validator_error_messages import *

def key_check(check_dict, correct_keys: set, path: str):
    if get_if_wrong_data_type(check_dict, dict):
        return False, get_wrong_data_type_error_message(type(check_dict), dict, f"{path} (value)")
    if set(check_dict.keys()) != correct_keys:
        missing_and_invalid = get_missing_and_invalid(correct_keys, set(check_dict))
        return False, get_wrong_keys_error_message(missing_and_invalid, f"{path} (keys)")
    return True, None


