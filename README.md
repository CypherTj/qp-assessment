# Grocery Booking API

This is a Grocery Booking API built with TypeScript and Node.js.

## Description

The Grocery Booking API provides endpoints for both administrators and users to manage and book grocery items. Administrators can add, view, update, and remove grocery items, as well as manage inventory levels. Users can view available grocery items and book multiple items in a single order.

## Requirements

- Node.js
- npm
- PostgreSQL

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CypherTj/grocery-booking-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd grocery-booking-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables with the help of env.example file.

5. Run the application:

   ```bash
   npm start
   ```

## Usage

- To access admin endpoints, use `/admin` prefix in the API routes.
- To access user endpoints, use `/user` prefix in the API routes.

## Endpoints

### Admin Endpoints

- `POST /admin/items` - Add new grocery items
- `GET /admin/items` - View existing grocery items
- `DELETE /admin/items/:itemId` - Remove a grocery item
- `PUT /admin/items/:itemId` - Update details of a grocery item
- `PUT /admin/items/:itemId/inventory` - Manage inventory levels of a grocery item

### User Endpoints

- `GET /user/items` - View the list of available grocery items
- `POST /user/orders` - Ability to book multiple grocery items in a single order

## Docker

You can also run the application using Docker. Make sure Docker is installed on your system.

1. Clone the repository:

   ```bash
   git clone https://github.com/CypherTj/grocery-booking-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd grocery-booking-api
   ```

3. Run the application using Docker Compose:

   ```bash
   docker-compose up -d
   ```

## Database

- The application uses PostgreSQL as its database. It is included in the Docker container.

## Environment Variables

- Ensure to set the following environment variables in the Docker Compose file (`docker-compose.yml`):
  - `DB_USER`: PostgreSQL username
  - `DB_PASS`: PostgreSQL password
  - `DB_NAME`: PostgreSQL database name
  - `DB_HOST`: PostgreSQL host (optional, defaults to `localhost`)
  - `DB_PORT`: PostgreSQL port (optional, defaults to `5432`)

  - PostgreSQL environment variables
    - `POSTGRES_USER`: your_db_user
    - `POSTGRES_PASSWORD`: your_db_password
    - `POSTGRES_DB`: your_db_name
