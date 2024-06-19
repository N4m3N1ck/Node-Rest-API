import express from "express";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.listen(port, () =>{
    console.log(`Running on port ${port}`);
});
// The landing page on which we can put documentation about the API.
app.get("/", (req, res) => {
    res.render("index.ejs");
});