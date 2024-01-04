#main.py
from fastapi import FastAPI, HTTPException
from .routes.user_routes import router as user_router
from .routes.question_routes import router as question_router
from .routes.history_routes import router as historico_router
from .models import Pergunta  # Assegure-se de que esteja importando o modelo Pergunta corretamente
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from random import choice  # Importação necessária para escolher uma pergunta aleatória
from passlib.context import CryptContext


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Isto permite todas as origens
    allow_credentials=True,
    allow_methods=["*"],  # Isto permite todos os métodos
    allow_headers=["*"],  # Isto permite todos os cabeçalhos
)


# Password context configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# MongoDB configuration
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.minha_base_de_dados


# Inclusion of routes
app.include_router(user_router)
app.include_router(question_router)
app.include_router(historico_router)

# Startup and shutdown events for MongoDB
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient("mongodb://localhost:27017")
    app.mongodb = app.mongodb_client.minha_base_de_dados

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()