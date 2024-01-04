
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI

app = FastAPI()

client = AsyncIOMotorClient("mongodb+srv://josepedroeb1:josepedroeb1@cluster0.tcuutmv.mongodb.net/")
db = client.app

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient("mongodb+srv://josepedroeb1:josepedroeb1@cluster0.tcuutmv.mongodb.net/")
    app.mongodb = app.mongodb_client.app

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
