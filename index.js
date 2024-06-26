import express from "express";
import bodyParser from "body-parser";

var sampleApiKeys = ["qhyghy463321"]

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port, () =>{
    console.log(`Running on port ${port}`);
});

// The landing page on which we can put documentation about the API.
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Get a random joke from the API. No authentication is required.
app.get("/random", (req, res)=>{
    console.log("Random joke was requested");
    const rand = Math.floor(Math.random() * jokes.length);
    res.json(jokes[rand]);
});

// Get a joke by its id. API key is required.
app.get("/id/:id", (req, res) =>{
    var apiKey = req.query.apiKey;
    console.log(`The joke with id ${req.params.id} was requested with the ${apiKey} API key`);
    if(sampleApiKeys.includes(apiKey)){
        const joke = jokes.find((joke)=> joke.id === parseInt(req.params.id));
        res.json(joke);
    } else {
        res.status(401);
        console.log("Permission was denied");
        res.send("Invalid API key or request");
    }
    
});

// Get all the jokes with the requested type. API key is required.
app.get("/filter", (req, res) =>{
    var apiKey = req.query.apiKey;
    console.log(`Jokes with the filter ${type} was requested with the ${apiKey} API key`);
    if(sampleApiKeys.includes(apiKey)){
        var type = req.query.type;
        const data = jokes.filter((joke) => joke.type.toLowerCase() === type.toLowerCase());
        res.json(data);
    } else {
        res.status(401);
        console.log("Permission was denied");
        res.send("Invalid API key or request");
    }
});

// Get all the jokes. API key is required
app.get("/all", (req, res) =>{
    var apiKey = req.query.apiKey;
    console.log(`All jokes were requested with the ${apiKey} API key`);
    if(sampleApiKeys.includes(apiKey)){
        res.json(jokes);
    } else {
        res.status(401);
        console.log("Permission was denied");
        res.send("Invalid API keyor request");
    }
});

//POST a joke. API key is required
app.post("/make", (req, res) => {
    var apiKey = req.query.apiKey;
    console.log(`Joke '${req.body.joke}' was posted with the ${apiKey} API key`);
    if(sampleApiKeys.includes(apiKey) && req.body.type && req.body.joke){
        jokes.push({id:jokes[jokes.length-1].id+1,type:req.body.type,joke:req.body.joke});
        res.status(200);
        res.send("OK");
    } else {
        res.status(401);
        console.log("Permission was denied");
        res.send("Invalid API keyor request");
    }
});
//PUT a joke. API key is required
app.put("/replace/:id", (req, res) => {
    var apiKey = req.query.apiKey;
    console.log(`Joke with id of ${req.body.id} was replaced with a new one with the ${apiKey} API key`);
    if(sampleApiKeys.includes(apiKey) && req.body.type && req.body.joke){
        jokes[jokes.indexOf(jokes.find((joke)=> joke.id === parseInt(req.params.id)))].type = req.body.type;
        jokes[jokes.indexOf(jokes.find((joke)=> joke.id === parseInt(req.params.id)))].joke = req.body.joke; 
        res.status(200);
        res.send("OK");
    } else {
        res.status(401);
        console.log("Permission was denied");
        res.send("Invalid API key or request");
    }
});
//DELETE a joke. API KEY is required
app.delete("/delete/:id", (req, res)=>{
    var apiKey = req.query.apiKey;
    console.log(`Joke with id of ${req.params.id} was removed with the ${apiKey} API key`);
    if(sampleApiKeys.includes(apiKey)){
        jokes.splice(jokes.indexOf(jokes.find((joke)=> joke.id === parseInt(req.params.id))), 1);
        res.status(200);
        res.send("OK");
    }else {
        res.status(401);
        console.log("Permission was denied");
        res.send("Invalid API key or request");
    }
});
var jokes = [
    {"id": 1, "type": "general", "joke": "Why do programmers prefer dark mode? Because light attracts bugs."},
    {"id": 2, "type": "Python", "joke": "Why do Python programmers prefer using 'sys' over 'os'? Because they can't C."},
    {"id": 3, "type": "general", "joke": "Why do Java developers wear glasses? Because they don’t C#."},
    {"id": 4, "type": "JavaScript", "joke": "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings."},
    {"id": 5, "type": "HTML", "joke": "How do you cheer up a web developer? You console them."},
    {"id": 6, "type": "general", "joke": "What’s a programmer’s favorite place to hang out? The Foo Bar."},
    {"id": 7, "type": "SQL", "joke": "Why do SQL developers hate the sea? Because it’s full of JOINs."},
    {"id": 8, "type": "general", "joke": "Why do programmers hate nature? It has too many bugs."},
    {"id": 9, "type": "Java", "joke": "Why do Java developers wear glasses? Because they can't C#."},
    {"id": 10, "type": "Cpp", "joke": "Why was the C++ developer always calm? He had a lot of class."},
    {"id": 11, "type": "general", "joke": "Why don't programmers like to go outside? The sunlight causes too many glares on their screens."},
    {"id": 12, "type": "Python", "joke": "Why did the Python programmer break up with the JavaScript developer? She couldn’t find her closure."},
    {"id": 13, "type": "JavaScript", "joke": "Why was the JavaScript developer so good at art? Because he knew how to draw functions."},
    {"id": 14, "type": "CSS", "joke": "Why do CSS designers prefer responsive design? Because they want their jokes to be flexible."},
    {"id": 15, "type": "HTML", "joke": "Why was the HTML element feeling guilty? It didn’t close its tag."},
    {"id": 16, "type": "general", "joke": "How many programmers does it take to change a light bulb? None, that's a hardware problem."},
    {"id": 17, "type": "SQL", "joke": "Why do SQL developers have trouble with relationships? They can't handle too many joins."},
    {"id": 18, "type": "Java", "joke": "What do you call a Java loop that’s always true? While(true)!" },
    {"id": 19, "type": "general", "joke": "What do you get when you cross a computer and a life guard? A screensaver."},
    {"id": 20, "type": "Swift", "joke": "Why do programmers prefer iOS development over Android? They’re just Swift that way."},
    {"id": 21, "type": "general", "joke": "Why was the computer cold? It left its Windows open."},
    {"id": 22, "type": "general", "joke": "What do you call an iPhone that isn't kidding around? Dead Siri-ous."},
    {"id": 23, "type": "Python", "joke": "Why do Python programmers have a great sense of humor? They use 'import jokes'."},
    {"id": 24, "type": "JavaScript", "joke": "Why did the JavaScript developer go broke? Because he couldn't 'callback' his function."},
    {"id": 25, "type": "general", "joke": "Why do programmers hate the outdoors? There’s too many bugs."},
    {"id": 26, "type": "general", "joke": "Why was the developer unhappy at his job? He wanted arrays."},
    {"id": 27, "type": "JavaScript", "joke": "Why was the JavaScript developer bad at sports? He kept getting null pointer exceptions."},
    {"id": 28, "type": "Python", "joke": "Why did the Python developer hire a therapist? He was tired of handling exceptions alone."},
    {"id": 29, "type": "general", "joke": "How do you know a developer is an extrovert? They look at your shoes when they talk to you."},
    {"id": 30, "type": "general", "joke": "Why was the computer cold? It left its Windows open."},
    {"id": 31, "type": "general", "joke": "Why don’t programmers like nature? It has too many bugs."},
    {"id": 32, "type": "general", "joke": "What’s a programmer’s favorite hangout place? The Foo Bar."},
    {"id": 33, "type": "general", "joke": "Why do Java developers wear glasses? Because they don't see sharp."},
    {"id": 34, "type": "general", "joke": "Why do programmers hate the outdoors? Too many bugs."},
    {"id": 35, "type": "general", "joke": "Why do developers always mix up Christmas and Halloween? Because Oct 31 == Dec 25."},
    {"id": 36, "type": "general", "joke": "Why do programmers prefer dark mode? Because light attracts bugs."},
    {"id": 37, "type": "Python", "joke": "Why do Python programmers wear glasses? Because they can't C."},
    {"id": 38, "type": "JavaScript", "joke": "Why was the JavaScript developer sad? Because he didn't know how to null his feelings."},
    {"id": 39, "type": "general", "joke": "Why did the developer go broke? Because he used up all his cache."},
    {"id": 40, "type": "SQL", "joke": "Why did the SQL query feel so powerful? It was able to join all the tables."},
    {"id": 41, "type": "Java", "joke": "Why did the Java developer always stay calm? He had try-catch."},
    {"id": 42, "type": "general", "joke": "Why was the computer hot? It had too many tabs open."},
    {"id": 43, "type": "general", "joke": "Why did the developer always carry an extra pair of glasses? In case he lost his variables."},
    {"id": 44, "type": "JavaScript", "joke": "Why do JavaScript developers make bad friends? They always promise but never callback."},
    {"id": 45, "type": "general", "joke": "Why do developers prefer using the keyboard? It has all the shortcuts."},
    {"id": 46, "type": "general", "joke": "Why did the computer go to art school? It wanted to learn how to draw."},
    {"id": 47, "type": "Python", "joke": "Why do Python developers use 'self'? Because they can't stand being alone."},
    {"id": 48, "type": "general", "joke": "Why did the developer take a break? He needed to get some REST."},
    {"id": 49, "type": "general", "joke": "Why was the computer so smart? It had a lot of cache."},
    {"id": 50, "type": "JavaScript", "joke": "Why did the JavaScript developer stay at the function? Because he didn't want to leave his scope."},
    {"id": 51, "type": "general", "joke": "Why did the developer feel cold? He had too many windows open."},
    {"id": 52, "type": "general", "joke": "Why did the developer quit his job? He didn't get arrays."},
    {"id": 53, "type": "general", "joke": "Why did the developer go to the beach? To surf the internet."},
    {"id": 54, "type": "general", "joke": "Why did the developer throw his keyboard? He lost his control."},
    {"id": 55, "type": "general", "joke": "Why was the computer stressed? It had too many threads."},
    {"id": 56, "type": "Python", "joke": "Why do Python developers prefer functions? They don't like to get too class-y."},
    {"id": 57, "type": "JavaScript", "joke": "Why did the JavaScript developer go broke? Because he used up all his JSON."},
    {"id": 58, "type": "general", "joke": "Why did the developer go to therapy? To debug his problems."},
    {"id": 59, "type": "general", "joke": "Why was the computer always calm? It had an excellent cache."},
    {"id": 60, "type": "general", "joke": "Why did the developer go to the hardware store? To fix his broken code."},
    {"id": 61, "type": "general", "joke": "Why did the developer feel dizzy? He had too many loops."},
    {"id": 62, "type": "general", "joke": "Why did the developer become an artist? He wanted to draw more attention."},
    {"id": 63, "type": "JavaScript", "joke": "Why did the JavaScript developer buy a ladder? To reach higher scope."},
    {"id": 64, "type": "general", "joke": "Why did the developer get a new computer? Because it had a lot of byte."},
    {"id": 65, "type": "general", "joke": "Why did the developer cross the road? To get to the other site."},
    {"id": 66, "type": "general", "joke": "Why did the developer go fishing? To catch some bugs."},
    {"id": 67, "type": "general", "joke": "Why did the developer stay up all night? He was trying to debug his dreams."},
    {"id": 68, "type": "general", "joke": "Why did the developer bring a ladder to work? To reach new heights in his code."},
    {"id": 69, "type": "Python", "joke": "Why did the Python developer get a promotion? He knew how to handle exceptions."},
    {"id": 70, "type": "JavaScript", "joke": "Why did the JavaScript developer go to therapy? He had too many callback issues."},
    {"id": 71, "type": "general", "joke": "Why did the developer buy a new keyboard? Because he lost his control."},
    {"id": 72, "type": "general", "joke": "Why did the developer feel lost? He couldn't find his path."},
    {"id": 73, "type": "general", "joke": "Why did the developer feel tired? He had too many threads."},
    {"id": 74, "type": "general", "joke": "Why did the developer stay up all night? He was stuck in an infinite loop."},
    {"id": 75, "type": "general", "joke": "Why did the developer bring a plant to work? To add some green to his code."},
    {"id": 76, "type": "general", "joke": "Why did the developer feel cold? His code was not warming up."},
    {"id": 77, "type": "general", "joke": "Why did the developer go to the gym? To work on his core."},
    {"id": 78, "type": "JavaScript", "joke": "Why did the JavaScript developer go to the store? To get some new variables."},
    {"id": 79, "type": "general", "joke": "Why did the developer go to the library? To read some new scripts."},
    {"id": 80, "type": "general", "joke": "Why did the developer get a dog? To help him debug his code."},
    {"id": 81, "type": "general", "joke": "Why did the developer buy a new car? His old one didn’t have enough drive."},
    {"id": 82, "type": "general", "joke": "Why did the developer feel happy? His code compiled successfully."},
    {"id": 83, "type": "general", "joke": "Why did the developer feel lonely? He was in a single-threaded environment."},
    {"id": 84, "type": "JavaScript", "joke": "Why did the JavaScript developer go to the zoo? To see the animal functions."},
    {"id": 85, "type": "Python", "joke": "Why did the Python developer go to the store? To get some new packages."},
    {"id": 86, "type": "general", "joke": "Why did the developer bring a pen to work? To write some new scripts."},
    {"id": 87, "type": "general", "joke": "Why did the developer go to the restaurant? To get some new tables."},
    {"id": 88, "type": "general", "joke": "Why did the developer buy a new house? His old one didn’t have enough space."},
    {"id": 89, "type": "general", "joke": "Why did the developer feel hot? His code was running too fast."},
    {"id": 90, "type": "general", "joke": "Why did the developer get a new monitor? His old one didn’t have enough pixels."},
    {"id": 91, "type": "general", "joke": "Why did the developer go to the doctor? He had too many bugs."},
    {"id": 92, "type": "general", "joke": "Why did the developer feel cold? He was stuck in a frozen loop."},
    {"id": 93, "type": "general", "joke": "Why did the developer buy a new phone? His old one didn’t have enough memory."},
    {"id": 94, "type": "general", "joke": "Why did the developer go to the park? To get some fresh air for his code."},
    {"id": 95, "type": "general", "joke": "Why did the developer feel happy? His code ran without errors."},
    {"id": 96, "type": "general", "joke": "Why did the developer go to the coffee shop? To get some Java."},
    {"id": 97, "type": "general", "joke": "Why did the developer buy a new chair? His old one didn’t have enough support."},
    {"id": 98, "type": "general", "joke": "Why did the developer bring a notebook to work? To write down some new ideas."},
    {"id": 99, "type": "general", "joke": "Why did the developer feel lost? He couldn’t find his way in the code."},
    {"id": 100, "type": "general", "joke": "Why did the developer go to the mall? To get some new threads."}
]