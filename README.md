# Movie-Info-App
# THIS IS A WORK IN PROGRESS
Simple Typescript App to fetch some results from TMDB (The Movie DataBase) API.
On page load it fetches the most popular movies currently on the db and the user can search for a specific movie with the search bar.

You will need YOUR OWN API key, which you can get for free by registering on the TMBD website and requesting it.

## 📸 Screenshots
| **App View** |
|----------------|
|![Initial View](media/screenshot0.png) |
| **Search For Movies** |
| ![Search Bar](media/screenshot1.png) | 

## ✨ Features

- **Automatic Display Of Popular Movies On Load**:
  - When loading the page it will fetch the most popular movies in the db at the moment.
  - These results will be dispalyed on cards that show the movie's poster.
- **Search Functionality**:
  - Users can search the db for movies or tv shows by writing in the search bar and pressing ENTER.
- **Movie or TV Show Overlay**:
  - Clicking a card opens an overlay with a short description an image and a trailer if it is found.

## 🛠️ Technologies Used

- **TypeScript**: Core logic for types.
- **React**: For components rendering.
- **HTML/CSS(Tailwindcss)**: Styling with Tailwindcss.
- **Node.js/NPM**: For project setup and dependency management.
- **Lucide-React**: For simple icons.
- **Axios**: For simpler fetch requests.
- **VSCode Live Server Extension**: To run the app locally.

## 📋 Prerequisites

To run Movie App, ensure you have:
- Node.js (v16 or higher) and NPM installed.
- A modern web browser (e.g., Chrome, Firefox).
- Git (optional, for cloning the repository).
- A web server to run the app (e.g. VSCode has extensions for Live Servers)
