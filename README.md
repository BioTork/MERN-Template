# Introduction to Repo
The official repository for building the new webpage for BioTork.

## Deployed Site
Deployed Site: https://biotork-site.herokuapp.com

## Features Implemented and Associated Screenshots

### Screenshots of Website overhaul/redesign
#### Home Page 
#### About Page 
![ScreenShot](https://github.com/BioTork/WebApp/blob/master/client/src/assets/photos/Screenshots/Timeline.png)
![ScreenShot](https://github.com/BioTork/WebApp/blob/master/client/src/assets/photos/Screenshots/cards.png)
![ScreenShot](https://github.com/BioTork/WebApp/blob/master/client/src/assets/photos/Screenshots/inspect.png)
#### Technology Page 
#### Projects Page
#### Press Releases Page
#### Contact Page

### Screenshots of Admin System
#### Login
![ScreenShot](https://github.com/BioTork/WebApp/blob/master/client/src/assets/photos/Screenshots/Login1.JPG)
![ScreenShot](https://github.com/BioTork/WebApp/blob/master/client/src/assets/photos/Screenshots/Login2.JPG)
#### Admin Ability to edit information 


## Instructions to Run
### Local
For running the site locally:
This site utilizes Node.js for the site, and MongoDB for content delivery.
For the Node.js component, make sure the latest version of Node.js is installed from https://nodejs.org/en/ and run the commands “npm install-all” to install the packages required by the site, and “npm client && npm server” to start the frontend and backend of the site.
For the MongoDB component, the site will connect to the MongoDB server specified in a config.js file located in server/config/config.js. (MongoDB Atlas is the easiest way to deploy an MongoDB server)

### Deployed with Heroku
For running the site using Heroku:
Heroku hosting is already setup, to gain access to the Heroku site: create a Heroku account, email Jacob Magnant (jacob@magnant.co) requesting an invite to the site, and the site will be transferred to your Heroku account.
Heroku does not use a config.js file, it stores the required info in process.env, as documented here: https://devcenter.heroku.com/articles/config-vars


## Sources Used
The site utilizes: Node.js, MongoDB, Mongoose, Express.js, React.js, React-Bootstrap, Passport and JQuery. 
This site had it's base code from UF Intro to Software Engineering TAs: https://github.com/UFWebApps/MERN-Template
This site also utilizes user authentication code from Bryant Wilkins: https://github.com/Bryant1-Dev/CEN3031-presentation
This site utilizes the google maps API. 

### Sources Hubert used: 
* User authentication code used and tweaked from Bryant Wilkins
* Source: https://github.com/Bryant1-Dev/CEN3031-presentation
  * Code used in:
    * Frontend:
      * AuthenticatedComponent.js
      * Header.js
      * Login.js
      * Logout.js
      * History.js
    * Backend:
      * Express.js
      * Passport.js
      * Database.js
      * Users.server.controller.js
      * User.model.js
      * Users.server.routes.js
* Navbar code used and tweaked from React Bootstrap
* Source: https://react-bootstrap.github.io/components/navbar/
  * Code used in:
    * Frontend:
      * Header.js
* Social media icon code used from React Social Icons
* Source: https://www.npmjs.com/package/react-social-icons
  * Code used in:
    * Frontend:
      * Footer.js

### Sources Chloe used:
* Frontend
  * About.css
    * Everything about CSS:
      * https://www.w3schools.com/css/default.asp
    * Highlighting tabs:
      * https://www.sitepoint.com/community/t/how-to-highlight-active-tab/4362
    * Image credit:
      * https://unsplash.com/photos/pfX-GsJMtDY
  * About.js
    * Source on flipping cards used for leader cards:
      * https://www.npmjs.com/package/react-flippy
    * Source on tabs used for timeline:
      * https://reactcommunity.org/react-tabs/
    * Creating automatic tabs read from file using a method found in Youtube video:
      * https://www.youtube.com/watch?v=tBaBl7gpYhs&t=1s

### Sources Cooper used:

## Git Etiquette

* Git Keywords
  * To see which files you've modified/added/deleted, and which changes are staged to be commited, use `git status`
  * To view the changes you've made to each file use `git diff`
  * `git add <file_name>` will add the file you specify to staging
  * To stage all files you've changed, use `git add .`
  * To create a new commit with all the files you have staged, type `git commit -m <message>`
  * `git hist` will show you a history of all the commits you have added to your repository

* Before Anything
  * Use `git clone <remote_uri>``
  * Use `git pull` to pull all recent changes in the repository
  * Use `git add -a` to add all new changes
  * Always use comments when committing
  * CREATE A NEW BRANCH FOR EVERY FEATURE
  * Before merging to master, you must have your code reviewed and approved by someone else

* Merging and Pull requests
  * You must take out a pull request in order to merge your changes into master
  * All pull requests require one independent code review and approval
  * Please use `Squash and merge` as it is neater

 * Creating a new branch
  1. `git pull` (To get current repository)
  2. `git checkout -b [name_of_your_new_branch]` (checkout of current branch into new branch)
  3. `git push origin [name_of_your_new_branch]` (push new branch to repository)
  Note: use `git branch -a` to see all branches

 * Remote Repositories
   * Import a remote repository to local machine with: `git remote add <remote_name> <remote_uri>`
   * `git remote` will provide you the names of remote versions of the repository that exist on your local machine.
   * Push progress to your remote branch as frequently as necessary, as this is your only backup (like cloud storage)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project contains an example project board meant to showcase how one can be used. The issues posted to it are not real issues.


## Getting Started
This repository aims to assist you in beginning work on a MERN stack application with a solid file structure as a foundation. To get started make a copy of this template repo for your project teams.

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the root. After this you will run `npm run-script install-all` from the root. From now on run this command anytime you want to install all modules again. This is a script we have defined in package.json .

This app can be deployed directly to heroku since there is a script defined in package.json which will automatically handle building and deploying the app. For more information on deploying to heroku reference the extra resources at the bottom of this file. 

## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


## Available Scripts

In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
