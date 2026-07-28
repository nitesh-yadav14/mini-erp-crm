require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DIRECT_URL,
});

(async () => {
  try {
    await client.connect();
    console.log("✅ DIRECT_URL Connected!");

    const result = await client.query("SELECT NOW()");
    console.log(result.rows);

    await client.end();
  } catch (err) {
    console.error(err);
  }
})();