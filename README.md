# Welcome to Academix!

## Overview

Academix is a tool designed by students for students. It aims to facilitate effective course management and study organization. The application consists of four main components:

1. **Students Homepage**:
   - Provides an overview of all classes and their respective dashboards.
   - Acts as a central hub for accessing different features of the application.

2. **Individual Class Page**:
   - Offers detailed information and resources for each class.
   - Allows students to track assignments, review materials, and ultimatley monitor their progress.

3. **Assignment Management**:
   - Includes a section to add assignments and their due dates
   - Enables students to organize their tasks and study resources efficiently.

4. **Calendar View**:
   - Displays all assignments and their due dates in a calendar format.
   - Enables users to filter assignments by class, aiding in better planning and time management.

## Project Structure

- **index.html**:
  - Defines the basic structure of the web application using HTML5 semantic elements.
  - Includes placeholders for dynamic content and navigation links.
  - Utilizes Tailwind CSS classes for responsive design.

- **main.js**:
  - Implements dynamic content generation and user interaction handling.
  - Manages data retrieval and storage using the Store class.
  - Sets up event listeners for navigation and form submission.

- **db.js**:
  - Defines the PouchDBManager class for database operations using PouchDB.
  - Provides methods for saving, retrieving, and deleting data from the database.

- **store.js**:
  - Defines the Store class for managing data storage using both PouchDB and local storage.
  - Implements fallback mechanism to use local storage if PouchDB is not available.
  - Provides methods for saving, retrieving, and deleting data from storage.

## Usage

To utilize Academix effectively:
1. Access the Students dashboard to get an overview of all classes.
2. Navigate to the Individual Class Page by clicking on the class in the dashboard, then you will be preseneted with that class's specific data 
3. Use the Add Assignment button to add assignments and their due dates.
5. Explore the Calendar View to visualize assignment due dates and allows the user to plan ahead efficiently.
6. And, at anytime you want to return to the home page of the class, simply click the Class Home button, and if you want to return to the student dashboard click the dashboard button.

## Development Setup

1. Firstly, clone the repository to your local machine.
2. Then, open a new terminal and run "npm install"
3. Next, in the terminal run "npm run milestone-02", this will launch the webistes server and automatically bring you to it.
4. Now, explore different features and functionalities to understand how Academix works.

## Dependencies

Academix relies on the following technologies:
- [PouchDB](https://pouchdb.com/): For client-side database operations.
- [Tailwind CSS](https://tailwindcss.com/): For styling and responsive design.
