from pydantic import BaseModel

class HistoricoBase(BaseModel):
    id_user: str
    pontos: int
    estrelas: int

class HistoricoGlobal(HistoricoBase):
    pass

class HistoricoDiario(HistoricoBase):
    pass

class HistoricoSemanal(HistoricoBase):
    pass