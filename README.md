# Customer Management Web

## Overview

This is an Angular v19 application with Bootstrap, designed as a simple frontend interface for managing customers. It connects to a Java Spring Boot backend API and supports user authentication (login & register) using JWT.

## Technologies Used

- Angular v19
- Bootstrap
- Angular Router
- Angular Forms
- Angular HTTP Client
- JWT Authentication

## Features

- **User Authentication**: Users can register and log in using JWT authentication.
- **CRUD Functions**: search, create, update, and delete customers.
- **Responsive UI**: Built with Bootstrap for a user-friendly experience.

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/KanoknartMeen/customer-web.git
   cd customer-web
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   ng serve
   ```
4. Open the application in a browser:
   ```
   http://localhost:4200
   ```

## Authentication & Authorization

- **Login**: Users log in with their credentials to obtain a JWT token.
- **Register**: New users can create an account and log in upon successful registration.
- **Role-Based Access Control**:
  - ROLE\_ADMIN: Full access to customer management features.
  - ROLE\_USER: Can only search, create, and update customers.
- JWT token is stored in local storage and included in API requests.

## Project Structure

```
customer-management-frontend/
│── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   ├── customers/
│   │   │   ├── customer-list/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── customer.service.ts
│   │   ├── models/
│   │   │   ├── customer.model.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│── angular.json
│── package.json
│── README.md
```

## License

This project is licensed under the MIT License.

