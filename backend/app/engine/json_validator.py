
def get_missing_and_invalid(correct_data: set, test_data: set):
    missing = correct_data.difference(test_data)
    invalid = test_data.difference(correct_data)
    return missing, invalid

def validate_json(data: dict):
    main_keys = {"setup", "pieces"}
    if set(data.keys()) != main_keys:
        missing_and_invalid = get_missing_and_invalid(main_keys, set(data))
        return False, f"Missing: {missing_and_invalid[0]}; Invalid: {missing_and_invalid[1]}"

    return True, "No errors detected! :)"
