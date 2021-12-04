var db = require("../src/Database")
const SongModel = {};

// SongModel.search = (name: any) => {
//     const parameters = [];

//     let baseSQL = `SELECT s.*
//       FROM song s`;
  
//     if (name) {
//       baseSQL += ` AND s.name = ? `;
//       parameters.push(name);
//     }

//     return db
//       .DB(baseSQL, parameters)
//       .then(([results, fields]) => {
//         return Promise.resolve(results);
//       })
//       .catch((err: any) => Promise.reject(err));
// }

module.exports = SongModel;