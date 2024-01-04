O projeto visa desenvolver uma aplicação de quiz que permita aos utilizadores testar os
seus conhecimentos em várias categorias. A aplicação contará com funcionalidades como
autenticação de utilizadores, seleção de categorias, jogabilidade interativa e um sistema de
pontuação.
Ainda sendo possivel guests responderem a perguntas mas sempre para os incentivar a criar 
conta.


Para execução do front-end:
cd frontend
cd quizquest
npm install
expo start

Para execução do back-end:
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --log-level debug

