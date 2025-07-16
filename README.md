# HeadlineX

## Overview

**HeadlineX** is a modern React-based web application designed to deliver a personalized news experience. Powered by the NewsAPI, it allows users to browse top headlines, search articles, filter by category, save favorites, and manage accounts with local storage-based authentication. Built with **Vite** and styled using **Tailwind CSS**, HeadlineX features a sleek, responsive, dark-themed gradient UI.

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

## Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- Modern browser (Chrome, Firefox)
- **NewsAPI Key**: Sign up at [NewsAPI.org](https://newsapi.org/) and create a `.env` file:

```env
VITE_NEWS_API_KEY=your_newsapi_key_here
Installation

# Clone the repository
git clone <repository-url>

# Navigate into the project
cd headlinex

# Install dependencies
npm install
# or
yarn install
Running the Project

npm run dev
# or
yarn dev
Visit http://localhost:5173.

Building for Production

npm run build
# or
yarn build

npm run preview
# or
yarn preview

Home Page: Displays US top headlines or category-filtered news.

Search: Use the navbar or sidebar to search for news.

Favorites: Save articles with the bookmark icon. Access at /favourites (login required).

Authentication: Sign up or log in to save articles.

Categories: Filter articles via the sidebar.

Article Details: Click article cards for external links or internal detail view.

Authentication
Signup/Login: Store user credentials locally.

Logout: Ends session via user menu.

Protected Routes: Favorites page is restricted to logged-in users.

Notes
Theme Toggle and Profile Page: Placeholders exist, not implemented.

Email Validation: Not implemented.

Article Details Page: Partially functional.

NewsAPI Rate Limits: Free API key usage may be limited.

Contributing
Fork the repository

Create a branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature')

Push to GitHub (git push origin feature-name)

Submit a pull request

License
Licensed under the MIT License.

Technologies
React

Vite

Tailwind CSS

Axios

React Router

React Context API

React Icons
