# Route

- POST /checkouts
- GET /checkouts/:checkoutId
- DELETE /checkouts/:checkoutId
- PATCH /checkouts/:checkoutId/address
- PATCH /checkouts/:checkoutId/coupons
- GET /checkouts/:checkoutId/coupons/discount-preview
- POST /checkouts/:checkoutId/payment

# App

## app.ts

### middlewares

- validateCheckoutId

### routes

```txt
POST /checkouts -> createCheckout
GET /checkouts/:checkoutId -> validateCheckoutId -> getCheckout
DELETE /checkouts/:checkoutId -> validateCheckoutId -> deleteCheckout
PATCH /checkouts/:checkoutId/address -> validateCheckoutId -> updateCheckoutAddress
PATCH /checkouts/:checkoutId/coupons -> validateCheckoutId -> updateCheckoutCoupons
GET /checkouts/:checkoutId/coupons/discount-preview -> validateCheckoutId -> getCouponDiscountPreview
POST /checkouts/:checkoutId/payment -> validateCheckoutId -> payCheckout
```

### startup

- startCheckoutCleanupScheduler()
  - 서버 시작 시 1회 실행
  - 오래된 CHECKOUT_DB rows를 주기적으로 정리

# Controllers

> [v1](./architecture.md) 포함.

## checkout.controller

> Checkout HTTP 요청/응답을 담당한다.
> request body와 query string은 schema로 parse하고, 비즈니스 로직은 service로 넘긴다.

### functions

- createCheckout(request, response)
  - createCheckoutRequestSchema.parse(request.body)
  - checkoutService.createCheckout(dto)
  - status 201
  - `{ checkout_id }` 반환
- getCheckout(request, response)
  - Number(request.params.checkoutId)
  - checkoutService.getCheckout(checkoutId)
  - status 200
- deleteCheckout(request, response)
  - Number(request.params.checkoutId)
  - checkoutService.deleteCheckout(checkoutId)
  - status 204
- updateCheckoutAddress(request, response)
  - updateCheckoutAddressRequestSchema.parse(request.body)
  - checkoutService.updateCheckoutAddress(checkoutId, dto)
  - status 204
- updateCheckoutCoupons(request, response)
  - updateCheckoutCouponsRequestSchema.parse(request.body)
  - checkoutService.updateCheckoutCoupons(checkoutId, dto)
  - status 204
- getCouponDiscountPreview(request, response)
  - couponDiscountPreviewQuerySchema.parse(request.query)
  - checkoutService.getCouponDiscountPreview(checkoutId, query)
  - status 200
- payCheckout(request, response)
  - payCheckoutRequestSchema.parse(request.body)
  - checkoutService.payCheckout(checkoutId, dto)
  - status 200

# Services

## checkout.service

> Checkout 비즈니스 로직과 응답 view model 생성을 담당한다.
> DB에는 결제 전 임시 주문의 상품 id와 수량만 저장하고, 상품 정보와 금액은 조회/결제 시 PRODUCT_DB 기준으로 계산한다.

### constants

- MAX_COUPON_COUNT = 2
- FREE_SHIPPING_THRESHOLD = 100000
- SHIPPING_FEE = 3000
- REMOTE_AREA_FEE = 3000

### functions

- createCheckout(dto)
  - dto.items 수량이 1 이상 99 이하가 아니면 `INVALID_QUANTITY`
  - dto.items의 product_id로 CART_DB에 존재하는 장바구니 상품인지 확인
    - 장바구니 상품이 아니면 `CART_ITEM_NOT_FOUND`
  - PRODUCT_DB에서 상품 조회
    - 상품이 없으면 `PRODUCT_NOT_FOUND`
    - 요청 수량이 현재 재고보다 크면 `OUT_OF_STOCK`
  - CHECKOUT_DB 생성
    - remote_area = false
    - created_at = now
  - CHECKOUT_ITEM_DB에 임시 주문 상품 저장
    - product_id
    - quantity
  - COUPON_DB에서 사용 가능한 쿠폰 목록 조회
  - **최대혜택 쿠폰 조합 계산**
    - MAX_COUPON_COUNT 이하 조합 중 coupon_discount가 가장 큰 조합 선택
    - 조건을 만족하는 쿠폰이 없으면 선택 쿠폰 없음
  - 선택된 coupon_id 목록을 CHECKOUT_COUPON_DB에 저장
  - `{ checkout_id }` 반환

- getCheckout(checkoutId)
  - CHECKOUT_DB가 없으면 `CHECKOUT_NOT_FOUND`
  - CHECKOUT_ITEM_DB 목록 조회
  - PRODUCT_DB를 참조해 상품명/가격/이미지를 조회
    - 상품이 없으면 `PRODUCT_NOT_FOUND`
  - COUPON_DB에서 사용 가능한 쿠폰 목록 조회
  - CHECKOUT_COUPON_DB로 현재 선택된 쿠폰 표시
    - checkout 생성 직후에는 서버가 계산한 최대혜택 쿠폰 조합
    - 사용자가 PATCH /checkouts/:checkoutId/coupons로 변경하면 수동 선택 조합
  - checkout_amount 계산
    - PRODUCT_DB의 현재 price 기준
    - sum(product.price \* item.quantity)
  - coupon_discount 계산
    - 선택된 쿠폰 기준
  - shipping_fee 계산
    - checkout_amount가 FREE_SHIPPING_THRESHOLD 이상이면 0
    - 아니면 SHIPPING_FEE + remote_area 여부에 따른 REMOTE_AREA_FEE
  - total_amount 계산
    - checkout_amount - coupon_discount + shipping_fee
  - CheckoutDetailResponse 반환

- deleteCheckout(checkoutId)
  - CHECKOUT_DB가 없으면 `CHECKOUT_NOT_FOUND`
  - CHECKOUT_COUPON_DB 삭제
  - CHECKOUT_ITEM_DB 삭제
  - CHECKOUT_DB 삭제

- updateCheckoutAddress(checkoutId, dto)
  - CHECKOUT_DB가 없으면 `CHECKOUT_NOT_FOUND`
  - CHECKOUT_DB.remote_area 수정

- updateCheckoutCoupons(checkoutId, dto)
  - CHECKOUT_DB가 없으면 `CHECKOUT_NOT_FOUND`
  - dto.coupons가 null 또는 빈 배열이면 CHECKOUT_COUPON_DB rows 전체 삭제
  - 쿠폰 개수가 MAX_COUPON_COUNT보다 크면 `INVALID_COUPON_CONDITION`
  - API로 받은 coupon_id 목록을 COUPON_DB에서 조회
  - 존재하지 않는 쿠폰이면 `COUPON_NOT_FOUND`
  - 쿠폰 조건을 만족하지 못하면 `INVALID_COUPON_CONDITION`
  - 기존 CHECKOUT_COUPON_DB rows 삭제
  - 선택한 coupon_id 목록을 CHECKOUT_COUPON_DB에 저장

- getCouponDiscountPreview(checkoutId, query)
  - CHECKOUT_DB가 없으면 `CHECKOUT_NOT_FOUND`
  - couponIds가 없으면 coupon_discount = 0
  - couponIds가 있으면 COUPON_DB 조회
  - 존재하지 않는 쿠폰이면 `COUPON_NOT_FOUND`
  - 쿠폰 조건을 만족하지 못하면 `INVALID_COUPON_CONDITION`
  - 예상 coupon_discount 반환

- payCheckout(checkoutId, dto)
  - CHECKOUT_DB가 없으면 `CHECKOUT_NOT_FOUND`
  - remote_area를 dto.remote_area로 최종 반영
  - dto.coupons의 coupon_id 기준으로 최종 쿠폰 조건 재검증
  - PRODUCT_DB에서 현재 상품 조회
  - 상품이 없으면 `PRODUCT_NOT_FOUND`
  - CHECKOUT_ITEM_DB.quantity가 현재 재고보다 크면 `OUT_OF_STOCK`
  - PRODUCT_DB.stock 차감
  - CART_DB에서 결제된 상품 제거
  - CHECKOUT_COUPON_DB 삭제
  - CHECKOUT_ITEM_DB 삭제
  - CHECKOUT_DB 삭제
  - PaymentResultResponse 반환

## coupon.service

> 쿠폰 조건 검증과 할인 금액 계산을 담당한다.

### functions

- validateCouponCondition(coupon, checkoutAmount, now)
  - expired_date가 지났으면 `false`
  - min_order_amount보다 checkoutAmount가 작으면 `false`
  - usable_start_at/usable_end_at 범위 밖이면 `false`
  - 나머지는 `true`
- calculateCouponDiscount(coupons, checkoutAmount, shippingFee)
  - FIXED: amount만큼 할인
  - RATE: 선적용 할인 이후 남은 상품 금액 기준으로 rate 할인
  - FREESHIPPING: shippingFee만큼 할인
  - BTGO: 정책에 맞는 증정/할인 금액 계산
  - 총 할인 금액은 checkoutAmount + shippingFee를 넘지 않음
- findBestCouponCombination(coupons, checkoutAmount, shippingFee)
  - 조건을 만족하는 쿠폰만 대상으로 계산
  - MAX_COUPON_COUNT 이하 모든 조합의 coupon_discount 계산
  - coupon_discount가 가장 큰 조합 반환
  - 할인 가능한 조합이 없으면 빈 배열 반환

# Repositories

## checkout.repository

> CHECKOUT_DB 접근을 담당한다.

### functions

- create({ remoteArea })
- findById(id)
- updateRemoteArea(id, remoteArea)
- deleteById(id)
- deleteOlderThan(expiredAt)

## checkoutItem.repository

> CHECKOUT_ITEM_DB 접근을 담당한다.

### functions

- bulkCreate(checkoutId, items)
- findAllByCheckoutId(checkoutId)
- deleteByCheckoutId(checkoutId)

## checkoutCoupon.repository

> CHECKOUT_COUPON_DB 접근을 담당한다.

### functions

- replaceByCheckoutId(checkoutId, couponIds)
  - 기존 rows 삭제 후 bulk insert
  - unique(checkout_id, coupon_id)로 중복 방지
- findAllByCheckoutId(checkoutId)
- deleteByCheckoutId(checkoutId)

## coupon.repository

> COUPON_DB 조회를 담당한다.

### functions

- findAllByIds(ids)

# Schemas

## checkout.schema

> Checkout request/query/response schema를 담당한다.

### createCheckoutRequestSchema

- items
  - array
  - min(1): INVALID_REQUEST_BODY
- items[].product_id
  - number: INVALID_REQUEST_BODY
  - int: INVALID_REQUEST_BODY
  - positive: INVALID_REQUEST_BODY
- items[].quantity
  - number: INVALID_QUANTITY
  - int: INVALID_QUANTITY
  - min(1): INVALID_QUANTITY
  - max(99): INVALID_QUANTITY

### updateCheckoutAddressRequestSchema

- remote_area
  - boolean: INVALID_REQUEST_BODY

### updateCheckoutCouponsRequestSchema

- coupons
  - number[] | null
  - null이면 전체 해제
  - 배열이면 각 값은 positive int

### couponDiscountPreviewQuerySchema

- couponIds
  - number[] | undefined
  - 단일 query 값도 number[]로 정규화

### payCheckoutRequestSchema

- remote_area
  - boolean: INVALID_REQUEST_BODY
- coupons
  - number[] | null
  - null이면 전체 해제

# Interfaces

## checkout.interface

### DTO

- CreateCheckoutDto = z.infer<typeof createCheckoutRequestSchema>
- UpdateCheckoutAddressDto = z.infer<typeof updateCheckoutAddressRequestSchema>
- UpdateCheckoutCouponsDto = z.infer<typeof updateCheckoutCouponsRequestSchema>
- CouponDiscountPreviewQuery = z.infer<typeof couponDiscountPreviewQuerySchema>
- PayCheckoutDto = z.infer<typeof payCheckoutRequestSchema>

### Checkout

- id
- remoteArea
- createdAt

### CheckoutItem

- id
- checkoutId
- productId
- quantity

### CheckoutItemResponse

- productId
- name
- price
- imageUrl
- quantity

### CheckoutCoupon

- id
- checkoutId
- couponId

### CouponResponse

- couponId
- name
- expiredDate
- minOrderAmount
- usableStartAt
- usableEndAt
- isSelected
- disabled

### CheckoutDetailResponse

- checkoutId
- items
- coupons
- remoteArea
- checkoutAmount
- couponDiscount
- shippingFee
- totalAmount

### PaymentResultResponse

- itemCount
- totalQuantity
- totalAmount

# Middlewares

## validateId

### validateCheckoutId

- Number(request.params.checkoutId)로 checkoutId 변환
- checkoutId가 NaN이면 400
- checkoutId가 정수가 아니면 400
- checkoutId가 1보다 작으면 400
- 실패 시 ERROR_RESPONSE.INVALID_CHECKOUT_ID 반환
- 아니면 next()

# Schedulers

## checkout.scheduler

> 결제 전 임시 주문 cleanup 배치를 담당한다.
> Express 기능이 아니라, Express 서버와 같은 Node.js 프로세스에서 실행하는 scheduler 코드다.

### constants

- CHECKOUT_TTL_HOURS = 정책값
- CHECKOUT_CLEANUP_INTERVAL_MS = 정책값

### functions

- startCheckoutCleanupScheduler()
  - 서버 시작 시 1회 호출
  - setInterval 또는 node-cron으로 주기 실행
  - checkoutService.deleteExpiredCheckouts() 호출
  - Express request/response 흐름과 분리
- stopCheckoutCleanupScheduler()
  - 서버 종료 시 interval 정리

## checkout.service

### cleanup functions

- deleteExpiredCheckouts()
  - expiredAt = now - CHECKOUT_TTL_HOURS 계산
  - CHECKOUT_DB.created_at이 expiredAt보다 오래된 checkout 조회
  - CHECKOUT_COUPON_DB 삭제
  - CHECKOUT_ITEM_DB 삭제
  - CHECKOUT_DB 삭제

# Errors

## ERROR_RESPONSE

### checkout

- INVALID_CHECKOUT_ID
- CHECKOUT_NOT_FOUND
- INVALID_QUANTITY
- INVALID_COUPON_CONDITION
- COUPON_NOT_FOUND

### checkout에서 재사용

- INVALID_REQUEST_BODY
- PRODUCT_NOT_FOUND
- CART_ITEM_NOT_FOUND
- OUT_OF_STOCK
