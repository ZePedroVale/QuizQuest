# user_routes.py

from fastapi import APIRouter, HTTPException, status, Depends
from ..schemas.user_schema import User,LoginRequest,UserUpdateSchema  
from ..database import db
from typing import List

from ..schemas.score_schema import ScoreSchema  # Supondo que você cria um novo esquema para pontuações
from ..security import create_access_token

router = APIRouter()

@router.get("/scores/all", response_model=List[ScoreSchema])
async def get_all_scores():
    scores = await db["scores"].find().to_list(None)
    if scores:
        return scores
    else:
        raise HTTPException(status_code=404, detail="Scores não encontrados")


@router.get("/scores/{username}", response_model=List[ScoreSchema])
async def get_scores(username: str):
    # Verifique se o usuário existe na base de dados
    user = await db["users"].find_one({"username": username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    
    # Busque as pontuações do usuário no banco de dados
    scores = await db["scores"].find({"username": username}).to_list(1000)  # Limita a lista de resultados
    if not scores:
        # Se não houver pontuações, você pode optar por retornar uma lista vazia
        # ou levantar uma exceção HTTP 404 se preferir
        return []
    
    return scores


@router.post("/scores")
async def save_score(score_data: ScoreSchema):
    # Verifique se o usuário existe na base de dados
    user = await db["users"].find_one({"username": score_data.username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    
    # Verifique se já existe uma pontuação para este usuário e nível
    existing_score = await db["scores"].find_one({"username": score_data.username, "level": score_data.level})

    # Se a pontuação existir e a nova pontuação for maior, atualize-a
    if existing_score and score_data.score > existing_score["score"]:
        await db["scores"].update_one(
            {"_id": existing_score["_id"]},
            {"$set": {"score": score_data.score}}
        )
        return {"message": "Pontuação atualizada com sucesso"}
    elif not existing_score:
        # Se a pontuação não existir, crie uma nova entrada
        score_document = score_data.dict()
        await db["scores"].insert_one(score_document)
        return {"message": "Pontuação salva com sucesso"}

    # Se a pontuação existir, mas não for maior, não faça nada
    return {"message": "A pontuação atual não é maior que a pontuação anterior."}




@router.post("/login")
async def login(request_data: LoginRequest):  # Use LoginRequest para dados de login
    user = await db["users"].find_one({"username": request_data.username})
    if not user or user["password"] != request_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nome de usuário ou senha incorretos",
        )
    
    # Crie um token JWT após autenticação bem-sucedida
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}



@router.post("/users/", response_model=User)
async def create_user(user: User):
    existing_user = await db["users"].find_one({"username": user.username})
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username já está em uso"
        )

    await db["users"].insert_one(user.dict())
    return user


@router.get("/users/{username}", response_model=User)
async def get_user(username: str):
    user = await db["users"].find_one({"username": username})
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    

@router.put("/users/{username}", response_model=User)
async def update_user(username: str, user_update: UserUpdateSchema):
    updated_user = await db["users"].find_one_and_update(
        {"username": username},
        {"$set": user_update.dict(exclude_unset=True)},
        return_document=True
    )
    if updated_user:
        return updated_user
    else:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")