# security.py

from datetime import datetime, timedelta
from jose import jwt

# Defina sua chave secreta e o algoritmo
SECRET_KEY = "sua_chave_secreta_aleatoria"
ALGORITHM = "HS256"

# Função para criar um novo token JWT
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)  # Token expira em 1 hora
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
