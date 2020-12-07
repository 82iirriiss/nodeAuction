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
# 2. 데이터베이스 관계 및 구조