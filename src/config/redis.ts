const redis = require("redis");
// import * as redis from "redis";

const client = redis.createClient({
  url: Bun.env.REDIS_URL,
  username: Bun.env.REDIS_USER,
  password: Bun.env.REDIS_PASSWORD,
});

client.on("connect", () => console.log("Redis Connected"));

client.on("ready", () => console.log("Redis is ready to use"));

client.on("error", (err: any) => console.log(err.message));

client.on("end", () => {
  console.log("Client disconnected from redis");
});

process.on("SIGINT", () => {
  console.log("quit");
  client.quit();
  client.disconnect();
});

client.connect().then();

module.exports = client;
