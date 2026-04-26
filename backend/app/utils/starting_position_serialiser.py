def serialise_starting_position(starting_position: list[tuple[tuple[int, int], str]]):
    serialised_starting_position = []

    for coordinate, piece_name in starting_position:
        serialised_starting_position.append({
            "x_pos": coordinate[0],
            "y_pos": coordinate[1],
            "piece_name": piece_name
        })

    return serialised_starting_position
    