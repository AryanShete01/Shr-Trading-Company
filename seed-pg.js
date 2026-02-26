const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
    connectionString: 'postgresql://postgres.vstqzleksszcpphyuggc:aryanshete%402705@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres',
    ssl: { rejectUnauthorized: false }
});

async function runDataSeed() {
    try {
        await client.connect();
        console.log("Connected to Supabase via Session Pooler!");

        const res = await client.query("SELECT * FROM \"Admin\" WHERE username = 'admin'");
        if (res.rows.length === 0) {
            console.log("Admin missing. Hashing password...");
            const hash = await bcrypt.hash('password123', 10);

            const insertQuery = `
        INSERT INTO "Admin" (id, username, password)
        VALUES ($1, $2, $3)
      `;
            // Generate simple cuid-like string
            const id = 'c' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

            await client.query(insertQuery, [id, 'admin', hash]);
            console.log("Admin account (admin / password123) successfully created!");
        } else {
            console.log("Admin account already exists!");

            // Update password just in case
            console.log("Resetting password to password123 just in case...");
            const hash = await bcrypt.hash('password123', 10);
            await client.query(`UPDATE "Admin" SET password = $1 WHERE username = 'admin'`, [hash]);
            console.log("Password reset successfully.");
        }
    } catch (err) {
        console.error("Error during seed:", err);
    } finally {
        await client.end();
    }
}

runDataSeed();
