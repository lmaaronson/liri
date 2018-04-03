require("dotenv").config();

var keys = require("./keys")
console.log (keys)

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


//  0      1        2         3
// node liri.js  my-tweets  top 10
// node liri.js  spotify    my songs

//depending which i pick, then something will happen

//argument vector process.argv[2] + process.argv[3]






//set up an argument to take in the command line
//define the parts of the command line and parse
//

var whichAPI=process.argv[2];

if (whichAPI=="my tweets"){
console.log("you picked twitter")

}