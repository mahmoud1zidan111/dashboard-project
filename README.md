# Frontend Internship Task - Dashboard Project

This is a responsive frontend application built as a part of the Frontend Internship Task. The application is a dashboard interface built with modern React practices, clean UI implementation, and deployed using Vercel.

**Live Demo:** [https://dashboard-project-three-coral.vercel.app/](https://dashboard-project-three-coral.vercel.app/)

---

**Demo Credentials**

You can use any of the following credentials to log in to the live demo:

| Email               | Password      |
| ------------------- | ------------- |
| `mahmoud@gmail.com` | `mahmoud1234` |
| `tariq@gmail.com`   | `tariq1234`   |
| `ahmed@gmail.com`   | `ahmed1234`   |
| `khaled@gmail.com`  | `khaled1234`  |

---

## Tech Stack

- **React.js (with Vite)**: For building a fast and modern user interface.
- **React Router**: For client-side routing.
- **Context API**: For basic state management.
- **MUI & Styled Components**: For styling the components and layout.
- **Docker & Docker Compose**: For containerization.
- **Vercel**: For deployment and hosting.

---

## Features

- A complete dashboard with interactive charts, widgets, and data tables.
- Responsive design that works on both desktop and mobile devices.
- Multiple pages: Dashboard, User List, Product List, and their respective detail pages.
- Clean, organized, and maintainable code structure.

---

## How to Run Locally

### 1. Using npm (Recommended for Development)

**Prerequisites:** [Node.js](https://nodejs.org/) (v16 or higher) and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mahmoud1zidan111/dashboard-project.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd dashboard-project
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the port specified in the terminal).

### 2. Using Docker

**Prerequisites:** [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the project directory.**
3.  **Build and run the container:**
    ```bash
    docker-compose up --build
    ```
    The application will then be accessible at `http://localhost:3000`.

---

## Project Structure

The project follows a feature-driven, modular structure to ensure scalability and maintainability:

- `src/components`: Contains reusable UI components used across the application (e.g., `Chart`, `Sidebar`, `Widget`).
- `src/pages`: Contains the main pages, where each page is a composition of several components (e.g., `Home`, `UserList`, `Product`).
- `src/context`: Manages global state, such as dark mode, using React's Context API.
- `src/data`: Contains mock data (`dummyData.js`) used to populate the UI.
- `App.js`: The main component that sets up the application's routing structure.
- `style`: Contains global styles.
  /src
  |-- /components # Reusable components
  |-- /context # State management
  |-- /data # Mock data
  |-- /pages # Application pages
  |-- /style # Global styles
  |-- App.js # Main router
  |-- index.js # Entry point
