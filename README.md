# SalonPro Scheduler Suite System

SalonPro Scheduler Suite System is a comprehensive application designed to optimize the operations of hairstyling businesses. With three main views for owners, employees, and customers, the system provides tools for appointment management, employee tracking, and detailed statistics.

**Project Status:** This project is currently under development. The live version will be accessible soon.



## Purpose

SalonPro Scheduler Suite System aims to achieve the following objectives:

- **Appointment Management**: Streamline the process of creating, tracking, and managing appointments for owners and employees.

- **Employee Performance**: Provide insights into employee performance, including appointment numbers, revenue generated, and peak customer times.

- **User-Friendly Customer Experience**: Enable customers to easily sign up, make appointments, and manage their accounts.

## Features

SalonPro Scheduler Suite System comes with a range of powerful features:

1. **Dashboard**: Comprehensive dashboards for owners, employees, and customers. Owners can view business statistics, employees can track their performance, and customers can manage appointments.

2. **Appointment Management**: A user-friendly interface for creating, tracking, and managing appointments. Owners can oversee the entire schedule, while employees can manage their individual appointments.

3. **User Authentication**: Customers can sign up using their email, receive confirmation, and seamlessly log in for appointment scheduling.

4. **User Views**: Different views for owners, employees, and customers, each tailored to their specific needs and responsibilities.

## Installation and Setup

To run SalonPro Scheduler Suite System locally, follow these steps:

1. Import the provided MySQL database in Workbench or any suitable tool.

2. Create a `.env` file in the `Server` folder and specify the necessary credentials (see `.env.sample` for reference).

3. Ensure that PNPM is installed globally on your machine. If not installed, follow the instructions on [PNPM's website](https://pnpm.io/) to install it.

4. This project follows a monorepo-like structure to manage the front-end and back-end code within the same repository. While no specific monorepo tool is used, the project is organized in the following manner:
   - The **AppointmentSystem Client directory** contains the front-end code.
   - The **AppointmentSystem Server directory** contains the back-end code.
   - To start both the front-end and back-end simultaneously, run the following command from the root directory:

```bash
pnpm run dev
```

## Technologies Used

**Front-end (Client)**:

- TypeScript
- React
- React Router
- Chart.js for interactive and visually appealing charts
- Sass for organized and maintainable styles
- SWR for efficient data fetching and state synchronization

**Back-end (Server)**:

- JavaScript (Node.js) with Express
- MySQL2 for efficient database operations
- Argon2 for secure password hashing
- JSON Web Token (JWT) for user authentication and secure session management
- Cors for enabling Cross-Origin Resource Sharing
- Joi for data validation
- Express Validator for further request data validation
- sendgrid/mail for sending emails

## Contributing

We welcome contributions to improve CarpetCareManager. If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request.


This command **installs the necessary dependencies** for both projects and starts their respective servers concurrently.
The frontend will be available at `http://localhost:3000/`, while the backend will be accessible at `http://localhost:4000/`.

**Please note** that this setup does not rely on dedicated monorepo tools like Lerna or Yarn Workspaces. It offers a basic monorepo structure and can be expanded upon as the project evolves.
