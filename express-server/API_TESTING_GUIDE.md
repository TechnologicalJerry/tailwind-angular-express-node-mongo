# 🚀 Express API Testing Guide

## 📋 Postman Collection Setup

### 1. Import Collection
1. Open Postman
2. Click **Import** button
3. Select `Express-API.postman_collection.json`
4. Click **Import**

### 2. Import Environment
1. Click **Import** button
2. Select `Express-API.postman_environment.json`
3. Click **Import**
4. Select **Express API Environment** from environment dropdown

## 🔧 Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `base_url` | `http://localhost:5050` | API base URL |
| `auth_token` | (auto-filled) | JWT authentication token |
| `user_id` | (auto-filled) | User ID for testing |
| `product_id` | (auto-filled) | Product ID for testing |
| `test_email` | `test@example.com` | Test user email |
| `test_password` | `TestPassword123!` | Test user password |

## 🧪 Testing Workflow

### Step 1: Health Check
1. Run **Health Check** → **Health Check**
2. Should return: `{"status": "OK", "timestamp": "..."}`

### Step 2: API Info
1. Run **API Info** → **Get API Info**
2. Should return API information and available endpoints

### Step 3: User Registration
1. Run **Authentication** → **Register User**
2. Check response for success (201 status)
3. Copy the `token` from response
4. Set `auth_token` environment variable to the token value

### Step 4: User Login
1. Run **Authentication** → **Login User**
2. Should return user info and token
3. Update `auth_token` if needed

### Step 5: Get Current User
1. Run **Authentication** → **Get Current User**
2. Should return current user information
3. Copy `user_id` from response and set in environment

### Step 6: User Management
1. Run **User Management** → **Get All Users**
2. Run **User Management** → **Get User by ID**
3. Run **User Management** → **Update User**
4. Run **User Management** → **Delete User**

### Step 7: Product Management
1. Run **Product Management** → **Get All Products**
2. Run **Product Management** → **Create Product**
3. Copy `product_id` from response and set in environment
4. Run **Product Management** → **Get Product by ID**
5. Run **Product Management** → **Update Product**
6. Run **Product Management** → **Delete Product**

### Step 8: Error Testing
1. Run **Error Testing** → **Test 404 Error**
2. Run **Error Testing** → **Test Invalid Registration**
3. Run **Error Testing** → **Test Unauthorized Access**

## 📊 Expected Responses

### Successful Registration (201)
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "userName": "johndoe123",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "gender": "male",
    "dob": "1990-01-15T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Successful Login (200)
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "userName": "johndoe123",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "gender": "male",
    "dob": "1990-01-15T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

#### Missing Fields (400)
```json
{
  "message": "All fields are required",
  "required": [
    "firstName", "lastName", "userName", "email",
    "password", "confirmPassword", "phone", "gender", "dob"
  ]
}
```

#### Unauthorized (401)
```json
{
  "message": "Access token required"
}
```

#### Not Found (404)
```json
{
  "message": "User not found"
}
```

## 🔐 Authentication Flow

### 1. Register User
- **Endpoint**: `POST /api/auth/register`
- **Body**: Complete user information
- **Response**: User data + JWT token

### 2. Login User
- **Endpoint**: `POST /api/auth/login`
- **Body**: Email + password
- **Response**: User data + JWT token

### 3. Use Token
- **Header**: `Authorization: Bearer {token}`
- **Required for**: All protected endpoints

## 🛠️ Advanced Testing

### Pre-request Scripts
Add this to **Login User** request to auto-set token:

```javascript
pm.test("Login successful", function () {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.environment.set("auth_token", jsonData.token);
        pm.environment.set("user_id", jsonData.user.id);
    }
});
```

### Test Scripts
Add this to **Register User** request:

```javascript
pm.test("Registration successful", function () {
    pm.response.to.have.status(201);
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('token');
    pm.expect(jsonData).to.have.property('user');
    pm.environment.set("auth_token", jsonData.token);
    pm.environment.set("user_id", jsonData.user.id);
});
```

## 📝 Test Data Examples

### Valid User Registration
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "userName": "janesmith",
  "email": "jane.smith@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "phone": "+1987654321",
  "gender": "female",
  "dob": "1995-06-20"
}
```

### Valid Product Creation
```json
{
  "name": "MacBook Pro M3",
  "description": "Latest MacBook Pro with M3 chip and advanced features",
  "price": 1999.99,
  "category": "electronics",
  "stock": 25,
  "imageUrl": "https://example.com/macbook-pro.jpg"
}
```

## 🚨 Common Issues

### 1. Port Not Running
- **Error**: Connection refused
- **Solution**: Start server with `npm run dev`

### 2. Invalid Token
- **Error**: 401 Unauthorized
- **Solution**: Re-login to get fresh token

### 3. Missing Fields
- **Error**: 400 Bad Request
- **Solution**: Check all required fields are present

### 4. Duplicate Email/Username
- **Error**: 400 Bad Request
- **Solution**: Use unique email and username

## 📈 Performance Testing

### Load Testing
1. Use Postman Runner
2. Set iterations to 100
3. Run authentication flow
4. Monitor response times

### Stress Testing
1. Create multiple users
2. Test concurrent requests
3. Monitor server logs
4. Check database performance

## 🔍 Debugging Tips

### 1. Check Server Logs
- Look for Winston logs in console
- Check for error messages
- Monitor request/response times

### 2. Validate JSON
- Ensure proper JSON formatting
- Check field names and types
- Verify required fields

### 3. Test Authentication
- Verify token format
- Check token expiration
- Test with invalid tokens

## 📚 Additional Resources

- [Postman Documentation](https://learning.postman.com/)
- [Express.js Testing](https://expressjs.com/en/guide/testing.html)
- [JWT Testing](https://jwt.io/)
- [MongoDB Testing](https://docs.mongodb.com/manual/testing/)

## 🎯 Success Criteria

✅ All endpoints return expected status codes  
✅ Authentication flow works correctly  
✅ CRUD operations function properly  
✅ Error handling works as expected  
✅ Logging captures all events  
✅ Performance meets requirements  

Your Express API is now ready for comprehensive testing! 🚀
