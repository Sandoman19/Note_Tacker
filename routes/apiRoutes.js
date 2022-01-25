const router = require("express").Router();
const fs = require("fs");
const uuid = require('uuid');

// POST note
router.post("/notes", function(req, res) {

  fs.readFile("./db/db.json", "utf8", function(err, data) {
    if (err) throw err;
    let raw = JSON.parse(data);
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

// GET note
router.get("/notes", function(req, res) {

  fs.readFile("./db/db.json", "utf8", function(err, data) {
      
    if (err) throw err;
    res.json(JSON.parse(data));

  });

});

// DELETE note
router.delete("/notes/:id", function(req, res) {
 
  let id = req.params.id;

  fs.readFile("./db/db.json", "utf8", function(err, data) {
    if (err) throw err;
    let raw = JSON.parse(data);
    for (let i = 0; i < raw.length; i++) {
      if (id == raw[i].id) {
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