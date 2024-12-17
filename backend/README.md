# UberClone Backend API Documentation

This document provides details about the `users/register` and `users/login` endpoints in the UberClone backend application.

---

## **POST /users/register**

### **Description:**
This endpoint allows users to register by providing their full name, email, and password. The password is hashed before being stored in the database, and a JWT token is generated for authentication.

### **Request:**
**URL:** `/users/register`  
**Method:** POST  
**Headers:**  
- `Content-Type: application/json`  

**Request Body:**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword"
}
