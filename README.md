# DevSync-backend
Backend for the DevSync website

# Technologies
## The technologies used in the app are
1. Express.js
2. Node.js
3. Typescript
4. JsonWebToken & CookieParser
5. Bcrypt.js
6. Passport.js & Google/Github oAuth

# Api routes doc
## The routes start with a /api and are divided into the following parts:

# /auth:
##  /register: for normal email-password user registration :)
##  /login : for email-password authentication
##  /google : for google authentication, opening the path in browser window will redirect you to the google signin page, and will redirect back to the homepage
##  /github : same as google authentication, but from github
##  /check : to get user info and loggedIn status

