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

