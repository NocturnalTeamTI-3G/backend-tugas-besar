# Disease API Spec

## Create Disease (done)
Endpoint: POST /api/diseases

Headers:
- Authorization: token

Request Body:
```json
{
    "name": "nama penyakit",
    "description": "deskripsi penyakit",
    "solution": "solusi penyakit"
}
```

Response Body (Success):
```json
{
    "id": 1,
    "name": "nama penyakit",
    "description": "deskripsi penyakit",
    "solution": "solusi penyakit"
}
```

Response Body (Failed):
```json
{
    "status": 401,
    "message": "Unauthorized",
}
```

## Get All Diseases (Done)
Endpoint: GET /api/diseases

Response Body (Success):
```json
{
    "data": [
        {
            "diseaseId": 1,
            "name": "nama penyakit",
            "description": "deskripsi penyakit",
            "solution": "solusi penyakit"
        },
        {
            "diseaseId": 2,
            "name": "nama penyakit",
            "description": "deskripsi penyakit",
            "solution": "solusi penyakit"
        },
    ]
}
```

## Search Disease (done)
Endpoint: GET /api/diseases/:diseaseId

Response Body (Success):
```json
{
    "diseaseId": 1,
    "name": "nama penyakit",
    "description": "deskripsi penyakit",
    "solution": "solusi penyakit"
}
```

Response Body (Failed):
```json
{
    "status": 404,
    "message": "Disease Not Found",
}
```

## Update Disease (done)
Endpoint: PATCH /api/diseases/:diseaseId

Headers:
- Authorization: token

Request Body:
```json
{
    "name": "nama penyakit", // optional
    "description": "deskripsi penyakit", //optional
    "solution": "solusi penyakit" // optional
}
```

Response Body (Success):
```json
{
    "name": "nama penyakit",
    "description": "deskripsi penyakit",
    "solution": "solusi penyakit"
}
```

Response Body (Failed):
```json
{
    "status": 401,
    "message": "Unauthorized",
}
```

## Delete Disease (done)

Endpoint: DELETE /api/diseases/:diseaseId

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "status": 200,
    "message": "Disease has been deleted."
}
```

Response Body (Failed):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```