require("dotenv").config(); //brings in keys from .env file

var request = require("request");
var inquirer = require("inquirer");
var keys = require("./keys.js"); //this opens the file keys which has the twitter and spotify API keys

var fs = require("fs")

var Twitter = require('twitter');
var Twitterclient = new Twitter(
  keys.twitter                   //brings keys info into my Twitter object
);


var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var firstChoice = process.argv[2]   //3rd item in the terminal input
console.log(firstChoice)

var secondChoice = process.argv[3]   //4th item in the terminal input
console.log(secondChoice)



inquirer.prompt([{
    type: "list",
    name: "whichAPI",
    message: "Pick one",
    choices: ["my-twitter", "spotify-me", "movie-this", "do-what-it-says"]
  }, 
])

.then(function (user) {

    //either for loop to limit to 20 or check parameters to limit to 20

    if (user.whichAPI === "my-twitter") {
      var params = {
        screen_name: 'lmaaronson'
      };
      
      console.log(params)
      Twitterclient.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
          for (var i = 0; i < 4; i++) {
            console.log(tweets[i].created_at);
            console.log("");
            console.log(tweets[i].text);
        
        }
      }
      
  });
} 


    else if (user.whichAPI === "spotify-me") {
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
          request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              var jsonData = JSON.parse(body)
              console.log("Title: " + jsonData.Title);
              console.log("Year: " + jsonData.Year);
              console.log("Rated: " + jsonData.Rated);
              console.log("IMDB Rating: " + jsonData.imdbRating);
              console.log("Country: " + jsonData.Country);
              console.log("Language: " + jsonData.Language);
              console.log("Plot: " + jsonData.Plot);
              console.log("Actors: " + jsonData.Actors);
              console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
            }
            console.log(error)
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