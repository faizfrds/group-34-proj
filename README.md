# Academix

## Overview

Academix is a tool designed by students for students. It aims to facilitate effective course management and study organization. The application consists of four main components:

1. **Students Homepage**:
   - Provides an overview of all classes and their respective dashboards.
   - Acts as a central hub for accessing different features of the application.

2. **Individual Class Page**:
   - Offers detailed information and resources for each class.
   - Allows students to track assignments, review materials, and ultimately monitor their progress.

3. **Assignment Management**:
   - Includes a section to add assignments and their due dates.
   - Enables students to organize their tasks and study resources efficiently.

4. **Calendar View**:
   - Displays all assignments and their due dates in a calendar format.
   - Enables users to filter assignments by class, aiding in better planning and time management.

## Project Structure

## Client Side Code

### `index.html`:

- Defines the basic structure of the web application using HTML5 semantic elements.
- Includes placeholders for dynamic content and navigation links.
- Utilizes Tailwind CSS classes for responsive design.

### `main.js`:

- Implements dynamic content generation and user interaction handling.
- Manages data retrieval and storage using the Store class.
- Sets up event listeners for navigation and form submission.

## Server Side Code

### `db.js`:

- Defines the PouchDBManager class for database operations using PouchDB.
- Provides methods for saving, retrieving, and deleting data from the database.

### `store.js`:

- Defines the Store class for managing data storage using both PouchDB and local storage.
- Implements a fallback mechanism to use local storage if PouchDB is not available.
- Provides methods for saving, retrieving, and deleting data from storage.

### `server.js`:

- Implements the server-side logic using Express.js.
- Defines routes for creating, reading, updating, and deleting data.
- Utilizes middleware for logging and handling static file requests.

## Usage

To utilize Academix effectively:

1. Access the Students dashboard to get an overview of all classes.
2. Navigate to the Individual Class Page by clicking on the class in the dashboard.
3. Use the Add Assignment button to add assignments and their due dates.
4. Explore the Calendar View to visualize assignment due dates and plan ahead efficiently.
5. To return to the class's home page, simply click the Class Home button. To return to the student dashboard, click the dashboard button.

## Development Setup

1. Clone the repository to your local machine.
2. Open a new terminal and run `npm install`.
3. Run `npm run milestone-03` in the terminal to launch the website's server and automatically open it in your browser.
4. Explore different features and functionalities to understand how Academix works.

## Dependencies

Academix relies on the following technologies:

- **Express.js**: For building the server-side logic and handling HTTP requests.
- **PouchDB**: For client-side database operations.
- **Tailwind CSS**: For styling and responsive design.

