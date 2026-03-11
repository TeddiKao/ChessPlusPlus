def get_missing_and_invalid(correct_data: set, test_data: set):
    missing = correct_data.difference(test_data)
    invalid = test_data.difference(correct_data)
    return missing, invalid

def get_invalid(all_data: set, test_data: set):
    invalid = test_data.difference(all_data)
    return invalid

def get_wrong_keys_error_message(missing_and_invalid: tuple, location: str):
    return f"Incorrect keys detected. Missing: {missing_and_invalid[0]}; Invalid: {missing_and_invalid[1]}; Location: {location}. "

def get_wrong_values_error_message(wrong_values: set, location: str, extra: str = ""):
    return f"Invalid values detected. Wrong values: {wrong_values}; Location: {location}. {extra}."
