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
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

### Installation and Setup

#### Local Development

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo-name.git
   cd your-repo-name/frontend
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Environment Variables**
   Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_URL=https://learnify-render-backend.onrender.com/api
   VITE_BACKEND_URL=https://learnify-render-backend.onrender.com
   ```

4. **Run the Development Server**
   ```sh
   npm run dev
   ```
   The app should now be accessible at `http://localhost:5173/` (or the port specified by Vite).

#### Docker Development

The recommended way to run the frontend is using Docker, as described in the main README.md file. This ensures consistent environments across development and production.

```sh
# From the project root directory
docker-compose up -d frontend
```

### Deployment

#### Netlify Deployment

The frontend is configured for easy deployment to Netlify:

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Sign up for Netlify** at [netlify.com](https://www.netlify.com/) and connect your Git provider

3. **Create a new site** from your Git repository:
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Advanced settings are already configured in the `netlify.toml` file

4. **Deploy the site**
   - Netlify will automatically deploy your site
   - Any future pushes to your main branch will trigger a new deployment

The backend API connection is pre-configured in the `netlify.toml` file to use the Render.com hosted backend.

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

## Project Structure

```
frontend/
 ┣ node_modules/
 ┣ public/
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
 ┣ src/
 ┃ ┣ assets/
 ┃ ┣ components/
 ┃ ┃ ┣ Chart.jsx
 ┃ ┃ ┣ Footer.jsx
 ┃ ┃ ┣ HomePage.jsx
 ┃ ┃ ┣ Navbar.jsx
 ┃ ┃ ┣ ProtectedRoute.jsx
 ┃ ┃ ┣ QuizStyle.jsx
 ┃ ┃ ┣ Register.jsx
 ┃ ┃ ┣ Login.jsx
 ┃ ┃ ┗ theme.js
 ┃ ┣ store/
 ┃ ┃ ┣ actions/
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
 ┣ Dockerfile
 ┣ README.md
 ┣ eslint.config.js
 ┣ index.html
 ┣ package-lock.json
 ┣ package.json
 ┗ vite.config.js
```

## Key Features

- **User Authentication**: Register, login, and profile management
- **Quiz Selection**: Choose from various subjects and difficulty levels
- **Interactive Quizzes**: Engaging quiz interface with immediate feedback
- **Results Analysis**: Detailed breakdown of quiz performance
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## API Integration

The frontend communicates with the backend API using fetch requests. The base URL for API requests is configured through environment variables:

```javascript
// Example API call from quizActions.js
const APIURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchQuestions = (category, limit = 10) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const url = category === 'all' 
      ? `${APIURL}/questions?limit=${limit}` 
      : `${APIURL}/${category}?limit=${limit}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    dispatch(setQuestions(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
```

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Error: "Failed to fetch" or "Network Error" in browser console
   - Solution: Ensure the backend is running and the environment variables are correctly set
   
   ```sh
   # Check if backend is running
   curl http://localhost:5000/api/health
   
   # Verify environment variables in the browser console
   console.log(import.meta.env.VITE_API_URL)
   ```

2. **Build Errors**
   - Error: "Module not found" or "Syntax error"
   - Solution: Check for missing dependencies or syntax errors in your code
   
   ```sh
   # Install missing dependencies
   npm install
   
   # Check for linting errors
   npm run lint
   ```

3. **Docker-related Issues**
   - Error: "Cannot connect to the Docker daemon"
   - Solution: Ensure Docker is running
   
   ```sh
   # Check Docker status
   docker info
   
   # Restart Docker service if needed
   sudo systemctl restart docker  # Linux
   # Or restart Docker Desktop on Windows/macOS
   ```

## Docker Configuration

The frontend is containerized using Docker. The Dockerfile is configured to:

1. Use Node.js 18 Alpine as the base image
2. Install dependencies
3. Build the application
4. Serve the built files using a lightweight server

Environment variables are passed to the container through the docker-compose.yml file:

```yaml
frontend:
  build: ./frontend
  ports:
    - "5173:5173"
  environment:
    - VITE_API_URL=http://localhost:5000/api
    - VITE_BACKEND_URL=http://localhost:5000
  depends_on:
    - web
```

## Contributing

If you'd like to contribute, please fork the repository and create a pull request. Follow the project's coding style and ensure tests pass before submitting.

---

For any questions, feel free to contact the project maintainers.

