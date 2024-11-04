# History API Spec

## Create History
Endpoint: POST /api/histories

Headers:
- Authorization: token

Request Body:
```json
{
    "penyakit": "...",
    "penjelasan_penyakit": "....",
    "face_img": "*.jpg",
    "solution_acne": "...",
    "product_solution": "..."
}
```

Response Body (Success):
```json
{
    "data": {
        "penyakit": "...",
        "penjelasan_penyakit": "....",
        "face_img": "*.jpg",
        "solution_acne": "...",
        "product_solution": "..."
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
    "data": {
        "penyakit": "...",
        "penjelasan_penyakit": "....",
        "face_img": "*.jpg",
        "solution_acne": "...",
        "product_solution": "..."
    }
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
Endpoint: DELETE /api/histories

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