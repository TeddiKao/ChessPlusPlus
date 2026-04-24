from backend.app.engine.legal_move_generator.bridge import generate_legal_moves_for_preview
from fastapi import APIRouter

from app.schemas.legal_move_generator_request import GenerateLegalMovesRequest, GenerateLegalMovesResponse
from app.engine.legal_move_generator.legal_move_generator import Game
from app.engine.legal_move_generator.legal_move_generator import Piece

router = APIRouter()

@router.post("/generate-legal-moves")
async def generate_legal_moves(request: GenerateLegalMovesRequest):
	piece_ruleset = request.piece_ruleset
	movement_rules = request.movement_rules

	legal_moves = generate_legal_moves_for_preview(
		
	)