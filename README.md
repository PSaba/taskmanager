# taskmanager
A way to organize tasks between many different groups of people

#How to Get Started
1. Clone master branch
2. In the projects directory run
```npm install```
3. Download and install *Postgres* at https://postgresapp.com/
4. Open the Postgres App and initialize your server to port 5432 (default port).
5. Open up the command line within the App with psql by double-clicking any of the default databases.
6. Create a new database by running:
    ```CREATE DATABASE "tasks";```
6. Back in the projects directory, launch the Sequelize migrations:
  ```sequelize db:migrate```
7. Then, launch the website by running this command:
  ```npm start```
  Go to  http://localhost:3000 and then use as normal.
8. If you want to test: 
    a. backend run:
  ```npm test```

    In package.json,
    "scripts": {
        "start": "node ./bin/www",
        "test": "mocha",
      },

    b. Frontent instead, make sure that *testcafe* is running. Then, open two tabs that are both in the correct directory. First run:
    ```npm start```
      
      In package.json,
      "scripts": {
        "start": "node ./bin/www",
        "test": ""testcafe chrome testing/",
      },

    Then run, 
    ```npm test```
    *Note* While running front-end there are 2 sets of tasks tests. Do not worry if 1 fails. This is due to the differences between browsers/systems.

# Pages

1. Sign In page
 Can sign in or open new modal that will allow the user to sign up. Once they are signed up, the user can log in. 
 If no input, will reject account.

2. Profile Page
 Displays name, handle.
 Has options to add categories, or join or create new groups across top of page, or edit the name or password.
 User can create new task with due date, category, and description.
 Also lists all of the user's current uncompleted tasks, with button for user to click when task is accomplished.
 Also, using sockets and ajax, whenever new task is added, by this user or another (see group page), the new task will be added to the user's task list.

3. Group Page
 Displays name, handle, current members.
 Lists all of the uncompleted and completed tasks in different lists. 
 Top navbar is same as profile page.
 Also using ajax to remove tasks when completed.
 Can assign tasks to yourself and other people.


Front-end:
- HTML/CSS
- Javascript/jQuery
- Ajax
- Bootstrap
- EJS Templating

Back-end:
- Node.js
- ExpressJS
- PostgresQL
- Sequelize
- Sequelize-cli
- Socket

Testing:
- Mocha
- Chai
- Chai-http
- socket.io-client
