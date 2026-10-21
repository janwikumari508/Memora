🌸 MEMORA

A Unified Productivity and Collaborative Workspace Management System

Organize your tasks. Manage your goals. Collaborate with your team. Achieve more with Memora.

Memora is a productivity and workspace management web application designed to help individuals organize their personal tasks and enable teams to manage collaborative projects through a unified platform.

The project aims to bring personal productivity and team collaboration together in one place, making it easier to plan activities, track progress, manage deadlines, and stay organized.

Currently developed using HTML, CSS, and JavaScript, Memora provides a foundation for a more comprehensive productivity platform, with backend integration and advanced collaboration features planned for future development.

⸻

📌 Table of Contents

* Overview
* Problem Statement
* Our Solution
* Key Features
* Workspaces
* Technology Stack
* Project Structure
* Getting Started
* How to Use
* Current Implementation
* Future Enhancements
* Contributing
* Project Team
* License

⸻

📖 Overview

Managing personal responsibilities and collaborative projects often requires switching between multiple applications for task management, scheduling, progress tracking, and team coordination.

Memora aims to simplify this process by providing a unified workspace where users can organize their individual activities and manage collaborative work.

The platform is designed around two primary workspace concepts:

1. Personal Workspace

A dedicated environment for individual productivity, personal task management, scheduling, and progress tracking.

2. Collaboration Workspace

A shared environment designed for teams working on college projects, hackathons, professional assignments, seminars, workshops, meetups, and other group activities.

By bringing these two environments together, Memora aims to create a more organized and accessible productivity experience.

Project Details

Attribute	Description
Project Name	Memora
Project Type	Web Application
Domain	Productivity and Workspace Management
Development Approach	Frontend-first development
Frontend Technologies	HTML5, CSS3, JavaScript
Planned Backend	Node.js and Express.js
Planned Database	MongoDB
Primary Users	Students, individuals, and collaborative teams
Project Status	Under Development

⸻

🎯 Problem Statement

In today’s academic and professional environments, individuals and teams frequently struggle to manage multiple responsibilities efficiently.

Common challenges include:

* Difficulty organizing personal tasks and deadlines.
* Lack of a centralized place to manage daily activities.
* Limited visibility into task completion and overall progress.
* Difficulty coordinating responsibilities within a team.
* Missed deadlines due to inefficient planning.
* Fragmented workflows caused by using multiple productivity tools.

These challenges can reduce productivity, create confusion, and make it harder to track progress toward personal and collaborative goals.

Memora aims to address these challenges by providing a unified platform for personal productivity and collaborative workspace management.

⸻

💡 Our Solution

Memora introduces a unified workspace management approach that brings individual task organization and team-based project management under one platform.

The application is designed to help users:

* Organize and manage personal tasks.
* View schedules and manage time more effectively.
* Monitor their productivity and progress.
* Maintain a structured workflow.
* Organize collaborative projects and team responsibilities as collaboration features are developed.
* Access personal and collaborative workspaces through a common platform.

The long-term goal is to develop Memora into a comprehensive productivity ecosystem that supports users throughout the complete workflow, from planning and task creation to execution and progress tracking.

⸻

✨ Key Features

Memora is being developed with a focus on simplicity, usability, and productivity.

1. Dashboard

The dashboard serves as a central interface for navigating the application’s productivity features.

Its purpose is to provide users with a convenient entry point to their tasks, calendar, and progress-related sections.

Planned benefits:

* Centralized access to productivity tools.
* Easy navigation between application sections.
* A structured overview of personal activities.
* Reduced effort when switching between different features.

2. Task Management

Task management is one of the core components of Memora.

The application includes a dedicated task interface and JavaScript-based task functionality.

The intended task management workflow includes:

* Creating and organizing tasks.
* Recording task details.
* Tracking task completion.
* Managing personal responsibilities.
* Supporting deadline-oriented planning.

The exact availability of individual operations depends on the current implementation.

3. Calendar Management

The calendar section is intended to help users organize their schedules and visualize activities over time.

Potential applications include:

* Planning daily activities.
* Organizing upcoming responsibilities.
* Keeping track of important dates.
* Supporting better time management.

Advanced scheduling, automatic reminders, and calendar synchronization are potential future enhancements.

4. Progress Tracking

Memora includes a dedicated progress interface intended to help users understand their productivity.

The broader objective is to provide insights into completed activities, ongoing work, and progress toward personal goals.

More advanced analytics and productivity statistics can be introduced as the application develops.

5. User Interface

Memora is designed with an emphasis on a clean, accessible, and visually appealing user experience.

The frontend uses HTML, CSS, and JavaScript to structure the application, style its interfaces, and implement client-side interactions.

6. Login Interface

A login page is included in the frontend structure.

The presence of a login interface does not, by itself, mean that secure account authentication or server-side user management has been implemented.

Real authentication, account registration, password security, and session management are planned for backend integration.

⸻

🏢 Workspaces

One of the primary goals of Memora is to bring two different productivity environments together.

🌷 1. Personal Workspace

The Personal Workspace is designed for individuals who want to manage their everyday activities and improve their productivity.

Target users:

* College students.
* Individuals managing daily responsibilities.
* Students preparing for examinations.
* People organizing personal goals and projects.

Planned capabilities:

Feature	Purpose
Task Management	Organize individual responsibilities.
Calendar	Plan activities and important dates.
Progress Tracking	Monitor personal productivity.
Goal Management	Organize work around individual objectives.
Notes	Keep important information organized.
Reminders	Help users stay aware of upcoming tasks.

These capabilities represent the intended direction of the Personal Workspace; not every feature is necessarily implemented in the current version.

🤝 2. Collaboration Workspace

The Collaboration Workspace is intended for people working together toward a common objective.

It is particularly relevant to academic and professional environments where several people must coordinate tasks, responsibilities, and deadlines.

Target use cases:

* College projects.
* Hackathons.
* Group assignments.
* Workshops and seminars.
* Meetups and events.
* Professional team projects.

Planned capabilities:

Feature	Purpose
Project Management	Organize work around shared objectives.
Team Management	Coordinate project participants.
Shared Tasks	Distribute work among team members.
Task Assignment	Define individual responsibilities.
Deadlines	Organize time-sensitive activities.
Progress Monitoring	Track the status of collaborative work.
Member Roles	Support structured team participation.

These features define the intended Collaboration Workspace and will require additional implementation where they are not yet available.

The long-term objective is to make Memora a single platform for both individual productivity and collaborative project execution.

⸻

🛠 Technology Stack

Memora follows a frontend-first development approach.

Current Frontend

Technology	Purpose
HTML5	Defines the structure of web pages.
CSS3	Handles styling, layout, and presentation.
JavaScript	Implements client-side interactions and application logic.
Browser Local Storage	Supports client-side persistence where implemented.

Planned Backend and Database

The following technologies are intended for future development and should not be considered part of the implemented stack until their integration is complete.

Technology	Intended Purpose
Node.js	JavaScript runtime for server-side development.
Express.js	Backend framework for creating REST APIs.
MongoDB	Database for storing application data.
Authentication	Secure user identity and session management.

Development Tools

* Git for version control.
* GitHub for source code hosting and collaboration.
* Visual Studio Code or another code editor.
* A modern web browser for testing.

⸻

📂 Project Structure

The frontend is organized into separate HTML, CSS, and JavaScript files.

The following structure represents the known application files; additional configuration or asset directories may exist in the repository.

Memora/
│
├── index.html
├── home.html
├── loading.html
├── login.html
│
├── dashboard.html
├── task.html
├── calendar.html
├── progress.html
├── profile.html
│
├── style.css
│
├── script.js
├── task-system.js
│
└── README.md

File Descriptions

File	Responsibility
index.html	Main entry page, depending on the current application routing.
home.html	Home page and application introduction.
loading.html	Loading or transition interface.
login.html	Login interface.
dashboard.html	Main productivity dashboard.
task.html	Task management interface.
calendar.html	Calendar interface.
progress.html	Progress-related interface.
profile.html	User profile interface.
style.css	Shared visual styling.
script.js	General frontend interactions.
task-system.js	Task-related JavaScript functionality.
README.md	Project documentation.

The exact responsibilities of individual files and their connections should be verified against the current source code.

⸻

🚀 Getting Started

Follow these steps to run Memora locally.

Prerequisites

You will need:

* Git installed on your system.
* A modern web browser.
* A code editor such as Visual Studio Code.

Node.js is not required to run the frontend directly unless additional tooling or server-side components have been introduced.

Step 1: Clone the Repository

Open your terminal and execute:

git clone https://github.com/janwikumari508/Memora.git

Step 2: Navigate to the Project Directory

cd Memora

Step 3: Open the Project

Open the project folder in Visual Studio Code.

code .

If the code command is unavailable, open the folder directly through your code editor.

Step 4: Run the Application

You can open the relevant HTML entry page directly in your browser.

Alternatively, if you use Visual Studio Code, install the Live Server extension and:

1. Open the project folder.
2. Locate the intended entry page, such as index.html or home.html.
3. Right-click the file.
4. Select Open with Live Server.

The application will open in your browser.

Note: Use the entry page that matches the current navigation flow. Some features may depend on JavaScript, browser storage, or other local resources being available.

⸻

📱 How to Use

Once the application is running:

1. Open the application: Navigate to its main entry page.
2. Explore the interface: Visit the available pages to understand the application structure.
3. Open the dashboard: Access the productivity interface.
4. Explore task management: Open the task section and try the available interactions.
5. Explore the calendar: Review the calendar interface.
6. View progress: Open the progress section to explore its current functionality.
7. Explore the login page: Review the authentication interface.

The available operations depend on the current implementation. Features that require backend integration or additional development may not yet be functional.

⸻

⚙️ Current Implementation

Memora is an evolving project, and its functionality will expand as development progresses.

The following table distinguishes the known application structure from planned capabilities.

Component	Current Status
HTML-based frontend	Present
CSS styling	Present
JavaScript functionality	Present
Dashboard page	Present
Task interface	Present
Task-related JavaScript module	Present
Calendar page	Present
Progress page	Present
Login interface	Present
Profile page	Present
Client-side task persistence	Used where implemented
Backend API	Planned; not verified as implemented
Database integration	Planned; not verified as implemented
Secure authentication	Planned; not verified as implemented
Multi-user collaboration	Part of the intended product; implementation not verified
AI-powered project management	Potential future enhancement

Important: A page or interface being present does not necessarily mean all its functionality is complete. The implementation status should be updated as features are tested and integrated.

⸻

🔮 Future Enhancements

Memora is intended to evolve beyond a basic productivity frontend into a more comprehensive workspace management system.

1. Backend Integration

Introduce a backend using Node.js and Express.js to handle application logic, API requests, and persistent user data.

2. Database Integration

Integrate MongoDB to support persistent storage of users, tasks, projects, and other application data.

3. User Authentication

Implement secure account registration and login, password hashing, authentication, and appropriate access controls.

4. Advanced Task Management

Expand task management with features such as:

* Task priorities.
* Due dates.
* Status tracking.
* Categories and labels.
* Search and filtering.
* Task editing and deletion.

5. Collaborative Projects

Develop the Collaboration Workspace to support:

* Project creation.
* Team invitations.
* Shared task boards.
* Task assignments.
* Member roles and permissions.
* Shared deadlines.
* Project progress monitoring.

6. Notifications and Reminders

Introduce notifications for approaching deadlines, task assignments, and important project updates.

7. Improved Productivity Analytics

Add dashboards and meaningful statistics to help users understand task completion, project progress, and productivity patterns.

8. Responsive Design

Improve the experience across desktops, tablets, and mobile devices.

9. AI-Powered Productivity

Explore intelligent features that could assist with:

* Breaking large goals into smaller tasks.
* Suggesting task priorities.
* Summarizing project information.
* Identifying potential blockers.
* Generating project plans from notes and requirements.

AI capabilities are exploratory enhancements and are not claimed as implemented functionality.

⸻

🤝 Contributing

Contributions and suggestions are welcome as the project evolves.

If you would like to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Test your changes locally.
5. Commit your work with a meaningful commit message.
6. Open a pull request describing your changes.

Example:

git checkout -b feature/your-feature

After making and testing your changes:

git add .
git commit -m "Add: describe your feature"
git push origin feature/your-feature

Please ensure that your changes are tested and that existing functionality is not unintentionally affected.

⸻

👩‍💻 Project Team

Memora is being developed as a Bachelor of Technology capstone project in Computer Science and Engineering.

Team Members

* Janwi Kumari
* Ayush Kumar

Institution: Sushant University

Project Domain: Web Development, Productivity Management, and Collaborative Workspaces.

⸻

🎯 Project Vision

The vision behind Memora is to create a unified digital environment where individuals can organize their lives and teams can coordinate their work without unnecessary complexity.

By combining personal productivity, task management, and collaborative project workflows, Memora aims to make planning and execution more structured, accessible, and efficient.

As development continues, the platform will focus on improving functionality, strengthening its architecture, and introducing features that address real productivity challenges.

Memora — One workspace. Every goal. Better progress. 🌸

⸻

📄 License

No license has been specified for this project yet.

Before making the repository open source, choose and add an appropriate license file, such as an MIT License, if that matches your intended usage and distribution terms.
