# Category Product API Spec

## Create Product
Endpoint: POST /api/category-products

Headers:
- Authorization: token

Request Body:
``` json
{
    "name": "x product",
}
```

Response Body (Success):
```json
{
    "categoryId": 1,
    "name": "x product",
}
```

## Get Product
Endpoint: GET /api/category-products

Response Body (Success):
```json
{
    "data": [
        {
            "categoryId": 1,
            "name": "x product",
        },
        {
            "categoryId": 2,
            "name": "x product",
        }
    ]
}
```

## Find one product
Endpoint: GET /api/category-products/:categoryId

Response Body (Success):
```json
{
    "data": {
        "categoryId": 1,
        "name": "x product",
    }
}
```

## Update Product
Endpoint: PATCH /api/category-products/:categoryId

Headers:
- Authorization: token

Request Body:
``` json
{
    "name": "x product", // optional
}
```

Response Body (Success):
```json
{
    "name": "x product",
}
```

Response Body (Failed):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```

## Delete Product
Endpoint: DELETE /api/category-products/:categoryId

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
    "status": 401,
    "message": "Unauthorized"
}
```