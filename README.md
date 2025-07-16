# HeadlineX

## Overview

**HeadlineX** is a modern React-based web application designed to deliver a personalized news experience. Powered by the NewsAPI, it allows users to browse top headlines, search articles, filter by category, save favorites, and manage accounts with local storage-based authentication. Built with **Vite** and styled using **Tailwind CSS**, HeadlineX features a sleek, responsive, dark-themed gradient UI.

---

## Features

- **News Browsing**: View top headlines with pagination and sorting (newest, popularity, relevancy).
- **Search Functionality**: Debounced keyword search with persistent history (up to 5 recent queries).
- **Favorites Management**: Save/remove articles to a local-storage-based favorites list (requires login).
- **User Authentication**: Sign up, log in, and log out using local storage for account data.
- **Category Filtering**: Filter news by dynamically loaded categories from NewsAPI.
- **Article Details**: View source, publication date, and partial content (internal article view partially implemented).
- **Responsive Design**: Fully mobile-friendly interface with Tailwind CSS and dark gradient theme.
- **Navigation**: Fixed navbar with integrated search, user menu, and collapsible sidebar for categories.
- **Custom Hooks**: Built-in hooks like `useFetchNews`, `useDebounce`, and global state via React Context.
- **Utilities**: Helper functions like `truncateText` and `formatDate` for consistent UI formatting.
- **Fast Development**: Vite ensures fast builds and hot module replacement.

---

## Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- Modern browser (Chrome, Firefox)
- **NewsAPI Key**: Sign up at [NewsAPI.org](https://newsapi.org/) and create a `.env` file:

```env
VITE_NEWS_API_KEY=your_newsapi_key_here
Installation
bash
Copy
Edit
# Clone the repository
git clone <repository-url>

# Navigate into the project
cd headlinex

# Install dependencies
npm install
# or
yarn install
Running the Project
bash
Copy
Edit
# Start the development server
npm run dev
# or
yarn dev
Visit http://localhost:5173 in your browser.

Building for Production
bash
Copy
Edit
# Build the optimized app
npm run build
# or
yarn build

# Preview the build locally
npm run preview
# or
yarn preview
Project Structure
arduino
Copy
Edit
headlinex/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
Usage Guide
Home Page: Displays US top headlines or category-filtered news.

Search: Use the navbar or sidebar to perform keyword searches.

Favorites: Save articles with the bookmark icon. Access via /favourites (login required).

Authentication: Create or log into an account to save favorites.

Categories: Filter articles using the sidebar (e.g., business, tech).

Article Details: Click any article card to view detailed info or external links.

Authentication
Signup: Register using email and password (saved in local storage).

Login: Use stored credentials to access saved features.

Logout: Clear session from user menu.

Protected Routes: Favorites page (/favourites) requires login.

Favorites
Articles are saved/removed via bookmark icons.

Stored in local storage using article URLs as identifiers.

View all saved articles at /favourites.

News Filtering & Search
Filter by Category: Uses NewsAPI /sources to fetch categories.

Search: Uses NewsAPI /everything with debounce and sorting.

Pagination: Prev/Next buttons navigate paginated results.

Notes
ArticlePage: Exists but is commented out in routing.

Profile Page: Placeholder link present; /profile not implemented.

Theme Toggle: File exists but not implemented.

Email Validation: Placeholder file with no logic.

API Quota: Ensure sufficient NewsAPI usage quota during testing.

Contributing
Fork the repository.

Create your feature branch: git checkout -b feature-name.

Commit your changes: git commit -m 'Add feature'.

Push to the branch: git push origin feature-name.

Open a Pull Request.

License
This project is licensed under the MIT License.

Technologies Used
React

Vite

Tailwind CSS

Axios

React Router

React Icons

React Context API
```
