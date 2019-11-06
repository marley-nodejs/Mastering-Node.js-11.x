# [Packt, Dimitris Loukas] Mastering Node.js 11.x. [February 28, 2019, ENG]

### 1 - The Node.js Concurrency Model

- 01 - The Course Overview
- 02 - The Event Loop
- 03 - Mastering Promises (Example1.2)
- 04 - Using Util.promisify (Example1.3)
- 05 - Learning async/await (Example1.4)

### 2 - Functional Reactive Programming

- 06 - Introduction to Functional Programming
- 07 - Replacing for Loops with forEach (Example2.2)
- 08 - Filtering Arrays (Example2.3)
- 09 - Map and Reduce (Example2.4)
- 10 - Introduction to Streams with RxJS
- 11 - Working with Observables (Example2.6)

### 3 - Mastering Express.js

- 12 - Creating a Controller with Express.Router
- 13 - Creating a Service
- 14 - Essential Middleware
- 15 - Model Validation

```
$ curl \
-d '{
    "name": "Plan",
    "price": "40",
    "type": "monthly",
    "userId": 1
    }' \
-H "Content-Type: application/json" \
-X POST localhost:3000/api/plans \
| python -m json.tool
```

- 16 - Handling and Reporting Errors

### 4 - Connecting to MySQL

- 17 - Install and run MySQL

```
$ docker run --name subscription-as-a-service \
  -e MYSQL_ROOT_PASSWORD=123456789 \
  -p 6606:3306 \
  -d mysql:5.7
```

```
$ docker ps
$ docker exec -it <docker_container_id> bash

# mysql -uroot -p
Enter password: [123456789]

// Delete ALL users who are not root:
mysql> DELETE FROM mysql.user WHERE NOT (host="localhost" AND user="root");

// Remove anonymous access to the database(s):
mysql> DELETE FROM mysql.user WHERE User = '';

mysql> CREATE USER 'user1'@'%' IDENTIFIED BY '123456789';

mysql> GRANT USAGE ON *.* TO 'user1'@'%' IDENTIFIED BY '123456789' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

mysql> GRANT USAGE ON *.* TO 'user1'@'%' WITH GRANT OPTION;

mysql> GRANT ALL PRIVILEGES ON *.* TO 'user1'@'%';

mysql> FLUSH PRIVILEGES;

```

```
mysql> CREATE SCHEMA SubscriptionAsAService CHARACTER SET utf8mb4;

mysql> exit;
```

- 18 - Installing Sequelize

```
$ npm install -g sequelize-cli

$ npm install --save mysql2
$ npm install --save sequelize

```

```
$ sequelize init
```

- 19 - Creating Sequelize Models

```
$ sequelize model:generate --name Plan --attributes name:string,price:float,type:string,userId:integer --force
```

```
$ sequelize model:generate --name Subscription --attributes planId:integer,coupon:string,cardNumber:string,holderName:string,expirationDate:string,cvv:string --force
```

Sequalize will replace original code. Need to add code from previous project to files models\plan.js and models\subscription.js

- 20 - Utilizing Migrations

```
$ sequelize db:migrate

// to undo
// $ sequelize db:migrate:undo:all
```

- 21 - Finishing the Service

```
$ curl \
-d '{
    "name": "Standarad Plan",
    "price": "49",
    "type": "monthly",
    "userId": 1
    }' \
-H "Content-Type: application/json" \
-X POST localhost:3000/api/plans \
| python -m json.tool
```

```
$ curl \
-H "Content-Type: application/json" \
-X GET localhost:3000/api/plans/1 \
| python -m json.tool
```

```
$ sequelize db:migrate:undo:all
$ sequelize db:migrate
```

```
$ curl \
-d '{
    "planId": 1,
    "cardNumber": "123456712345678",
    "holderName": "John Doe",
    "coupon": "4444",
    "expirationDate": "12/22/2020",
    "cvv": "123",
    "userId": 1
    }' \
-H "Content-Type: application/json" \
-X POST localhost:3000/api/subscriptions \
| python -m json.tool
```

```
$ curl \
-H "Content-Type: application/json" \
-X GET localhost:3000/api/subscriptions/1 \
| python -m json.tool
```

<br/>

### 5 - Node.js Microservices with PM2

- 22 - The Database per Service Pattern

```
$ docker run --name plans-db \
  -e MYSQL_ROOT_PASSWORD=123456789 \
  -p 3307:3306 \
  -d mysql:5.7
```

```
$ docker ps
$ docker exec -it <docker_container_id> bash

# mysql -uroot -p
Enter password: [123456789]

mysql> CREATE SCHEMA PlansDb CHARACTER SET 'utf8mb4';
mysql> exit
```

```
$ docker run --name subscriptions-db \
  -e MYSQL_ROOT_PASSWORD=123456789 \
  -p 3308:3306 \
  -d mysql:5.7
```

```
$ docker ps
$ docker exec -it <docker_container_id> bash

# mysql -uroot -p
Enter password: [123456789]

mysql> CREATE SCHEMA SubscriptionsDb CHARACTER SET 'utf8mb4';
mysql> exit
```

<br/>

- 23 - Managing Processes with PM2

      $ npm install --save express body-parser chalk cors helmet joi morgan mysql2 sequelize sequelize-cli

      $ sequelize init

      $ npm install -g pm2

<br/>

    $ cd ./plans-service
    $ sequelize db:migrate

<br/>

    $ cd ./subscriptions-service
    $ sequelize db:migrate

<br/>

    $ pm2 start ./ecosystem.config.js

    $ pm2 list
    $ pm2 logs
    $ pm2 flush

```
$ curl \
-d '{
    "name": "Standarad Plan",
    "price": "49",
    "type": "monthly",
    "userId": 1
    }' \
-H "Content-Type: application/json" \
-X POST localhost:3001 \
| python -m json.tool
```

```
$ curl \
-H "Content-Type: application/json" \
-X GET localhost:3001/ \
| python -m json.tool
```

```
$ curl \
-d '{
    "planId": 1,
    "cardNumber": "123456712345678",
    "holderName": "John Doe",
    "coupon": "4444",
    "expirationDate": "12/22/2020",
    "cvv": "123",
    "userId": 1
    }' \
-H "Content-Type: application/json" \
-X POST localhost:3002/ \
| python -m json.tool
```

```
$ curl \
-H "Content-Type: application/json" \
-X GET localhost:3002/ \
| python -m json.tool
```

    $ pm2 kill

<br/>

- 24 - Communicating using REST

```
$ cd Section_5/app/subscriptions-service/
$ npm install --save axios
```

- 25 - Communicating using AMQP

create accoun on --> cloudamqp.com

      $ cd ../payments-service/
      $ npm install --save amqplib

      $ cd subscriptions-service/
      $ npm install --save amqplib

<br/>

![Application](/img/pic-05-01.png?raw=true)

<br/>

![Application](/img/pic-05-01.png?raw=true)

<br/>

```
$ curl \
-d '{
    "planId": 1,
    "cardNumber": "125456712345678",
    "holderName": "John Doe",
    "coupon": "4444",
    "expirationDate": "12/22/2020",
    "cvv": "123",
    "userId": 1
    }' \
-H "Content-Type: application/json" \
-X POST localhost:3002/ \
| python -m json.tool
```

Possible something not work properly.

Some errors in log file for payments-service.

<br/>

- 26 - CQRS and Event Sourcing
- 27 - Designing an API Gateway

<br/>

![Application](/img/pic-05-03.png?raw=true)

https://www.express-gateway.io/

    $ npm install -g express-gateway

    $ eg gateway create

    ? What's the name of your Express Gateway? [main-gateway]
    ? Where would you like to install your Express Gateway? [main-gateway]
    Basic (default pipeline with proxy)

<br/>

```
$ pm2 kill
$ pm2 start ./ecosystem.config.js
```

<br/>

    $ cd main-gateway/
    $ node server.js

<br/>

```
$ curl \
-H "Content-Type: application/json" \
-X GET localhost:8080/api/plans \
| python -m json.tool
```

```
$ curl \
-H "Content-Type: application/json" \
-X GET localhost:8080/api/subscriptions \
| python -m json.tool
```

<br/>

### 6 - Authentication

- 28 - Creating a User Model

```
$ cd app/auth-service

$ npm init -y

$ npm install --save express body-parser chalk cors dotenv helmet joi morgan mysql2 sequelize sequelize-cli

$ sequelize init
```

```
$ docker run --name auth-db \
  -e MYSQL_ROOT_PASSWORD=123456789 \
  -p 3309:3306 \
  -d mysql:5.7
```

```
$ docker ps
$ docker exec -it <docker_container_id> bash

# mysql -uroot -p
Enter password: [123456789]

mysql> CREATE SCHEMA Users CHARACTER SET 'utf8mb4';
mysql> exit
```

```
$ sequelize model:generate --name User --attributes firstName:string,LastName:string,email:string,password:string
```

<br/>

- 29 - Password Hashing
- 30 - Introduction to JSON Web Tokens
- 31 - The Sign-Up Endpoint
- 32 - The Sign-In Endpoint
- 33 - Installing Passport
- 34 - Authentication Middleware

### 7 - Caching with Redis

- 35 - Introduction to Redis
- 36 - Connecting to Redis
- 37 - Creating a Caching Service
- 38 - Invalidating the Cache

---

**Marley**

<a href="https://jsdev.org">jsdev.org</a>

Any questions on eng: https://t.me/jsdev_org  
Любые вопросы на русском: https://t.me/jsdev_ru
