# Category Post API Spec

## Create Post
Endpoint: POST /api/category-posts

Headers:
- Authorization: token

Request Body:
``` json
{
    "name": "x Post",
}
```

Response Body (Success):
```json
{
    "categoryId": 1,
    "name": "x Post",
}
```

## Get All Category Post
Endpoint: GET /api/category-posts

Response Body (Success):
```json
{
    "data": [
        {
            "categoryId": 1,
            "name": "x Post",
        },
        {
            "categoryId": 2,
            "name": "x Post",
        }
    ]
}
```

## Find one category post
Endpoint: GET /api/category-posts/:categoryId

Response Body (Success):
```json
{
    "data": {
        "categoryId": 1,
        "name": "x Post",
    }
}
```

## Update Category Post
Endpoint: PATCH /api/category-posts/:categoryId

Headers:
- Authorization: token

Request Body:
``` json
{
    "name": "x Post", // optional
}
```

Response Body (Success):
```json
{
    "name": "x Post",
}
```

Response Body (Failed):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```

## Delete Category Post
Endpoint: DELETE /api/category-posts/:categoryId

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