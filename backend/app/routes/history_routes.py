from fastapi import APIRouter, HTTPException
from ..schemas.history_schema import HistoricoGlobal, HistoricoDiario, HistoricoSemanal
from ..database import db
from bson import ObjectId

router = APIRouter()

# Add a global history
@router.post("/history/global/", response_model=HistoricoGlobal)
async def add_historico_global(historico: HistoricoGlobal):
    result = await db["historico_global"].insert_one(historico.dict())
    created_historico = await db["historico_global"].find_one({"_id": result.inserted_id})
    return created_historico


# Edit a global historical record
@router.put("/history/global/{historico_id}", response_model=HistoricoGlobal)
async def edit_historico_global(historico_id: str, historico: HistoricoGlobal):
    update_result = await db["historico_global"].update_one(
        {"_id": ObjectId(historico_id)},
        {"$set": historico.dict()}
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Historico not found")

    return await db["historico_global"].find_one({"_id": ObjectId(historico_id)})

# Remove a global historical record
@router.delete("/history/global/{historico_id}", response_model=dict)
async def remove_historico_global(historico_id: str):
    delete_result = await db["historico_global"].delete_one({"_id": ObjectId(historico_id)})

    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Historico not found")

    return {"message": "Historico deleted successfully"}





# Add a daily history
@router.post("/history/daily/", response_model=HistoricoDiario)
async def add_historico_diario(historico: HistoricoDiario):
    result = await db["historico_diario"].insert_one(historico.dict())
    created_historico = await db["historico_diario"].find_one({"_id": result.inserted_id})
    return created_historico



# Edit a daily historical record
@router.put("/history/daily/{historico_id}", response_model=HistoricoDiario)
async def edit_historico_diario(historico_id: str, historico: HistoricoDiario):
    update_result = await db["historico_diario"].update_one(
        {"_id": ObjectId(historico_id)},
        {"$set": historico.dict()}
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Historico not found")

    return await db["historico_diario"].find_one({"_id": ObjectId(historico_id)})

# Remove a daily historical record
@router.delete("/history/daily/{historico_id}", response_model=dict)
async def remove_historico_diario(historico_id: str):
    delete_result = await db["historico_diario"].delete_one({"_id": ObjectId(historico_id)})

    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Historico not found")

    return {"message": "Historico deleted successfully"}








# Add a week history
@router.post("/history/week/", response_model=HistoricoSemanal)
async def add_historico_semanal(historico: HistoricoSemanal):
    result = await db["historico_semanal"].insert_one(historico.dict())
    created_historico = await db["historico_semanal"].find_one({"_id": result.inserted_id})
    return created_historico

# Edit a weekly historical record
@router.put("/history/week/{historico_id}", response_model=HistoricoSemanal)
async def edit_historico_semanal(historico_id: str, historico: HistoricoSemanal):
    update_result = await db["historico_semanal"].update_one(
        {"_id": ObjectId(historico_id)},
        {"$set": historico.dict()}
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Historico not found")

    return await db["historico_semanal"].find_one({"_id": ObjectId(historico_id)})

# Remove a weekly historical record
@router.delete("/history/week/{historico_id}", response_model=dict)
async def remove_historico_semanal(historico_id: str):
    delete_result = await db["historico_semanal"].delete_one({"_id": ObjectId(historico_id)})

    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Historico not found")

    return {"message": "Historico deleted successfully"}

