# API 명세

| 구분               | Method | Path          | 성공 상태 |
| ------------------ | ------ | ------------- | --------- |
| 상품 목록 조회     | GET    | /products     | 200       |
| 상품 추가          | POST   | /products     | 201       |
| 상품 제거          | DELETE | /products/:id | 204       |
| 장바구니 목록 조회 | GET    | /cart         | 200       |
| 장바구니 수량 변경 | PATCH  | /cart/:id     | 204       |
| 장바구니 상품 제거 | DELETE | /cart/:id     | 204       |

## 설계 결정

### 에러 처리 일원화

에러 처리는 `errorHandler` 미들웨어에서 일괄 처리합니다.

- **ZodError** — 요청 데이터 검증 실패 시 400 응답
- **AppError** — 비즈니스 로직 에러 (404, 409 등) 시 해당 status 응답
- **기타 Error** — 예상치 못한 서버 에러 시 500 응답

service 계층에서 문자열 키를 반환해 controller에서 매핑하는 방식 대신, `AppError`를 throw해 errorHandler에서 일괄 처리하도록 설계했습니다. 에러 처리 로직이 한 곳에 모여 controller 코드가 단순해집니다.

### 빈 목록 조회 시 200 반환

상품 목록(`GET /products`)과 장바구니 목록(`GET /cart`)은 데이터가 없어도 빈 배열(`[]`)과 함께 200을 반환합니다. 빈 배열은 "데이터 없음"이 아니라 "정상 조회 결과가 빈 것"이므로 204 대신 200이 적합합니다.

### Path Parameter 숫자 검증

`DELETE /products/:id`, `PATCH /cart/:id`, `DELETE /cart/:id`에서 id가 숫자가 아닌 경우 400을 반환합니다. 존재하지 않는 리소스(404)와 잘못된 요청 형식(400)을 명확히 구분하기 위함입니다.

---

## 공통

### 에러 응답 형식

```json
{
  "code": "ERROR_CODE",
  "message": "에러 메시지"
}
```

### 공통 에러 핸들러

#### 404 Not Found

등록되지 않은 경로로 요청한 경우

**Response**

```http
HTTP/1.1 404 Not Found
Content-Type: application/json
```

```json
{
  "code": "NOT_FOUND",
  "message": "요청한 리소스를 찾을 수 없습니다."
}
```

#### 500 Internal Server Error

서버 프로세스는 살아 있는데 내부에서 예외가 난 경우

**Response**

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
```

```json
{
  "code": "INTERNAL_SERVER_ERROR",
  "message": "서버 내부 오류가 발생했습니다."
}
```

---

## 상품

## 전체 상품 목록 조회

전체 상품목록을 조회할 수 있다.

```http
GET /products
```

### Response

#### 200 OK

데이터 조회 성공. 상품이 없으면 빈 배열을 반환한다.

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
[
  {
    "id": 1,
    "name": "콜라",
    "stock": 10,
    "imageUrl": "https://example.com/images/cola.png",
    "price": 1500
  },
  {
    "id": 2,
    "name": "사이다",
    "stock": 5,
    "imageUrl": "https://example.com/images/cider.png",
    "price": 1400
  }
]
```

---

## 상품 추가

상품을 추가할 수 있다.

```http
POST /products
Content-Type: application/json
```

### Request

```json
{
  "name": "콜라",
  "stock": 10,
  "imageUrl": "https://example.com/images/cola.png",
  "price": 1500
}
```

### Request Body

| 필드     | 타입   | 필수 | 조건                |
| -------- | ------ | ---: | ------------------- |
| name     | string |    O | 1자 이상 100자 이하 |
| stock    | number |    O | 1 이상 99 이하 정수 |
| imageUrl | string |    O | 상품 이미지 URL     |
| price    | number |    O | 0보다 큰 숫자       |

### Response

#### 201 Created

상품 추가 성공

```http
HTTP/1.1 201 Created
```

```text
응답 body 없음
```

#### 400 Bad Request

요청 데이터 검증 오류

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```

이름이 없는 경우

```json
{
  "code": "REQUIRED_PRODUCT_NAME",
  "message": "상품 이름은 필수입니다."
}
```

이름이 100자를 초과한 경우

```json
{
  "code": "INVALID_PRODUCT_NAME",
  "message": "상품 이름은 1자 이상 100자 이하이어야 합니다."
}
```

가격이 없는 경우

```json
{
  "code": "REQUIRED_PRODUCT_PRICE",
  "message": "상품 가격은 필수입니다."
}
```

가격이 0 이하인 경우

```json
{
  "code": "INVALID_PRODUCT_PRICE",
  "message": "가격은 0보다 큰 숫자여야 합니다."
}
```

재고가 없는 경우

```json
{
  "code": "REQUIRED_PRODUCT_STOCK",
  "message": "상품 재고는 필수입니다."
}
```

재고가 범위를 벗어난 경우

```json
{
  "code": "INVALID_PRODUCT_STOCK",
  "message": "재고는 1 이상 99 이하의 정수여야 합니다."
}
```

이미지가 없는 경우

```json
{
  "code": "REQUIRED_PRODUCT_IMAGE",
  "message": "상품 이미지는 필수입니다."
}
```

---

## 상품 삭제

id를 이용해 상품을 제거한다.
상품 제거 후, 장바구니에 있는 해당 상품도 함께 제거된다.

```http
DELETE /products/:id
```

### Request

#### Path Variable

| 이름 | 타입   | 필수 | 설명           |
| ---- | ------ | ---: | -------------- |
| id   | number |    O | 삭제할 상품 id |

### Response

#### 204 No Content

상품 및 장바구니에서 삭제 완료. 반환할 데이터 없음.

```http
HTTP/1.1 204 No Content
```

```text
응답 body 없음
```

#### 400 Bad Request

id가 숫자가 아닌 경우

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```

```json
{
  "code": "INVALID_PRODUCT_ID",
  "message": "상품 ID는 숫자여야 합니다."
}
```

#### 404 Not Found

해당 id의 상품이 없는 경우

```http
HTTP/1.1 404 Not Found
Content-Type: application/json
```

```json
{
  "code": "PRODUCT_NOT_FOUND",
  "message": "요청한 상품을 찾을 수 없습니다."
}
```

---

## 장바구니

## 장바구니 상품 목록 조회

장바구니에 담긴 상품 목록을 조회할 수 있다.

```http
GET /cart
```

### Response

#### 200 OK

데이터 조회 성공. 장바구니가 비어있으면 빈 배열을 반환한다.

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
[
  {
    "id": 1,
    "productId": 10,
    "quantity": 2
  },
  {
    "id": 2,
    "productId": 11,
    "quantity": 1
  }
]
```

---

## 장바구니 상품 수량 변경

id와 수량을 이용해 장바구니 상품의 수량을 변경한다.
수량은 1개 이상 현재 재고 이하여야 한다.

```http
PATCH /cart/:id
Content-Type: application/json
```

### Request

#### Path Variable

| 이름 | 타입   | 필수 | 설명             |
| ---- | ------ | ---: | ---------------- |
| id   | number |    O | 장바구니 상품 id |

#### Request Body

```json
{
  "quantity": 2
}
```

| 필드     | 타입   | 필수 | 조건                         |
| -------- | ------ | ---: | ---------------------------- |
| quantity | number |    O | 1 이상 현재 재고 이하의 정수 |

### Response

#### 204 No Content

장바구니 상품 수량 수정 성공

```http
HTTP/1.1 204 No Content
```

```text
응답 body 없음
```

#### 400 Bad Request

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```

id가 숫자가 아닌 경우

```json
{
  "code": "INVALID_CART_ITEM_ID",
  "message": "장바구니 상품 ID는 숫자여야 합니다."
}
```

quantity가 없거나 숫자가 아닌 경우

```json
{
  "code": "REQUIRED_CART_ITEM_QUANTITY",
  "message": "장바구니 상품 수량은 필수입니다."
}
```

quantity가 1보다 작은 경우

```json
{
  "code": "INVALID_CART_ITEM_QUANTITY",
  "message": "장바구니 상품 수량은 1개 이상이어야 합니다."
}
```

#### 404 Not Found

```http
HTTP/1.1 404 Not Found
Content-Type: application/json
```

해당 id의 장바구니 항목이 없는 경우

```json
{
  "code": "CART_ITEM_NOT_FOUND",
  "message": "장바구니 상품을 찾을 수 없습니다."
}
```

장바구니 항목의 상품이 삭제된 경우

```json
{
  "code": "PRODUCT_NOT_FOUND",
  "message": "요청한 상품을 찾을 수 없습니다."
}
```

#### 409 Conflict

quantity가 현재 재고보다 많은 경우

```http
HTTP/1.1 409 Conflict
Content-Type: application/json
```

```json
{
  "code": "OUT_OF_STOCK",
  "message": "요청한 수량이 현재 재고보다 많습니다."
}
```

---

## 장바구니 상품 삭제

id를 이용해 장바구니의 상품을 제거한다.

```http
DELETE /cart/:id
```

### Request

#### Path Variable

| 이름 | 타입   | 필수 | 설명                    |
| ---- | ------ | ---: | ----------------------- |
| id   | number |    O | 삭제할 장바구니 상품 id |

### Response

#### 204 No Content

상품 제거 성공

```http
HTTP/1.1 204 No Content
```

```text
응답 body 없음
```

#### 400 Bad Request

id가 숫자가 아닌 경우

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```

```json
{
  "code": "INVALID_CART_ITEM_ID",
  "message": "장바구니 상품 ID는 숫자여야 합니다."
}
```

#### 404 Not Found

해당 id의 장바구니 항목이 없는 경우

```http
HTTP/1.1 404 Not Found
Content-Type: application/json
```

```json
{
  "code": "CART_ITEM_NOT_FOUND",
  "message": "장바구니 상품을 찾을 수 없습니다."
}
```
