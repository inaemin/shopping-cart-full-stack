# GET /cart

장바구니에 담긴 상품 목록을 조회할 수 있다.

```http
GET /cart
```

## Response

### 200 OK

데이터 조회 성공. 장바구니가 비어있으면 빈 배열을 반환한다.

```json
{
  "data": [{ "id": 1, "name": "제품 이름", "price": 10000, "quantity": 1, "imageUrl": "https://xxx..." }]
}
```

## Error Response

```json
{
  "error": "ERROR_CODE",
  "message": "에러 메시지입니다"
}
```

---

# PATCH /cart/:id

id와 수량을 이용해 장바구니 상품의 수량을 변경한다.

```http
PATCH /cart/:id
Content-Type: application/json
```

## Request

### Path Variable

| 이름 | 타입   | 필수 | 설명             |
| ---- | ------ | ---: | ---------------- |
| id   | number |    O | 장바구니 상품 id |

### Request Body

```json
{ "quantity": 2 }
```

| 필드     | 타입   | 필수 | 조건                         |
| -------- | ------ | ---: | ---------------------------- |
| quantity | number |    O | 1 이상 현재 재고 이하의 정수 |

## Response

### 204 No Content

### 400 Bad Request

id가 숫자가 아닌 경우

```json
{ "error": "INVALID_CART_ITEM_ID", "message": "장바구니 상품 ID는 숫자여야 합니다." }
```

quantity가 없거나 숫자가 아닌 경우

```json
{ "error": "REQUIRED_CART_ITEM_QUANTITY", "message": "장바구니 상품 수량은 필수입니다." }
```

quantity가 1보다 작은 경우

```json
{ "error": "INVALID_CART_ITEM_QUANTITY", "message": "장바구니 상품 수량은 1개 이상이어야 합니다." }
```

### 404 Not Found

```json
{ "error": "CART_ITEM_NOT_FOUND", "message": "장바구니 상품을 찾을 수 없습니다." }
```

### 409 Conflict

```json
{ "error": "OUT_OF_STOCK", "message": "요청한 수량이 현재 재고보다 많습니다." }
```

---

# DELETE /cart/:id

id를 이용해 장바구니의 상품을 제거한다.

```http
DELETE /cart/:id
```

## Request

### Path Variable

| 이름 | 타입   | 필수 | 설명                    |
| ---- | ------ | ---: | ----------------------- |
| id   | number |    O | 삭제할 장바구니 상품 id |

## Response

### 204 No Content

### 400 Bad Request

```json
{ "error": "INVALID_CART_ITEM_ID", "message": "장바구니 상품 ID는 숫자여야 합니다." }
```

### 404 Not Found

```json
{ "error": "CART_ITEM_NOT_FOUND", "message": "장바구니 상품을 찾을 수 없습니다." }
```
