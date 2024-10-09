# BookMyShow Server

## Overview

The BookMyShow Server is the backend component of the BookMyShow application. It handles user authentication, movie search, booking seats, and other functionalities. The server is built using Node.js and Express, with MongoDB as the database and Redis for caching.

## File Structure

```
└── 📁BookMyShow_Server
    └── 📁logs
        └── combined.log
    └── 📁src
        └── 📁controllers
            └── auth.js
            └── booking.js
            └── business.js
            └── cinema.js
            └── event.js
            └── movie.js
            └── rating.js
            └── search.js
            └── show.js
            └── trending.js
            └── user.js
        └── 📁db
            └── mongoose.js
            └── redis.js
        └── 📁middlewares
            └── auth.js
        └── 📁models
            └── booking.js
            └── business.js
            └── cinema.js
            └── event.js
            └── movie.js
            └── payment.js
            └── rating.js
            └── recentBooking.js
            └── show.js
            └── user.js
        └── 📁routers
            └── activity.js
            └── auth.js
            └── booking.js
            └── business.js
            └── cinema.js
            └── event.js
            └── movies.js
            └── rating.js
            └── show.js
            └── user.js
        └── 📁services
            └── auth.js
            └── booking.js
            └── business.js
            └── cinema.js
            └── event.js
            └── movie.js
            └── payment.js
            └── rating.js
            └── search.js
            └── show.js
            └── trending.js
            └── user.js
        └── 📁utils
            └── imgUpload.js
            └── test_functions.js
            └── utils.js
            └── winston.js
        └── cronjob.js
        └── server.js
    └── 📁uploads
        └── image_url-<number>.jpg
    └── .gitignore
    └── dump.rdb
    └── package-lock.json
    └── package.json
    └── README.md
```

## Flow Explanation

### 1. Routers
Routers define the endpoints for the application and map them to the appropriate controller functions. They are responsible for handling HTTP requests and directing them to the correct controller based on the URL and HTTP method. Routers are located in the `src/routers` directory.

### 2. Controllers
Controllers handle the incoming requests from the routers. They process the request data, perform any necessary validation, and call the appropriate service functions to perform the business logic. Controllers are responsible for sending the appropriate HTTP response back to the client. They are located in the `src/controllers` directory.

### 3. Services
Services contain the core business logic of the application. They interact with the database and other utilities to perform the required operations. Services are responsible for implementing the actual functionality, such as user authentication, booking seats, and fetching movie details. They are located in the `src/services` directory.

### 4. Models
Models define the structure of the data stored in the database. They are used by the services to interact with the database. Models are defined using Mongoose for MongoDB and are located in the `src/models` directory.

### 5. Middlewares
Middlewares are functions that execute during the request-response cycle. They can modify the request or response objects, end the request-response cycle, or call the next middleware function. Middlewares are used for tasks such as authentication and logging. They are located in the `src/middlewares` directory.

### 6. Utilities
Utilities contain helper functions and modules that are used throughout the application. These can include functions for image upload, logging, and other common tasks. Utilities are located in the `src/utils` directory.

### 7. Database Configuration
The database configuration files set up the connections to MongoDB and Redis. These configurations are essential for the application to interact with the databases. They are located in the `src/db` directory.

### 8. Cron Jobs
Cron jobs are scheduled tasks that run at specified intervals. In the BookMyShow server, cron jobs are used for tasks such as updating trending movies and clearing old data. The cron job configurations are located in the `cronjob.js`

### 9. Server Initialization
The server initialization file `server.js` sets up the Express application, configures middleware, and starts the server. It is the entry point of the application and is responsible for bootstrapping the entire server.

### Uploads Folder
The `uploads` folder contains images uploaded by users. These images are stored with unique filenames to avoid conflicts and are used for various purposes within the application, such as movie poster image and event images.

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB
- Redis

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/BookMyShow.git
    cd BookMyShow/BookMyShow_Server
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables.
    The variables are 
    ```sh
    MONGO_DB_URL=<YOUR_URL> (mongodb://localhost:27017/bookmyshow)
    JWT_SECRET = <YOUR_JWT_SECRET> (can be any string )

4. **Start the server:**
    ```sh
    npm start
    ```

