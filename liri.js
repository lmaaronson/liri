require("dotenv").config(); //brings in keys from .env file

var request = require("request");
var inquirer = require("inquirer");
var keys = require("./keys.js"); //this opens the file keys which has the twitter and spotify API keys


var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


inquirer.prompt([{
    type: "list",
    name: "whichAPI",
    message: "Pick one",
    choices: ["my-twitter", "spotify-me", "movie-this", "do-what-it-says"]
  }, ])

  .then(function (user) {

    if (user.whichAPI === "my-twiiter") {
      var params = {
        lmaaronson: 'nodejs'
      };
      client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
          console.log(tweets);
          console.log("here are your last 20 tweets");
        }
      });






    } else if (user.whichAPI === "spotify-me") {
      console.log("what song?");
      inquirer.prompt([{
            type: "input",
            name: "song",
            message: "write the name of a song",
          },


        ])

        .then(function (user) {
          spotify.search({
            type: 'track',
            query: user.song //finds the song the user inputs
          }, function (err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            } else if (user.song) //this is the song name
              // console.log(JSON.stringify(data, null, 4));  //data instead of body since that is what it is called in spotify
              console.log("name of song: " + data.tracks.items[0].name);
            console.log("name of artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("name of album: " + data.tracks.items[0].album.name);
            console.log("Play the song: " + data.tracks.items[0].external_urls.spotify);
          });

        });


    } else if (user.whichAPI === "movie-this") {
      console.log("what movie?");
      inquirer.prompt([{
          type: "input",
          name: "movie",
          message: "which one",
        }, ])

        .then(function (user) {
          var queryUrl = "http://www.omdbapi.com/?t=" + user.movie + "&y=&plot=short&apikey=trilogy";
          console.log(queryUrl);
          var jsonData = JSON.parse(body);
          request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              console.log("Title: " + JSONData.Title);
              console.log("Year: " + JSONnData.Year);
              console.log("Rated: " + JSONnData.Rated);
              console.log("IMDB Rating: " + JSONData.imdbRating);
              console.log("Country: " + JSONData.Country);
              console.log("Language: " + JSONData.Language);
              console.log("Plot: " + JSONData.Plot);
              console.log("Actors: " + JSONData.Actors);
              console.log("Rotten Tomatoes Rating: " + JSONData.Ratings[1].Value);
            }
          });


          // var movieName = "minions"
          // var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
          //  request(queryUrl, function (error, response, body) {
          //  if (!error && response.statusCode === 200) { // If the request is successful
          //  console.log("Release Year: " + JSON.parse(body).Year); // Parse the body of the site and recover just the imdbRating
          //  console.log(response)
          // }
          // })


        });

    } else if (user.whichAPI === "do-what-it-says") {
      console.log("i get to choose for you!");
      fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
          return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);

      });
    }
  });