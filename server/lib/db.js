import pg from 'pg';
pg.defaults.poolSize = 25;
//const conString = "postgres://vbgqlfpjfnnnkf:df3903e05d4711ce45db00b3fccde25e1e74c6805e97a92cc05c1a3f9d703444@ec2-54-243-197-180.compute-1.amazonaws.com:5432/d88the3bl2c30r";

var client = new pg.Client({
    user: "vbgqlfpjfnnnkf",
    password: "df3903e05d4711ce45db00b3fccde25e1e74c6805e97a92cc05c1a3f9d703444",
    database: "d88the3bl2c30r",
    port: 5432,
    host: "ec2-54-243-197-180.compute-1.amazonaws.com",
    ssl: true
});

export default function(q, callback) {
    client.connect();

    client.query(q, function(err, result) {
        if (err) {
            callback(err, null);
        }
        callback(null, result);

    })
}
