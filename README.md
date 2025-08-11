# SneakerHead Shoe E-commerce Platform

A full-stack e-commerce web application focused on sneaker retail, built with React (frontend) and Spring Boot microservices (backend).

---

##  Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Project Structure](#project-structure)  
4. [Tech Stack](#tech-stack)  
5. [Environment Variables](#environment-variables)  
6. [Getting Started](#getting-started)  
   - Backend Services  
   - Frontend  
7. [Scripts & Usage](#scripts--usage)  
8. [Contributing](#contributing)  
9. [License](#license)

---

## Overview

This project consists of:

- **Backend** (Spring Boot microservices):
  - **MiniMart-MP**: Handles commerce logic (products, cart, checkout, authentication, etc.).
  - **OrderService**: Manages orders and related data.
- **Frontend**: React-based UI with customer flows like browsing, cart, favorites, profiles, and payments.

---

## Features

- User registration, login, and profile management  
- Product browsing and search  
- Shopping cart and favorites  
- Order creation and tracking (via OrderService)  
- Payment processing (e.g., Razorpay integration)  
- Google OAuth login support  
- Clean, organized microservice architecture  
- Responsive React UI

---

## Project Structure

```

SneakerHeadMP
├── backend
│   ├── MiniMart-MP
│   └── OrderService
└── frontend

```

---

## Tech Stack

- **Frontend**: React, Context API, Vite  
- **Backend**: Spring Boot, Spring Data JPA, Maven  
- **Databases**: MySQL  
- **Payment**: Razorpay  
- **Auth**: Google OAuth  
- **Other Tools**: Docker (optional), Maven Wrapper

---

## Environment Variables

### Frontend (`.env`)
```

VITE\_GOOGLE\_CLIENT\_ID=...
VITE\_ALGOLIA\_APP\_ID=...
VITE\_ALGOLIA\_API\_KEY=...
VITE\_RAZORPAY\_KEY\_ID=...

````

### Backend – MiniMart Microservice (`application.properties`)
```properties
spring.application.name=MiniMart
spring.datasource.url=jdbc:mysql://localhost:3306/minimart
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

google.client.id=...
razorpay.keyId=...
razorpay.keySecret=...
````

### Backend – OrderService (`application.properties`)

```properties
spring.application.name=OrderService
spring.datasource.url=jdbc:mysql://localhost:3306/order_db?...
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
server.port=8081
```

## Getting Started

### Prerequisites

* Java 21+
* Node.js 20+
* MySQL running locally (with `minimart` and `order_db` databases created)
* (Optional) Docker if you plan to containerize services

### Setup Steps

#### 1. Clone the Repo

```bash
git clone https://github.com/Dipanshu-Kubde/SneakerHead-Shoe-E-commerce-Platform.git
cd SneakerHead-Shoe-E-commerce-Platform
```

#### 2. Backend – MiniMart

```bash
cd backend/MiniMart-MP
# Create .env or configure application.properties correctly
./mvnw clean spring-boot:run
```

#### 3. Backend – OrderService

```bash
cd ../OrderService
./mvnw clean spring-boot:run
```

#### 4. Frontend

```bash
cd ../../frontend
npm install
npm run dev
```

Your app should now be live (typically at `http://localhost:3000`) and connected to the backend services.

---

## Scripts & Usage

| Command                  | Description                   |
| ------------------------ | ----------------------------- |
| `npm install`            | Install frontend dependencies |
| `npm run dev`            | Run React development server  |
| `./mvnw spring-boot:run` | Start a backend microservice  |

---

## Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes
4. Push to your fork and open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more guidelines.
