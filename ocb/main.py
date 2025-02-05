from fastapi import FastAPI, Depends, HTTPException, Response
from starlette.middleware.cors import CORSMiddleware
from typing import Optional
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .database import engine, get_db, create_tables
from .models import ClipBoard, CodeDetail
from .schemas import ClipBoardSchema
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
import random
from pydantic_settings import BaseSettings
# models.Base.metadata.create_all(engine)

load_dotenv()

def get_env_variable(var_name, default=None, required=True):
    """Get an environment variable or raise an error if required and missing"""
    value = os.getenv(var_name, default)
    if required and value is None:
        raise ImproperlyConfigured(f"Set the {var_name} environment variable")
    return value

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool

    class config:
        env_file = ".env"

settings = Settings()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_env_variable("allow_origins", "").split(","),  # Allow your frontend origin
    allow_credentials=get_env_variable("allow_credentials"),
    allow_methods=get_env_variable("allow_methods"),  # Allow all HTTP methods
    allow_headers=get_env_variable("allow_headers"),  # Allow all headers
)

async def generate_code(db: AsyncSession) -> str:
    result = await db.execute(select(CodeDetail).filter(CodeDetail.is_available == True))
    list_of_code = result.scalars().all()

    if not list_of_code:
        raise HTTPException(status_code=404, detail="No code available")
    code_detail = random.choice(list_of_code)
    code_detail.is_available = False

    await db.commit()
    return code_detail.code_number

@app.on_event("startup")
async def on_startup():
    await create_tables()

@app.get("/")
def home():
    return {"String": "Hello World"}

@app.get("/content/{code}", response_model=ClipBoardSchema)
async def get_content(code: str, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(ClipBoard).filter(ClipBoard.code == code))
        content = result.scalars().first()

        if content is None:
            raise HTTPException(status_code=404, detail="Code Not Found")
        
        current_time = datetime.utcnow()
        if content.date < current_time - timedelta(hours=12):

            code_detail = await db.execute(select(CodeDetail).filter(CodeDetail.code_number == content.code))
            code_detail = code_detail.scalars().first()

            if code_detail:
                code_detail.is_available = True
                await db.commit()

            await db.delete(content)
            await db.commit()
            raise HTTPException(status_code=404, detail="Code Expired")
    except HTTPException as exc:
        raise exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ERROR OCCURED: {str(e)}")
    return ClipBoardSchema(code=content.code, content=content.content)

@app.post("/content/create", response_model=dict)
async def create_content(payload: ClipBoardSchema, db: AsyncSession = Depends(get_db)):
    try:
        code = await generate_code(db=db)
        new_content = ClipBoard(code = code, content = payload.content)
        db.add(new_content)
        await db.commit()

        return {"Code": code}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")