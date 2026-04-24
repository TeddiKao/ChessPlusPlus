from app.schemas.base_schema import BaseSchema

class GenerateLegalMovesRequest(BaseSchema):
    piece_name: str
    current_pos: tuple[int, int]
    game_state: dict
    piece_ruleset: dict
    movement_rules: dict

class GenerateLegalMovesResponse(BaseSchema):
    legal_moves: dict[str, list[tuple[int, int]]]