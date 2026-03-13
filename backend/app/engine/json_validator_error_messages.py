
def get_wrong_keys_error_message(missing_and_invalid: tuple, location: str):
    return f"Incorrect keys detected. Missing: {missing_and_invalid[0]}; Invalid: {missing_and_invalid[1]}; Location: {location}. "

def get_wrong_values_error_message(wrong_values: set, location: str, extra: str = ""):
    return f"Invalid values detected. Wrong values: {wrong_values}; Location: {location}. {extra}."

def get_wrong_data_type_error_message(current_type, correct_type, location: str):
    return f"Invalid data type detected. Current type: {current_type.__name__}; Correct type: {correct_type.__name__}; Location: {location}. "

def get_out_of_range_error_message(min_int: float, max_int: float, location: str):
    return f"Integer out of range detected, is not within {min_int} and {max_int}. Location: {location}. "
