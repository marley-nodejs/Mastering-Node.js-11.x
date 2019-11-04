# Mastering Node.js 11.x [Video]

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
  -e MYDSQL_ROOT_PASSWORD=123456789 \
  -p 6606:3306 \
  -d mysql:5.7
```

```
CREATE SCHEMA SubscriptionAsAService CHARACTER SET utf8mb4;
```

- 18 - Installing Sequelize

```
$ npm install -g sequlize-cli
```

```
$ sequelize init
```

- 19 - Creating Sequelize Models
- 20 - Utilizing Migrations
- 21 - Finishing the Service

### 5 - Node.js Microservices with PM2

- 22 - The Database per Service Pattern
- 23 - Managing Processes with PM2
- 24 - Communicating using REST
- 25 - Communicating using AMQP
- 26 - CQRS and Event Sourcing
- 27 - Designing an API Gateway

### 6 - Authentication

- 28 - Creating a User Model
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
