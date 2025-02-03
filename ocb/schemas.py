from pydantic import BaseModel, constr, Field
from typing import Optional

class ClipBoardSchema(BaseModel):
    code: Optional[str] = Field(None, pattern=r"^\d{4}$", readOnly=True)
    content: Optional[str] = None