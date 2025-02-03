from .database import Base
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

class ClipBoard(Base):
    __tablename__ = "ClipBoard"

    id = Column(Integer, primary_key = True, index = True)
    code = Column(String, ForeignKey("CodeNumber.code_number"), unique = True, index = True)
    content = Column(Text)
    date = Column(DateTime, default=func.now())

    code_detail = relationship("CodeDetail", back_populates="clips")

class CodeDetail(Base):
    __tablename__ = "CodeNumber"

    id = Column(Integer, primary_key = True, index = True)
    code_number = Column(String, unique=True, index=True)
    is_available = Column(Boolean)

    clips = relationship("ClipBoard", back_populates="code_detail")