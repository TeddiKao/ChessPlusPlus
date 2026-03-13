import json
from json import JSONDecodeError
from json_validator import *

def test():
    try:
        test_data = json.load(open("test_json.json"))
    except JSONDecodeError:
        print("JSON Decode Error detected. Please check the file's syntax.")
        return

    output = validate_json(test_data)

    print(f"Output: {output[0]}")
    print(f"Message: {output[1]}")

test()
