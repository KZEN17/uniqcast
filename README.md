# Uniqcast

Uniqcast is a media browsing application that allows users to explore and navigate through various media content such as movies and TV shows. The application fetches media data from an external API (The Movie Database API) and displays it in a grid format. Users can navigate through the media items using keyboard navigation, enhancing the user experience.

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building the Application](#building-the-application)
  - [Linting](#linting)
- [Environment Variables](#environment-variables)
- [Custom Hooks](#custom-hooks)
- [Clean-up Suggestions](#clean-up-suggestions)
- [License](#license)

## Project Description

Uniqcast is a media browsing application that allows users to explore and navigate through various media content such as movies and TV shows. The application fetches media data from an external API (The Movie Database API) and displays it in a grid format. Users can navigate through the media items using keyboard navigation, enhancing the user experience.

## Technologies Used

1. **React**: A JavaScript library for building user interfaces. It allows for the creation of reusable UI components.
2. **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript. It provides static typing, which helps in catching errors early during development.
3. **Redux**: A predictable state container for JavaScript apps. It helps manage the application state in a predictable way.
4. **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces. It provides low-level utility classes to build complex designs.
5. **Axios**: A promise-based HTTP client for the browser and Node.js. It is used to make HTTP requests to the external API.
6. **Vite**: A build tool that provides a faster and leaner development experience for modern web projects. It is used to bundle and serve the application during development and production.
7. **The Movie Database (TMDb) API**: An external API used to fetch media data such as movies and TV shows.

## Key Features

- **Media Grid Display**: Displays media items in a grid format, categorized into different sections such as latest movies, popular movies, popular TV shows, and top-rated movies.
- **Keyboard Navigation**: Allows users to navigate through media items using keyboard arrow keys.
- **Expandable Sidebar**: A sidebar that expands on hover to show additional menu items and user information.
- **Responsive Design**: The application is designed to be responsive and works well on different screen sizes.

## Project Structure

The project is organized into several directories and files, each serving a specific purpose:

### Key Files and Directories

- `src/App.tsx`: The main application component that includes the `Sidebar` and `MediaGrid` components.
- `src/components/Sidebar.tsx`: The sidebar component with expandable menu items.
- `src/components/MediaGrid.tsx`: The main grid component that fetches and displays media data in rows.
- `src/components/MediaRow.tsx`: A row component that displays media items using the `MediaCard` component.
- `src/components/MediaCard.tsx`: A card component that displays individual media items.
- `src/data/api.ts`: Contains the function to fetch media data from the external API.
- `src/hooks/useKeyboardNavigation.ts`: Custom hook for handling keyboard navigation.
- `src/hooks/useRowNavigation.ts`: Custom hook for handling row navigation.
- `src/store/index.ts`: Redux store configuration.
- `src/store/slices/navigationSlice.ts`: Redux slice for managing navigation state.
- `src/types/index.ts`: TypeScript types used throughout the project.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/KZEN17/uniqcast.git
   cd uniqcast
2. Install Dependencies:
npm install
# or
yarn install

