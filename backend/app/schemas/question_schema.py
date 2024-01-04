from pydantic import BaseModel, Field
from typing import List

class Resposta(BaseModel):
    texto: str
    correta: bool

class Pergunta(BaseModel):
    id: str = Field(default=None, alias="_id")
    categoria: str
    nivel:str
    pergunta: str
    respostas: List[Resposta]
    imagem: str  # can be a url
