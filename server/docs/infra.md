# 목표

- 실제 DB를 사용한다.
- Redis는 사용하지 않는다.
- Oracle Cloud 작은 VM에서 견딜 수 있게 가볍게 구성한다.
- OCIR에 Docker image를 올리고, VM에서 Docker container로 실행한다.

# Infra

## 배포 구성

```txt
Caddy
Express Docker
PostgreSQL Docker
```

### Caddy

- reverse proxy 역할
- HTTPS 처리
- Express container로 요청 전달

### Express Docker

- Node.js + Express server
- ORM으로 Sequelize 사용
- DB connection pool을 작게 유지

### PostgreSQL Docker

- RDBMS
- 주문/결제/쿠폰 도메인의 관계, 트랜잭션, 제약조건을 담당
- Redis 없이 PostgreSQL만으로 상태를 관리

# ORM

## 선택

- Sequelize

## 이유

- 가벼움 우선
- Prisma보다 Docker 빌드/런타임 구성이 단순하다.
- Prisma처럼 배포 전에 Client generate 단계를 따로 관리하지 않아도 된다.
  - Docker build에서 schema 파일 복사 순서, generate 실행 시점, 생성 산출물 포함 여부를 신경 쓸 일이 줄어든다.
- 별도 engine/runtime 의존성이 적다.
- 작은 Express 서버에 붙이기 쉽다.

## 비교

### Prisma

> DX와 타입 안정성은 가장 좋지만, 가벼움 최우선 기준에서는 제외.

- 장점
  - TypeScript DX 좋음
  - schema 기반 모델링이 명확함
  - migration 흐름이 좋음
- 단점
  - Prisma Client generate 필요
    - Docker build에서 generate 타이밍과 산출물 포함 여부를 관리해야 한다.
  - Docker 빌드 과정이 상대적으로 무거워짐
  - 작은 VM에서는 Sequelize보다 구성이 단순하지 않음

### Sequelize

> 이번 서버 구현의 1순위 후보.

- 장점
  - JS/TS 런타임 ORM
  - Docker 구성 단순
  - 작은 서버에 가볍게 붙이기 좋음
  - migration CLI 사용 가능
- 단점
  - Prisma보다 타입 안정성과 DX는 약함
  - 모델 타입 선언을 더 직접 관리해야 함

### TypeORM

> 이번 프로젝트에는 비추천.

- 데코레이터, reflect-metadata, TS 설정 등 복잡도가 높다.
- 마이그레이션/엔티티 패턴이 현재 규모에 비해 무겁다.
- 작은 VM에서 얻는 이점보다 복잡도가 더 크다.

# DB

## 선택

- PostgreSQL

## 이유

- 주문/결제/쿠폰 도메인은 관계와 트랜잭션이 중요하다.
- 제약조건, 인덱스, JSON, 관계 스키마 확장에 여유가 있다.
- MySQL도 가능하지만 새로 고른다면 PostgreSQL이 더 무난하다.
- Docker에서 PostgreSQL과 MySQL의 차이보다 connection 수와 메모리 설정이 더 중요하다.

# Resource

## 작은 VM 기준

> Caddy + Express + PostgreSQL을 같은 VM에서 띄울 예정이므로 보수적으로 잡는다.

### PostgreSQL

```txt
max_connections = 10~20
shared_buffers = 128MB
work_mem = 2MB~4MB
maintenance_work_mem = 32MB~64MB
```

### Sequelize pool

```ts
pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
}
```

## 원칙

- DB connection을 많이 열지 않는다.
- Express container는 stateless하게 둔다.
- Redis는 필요해질 때까지 도입하지 않는다.
- 트래픽이 낮은 동안은 단일 VM + 단일 DB container로 시작한다.

# 최종 판단

- 가벼움 최우선이면 Sequelize + PostgreSQL.
- 타입 안정성과 DX를 더 중요하게 보면 Prisma + PostgreSQL.
- 현재 목표는 Oracle Cloud 작은 VM에서 Docker로 가볍게 운영해보는 것이므로 Sequelize + PostgreSQL로 간다.
