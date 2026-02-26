const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres.vstqzleksszcpphyuggc:aryanshete%402705@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => {
        console.log("Connected successfully to 5432!");
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log("Time from DB:", res.rows[0]);
        client.end();
    })
    .catch(err => {
        console.error("Connection error:", err);
        client.end();
    });
