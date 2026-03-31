import json
from json import JSONDecodeError
import app.engine.json_validator.json_validator as json_validator
import app.engine.legal_move_generator.legal_move_generator as lmg

def test_validate_json():
    try:
        test_data = json.load(open("test_json.json"))
    except JSONDecodeError:
        return False, "JSON Decode Error detected. Please check the file's syntax."

    output = json_validator.validate_json(test_data)
    return output

def display_game_state(board_size: tuple, game_state: dict, show_coords: bool = False):
    print("\nGame state:")
    for y in range(board_size[1]):
        print("+", end="")
        print("----+" * board_size[0])
        print("|", end="")
        for x in range(board_size[0]):
            if show_coords:
                if (x, y) in game_state:
                    print("*", end="")
                else:
                    print(" ", end="")
                print(f"{x},{y}", end="")
            else:
                print(" ", end="")
                if (x, y) in game_state:
                    print_piece = "#"

                    match game_state[(x, y)].piece_name:
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

                    print(print_piece, end=" ")
                else:
                    print("  ", end="")

            print("|", end="")
        print()
    print("+", end="")
    print("----+" * board_size[0])

SHOW_COORDS = True

tvj_output = test_validate_json()
print("JSON Validation:")
print(f"\tOutput: {tvj_output[0]}")
print(f"\tMessage: {tvj_output[1]}")

if tvj_output[0]:
    game = lmg.Game(json.load(open("test_json.json")))

    for piece in game.get_game_state().values():
        print(id(piece.data))

    game_state = game.get_game_state(True)
    display_game_state(game_state[0], game_state[1], SHOW_COORDS)

    # legal_moves = game.get_legal_moves((2, 1))
    # for legal_move in legal_moves.items():
    #     print(legal_move)

    game_state = game.get_game_state()
    for piece in game_state.values():
        print(piece)

    game.update_game_state((3, 1), (3, 3))

    game_state = game.get_game_state(True)
    display_game_state(game_state[0], game_state[1], SHOW_COORDS)

    game_state = game.get_game_state()
    for piece in game_state.values():
        print(piece)

    # print(game._loop_move((0, 0), "north"))

    # game.get_legal_moves((0, 0))

    # print(game.get_game_state())
