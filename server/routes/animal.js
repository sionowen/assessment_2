var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';
var randomNumber = require('./random');


router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM zoo', function (err, result) {
      done();



      res.send(result.rows);
    });
  });
});
router.post('/', function (req, res) {

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query( 'INSERT INTO zoo (animal, count_of)' +
                  'values($1, $2)', [req.body.animal, randomNumber(1, 100)],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                    }

                    res.sendStatus(201);
                  });

  });
});


module.exports = router;
