#user_schema.py

from pydantic import BaseModel, EmailStr
from typing import Optional


class User(BaseModel):
    nome: str
    username: str
    password: str
    email: EmailStr

class LoginRequest(BaseModel):
    username: str
    password: str


from pydantic import BaseModel

class UserUpdateSchema(BaseModel):
    nome: Optional[str] = None
    email: Optional[str] = None
    biography: Optional[str] = None
    # Inclua outros campos que podem ser atualizados
