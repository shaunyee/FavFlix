An application that utilizes the movie database. It allows users to save current movies their own profile. Users can favorite the movies and comment on each of the movies. This app is built with reactjs for the front-end, MongoDb for the back-end and Graphql.

To use locally, 
1) signup for an api key with the movie database at https://www.themoviedb.org.
2) signup with Mlab for a hosted database
3) create a variables.env file in the root of the project and add your mlab apikey as MONGO_DB_URI=key goes here.
4) in addition to you mlab apikey, you will need to create an app secret for your jwt tokens for auth. Name the variable APP_SECRET= key goes here.
5) create a config.js file in the src folder of the front-end files. Setup the file with your movie database key const API_KEY = key goes here, and export API_KEY as a named export.

TODOs:
1) fix functionality of when moving from the main movies page to a movies detail page.  If the user is on any page past 1, clicks on a movies detail page, and decides to go back to the main page, I would like to make it so the user will be returned to the page they were previously on.  Currently the user will be returned to page 1.
2) incorporate the fandango api to provide users with movie times.
3)