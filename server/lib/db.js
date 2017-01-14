//import pg from 'pg';
var pg = require('pg');
var Pool = require('pg-pool');
//const conString = "postgres://vbgqlfpjfnnnkf:df3903e05d4711ce45db00b3fccde25e1e74c6805e97a92cc05c1a3f9d703444@ec2-54-243-197-180.compute-1.amazonaws.com:5432/d88the3bl2c30r";

var pool = new Pool({
    user: "vbgqlfpjfnnnkf",
    password: "df3903e05d4711ce45db00b3fccde25e1e74c6805e97a92cc05c1a3f9d703444",
    database: "d88the3bl2c30r",
    port: 5432,
    host: "ec2-54-243-197-180.compute-1.amazonaws.com",
    ssl: true,
    idleTimeoutMillis: 30000,
});

//var pool = new Pool(config);

export default function(q, callback) {
    pool.connect(function(error, client, done) {
        if (error) {
            callback(error, null);
        }
        client.query(q, function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {
                callback(err, null)
            }

            callback(null, result)
        });
    });


}
pool.on('error', function(err, client) {
    console.error('idle client error', err.message, err.stack)
});



/*
export default function(q, callback) {
    client.connect();
  
    client.query(q, function(err, result) {
        if (err) {
            callback(err, null);
        }
        callback(null, result);
    })
  .on('end', function() {
    
  });
  client.end(function (err) {
      if (err) throw err;
    console.log('close');
    });
} */
