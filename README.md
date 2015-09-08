####Setup Instructions:

This is built on nodejs and the express web framework. 

 - Clone the repo
 - Install `node`, `nodemon`, `npm` and `express`. See instructions from their respective web sites since they vary by platform.
 - `cd 2015-assg1-group04`
 - `npm install`
 - Copy `config.yml.example` to `config.yml`. **NOTE: DO NOT COMMIT THIS FILE SINCE IT CONTAINS SENSITIVE INFO** (It should be ignored by default even if you do `git add .`, just don't add it on purpose)
 - `gulp` - This minifies JS/CSS, watches any changes to the source files and rebuilds them.
 - In a new tab on the terminal, `nodemon app.js`
 - Navigate to `localhost:3000` or whatever port you have defined in your config.

To install a new node module (these are like Python libs):

- `npm install module_name --save`  (This installs it in node_modules and also adds it into package.json - which is like requirements.txt). **Do not use `sudo`**

####Development Info:

 - Add any routes in `app.js` (after line 28 as of time of writing this)
 - WRITE ALL LOGIC IN A FILE INSIDE `routes`. Do not write any business logic in app.js
 - html is written in jade, a templating language. Put it inside views. 
 - Styles/JS go inside `public/stylesheets` or `public/javascripts`
 - Hide all new features in a feature flag, so that we can turn it off if it breaks production

####Git Workflow:

 - NO FORCE PUSH
 - NO MERGE, ALWAYS REBASE
 - For a new feature:
 - `git checkout -b feature/my-cool-feature`
 - `git push origin HEAD:feature/my-cool-feature` # create a remote branch
 - Once you're ready,  squash them into one commit for one feature:
 - `git fetch && git rebase -i origin/master` # `fixup` every commit except the first one
 - `git push origin HEAD:master`
 - No need to fork the repo as long as you push development stuff to a feature branch and not master