# taskmanager
A way to organize tasks between many different groups of people

#How to Get Started
1. Clone master branch
2. In correct directory run
```npm install```
3. Download and install Postgres at https://postgresapp.com/
4. Open the Postgres App and initialize your server
5. Launch Sequelize migrations:
  ```node_modules/.bin/sequelize db:migrate```
6. Then, launch the website by running this command:
  ```npm start```
7. If you want to test instead, run:
  ```npm test```

# Pages

1. Sign In page
 Can sign in or open new modal that will allow the user to sign up.

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
- socket-tester
- socket.io-client
