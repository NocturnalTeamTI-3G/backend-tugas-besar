# Role API Spec

## Create Role
Endpoint: POST /api/roles

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
        "id": 1,
        "role": "diisi role",
        "created_at": "xx/xx/xx yy:yy:yy"
    }
}
```

## Get All Role
Endpoint: GET /api/roles

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
    "error": "Role not found"
}
```

## Find one Role
Endpoint: GET /api/roles/:roleId

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
    "error": "Role not found"
}
```

## Update Role
Endpoint: PATCH /api/roles/:roleId

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

Response Body (Success):
```json
{
    message: true
}
```

