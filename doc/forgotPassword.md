# Forgot Password API Spec

## Send Email Token
Endpoint: POST /api/forgot-password

Request Body: 
```json
{
    "email": "apispec@gmail.com"
}
```

Response (Success):
```json
{
    "data": {
        "email": "apispec@gmail.com"
    }
}
```

Response (Failed):
```json
{
    "errors": "User Not Found"
}
```

## Checking Token
Endpoint: POST /api/forgot-password/check

Request Body: 
```json
{
    "token": 666666
}
```

Response (Success):
```json
{
    "data": "true"
}
```

Response (Failed):
```json
{
    "errors": "Invalid or expired token"
}
```

## Update Password
Endpoint: POST /api/forgot-password/update?email=user@gmail.com

Request Body: 
```json
{
    "password": "password"
}
```

Response (Success):
```json
{
    "data": "true"
}
```

Response (Failed):
```json
{
    "errors": "Query parameter email is required"
}
```