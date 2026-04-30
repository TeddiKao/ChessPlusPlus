import re

def camel_to_snake_case(name: str) -> str:
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', name).lower()

def snake_to_camel_case(name: str) -> str:
    words = name.split("_")
    result = words[0]
    for i in range(1, len(words)):
        result += words[i].capitalize()
    return result

def convert_camel_to_snake(
    camel_dict: dict,
    exclude_levels: list[int] | None = None,
):
    if exclude_levels is None:
        exclude_levels = []

    def _convert(data, current_level):
        if isinstance(data, dict):
            result = {}
            for k, v in data.items():
                if current_level not in exclude_levels and isinstance(k, str):
                    new_key = camel_to_snake_case(k)
                else:
                    new_key = k
                result[new_key] = _convert(v, current_level + 1)
            return result
        elif isinstance(data, list):
            return [_convert(item, current_level) for item in data]
        else:
            return data

    return _convert(camel_dict, 0)


def convert_snake_to_camel(
    snake_dict: dict,
    exclude_levels: list[int] | None = None,
):
    if exclude_levels is None:
        exclude_levels = []

    def _convert(data, current_level):
        if isinstance(data, dict):
            result = {}
            for k, v in data.items():
                if current_level not in exclude_levels and isinstance(k, str):
                    new_key = snake_to_camel_case(k)
                else:
                    new_key = k
                result[new_key] = _convert(v, current_level + 1)
            return result
        elif isinstance(data, list):
            return [_convert(item, current_level) for item in data]
        else:
            return data

    return _convert(snake_dict, 0)