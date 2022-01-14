const router = require("express").Router();
const fs = require("fs");
const uuid = require('uuid');
// API GET request to read and display db.json
router.get("/notes", function(req, res) {

  fs.readFile("./db/db.json", "utf8", function(err, data) {
      
    if (err) throw err;
    res.json(JSON.parse(data));

  });

});

// API POST request saves and writes note to db.json.
router.post("/notes", function(req, res) {

  fs.readFile("./db/db.json", "utf8", function(err, data) {
    if (err) throw err;
    // Parse and store db.json data to raw
    let raw = JSON.parse(data);
    // push note
    raw.push({
      ...req.body,
      id: uuid.v4(),
    });
 
    fs.writeFile("./db/db.json", JSON.stringify(raw), function(err) {
      if(err) return err;
      console.log("write success");
    });
  });

  res.end();
  
});

// API DELETE request to delete note
router.delete("/notes/:id", function(req, res) {

  // grab id and store 
  let id = req.params.id;

  fs.readFile("./db/db.json", "utf8", function(err, data) {
    if (err) throw err;
    // Parse and store db.json data to raw
    let raw = JSON.parse(data);
    // Loop through raw
    for (let i = 0; i < raw.length; i++) {
      // id matches id in raw
      if (id == raw[i].id) {
        // If match, splice the indexed note out of raw 
        raw.splice(i,1);

        fs.writeFile("./db/db.json", JSON.stringify(raw), function(err) {
          if (err) throw err;
          console.log("note deleted");
        });
      };
    };
  });
  
  res.end(); 

});

module.exports = router;