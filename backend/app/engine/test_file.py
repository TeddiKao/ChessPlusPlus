import json
from json import JSONDecodeError
import backend.app.engine.json_validator.json_validator as json_validator

def test():
    try:
        test_data = json.load(open("test_json.json"))
    except JSONDecodeError:
        print("JSON Decode Error detected. Please check the file's syntax.")
        return

    output = json_validator.validate_json(test_data)

    print(f"Output: {output[0]}")
    print(f"Message: {output[1]}")

test()
