#score_schema.py 

from pydantic import BaseModel

class ScoreSchema(BaseModel):
    level: int
    score: int
    username: str  # Incluído para associar a pontuação com o usuário
