# TaskManagement

Микросервисная система управления задачами и проектами на .NET (C#).

## Архитектура

Проект реализован по принципам микросервисной архитектуры.
Каждый сервис представляет собой отдельное Web API приложение со своей зоной ответственности.
Все входящие запросы проходят через API Gateway.

### Сервисы

- ApiGateway — единая точка входа, маршрутизация запросов
- UsersService — управление пользователями
- ProjectsService — управление проектами
- TasksService — управление задачами

## Структура проекта

TaskManagement/
│
├── ApiGateway/
├── UsersService/
├── ProjectsService/
├── TasksService/
│
├── TaskManagementSolution.sln
└── README.md

## Технологии

- C#
- .NET 8 Web API
- REST
- JSON
- Entity Framework Core (при использовании БД)
- Swagger (если включён)

## Функциональность

### UsersService
- Создание пользователя
- Получение списка пользователей
- Получение пользователя по id
- Обновление пользователя
- Удаление пользователя

### ProjectsService
- Создание проекта
- Получение списка проектов
- Получение проекта по id
- Обновление проекта
- Удаление проекта

### TasksService
- Создание задачи
- Получение списка задач
- Получение задачи по id
- Обновление задачи
- Изменение статуса задачи
- Удаление задачи
- Привязка задачи к проекту

## Запуск проекта

1. Клонирование репозитория:

git clone https://github.com/PAUKUSS/TaskManagement.git
cd TaskManagement

2. Открыть TaskManagementSolution.sln в Visual Studio.

3. Проверить настройки в каждом сервисе:
- appsettings.json
- строки подключения к базе данных
- порты запуска

4. Запустить сервисы:
- UsersService
- ProjectsService
- TasksService
- ApiGateway

Или настроить Multiple Startup Projects в Visual Studio.

## Пример маршрутов (через Gateway)

GET    /api/users
POST   /api/users

GET    /api/projects
POST   /api/projects

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}

Фактические маршруты могут отличаться в зависимости от конфигурации Gateway.

## Назначение проекта

Проект демонстрирует:
- микросервисную архитектуру
- разделение ответственности между сервисами
- маршрутизацию через API Gateway
- построение распределённой системы на .NET
