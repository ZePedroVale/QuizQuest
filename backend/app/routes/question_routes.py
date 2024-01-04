#question_routes.py
from fastapi import APIRouter, HTTPException
from ..schemas.question_schema import Pergunta
from ..database import db
from bson import ObjectId
from typing import List
from fastapi import Query
from pymongo import DESCENDING
from random import choice





router = APIRouter()

@router.post("/perguntas/", response_model=Pergunta)
async def create_pergunta(pergunta: Pergunta):
    new_pergunta = await db["perguntas"].insert_one(pergunta.dict(by_alias=True))
    created_pergunta = await db["perguntas"].find_one({"_id": new_pergunta.inserted_id})
    return Pergunta(**created_pergunta)


@router.get("/perguntas/aleatoria/")
async def get_random_question(categoria: str, nivel: str):
    perguntas_cursor = db["perguntas"].find({"categoria": categoria, "nivel": nivel}).sort([('_id', DESCENDING)])
    perguntas = await perguntas_cursor.to_list(length=100)
    if not perguntas:
        raise HTTPException(status_code=404, detail="Pergunta não encontrada")
    pergunta_aleatoria = choice(perguntas)  # Escolhe uma pergunta aleatória
    return pergunta_aleatoria


@router.put("/perguntas/{pergunta_id}", response_model=Pergunta)
async def edit_pergunta(pergunta_id: str, pergunta: Pergunta):
    update_result = await db["perguntas"].update_one(
        {"_id": ObjectId(pergunta_id)},
        {"$set": pergunta.dict(exclude_unset=True)}
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Pergunta not found")

    updated_pergunta = await db["perguntas"].find_one({"_id": ObjectId(pergunta_id)})
    return Pergunta(**updated_pergunta)


@router.delete("/perguntas/{pergunta_id}", response_model=dict)
async def remove_pergunta(pergunta_id: str):
    delete_result = await db["perguntas"].delete_one({"_id": ObjectId(pergunta_id)})

    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Pergunta not found")

    return {"message": "Pergunta deleted successfully"}


@router.get("/perguntas/", response_model=List[Pergunta])
async def get_perguntas_by_category_and_level(categoria: str, nivel: str):
    query = {"categoria": categoria, "nivel": nivel}
    perguntas = await db["perguntas"].find(query).to_list(None)
    if perguntas:
        return perguntas
    else:
        raise HTTPException(status_code=404, detail="Perguntas não encontradas")