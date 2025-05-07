# Learnify Frontend

Learnify is the frontend for the Wright Education 11+ mock exam platform. It provides an interactive and engaging way for students to practice and revise essential subjects.

## Technologies Used

This project is built using:
- React 18
- Vite
- MUI (Material UI) for UI components
- Redux for state management
- React Router for navigation
- Recharts for data visualization
- Jest and Testing Library for testing
- ESLint for code linting

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

### Installation and Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo-name.git
   cd your-repo-name/frontend
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Development Server**
   ```sh
   npm run dev
   ```
   The app should now be accessible at `http://localhost:5173/` (or the port specified by Vite).

### Additional Commands

- **Build the project**
  ```sh
  npm run build
  ```
  This generates a production-ready build in the `dist/` directory.

- **Preview the production build**
  ```sh
  npm run preview
  ```

- **Run tests**
  ```sh
  npm run test
  ```

- **Lint the code**
  ```sh
  npm run lint
  ```

## Deployment

### Deploying to Netlify

Netlify offers a straightforward way to deploy your React application with continuous deployment.

#### Method 1: Using the Netlify UI

1. **Build your project locally**
   ```sh
   npm run build
   ```

2. **Create a Netlify account**
   Sign up at [Netlify](https://www.netlify.com/) if you don't have an account.

3. **Deploy via drag and drop**
   - Log in to your Netlify account
   - Go to the "Sites" section
   - Drag and drop your `dist` folder onto the Netlify UI
   - Your site will be deployed with a random subdomain

#### Method 2: Continuous Deployment from Git

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Connect Netlify to your repository**
   - Log in to Netlify
   - Click "New site from Git"
   - Select your Git provider and authorize Netlify
   - Choose your repository

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Set up environment variables** (if needed)
   - Go to Site settings > Build & deploy > Environment
   - Add environment variables like `VITE_API_URL` and `VITE_BACKEND_URL` 

### Configuring Backend API URLs

The application uses environment variables to determine the API endpoints. There are three ways to configure these URLs:

#### 1. Using `.env` files (Development)

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=https://your-backend-url.com/api
VITE_BACKEND_URL=https://your-backend-url.com
```

#### 2. Using `netlify.toml` (Deployment)

The project includes a `netlify.toml` file that configures build settings and environment variables:

```toml
[build]
  command = "npm run build"
  publish = "dist"

# Handle SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://your-backend-url.com/api"
  VITE_BACKEND_URL = "https://your-backend-url.com"
```

Edit the URLs in this file before deploying.

#### 3. Using Netlify Environment Variables (Recommended for Production)

Set environment variables in the Netlify dashboard:
- Go to Site settings > Build & deploy > Environment
- Add the following variables:
  - `VITE_API_URL`: Your API base URL (e.g., `https://learnify-backend.onrender.com/api`)
  - `VITE_BACKEND_URL`: Your backend base URL (e.g., `https://learnify-backend.onrender.com`)

### Troubleshooting Deployment Issues

#### CORS Issues
If you're experiencing CORS errors:
- Ensure your backend has CORS configured to allow requests from your Netlify domain
- Check Network tab in browser DevTools for specific CORS errors

#### Authentication Problems
If login works locally but fails on Netlify:
- Verify environment variables are correctly set
- Check browser console for any errors
- Confirm the backend is accepting requests from your Netlify domain
- Try adding more detailed console logging to pinpoint the issue

#### Routing Issues
If routes don't work after page refresh:
- Ensure the `netlify.toml` file has the proper redirect rule:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

## Project Structure

```
learnify
 ┣ node_modules
 ┣ public
 ┃ ┣ Bolt.jpg
 ┃ ┣ Flash.jpg
 ┃ ┣ Janenglish.jpg
 ┃ ┣ Marathon.jpg
 ┃ ┣ Mathodious.jpg
 ┃ ┣ Meliquiet.jpg
 ┃ ┣ RobertVanDerVerb.jpg
 ┃ ┣ Rubik.jpg
 ┃ ┣ Sparta.jpg
 ┃ ┗ logo.svg
 ┣ src
 ┃ ┣ assets
 ┃ ┣ components
 ┃ ┃ ┣ Chart.jsx
 ┃ ┃ ┣ Footer.jsx
 ┃ ┃ ┣ HomePage.jsx
 ┃ ┃ ┣ Navbar.jsx
 ┃ ┃ ┣ ProtectedRoute.jsx
 ┃ ┃ ┣ QuizStyle.jsx
 ┃ ┃ ┗ theme.js
 ┃ ┣ store
 ┃ ┃ ┣ actions
 ┃ ┃ ┃ ┗ quizActions.js
 ┃ ┃ ┣ index.js
 ┃ ┃ ┗ quizReducer.js
 ┃ ┣ App.css
 ┃ ┣ App.jsx
 ┃ ┣ Banner.jsx
 ┃ ┣ Footer.jsx
 ┃ ┣ Navbar.jsx
 ┃ ┣ Quiz.jsx
 ┃ ┣ Results.jsx
 ┃ ┣ RoutesConfig.jsx
 ┃ ┣ ThemeContext.jsx
 ┃ ┣ ThemeToggle.jsx
 ┃ ┣ backgroundPatterns.js
 ┃ ┗ main.jsx
 ┣ .gitignore
 ┣ .env (optional, for development)
 ┣ netlify.toml
 ┣ README.md
 ┣ eslint.config.js
 ┣ index.html
 ┣ package-lock.json
 ┣ package.json
 ┗ vite.config.js
```

## Contributing

If you'd like to contribute, please fork the repository and create a pull request. Follow the project's coding style and ensure tests pass before submitting.

---

For any questions, feel free to contact the project maintainers.

