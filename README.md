# 1. 프로젝트 구조 생성
1. 프로젝트 폴더 'node-auction' 생성
2. 폴더 내에, package.json 파일 생성 후 내용 기입
3. 콘솔 : npm i
4. 콘솔
    - npm i sequelize sequelize-cli mysql2
    - npx sequelize init
5. config/config.json 내용 수정 (DB 연결 수정)
~~~
  "development": {
    "username": "root",
    "password": "Tpdlfdl3278!",
    "database": "nodeauction",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
  ~~~
  6. 콘솔 : 데이터베이스 생성 (config.json 기반으로 자동생성)
    - npx sequelize db:create
  
  7. 로그인, 회원가입 기능 추가 (passport 모듈 사용)
  8. 상품등록 기능 추가
  9. 입찰방에서 실시간 입찰경쟁 기능 추가 ( sse, socket.io 모듈 사용)
  10. 입찰 시작한지 1시간 후, 입찰처리 되도록 스케줄링 (node-schedule 모듈 사용)
  11. 입찰 처리가 비정상적으로 처리된 경우, node 서버가 재 시작 할때 일괄적으로 처리
# 2. 데이터베이스 관계 및 구조
1. User ( 사용자 )
  - user:auction = 1:n (UserId)
  - user:good = 1:n (OwnerId, SoldId)
2. Auction ( 입찰 이벤트 )
  - good:auction = 1:n (GoodId)
3. Good ( 경매 상품 )