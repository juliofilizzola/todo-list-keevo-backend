# Todo List Keevo

Api de registro de todo, com status de progresso de cada um

## Tecnologias

Essa api foi feita com as seguintes tecnologias:

- NestJs
- Typorm (ORM)
- Swagger
- Docker
- Postgresql

## Como executar

Essa api foi feita com o conceito de Docker, tanto a api como o banco de dados estão dentro do docker.

A Api está rodando na porta 3000, caso exista algum conflito, modifique no arquivo docker-compose

Para rodar o docker é simples.

##### _(certifique-se que o docker está instalado em sua maquina)_

````bash
  docker compose up -d
````

## Swagger

A Api conta com uma documentação swagger. Para ela esta na rota ```http://localhost:3000/doc```

## Status

As todos tem status, para saber melhor o desenvolvimento delas.

````json
{
  created
  started
  completed
}
````

## Rotas

As Rotas estão no caminho ``http://localhost:3000/todo``.


- Create
  - ``http://localhost:3000/todo``
  - Method Post

  body:
  ````json
  {
    "title": "fazer dever de casa",
    "description": "Atividade de historia"
  }
  ````

  retorno:

  ````json
  {
    "id": "e10946f3-8991-44df-811d-5749a2c0797f",
    "title": "fazer dever de casa",
    "description": "Atividade de historia",
    "status": "created",
    "createdAt": "2024-02-04T17:55:06.716Z",
    "updatedAt": "2024-02-04T17:55:06.716Z",
    "deletedAt": null
  }
  ````
---

- Find All
  - ``http://localhost:3000/todo``
  - Method Get

  retorno:

   ````json
    [
      {
        "id": "e10946f3-8991-44df-811d-5749a2c0797f",
        "title": "fazer dever de casa",
        "description": "Atividade de historia",
        "status": "created",
        "createdAt": "2024-02-04T17:55:06.716Z",
        "updatedAt": "2024-02-04T17:55:06.716Z",
        "deletedAt": null
      }
    ]
  ````
  - VARIANTES

    Essa rota possui tipagem e também filtro de status da todo.

    - paginada
      - ``http://localhost:3000/todo?page=1&limit=2``

      retorno
      ````json
          {
            "data": [
                {
                    "id": "e10946f3-8991-44df-811d-5749a2c0797f",
                    "title": "fazer dever de casa",
                    "description": "Atividade de historia",
                    "status": "created",
                    "createdAt": "2024-02-04T17:55:06.716Z",
                    "updatedAt": "2024-02-04T17:55:06.716Z",
                    "deletedAt": null
                },
                {
                    "id": "383064a3-d277-4ced-83dc-551e4a79c9d8",
                    "title": "comprar leite",
                    "description": "preciso de leite para fazer bolo",
                    "status": "completed",
                    "createdAt": "2024-02-03T18:00:25.140Z",
                    "updatedAt": "2024-02-03T18:00:25.140Z",
                    "deletedAt": null
                }
            ],
            "count": 4,
            "currentPage": 1,
            "nextPage": 2,
            "prevPage": null,
            "lastPage": 2
      }
      ````
      - filtrado por status
        - ``http://localhost:3000/todo?page=1&limit=1&status=created``
          - Status:
              ````json
            {
              created
              started
              completed
            }
            ````

        retorno
        ````json
            {
              "data": [
                  {
                      "id": "e10946f3-8991-44df-811d-5749a2c0797f",
                      "title": "fazer dever de casa",
                      "description": "Atividade de historia",
                      "status": "created",
                      "createdAt": "2024-02-04T17:55:06.716Z",
                      "updatedAt": "2024-02-04T17:55:06.716Z",
                      "deletedAt": null
                  }
              ],
              "count": 3,
              "currentPage": 1,
              "nextPage": 2,
              "prevPage": null,
              "lastPage": 2
        }
        ````
---
  - Find One
    - ``http://localhost:3000/todo/e10946f3-8991-44df-811d-5749a2c0797f``
    - Method Get


    Retorno:
    ````json
    {
      "id": "e10946f3-8991-44df-811d-5749a2c0797f",
      "title": "fazer dever de casa",
      "description": "Atividade de historia",
      "status": "created",
      "createdAt": "2024-02-04T17:55:06.716Z",
      "updatedAt": "2024-02-04T17:55:06.716Z",
      "deletedAt": null
    }
    ````

---
 - Update
   - ``http://localhost:3000/todo/e10946f3-8991-44df-811d-5749a2c0797f``
   - Method Patch

    Body:
      ````json
      {
       "status": "completed"
      }
      ````

   Retorno:
    ````json
    {
      "id": "e10946f3-8991-44df-811d-5749a2c0797f",
      "title": "fazer dever de casa",
      "description": "Atividade de historia",
      "status": "completed",
      "createdAt": "2024-02-04T17:55:06.716Z",
      "updatedAt": "2024-02-04T17:55:06.716Z",
      "deletedAt": null
    }
    ````
---
- Deleted
  - ``http://localhost:3000/todo/e10946f3-8991-44df-811d-5749a2c0797f``
  - Method Delete

  Retorno:

  ````json
  {
    "message": "todo deleted successfully"
  }
  ````
