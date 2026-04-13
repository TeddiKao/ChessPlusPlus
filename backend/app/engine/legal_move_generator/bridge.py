from typing import TypedDict
from app.engine.legal_move_generator.legal_move_generator import Piece

class PieceJSONRuleset(TypedDict):
	pos: tuple[int, int]

def convert_piece_json_ruleset_to_piece_object(piece_json_ruleset: dict):
    return Piece(
        position=(piece_json_ruleset["x_pos"], piece_json_ruleset["y_pos"]),
        piece_id=piece_json_ruleset["piece_id"],
        piece_name=piece_json_ruleset["piece_name"],
        data=piece_json_ruleset["data"]
    )