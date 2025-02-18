# Online Bookstore

이 프로젝트는 Express + TypeScript + Sequelize + PostgreSQL + react.js 를 사용하는 온라인 서점 사이트 입니다.

## 📌 1. 프로젝트 클론

```sh
git clone https://github.com/choimings/online_bookstore.git
cd online_bookstore
```

## 📌 2. 데이터베이스 설정 ( PostgreSQL 사용 )

- .env 파일을 생성하여 연결
- 데이터베이스 마이그레이션 실행

```sh
npx sequelize db:migrate
```

### 2-1. 서버 실행

```sh
cd back
npm run dev
```

## 📌 3. 프론트엔드 설정

### 3-1. 패키치 설치

```sh
cd front/my-app
npm install
```

### 3-2. 프론트엔드 서버 실행

```sh
npm start
```

# 프로젝트 설명

![메인 화면](https://github.com/user-attachments/assets/0056f14c-e6f9-4b2d-9bb6-93a0de7c4716)

## 👉 메인 화면

- 제목 또는 저자로 책을 검색할 수 있습니다.
- 한 페이지 당 10권의 책을 조회할 수 있습니다.

![상세 화면](https://github.com/user-attachments/assets/72014c29-5023-4618-ab2a-2cee46f7b335)

## 👉 상세 화면

- 메인 화면에서 이미지를 클릭한 책의 상세 정보를 조회할 수 있습니다.

![수정 화면](https://github.com/user-attachments/assets/324c8601-aa68-4f98-a3eb-0f1e52bf7319)

## 👉 수정 화면

- 상세 화면에서 '책 정보 수정하기' 버튼을 누르고 수정 화면에서 책 제목, 저자, 가격, 소개, 수량, ISBN, 발행일자를 수정할 수 있습니다.
- 등록한 책을 삭제할 수 있습니다. ( DELETE )

![등록 화면](https://github.com/user-attachments/assets/0952b0e5-bd1a-44e0-88c2-a89dff244c5f)

## 👉 등록 화면

- 홈 페이지에서 '책 추가하기' 버튼을 눌러 책을 등록할 수 있습니다.
