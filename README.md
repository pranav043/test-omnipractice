# Omnipractice-Assignment

Problem statement- https://doc.clickup.com/36217304/d/h/12h8er-6276/8c27a92ca5382f8

## Table of Contents

- [How to Run the Project](#how-to-run-the-project)
- [Tech Stack](#tech-stack)
- [Authentication](#Authentication)
- [API Endpoints](#api-endpoints)

## How to Run the Project

To run this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/pranav043/test-omnipractice.git
    ```

2. Change into the project directory:

    ```bash
    cd test-omnipractice
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the application:

    ```bash
    npm start
    ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Tech Stack

This project is built using the following technologies:

- Node.js
- Express
- JavaScript
- MongoDB

## Authentication

This project uses `express-session` for user authentication. Unlike JWT (JSON Web Tokens), you don't need to manually enter tokens in your requests. `express-session` handles session-based authentication, providing a seamless and secure way to manage user sessions.

### Key Features:

- **No Token Entry:** Users are authenticated seamlessly without the need to manually enter tokens in each request.

- **Session Management:** `express-session` manages user sessions, making it easy to track user authentication status across requests.

- **Secure Cookies:** Session data is stored in secure cookies, ensuring data integrity and protection.

- **Configuration:** Authentication settings can be configured in the `express-session` middleware, including session duration, cookie options, and more.


## API Endpoints

### User Management

#### Sign Up

- **Endpoint:** `POST /api/user/signup`
- **Request:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
- **Resonse:**
  ```json
  {
    "message": "User registered successfully"
  }

#### Login

- **Endpoint:** `POST /api/user/login`
- **Request:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
- **Resonse:**
  ```json
  {
    //user-details
  }

#### Follow User

- **Endpoint:** `POST /api/user/follow-user`
- **Request:**
  ```json
  {
    "userIdToFollow": "userId"
  }
- **Resonse:**
  ```json
  {
    "message": "User followed successfully"
  }


### Tweet Management

#### Post Tweet

- **Endpoint:** `POST /api/tweet/post-tweet`
- **Request:**
  ```json
  {
    "message": "tweet_content"
  }
- **Resonse:**
  ```json
  {
    "message": "Tweeted successfully"
  }

#### Get Feed

- **Endpoint:** `GET /api/tweet/get-my-feed`
- **Resonse:**
  ```json
  {
    "feed":[
         //data
     ]
  }
- **Important**- By default only tweets along with userId are shared, if you want user information too, then uncomment the populate() inside the getFeed function.
