# History API Spec

## Create History
Endpoint: POST /api/histories

Headers:
- Authorization: token

Request Body:
```json
{
    "diseaseId": 1,
    "face_img": "*.jpg",
    "productId": 1
}
```

Response Body (Success):
```json
{
    "data": {
        "diseaseId": 1,
        "face_img": "*.jpg",
        "productId": 1
    }
}
```

## Get History
Endpoint: GET /api/histories

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "data": [
        {
            "historyId": 1,
            "disease": disease.name,
            "description_disease": disease.description,
            "face_img": "*.jpg",
            "solution_acne": disease.solution,
            "product_solution": product.name
        },
        {
            "historyId": 2,
            "disease": disease.name,
            "description_disease": disease.description,
            "face_img": "*.jpg",
            "solution_acne": disease.solution,
            "product_solution": product.name
        }
    ]
}
```

Response Body (Failed):
```json
{
    "status": 404,
    "message": "Unauthorized"
}
```

## Delete History
Endpoint: DELETE /api/histories/:historyId

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "status": 200,
    "message": "History has been deleted"
}
```

Response Body (Failed):
```json
{
    "status": 404,
    "message": "Unauthorized"
}
```