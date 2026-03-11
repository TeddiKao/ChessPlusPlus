import json
from json_validator import *

test_data = json.load(open("test_json.json"))

output = validate_json(test_data)

print(f"Output: {output[0]}")
print(f"Message: {output[1]}")
