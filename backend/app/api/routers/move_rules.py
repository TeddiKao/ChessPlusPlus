from app.engine.legal_move_generator.bridge import generate_legal_moves_for_preview
from fastapi import APIRouter

from app.schemas.legal_move_generator_request import GenerateLegalMovesRequest, GenerateLegalMovesResponse
from app.engine.legal_move_generator.legal_move_generator import Game
from app.engine.legal_move_generator.legal_move_generator import Piece

router = APIRouter()

@router.post("/generate-legal-moves", response_model=GenerateLegalMovesResponse)
async def generate_legal_moves(request: GenerateLegalMovesRequest):
	piece_ruleset = request.piece_ruleset
	movement_rules = request.movement_rules
	current_pos = request.current_pos
	piece_name = request.piece_name
	game_state = request.game_state

	legal_moves = generate_legal_moves_for_preview(
		piece_name=piece_name,
		current_pos=current_pos,
		game_state=game_state,
		piece_ruleset=piece_ruleset,
		movement_rules=movement_rules
	)

	return GenerateLegalMovesResponse(
		legal_moves=legal_moves
	)