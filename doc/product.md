# Product API Spec

## Create Product
Endpoint: POST /api/products

Headers:
- Authorization: token

Request Body:
``` json
{
    "name": "x product",
    "description": "vitamin b99...",
    "product_img": "example.jpg"
}
```

Response Body (Success):
```json
{
    "name": "x product",
    "description": "vitamin b99...",
    "product_img": "example.jpg"
}
```

## Get Product
Endpoint: GET /api/products

Response Body (Success):
```json
{
    "data": [
        {
            "productId": 1,
            "name": "x product",
            "description": "vitamin b99...",
            "product_img": "example.jpg"
        },
        {
            "productId": 2,
            "name": "x product",
            "description": "vitamin b99...",
            "product_img": "example.jpg"
        }
    ]
}
```

## Find one product
Endpoint: GET /api/products/:productId

Response Body (Success):
```json
{
    "data": {
        "productId": 1,
        "name": "x product",
        "description": "vitamin b99...",
        "product_img": "example.jpg"
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
    "description": "vitamin b99...", // optional
    "product_img": "example.jpg" // optional
}
```

Response Body (Success):
```json
{
    "name": "x product",
    "description": "vitamin b99...",
    "product_img": "example.jpg"
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
    "message": true
}
```

Response Body (Failed):
```json
{
    "status": 404,
    "message": "Unauthorized"
}
```