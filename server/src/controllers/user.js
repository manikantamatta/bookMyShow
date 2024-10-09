const user_service = require('../services/user');
const logger = require('../utils/winston');

async function createUser(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const userData = req.body;
    // Check if user already exists
    const exists = await user_service.ifUserExists(userData.username);
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the user
    const user = await user_service.createUser(userData);

    // Respond with success
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
      },
    });

  } catch (error) {
    // Log the error and respond with server error
    logger.error(`Error creating user: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserById(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const id = req.params.id;
    const user = await user_service.getById(id);
    res.status(200).json(user);
  } catch (error) {
    // Log the error and respond with server error
    logger.error(`Error getting user by ID: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateUserById(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const id = req.params.id;
    const data = req.body;
    const message = await user_service.updateById(id, data);
    res.status(200).json({status:200,message:message});
  } catch (error) {
    // Log the error and respond with server error
    logger.error(`Error updating user by ID: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createUser, getUserById, updateUserById };
