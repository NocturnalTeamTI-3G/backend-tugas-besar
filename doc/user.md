# User API Spec

## Register User
Endpoint: POST /api/users

Request Body : 
```json
{
    "username": "Isi Username",
    "email": "user@example.com",
    "password": "rahasia",
    "profile_img": "profile_img.jpg"
}
```

Response Body (Success):
```json
{
    "data": {
        "username": "Isi Username",
        "email": "user@example.com",
        "password": "rahasia",
        "profile_img": "profile_img.jpg"
    }
}
```

Response Body (Failed):
```json
{
    "error": "User already registered"
}
```

## Login User
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


## Get User
Endpoint: GET /api/users/current

Headers:
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "email": "user@example.com",
        "username": "username",
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

## Update User
Endpoint: PATCH /api/users/current

Headers:
- Authorization: token

Request Body : 
```json
{
    "username": "Isi Username", // optional
    "email": "user@example.com", // optional
    "password": "rahasia", // optional
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