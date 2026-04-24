from app.engine.legal_move_generator.legal_move_generator import Game
from typing import TypedDict
from app.engine.legal_move_generator.legal_move_generator import Piece
from app.utils.case_converter import convert_camel_to_snake

class PieceJSONRuleset(TypedDict):
	pos: tuple[int, int]

def convert_piece_json_ruleset_to_piece_object(piece_json_ruleset: dict):
    return Piece(
        position=(piece_json_ruleset["x_pos"], piece_json_ruleset["y_pos"]),
        piece_id=piece_json_ruleset["piece_id"],
        piece_name=piece_json_ruleset["piece_name"],
        data=piece_json_ruleset["data"]
    )

def generate_legal_moves_for_preview(piece_name: str, current_pos: tuple[int, int], game_state: dict, piece_ruleset: dict, movement_rules: dict):
    serialized_piece_ruleset = convert_camel_to_snake(piece_ruleset, [1, 2])
    serialized_movement_rules = convert_camel_to_snake(movement_rules, [1])
    
    game_instance = Game({ "pieces": serialized_piece_ruleset, "moves": serialized_movement_rules })
    
    game_state = {}
    game_state[current_pos] = Piece(
        position=current_pos,
        piece_id=0,
        piece_name=piece_name,
        data={ "has_not_moved": True }
    )

    return game_instance.get_legal_moves(current_pos)