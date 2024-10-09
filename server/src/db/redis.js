const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost',
  port: 6379,        
});

// Function to test Redis connection
async function testRedis() {
  try {
    // Set a value in Redis
    await redis.set('test_key', 'Hello, Redis!');

    // Retrieve the value from Redis
    const value = await redis.get('test_key');

    // Print the value to the console
    console.log('Value from Redis:', value);

    // Close the Redis connection
    redis.quit();
  } catch (err) {
    console.error('Error:', err);
  }
}

module.exports = redis;

// #TODO- close the redis connection after shutdown. Close the mongoDb connection also.

