# Signa IP - Technical Test (Frontend)

This repository contains the frontend user interface for the Signa IP technical test. It is a responsive, single-page application (SPA) built with Next.js and React that allows users to manage trademark records by interacting with a dedicated backend API.

**[➡️ Live Demo Link]([URL_OF_YOUR_VERCEL_DEPLOYMENT])**

## Features

- **Full CRUD Functionality**: Create, Read, Update, and Delete trademark records.
- **Server-Side Pagination**: Efficiently handles large datasets by loading only one page at a time.
- **Responsive Design**: A modern, mobile-friendly interface with a collapsible sidebar.
- **Multi-Step Wizard**: An intuitive, multi-step process for creating and editing records, as per the mockups.
- **User-Friendly Notifications**: Non-intrusive "toast" notifications provide feedback for all actions.
- **Confirmation Modals**: Safeguards against accidental deletions with a confirmation dialog.
- **Detailed View**: A clean main table with a "view" option to see full record details in a modal.

## Technologies Used

- **Next.js**: A React framework for production, handling routing, rendering, and optimizations.
- **React**: The core library for building the user interface.
- **Tailwind CSS**: A utility-first CSS framework for rapid and modern UI development.
- **react-hot-toast**: A library for displaying user-friendly toast notifications.
- **@heroicons/react**: A high-quality SVG icon library for enhancing the UI.

## Getting Started (Local Setup)

Follow these instructions to get the frontend running on your local machine.

### Prerequisites

- Node.js (v18 or higher)
- `npm` or `yarn` package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DianaOlanoTech/signa-frontend.git
    cd signa_frontend
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    This application requires an environment variable to know where the backend API is located. Copy the example file:
    ```bash
    copy .env.example .env.local
    ```
    The default value in `.env.local` points to `http://127.0.0.1:8000`, which is correct for running the local backend server.

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

- The application will be available at http://localhost:3000. 
- Ensure your backend server is running simultaneously for the application to function correctly.
