# Role API Spec

## Create Role
Endpoint: POST /api/roles

Headers:
- Authorization: token

Request Body:
```json
{
    "role": "diisi role",
}
```

Response Body (Success):
```json
{
    "data": {
        "role": "diisi role",
    }
}
```

## Get All Role
Endpoint: GET /api/roles

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "data": [
        {
            "roleId": 1,
            "role": "diisi role",
        },
        {
            "roleId": 2,
            "role": "diisi role",
        }
    ]
}
```

Response Body (Failed):
```json
{
    "error": "Unauthorized"
}
```

## Find one Role
Endpoint: GET /api/roles/:roleId

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "roleId": 1,
        "role": "diisi role",
    }
}
```

Response Body (Failed):
```json
{
    "error": "Unauthorized"
}
```

## Update Role
Endpoint: PATCH /api/roles/:roleId

Headers:
- Authorization: token

Request Body:
```json
{
    "role": "diisi role", // optional
}
```

Response Body (Success):
```json
{
    "data": {
        "role_id": 1,
        "role": "diisi role",
    }
}
```

## Delete Role
Endpoint: DELETE /api/roles/:roleId

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "status": 200,
    "message": "Role has been deleted"
}
```

