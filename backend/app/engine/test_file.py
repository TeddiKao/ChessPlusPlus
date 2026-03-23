import json
from json import JSONDecodeError
import backend.app.engine.json_validator.json_validator as json_validator
import backend.app.engine.legal_move_generator.legal_move_generator as lmg

def test_validate_json():
    try:
        test_data = json.load(open("test_json.json"))
    except JSONDecodeError:
        return False, "JSON Decode Error detected. Please check the file's syntax."

    output = json_validator.validate_json(test_data)
    return output

def display_game_state(board_size: tuple, game_state: dict):
    print("Game state:")
    for y in range(board_size[1]):
        print("+", end="")
        print("---+" * board_size[0])
        print("|", end="")
        for x in range(board_size[0]):
            print(" ", end="")

            # print(f"{x},{y}", end="")
            if (x, y) in game_state:
                print_piece = "#"

                match game_state[(x, y)]:
                    case "white_pawn":
                        print_piece = "P"
                    case "black_pawn":
                        print_piece = "p"
                    case "white_knight":
                        print_piece = "N"
                    case "black_knight":
                        print_piece = "n"
                    case "white_queen":
                        print_piece = "Q"
                    case "black_queen":
                        print_piece = "q"
                    case "white_king":
                        print_piece = "K"
                    case "black_king":
                        print_piece = "k"
                    case "white_rook":
                        print_piece = "R"
                    case "black_rook":
                        print_piece = "r"
                    case "white_bishop":
                        print_piece = "B"
                    case "black_bishop":
                        print_piece = "b"

                print(print_piece, end="")
            else:
                print(" ", end="")

            print(" |", end="")
        print()
    print("+", end="")
    print("---+" * board_size[0])

tvj_output = test_validate_json()
print("JSON Validation:")
print(f"\tOutput: {tvj_output[0]}")
print(f"\tMessage: {tvj_output[1]}")

if tvj_output[0]:
    print()
    game = lmg.Game(json.load(open("test_json.json")))
    game_state = game.get_game_state(True)
    display_game_state(game_state[0], game_state[1])
