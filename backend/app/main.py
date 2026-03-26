from fastapi import FastAPI
from pydantic import BaseModel
from pydantic_settings.sources import PydanticModel
from starlette.middleware.cors import CORSMiddleware
from app.engine.json_validator import validate_json
from app.schemas.base_schema import BaseSchema

app = FastAPI()

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JSONValidationRequest(BaseSchema):
    json_to_validate: dict

@app.post("/test")
async def test_route():
    return {"message": "Hello, World!"}

@app.post("/json-validator-test")
async def json_validator_test(validation_request: JSONValidationRequest):
    try:
        validation_status = validate_json(validation_request.json_to_validate)

        return {"validation_status": validation_status}
    except Exception as e:
        print(str(e))