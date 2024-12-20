# Post API Spec

## Create Post
Endpoint: POST /api/posts

Headers: 
- Authorization: token

Request Body:
```json
    {
        "title": "example of title",
        "user_id": 1,
        "category_id": 1,
        "content" : "example of content",
        "post_img": "file.jpg"
    }
```

Response Body (Success):
```json
    {
        "title": "example of title",
        "user_id": 1,
        "category_id": 1,
        "content" : "example of content",
        "views": 9999,
        "likes": 9999,
        "post_img": "file.jpg",
        "created_at": "xxxx-xx-xx"
    }
```

Response Body (Failed):
```json
    {
        "errors": "Unauthorized"
    }
```

## Get All Post
Endpoint: GET /api/posts?order=asc|desc

Response Body (Success):
```json
    [
        {
            "title": "example of title",
            "user_id": 1,
            "category_id": 1,
            "content" : "example of content",
            "views": 9999,
            "likes": 9999,
            "post_img": "file.jpg",
            "created_at": "xxxx-xx-xx"
        },
        {
            "title": "example of title",
            "user_id": 1,
            "category_id": 1,
            "content" : "example of content",
            "views": 9999,
            "likes": 9999,
            "post_img": "file.jpg",
            "created_at": "xxxx-xx-xx"
        },
    ]
    
```

Response Body (Failed):
```json
    {
        "errors": "post not found"
    }
```

## Search Post by Id

Endpoint: GET /api/posts/:postId?post_clicked=(true/false)

Response Body (Success):
```json
    {
        "title": "example of title",
        "user_id": 1,
        "category_id": 1,
        "content" : "example of content",
        "views": 9999,
        "likes": 9999,
        "post_img": "file.jpg",
        "created_at": "xxxx-xx-xx"
    }
    
```

Response Body (Failed):
```json
    {
        "errors": "post not found"
    }
```

## Likes Post
Endpoint: GET /api/posts/:postId/likes?like=true|false

Response Body (Success):
```json
    {
        "title": "example of title",
        "user_id": 1,
        "category_id": 1,
        "content" : "example of content",
        "views": 9999,
        "likes": 9999,
        "post_img": "file.jpg",
        "created_at": "xxxx-xx-xx"
    }
    
```

Response Body (Failed):
```json
    {
        "errors": "post not found"
    }
```

## Update Post
Endpoint: PATCH /api/posts/:postId

Headers: 
- Authorization: token

Request Body:
```json
    {
        "title": "example of title", // optional
        "user_id": 1, // optional
        "category_id": 1, // optional
        "post_img": "file.jpg", // optional
        "content" : "example of content" // optional
    }
```

Response Body (Success):
```json
    {
        "title": "example of title",
        "user_id": 1,
        "category_id": 1,
        "content" : "example of content",
        "views": 9999,
        "likes": 9999,
        "post_img": "file.jpg",
        "created_at": "xxxx-xx-xx"
    }
```

Response Body (Failed):
```json
    {
        "errors": "Unauthorized"
    }
```

## Delete Post
Endpoint: DELETE /api/posts/:postId

Headers: 
- Authorization: token

Response Body (Success):
```json
    {
        "data": true,
    }
```

Response Body (Failed):
```json
    {
        "errors": "Unauthorized"
    }
```