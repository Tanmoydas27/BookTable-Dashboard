# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# BookTable Dashboard

## Overview

BookTable is a React-based application that displays a list of books with details fetched from an API. The app uses React Table for data display, pagination, and sorting, and Auth0 for authentication. Users can search for books by author name, and download the current table data as a CSV file.

## Features

- Display a list of books with details including title, author name, first publish year, ratings average, subject, author birth date, and author top work.
- Search functionality to find books by author name.
- Pagination and sorting for the book list.
- Authentication using Auth0.
- Download current table data as a CSV file.

## Technologies Used

- React
- React Table
- Auth0
- Tailwind CSS
- Font Awesome
- PapaParse (for CSV export)
- FileSaver.js

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/booktable.git
   cd booktable




Install dependencies:

bash
`
npm install
`
Configure Auth0:

Create a .env file in the root of the project and add your Auth0 configuration details:

env
`
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
`
Run the application:

bash

npm start
The app should now be running at http://localhost:3000.

Usage
Login: Click the "Login Now" button to authenticate via Auth0.
Search: Use the search input to find books by author name.
Sort: Click on the column headers to sort the table by that column.
Pagination: Use the pagination controls at the bottom to navigate through pages.
Download CSV: Click the "Download CSV" button to download the current table data.
Project Structure

`
booktable/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   └── BookTable.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
├── .env
├── package.json
├── README.md
API Services
fetchBooks()
`
Fetches a list of books from the API.

getAuthor(authorName)
Fetches author details by author name.

getAuthorDetails(authorKey)
Fetches detailed information about an author using the author's key.

getBooksByAuthorName(authorName)
Fetches books by a specific author name.

Authentication
This project uses Auth0 for authentication. Ensure you have configured your Auth0 domain and client ID in the .env file.

Styling
Tailwind CSS is used for styling the application. The layout ensures the table and controls are responsive and user-friendly.



License
This project is licensed under the MIT License.

Contact
For any questions or suggestions, please feel free to open an issue or contact the repository owner.


This README covers the key aspects of your project, including setup, usage, and contribution guidel
