# Documentation
API Documentation

---

## Symbol
- ✅ = Resource available with testcase
- ☑️ = Resource available without testcase
- ⭕ = Resource unavailable but testcase available
- ❌ = Resource unavailable and no testcase available

## Index
- [**Status** ✅ ](#status)
- [**Merchant List** ⭕ ](#merchant-list)
- [**Merchant Detail** ⭕ ](#merchant-detail)
- [**Create Merchant** ⭕ ](#create-merchant)

---

### Status ✅
- Endpoint: **GET /**

**Success Response**
```json
{
  "code": "200",
  "message": "ok"
}
```

**Notfound Response**
```json
{
  "code": "404",
  "message": "Cannot GET /not-found"
}
```

### Merchant List ⭕
- Endpoint: **GET /v1/merchant**

**Request Query**
```json
{
  "id": "custom-id"
}
```

**Success Response**
```json
{
  "code": "200",
  "message": "Success get merchant list",
  "data": [
    {
      "id": "id",
      "name": "name"
    }
  ]
}
```

**Empty Response**
```json
{
  "code": "200",
  "message": "ok",
  "data": []
}
```

### Merchant Detail ⭕
- Endpoint: **GET /v1/merchant/:id**

**Success Response**
```json
{
  "code": "200",
  "message": "Success get merchant detail",
  "data": {
    "id": "id",
    "name": "name"
  }
}
```

**Notfound Response**
```json
{
  "code": "404",
  "message": "Not Found"
}
```

### Create Merchant ⭕
- Endpoint: **POST /v1/merchant**

**Request Body**
```json
{
  "name": "Merchant Name"
}
```

**Success Response**
```json
{
  "code": "201",
  "message": "Success create merchant",
  "data": {
    "id": "random-id",
    "name": "Merchant Name"
  }
}
```

**Invalid Data Response**
```json
{
  "code": "422",
  "message": "Invalid data",
  "validation_errors": [
    {
      "field": "name",
      "message": "name must be longer than or equal to 10 characters"
    },
    {
      "field": "name",
      "message": "name should not be empty"
    }
  ]
}
```
