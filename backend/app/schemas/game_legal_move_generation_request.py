from app.schemas.base_schema import BaseSchema

class GameLegalMoveGenerationRequest(BaseSchema):
	game_id: str
	current_pos: tuple[int, int]

class GameLegalMoveGenerationResponse(BaseSchema):
	legal_moves: list[tuple[int, int]] | None