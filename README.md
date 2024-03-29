# Student Job Hub Backend Server

![Student Job Hub](./path/to/your/backend/image.png)

The Student Job Hub Backend Server is a crucial component of the MERN project aimed at facilitating job search for students. It provides APIs to handle employer and student data, as well as job postings.

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Introduction

The Student Job Hub Backend Server offers a robust backend infrastructure to support the frontend applications for job search. It handles various functionalities such as user authentication, job posting management, and data retrieval for job search.

### Features:

- **User Authentication**: Secure authentication system for employers and students.
- **Job Posting Management**: APIs for creating, updating, and deleting job postings.
- **Data Retrieval**: APIs to fetch job postings and other relevant data for the frontend.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- nodemon (devDependency)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Abinim/Student-job-hub-backend-server.git
   ```

2. Navigate to the project directory:

```bash
cd Student-job-hub-backend-server
```

3. Install dependencies:

```bash
npm install
```

4.Create a .env file in the root directory and configure environment variables:

```bash
PORT=3000
MONGODB_URI=<mongodb-uri>
```

5.Start the server:

```bash
npm run dev
```
