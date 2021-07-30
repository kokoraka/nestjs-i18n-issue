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
- [**Merchant List** ❌ ](#merchant-list)
- [**Merchant Detail** ❌ ](#merchant-detail)

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

### Merchant List ❌
- Endpoint: **GET /v1/merchant**

**Success Response**
```json
{
  "code": "200",
  "message": "ok",
  "data": [
    {
      "id": "custom",
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


### Merchant Detail ❌
- Endpoint: **GET /v1/merchant/:id**

**Success Response**
```json
{
  "code": "200",
  "message": "ok",
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
  "message": "Resource notfound"
}
```
