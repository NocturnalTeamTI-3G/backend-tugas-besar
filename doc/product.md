# Product API Spec

## Create Product
Endpoint: POST /api/products

Headers:
- Authorization: token

Request Body:
``` json
{
    "name": "x product",
    "description": "vitamin b99..."
}
```

Response Body (Success):
```json
{
    "name": "x product",
    "description": "vitamin b99..."
}
```

## Get Product
Endpoint: GET /api/products

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "data": [
        {
            "productId": 1,
            "name": "x product",
            "description": "vitamin b99..."
        },
        {
            "productId": 2,
            "name": "x product",
            "description": "vitamin b99..."
        }
    ]
}
```

## Find one product
Endpoint: GET /api/products/:productId

Headers: 
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "productId": 1,
        "name": "x product",
        "description": "vitamin b99..."
    }
}
```

## Update Product
Endpoint: PATCH /api/products/:productId

Headers:
- Authorization: token

Request Body:
``` json
{
    "name": "x product", // optional
    "description": "vitamin b99..." // optional
}
```

Response Body (Success):
```json
{
    "name": "x product",
    "description": "vitamin b99..."
}
```

Response Body (Failed):
```json
{
    "status": 404,
    "message": "Unauthorized"
}
```

## Delete Product
Endpoint: DELETE /api/products/:productId

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "status": 200,
    "message": "Product has been deleted."
}
```

Response Body (Failed):
```json
{
    "status": 404,
    "message": "Unauthorized"
}
```