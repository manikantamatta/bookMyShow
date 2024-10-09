const User = require('../models/user');
const utils = require('../utils/utils'); 

/**
 * Create a new user
 * @param {Object} data - User data including username, mobile_no, password, address, personal_details, and role.
 * @returns {Object} - Newly created user with id and username.
 * @throws {Error} - Throws an error if there is an issue creating the user.
 */
async function createUser(data) {
  const { username, mobile_no, password, address, personal_details, role } = data;

  try {
    // Hash the password
    const hashedPassword = await utils.hashPassword(password);

    // Create a new user object
    const newUser = new User({
      username, 
      mobile_no,
      password: hashedPassword,
      role: role || 'user',
      address: address || {},
      personal_details: personal_details || {},
    });

    const savedUser = await newUser.save();
    return {
      id: savedUser._id,
      username: savedUser.username,
    };

  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
}

/**
 * Check if a user exists by username
 * @param {String} username - The username to check.
 * @returns {Boolean} - True if the user exists, otherwise false.
 * @throws {Error} - Throws an error if there is an issue checking user existence.
 */
async function ifUserExists(username) {
  try {
    const user = await User.findOne({ username: username });
    return !!user; // Return true if user exists, false otherwise
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw new Error("Error checking user existence");
  }
}

/**
 * Get user by ID
 * @param {String} id - The ID of the user to retrieve.
 * @returns {Object} - The user object without sensitive fields.
 * @throws {Error} - Throws an error if there is an issue retrieving the user.
 */
async function getById(id) {
  try {
    const user = await User.findById(id, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Error getting user");
  }
}

/**
 * Update user by ID
 * @param {String} id - The ID of the user to update.
 * @param {Object} data - The data to update the user with.
 * @returns {Object} - Result of the update operation.
 * @throws {Error} - Throws an error if there is an issue updating the user.
 */
async function updateById(id, data) {
  try {
    const result = await User.updateOne({ _id: id }, data);
    if (result.matchedCount === 0) {
      throw new Error("No user found to update");
    }
    return { message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
}

module.exports = { createUser, ifUserExists, getById, updateById };
