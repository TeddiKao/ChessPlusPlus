from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.GameService import create_game, get_legal_moves, make_move

router = APIRouter(prefix="/game", tags=["game"])

class StartGameRequest(BaseModel):
    sessionId: str
    variant: dict

class MoveRequest(BaseModel):
    sessionId: str
    fromX: int
    fromY: int
    toX: int
    toY: int

@router.post("/start")
def start_game(req: StartGameRequest):
    state = create_game(req.sessionId, req.variant)
    return state

@router.get("/legal-moves")
def legal_moves(sessionId: str, x: int, y: int):
    try:
        moves = get_legal_moves(sessionId, x, y)
        return {"legalMoves": moves}
    except KeyError:
        raise HTTPException(status_code=404, detail="Game session not found or no piece at that position")

@router.post("/move")
def do_move(req: MoveRequest):
    try:
        state = make_move(req.sessionId, req.fromX, req.fromY, req.toX, req.toY)
        return state
    except KeyError:
        raise HTTPException(status_code=404, detail="Game session not found or invalid move")