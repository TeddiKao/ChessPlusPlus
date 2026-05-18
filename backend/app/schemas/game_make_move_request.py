from app.schemas.base_schema import BaseSchema

class GameMakeMoveRequest(BaseSchema):
	game_id: str
	piece_start_pos: tuple[int, int]
	piece_end_pos: tuple[int, int]

class GameMakeMoveResponse(BaseSchema):
	valid_move: bool
	new_game_state: list[tuple[tuple[int, int], str]] | None