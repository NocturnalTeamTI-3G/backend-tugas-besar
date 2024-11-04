# Product API Spec

## Create Product
Endpoint: POST /api/products

Headers:
- Authorization: token

Request Body:
``` json
{
    "nama_product": "x product",
    "keterangan_product": "vitamin b99..."
}
```

Response Body (Success):
```json
{
    "nama_product": "x product",
    "keterangan_product": "vitamin b99..."
}
```

## Get Product
Endpoint: GET /api/products

Response Body (Success):
```json
{
    "nama_product": "x product",
    "keterangan_product": "vitamin b99..."
}
```

## Update Product
Endpoint: PATCH /api/products

Headers:
- Authorization: token

Request Body:
``` json
{
    "nama_product": "x product", // optional
    "keterangan_product": "vitamin b99..." // optional
}
```

Response Body (Success):
```json
{
    "nama_product": "x product",
    "keterangan_product": "vitamin b99..."
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
Endpoint: DELETE /api/products

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