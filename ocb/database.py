import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData
import asyncio

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

"OnlineClipBoardDataBase"

# SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, "blog.db")}"
DATABASE_URL = "postgresql+asyncpg://postgres:postgresql123@localhost/OnlineClipBoardDataBase"

# engine = create_engine(DATABASE_URL, connect_args = {"check_same_thread": False})

engine = create_async_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(engine, class_=AsyncSession , expire_on_commit=False)

Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        yield session

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
