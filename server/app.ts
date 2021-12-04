import express = require("express");
var SongModel = require("../server/models/songs");
const app = express()

app.set("port", process.env.PORT || 3001);

app.get('/', (req: any, res) => {
    res.send("this is the index page");
})

// app.get("/songs", function (req, res, next) {
//     let name = req.query.name;
  
//     // SongModel.search(name)
//     //   .then((results: string | any[]) => {
//     //     if (results && results.length) {
//     //       res.send({
//     //         resultsStatus: "info",
//     //         message: `${results.length} song found`,
//     //         results: results,
//     //       });
//     //     } else {
//     //       res.send({
//     //         resultsStatus: "info",
//     //         message: `0 song found`,
//     //       });
//     //     }
//     //   })
//     //   .catch((err: any) => next(err));
//   });

export default app;
