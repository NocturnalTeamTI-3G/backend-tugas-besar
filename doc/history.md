# History API Spec

## Create History (done)

Endpoint: POST /api/histories

Headers:

- Authorization: token

Request Body:

```json
{
  "diseaseId": 1,
  "productId": 1,
  "face_img": "*.jpg",
}
```

Response Body (Success):

```json
{
    "data": {
        "historyId": 1,
        "userId": 1,
        "disease": disease.name,
        "description_disease": disease.description,
        "face_img": "*.jpg",
        "solution_acne": disease.solution,
        "product": product.name,
        "description_product": product.description
    }
}
```

## Get History (done)

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
