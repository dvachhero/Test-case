# Тестовое задание (Худяков Илья tg: @jonnythedreamer)


## Запуск frontend-а
- cd frontend
- npm install
- npm start

## Запуск backend-а

- python -m venv venv
- . env/bin/activate
- pip install -r backend/requirements.txt
- cd backend
- ./manager.py migrate
- ./manager.py createsuperuser
- ./manager.py runserver

---

## Описания основных функций и структуры проекта

В проекте реализованы модели "Авторы" и "Книги" и CRUD операции по работе с ними

В фронденде разработаны компоненты:
- frontend/src/Login.js Реализация входа/выход с использованием DRF токен-авторизации
- frontend/src/AddAuthor.js Реализация работы с моделью Авторы. Просмотр доступен всем пользователям. Остальные операции авторизированным. 
- frontend/src/AddBook.js Реализация работы с моделью Книги. Просмотр доступен всем пользователям. Остальные операции авторизированным.
