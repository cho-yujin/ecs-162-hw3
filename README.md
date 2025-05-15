# ECS 162 Project 2: Ananya and Yujin

## What we used
We used Svelte to build our project. The main page of our project is `App.svelte`. This page imports components and functions from other files. All parts of our project are separated into components for clearer structuring.

The `components` folder contains the `Navbar` and `Article` components.

The `logic` folder contains functions for retrieving data from the NYT API and Flask backend. These functions are placed in a separate .ts file so that they can be imported into the unit testing file.

## Running our project

### Setup
Our frontend folder has a `package.json` file with the required dependencies. Before running our project, run these commands:
```
cd frontend 
npm install
npm run dev
```

Our submission does not include the `.env` files or the `docker-compose` files. They should be added into the project folder prior to running with the proper API key.

### Running the project
The project can be ran in `dev` or `prod` mode.

**Command to run in Dev mode:**
```
docker-compose -f docker-compose.dev.yml up --build
```

**Command to run in Prod mode:**
```
docker-compose -f docker-compose.prod.yml up --build
```

## Running our unit tests
Before running our unit tests, run these commands.
```
npm install -D vitest
npm install -D jsdom
```

The unit tests can then be ran in the `frontend` folder with the command `npm test`.
