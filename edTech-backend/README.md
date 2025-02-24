# EdTech SaaS - Backend

## Overview
EdTech SaaS is a cloud-based platform designed to facilitate communication between schools, teachers, and parents. The backend of this application provides API endpoints for user authentication, school management, student records, and assignments. This system ensures a seamless experience for schools by managing user roles and access levels using role-based authentication.

## Tech Stack
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **Appwrite** - Backend-as-a-Service (BaaS) for authentication and data storage
- **Permit.io** - Role-based access control (RBAC)
- **Swagger** - API documentation

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+)
- NPM or Yarn
- Docker (if containerizing the backend)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/VansRouges/Edtech-Saas-backend
   cd edtech-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the required environment variables:
   ```env
   APPWRITE_ENDPOINT=<Appwrite API Endpoint>
   APPWRITE_PROJECT_ID=<Your Appwrite Project ID>
   APPWRITE_API_KEY=<Your Appwrite API Key>
   JWT_SECRET=<Your JWT Secret>
   PERMIT_IO_API_KEY=<Your Permit.io API Key>
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## API Documentation
Below are the available API endpoints for the EdTech SaaS backend:

### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/signup` | Registers a new user |
| **POST** | `/login` | Authenticates a user and returns a JWT |

### Profile Management
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET** | `/getProfileByEmail?email={email}` | Retrieves user profile by email |
| **POST** | `/createProfile` | Creates a user profile after signup |

### School Management
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/createSchool` | Creates a new school with admin privileges |
| **GET** | `/fetchSchoolsByUserId?userId={id}` | Fetches schools linked to a user |
| **GET** | `/getAllSchoolsAndSchoolCode` | Retrieves all schools and their unique codes |
| **PUT** | `/updateSchool/{schoolId}` | Updates school information |

### Student Management
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/createStudents` | Adds a new student to a school |
| **GET** | `/getAllStudents` | Retrieves all student records |

### Assignment Management
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/createAssignments` | Creates a new assignment for a class |
| **GET** | `/getAllAssignments` | Fetches all assignments |

## Contribution Guidelines
We welcome contributions from the community! Follow these steps to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to your forked repository (`git push origin feature-branch`)
5. Open a Pull Request

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

---
For any questions or support, reach out to the maintainers at [evansagina57@gmail.com].

