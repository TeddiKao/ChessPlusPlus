from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.engine.json_validator import validate_json
from app.schemas.base_schema import BaseSchema

from app.api.routers.game import router as game_router

app = FastAPI()

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(game_router)

class JSONValidationRequest(BaseSchema):
    json_to_validate: dict

@app.post("/test")
async def test_route():
    return {"message": "Hello, World!"}

@app.post("/json-validator-test")
async def json_validator_test(validation_request: JSONValidationRequest):
    validation_status = validate_json(validation_request.json_to_validate)

    return {"validation_status": validation_status}