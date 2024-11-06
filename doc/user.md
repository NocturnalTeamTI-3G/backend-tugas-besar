# User API Spec

## Register User (done)
Endpoint: POST /api/users 

Request Body : 
```json
{
    "username": "Isi Username",
    "email": "user@example.com",
    "password": "rahasia",
    "role_id_": 1,
    "profile_img": "profile_img.jpg"
}
```

Response Body (Success):
```json
{
    "data": {
        "username": "Isi Username",
        "email": "user@example.com",
        "role_id": 1,
        "profile_img": "profile_img.jpg",
        "created_at": "xx/xx/xxxx yy:yy:yy"
    }
}
```

Response Body (Failed):
```json
{
    "error": "User already registered"
}
```

## Login User (done)
Endpoint: POST /api/users/login

Request Body : 
```json
{
    "email": "user@example.com",
    "password": "rahasia",
}
```

Response Body (Success):
```json
{
    "data": {
        "email": "user@example.com",
        "password": "rahasia",
        "token": "session_id_generated"
    }
}
```

Response Body (Failed):
```json
{
    "error": "Email or password is incorrect"
}
```


## Get User (Done)
Endpoint: GET /api/users/current

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "userId": 1,
        "email": "user@example.com",
        "username": "username",
        "role_id": 1,
        "profile_img": "img_user.jpg"
    }
}
```

Response Body (Failed):
```json
{
    "error": "Unauthorized"
}
```

## Update User (done)
Endpoint: PATCH /api/users/current

Headers:
- Authorization: token

Request Body : 
```json
{
    "username": "Isi Username", // optional
    "email": "user@example.com", // optional
    "password": "rahasia", // optional
    "role_id": 1, // optional
    "profile_img": "profile_img.jpg" // optional
}
```

Response Body (Success):
```json
{
    "data": {
        "username": "Isi Username",
        "email": "user@example.com",
        "password": "rahasia",
        "role_id": 1,
        "profile_img": "profile_img.jpg"
    }
}
```

Response Body (Failed):
```json
{
    "error": "Unauthorized"
}
```

## Logout User
Endpoint: DELETE /api/users/current

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "data": true
}
```

Response Body (Failed):
```json
{
    "error": "Unauthorized" 
}
```