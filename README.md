# Signa IP - Technical Test (Frontend)

This repository contains the frontend user interface for the Signa IP technical test. It is a responsive, modern web application built with Next.js and React that allows users to manage trademark records by interacting with a dedicated backend API.

**[➡️ Live Demo Link](https://signa-frontend-chi.vercel.app/)**

## Key Features

- **Full CRUD Functionality**: Intuitive interface to Create, Read, Update, and Delete trademark records.
- **Server-Side Pagination**: Efficiently handles large datasets by loading and rendering only one page of data at a time.
- **Responsive Design**: A clean, mobile-friendly interface with a collapsible sidebar, ensuring a great user experience on all devices.
- **Multi-Step Wizard**: A user-friendly, multi-step process for creating and editing records, accurately following the provided mockups.
- **User-Friendly Feedback**: Non-intrusive "toast" notifications provide clear feedback for all user actions (success, loading, error).
- **Safe Operations**: Critical actions like deletion are protected by a confirmation modal to prevent accidental data loss.
- **Detailed View Modal**: A simplified main table for quick scanning, with a "view" option to see full record details in an elegant modal with a backdrop blur effect.

## Technologies Used

- **Next.js**: A React framework for production, handling file-based routing, rendering, and performance optimizations.
- **React**: The core library for building the component-based user interface.
- **Tailwind CSS**: A utility-first CSS framework for rapid and modern UI development.
- **react-hot-toast**: A library for displaying elegant and non-intrusive toast notifications.
- **@heroicons/react**: A high-quality SVG icon library for enhancing UI clarity and aesthetics.

## Getting Started (Local Setup)

Follow these instructions to get the frontend running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- `npm` or `yarn` package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DianaOlanoTech/signa-frontend.git
    cd signa-frontend
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    This application requires an environment variable to locate the backend API. Create a local environment file by copying the provided template:
    ```bash
    # For Windows (Command Prompt)
    copy .env.example .env.local

    # For Windows (PowerShell) / macOS / Linux
    cp .env.example .env.local
    ```
    The default value in `.env.local` points to `http://127.0.0.1:8000`, which is correct for running the local backend server.

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

- The application will be available at http://localhost:3000. 
- Ensure your backend server is running simultaneously for the application to function correctly.
