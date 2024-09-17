# Product Management Application

This is a full-stack product management application that includes a React Native frontend and a Node.js/Express backend, with MongoDB for data storage. The application also uses Redux and Redux Toolkit for state management and offline support, and provides API documentation via Swagger.

## Features

- **Product CRUD Operations**: Create, read, update, and delete products.
- **Redux & Redux Toolkit**: State management and offline support.
- **Image Upload**: Supports product image uploads from the device.
- **Swagger Documentation**: Available at `/api-docs`.
- **MongoDB Database**: Used for storing product data.

## Project Structure

```bash
native/
├── product-api-server/    # Backend
│   ├── server.js          # Express server setup
│   ├── swagger.json       # Swagger API documentation
│   └── package.json       # Backend dependencies
├── product-app/           # Frontend (React Native App)
│   ├── App.js             # Main app entry point
│   ├── components/        # UI components like ProductList, ProductForm
│   ├── redux/             # Redux Toolkit setup for state management
│   ├── package.json       # Frontend dependencies
│   └── app.json           # Expo app configuration
└── node_modules/          # Node.js dependencies



## Backend (Product API Server)

### Setup Instructions

1. Navigate to the backend folder:
    ```bash
    cd native/product-api-server
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the Node.js server:
    ```bash
    node server.js
    ```

4. Access Swagger API documentation:
    The server will be running on `http://localhost:3000` and the Swagger API documentation can be accessed at:
    ```bash
    http://localhost:3000/api-docs
    ```

### MongoDB Setup

Ensure that MongoDB is installed and running on your machine or connected via a cloud service (e.g., MongoDB Atlas). The backend server will connect to MongoDB to store and retrieve product data.

## Frontend (Product App)

### Setup Instructions

1. Navigate to the frontend folder:
    ```bash
    cd ../product-app
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Start the Expo development server:
    ```bash
    npx expo start
    ```

4. Run the app:
    Open the Expo Go app on your phone to scan the QR code and run the app, or use an emulator (iOS/Android) for testing.

## Technologies Used

### Frontend

- **React Native (Expo)**: Framework for building mobile applications.
- **Redux & Redux Toolkit**: For state management and offline data caching.
- **React Native Vector Icons**: For displaying icons.
- **react-native-maps**: For map integration (optional).
- **axios**: For making HTTP requests to the API.

### Backend

- **Node.js & Express**: Server-side framework for handling API requests.
- **MongoDB**: Database for storing product data.
- **Swagger**: API documentation.

## Running the Project

### Backend

1. Navigate to the product-api-server directory:
    ```bash
    cd native/product-api-server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    node server.js
    ```

4. Access the Swagger documentation at:
    ```bash
    http://localhost:3000/api-docs
    ```

### Frontend

1. Navigate to the product-app directory:
    ```bash
    cd ../product-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the Expo development server:
    ```bash
    npx expo start
    ```

4. Open the app using Expo Go or an emulator.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes.

## License

This project is licensed under the MIT License.

## Contact Information

For support or questions, please contact [your-email@example.com].