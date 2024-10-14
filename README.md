# Library Management System

This project is a library management system containerized with Docker, including a Node.js backend, PostgreSQL database, and pgAdmin.

## Prerequisites

Ensure the following tools are installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Environment Variables

### Node.js:
- `PORT=4000`
- `DB_HOST=postgres`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=password`
- `DB_NAME=library_DB`

### PostgreSQL:
- Runs on port `5432`

### pgAdmin:
- `PGADMIN_DEFAULT_EMAIL: admin@admin.com`
- `PGADMIN_DEFAULT_PASSWORD: admin`
- Runs on port `8080`

## Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/Parth002933v/library_management_system.git
   cd library_management_system
   ```

2. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. The backend will be accessible at `http://localhost:4000`, and pgAdmin will be available at `http://localhost:8080`.

4. After Docker is running successfully, open the Node.js container terminal:
   ```bash
   docker exec -it backend /bin/sh
   ```

5. Run the database migrations and seed the data:
   ```bash
   pnpm run migrate:latest
   pnpm run seed:run
   ```

## Stopping the Application

To stop and remove the containers, use:
```bash
docker-compose down
```

## Additional Notes

- You can modify environment variables as needed in the `docker-compose.yaml`.
- Ensure the database is properly seeded with the `pnpm` commands mentioned above.
