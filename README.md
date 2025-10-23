# URL Shortener Service

A modern, scalable URL shortening service built with **NestJS**, featuring user authentication, URL shortening, click analytics, and reporting. The API supports versioning and is documented with Swagger, making it easy to integrate and test. This project demonstrates clean architecture, secure authentication, and efficient database handling, suitable for production-grade applications.

## Features

- **User Authentication**: Register and login with JWT-based authentication.
- **URL Shortening**: Create short URLs with unique codes using `nanoid`.
- **Analytics & Reporting**: Track clicks and generate usage reports for authenticated users.
- **API Versioning**: Supports versioned endpoints (e.g., `/v1/`).
- **Swagger Documentation**: Interactive API docs available at `/api`.
- **TypeORM & PostgreSQL**: Robust database integration for data persistence.
- **Docker Support**: Containerized setup for easy deployment.

## Tech Stack

- **NestJS** with TypeScript
- **PostgreSQL** with TypeORM
- **JWT** for authentication (via `@nestjs/jwt` and `passport-jwt`)
- **Swagger** for API documentation (`@nestjs/swagger`)
- **nanoid** for generating short URL codes
- **Docker** for containerization
- **Jest** for unit testing (extendable)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (local or via Docker)
- Docker (optional, for containerized setup)
- npm or yarn

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up PostgreSQL**:
   - Option 1: Run locally
     - Ensure PostgreSQL is running.
     - Create a database named `url_shortener`.
     - Update `src/app.module.ts` with your database credentials if different.
   - Option 2: Use Docker
     ```bash
     docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=url_shortener postgres
     ```

4. **Run the Application**:

   ```bash
   npm run start
   ```

   The API will be available at `http://localhost:3000`.

5. **Access Swagger Docs**:
   - Open `http://localhost:3000/api` in your browser to explore the API.

6. **Run with Docker** (optional):
   ```bash
   docker build -t url-shortener .
   docker run -p 3000:3000 url-shortener
   ```

## API Endpoints

All endpoints are versioned under `/v1/`. Use Swagger at `/api` for interactive testing.

- **POST /v1/users/register**
  - Description: Register a new user.
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "id": 1, "email": "user@example.com" }`

- **POST /v1/auth/login**
  - Description: Login to get a JWT token.
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "access_token": "jwt-token-here" }`

- **POST /v1/urls** (Authenticated)
  - Description: Create a shortened URL.
  - Headers: `Authorization: Bearer <jwt-token>`
  - Body: `{ "originalUrl": "https://example.com" }`
  - Response: `{ "id": 1, "originalUrl": "https://example.com", "shortCode": "abc123", "clicks": 0 }`

- **GET /v1/urls/:shortCode**
  - Description: Redirect to the original URL and log a click.
  - Response: Redirects to the original URL.

- **GET /v1/analytics/report** (Authenticated)
  - Description: Get click analytics for the user’s URLs.
  - Headers: `Authorization: Bearer <jwt-token>`
  - Response: `{ "https://example.com": 5, "https://another.com": 2 }`

## Example Usage

1. **Register a User**:

   ```bash
   curl -X POST http://localhost:3000/v1/users/register -d '{"email":"user@example.com","password":"password123"}' -H "Content-Type: application/json"
   ```

2. **Login**:

   ```bash
   curl -X POST http://localhost:3000/v1/auth/login -d '{"email":"user@example.com","password":"password123"}' -H "Content-Type: application/json"
   ```

3. **Create a Short URL**:

   ```bash
   curl -X POST http://localhost:3000/v1/urls -d '{"originalUrl":"https://example.com"}' -H "Content-Type: application/json" -H "Authorization: Bearer <jwt-token>"
   ```

4. **Access Short URL**:

   ```bash
   curl http://localhost:3000/v1/urls/abc123
   ```

5. **View Analytics**:
   ```bash
   curl http://localhost:3000/v1/analytics/report -H "Authorization: Bearer <jwt-token>"
   ```

## Project Structure

```
src/
├── auth/               # Authentication module (JWT, login)
├── users/              # User management module
├── urls/               # URL shortening module
├── analytics/          # Analytics and reporting module
├── app.module.ts       # Root module
├── main.ts             # Application bootstrap
```

## Testing

Run unit tests using Jest:

```bash
npm run test
```

(Currently, basic setup is included; extend with test cases for services like `UrlsService`.)

## Future Improvements

- Add rate limiting with `@nestjs/throttler`.
- Implement URL expiration dates.
- Add Redis for caching short URL lookups.
- Enhance analytics with time-based filtering.
- Set up CI/CD with GitHub Actions for automated testing and deployment.

## Contributing

Feel free to fork the repository, create a feature branch, and submit a pull request with improvements.

## License

MIT License
