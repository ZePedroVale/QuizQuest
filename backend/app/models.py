# models.py
from pydantic import BaseModel
from typing import List, Optional

class Resposta(BaseModel):
    texto: str
    correta: bool

class Pergunta(BaseModel):
    id: Optional[str] = None
    categoria: str
    nivel: str
    pergunta: str
    respostas: List[Resposta]
    imagem: Optional[str] = None