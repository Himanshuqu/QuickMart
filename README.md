# QuickMart Backend Setup

## Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

Run the JSON Server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Default Test Accounts

Login with these credentials:

**Account 1:**
- Email: demo@quickmart.com
- Password: demo123

**Account 2:**
- Email: test@quickmart.com
- Password: test123

## API Endpoints

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user
- `GET /users/{id}` - Get user by ID
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Carts
- `GET /carts` - Get all carts
- `POST /carts` - Create new cart
- `GET /carts/{id}` - Get cart by ID
- `PUT /carts/{id}` - Update cart
- `DELETE /carts/{id}` - Delete cart

## Database Schema

### User Object
```json
{
  "id": 1,
  "fullname": "User Name",
  "email": "user@email.com",
  "password": "password",
  "createdAt": "date"
}
```

### Cart Object
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "id": "product_id",
      "name": "product_name",
      "price": "₹100",
      "image": "image_url",
      "quantity": 1
    }
  ],
  "createdAt": "date",
  "updatedAt": "date"
}
```
