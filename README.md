[![Netlify Status](https://api.netlify.com/api/v1/badges/eb56adb7-c992-4521-afbf-d5762fb25972/deploy-status)](https://app.netlify.com/sites/tittoh-github-stars/deploys)

# Top Github Stars

A live version of this project can be found here[Top Github Stars](https://tittoh-github-stars.netlify.app)
Alternatively, you can run locally

# Run locally

1. Generate a new token for authentication to the [GitHub API v4](https://docs.github.com/en/graphql) GraphQl endpoint
  Endpoint: `https://api.github.com/graphql`
  Access token scopes: 
    ```
      user
      public_repo
      repo
      repo_deployment
      repo:status
      read:repo_hook
      read:org
      read:public_key
      read:gpg_key
    ```
  You will need this key in the next steps

2. Make a clone of this repository

  `git clone https://github.com/Tittoh/top-github-stars.git`
  then
  `cd top-github-stars`


3. In the root directory of the app, create a `.env` file to hold your github access token and other sensitive data.
  ```
  REACT_APP_GITHUB_KEY = <your-github-key>
  ```

4. Install dependencies with `yarn install`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

# Technologies
- React
- Materia-UI
- Netlify

