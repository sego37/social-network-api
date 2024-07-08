const { ObjectId } = require('mongoose').Types;
const { User, Course } = require('../models');


module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("friends");

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      // const course = await Course.findOneAndUpdate(
      //   { users: req.params.userId },
      //   { $pull: { users: req.params.userId } },
      //   { new: true }
      // );

      // if (!course) {
      //   return res.status(404).json({
      //     message: 'User deleted, but no courses found',
      //   });
      // }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: {
            username: req.body.username,
            email: req.body.email
          }
        }
        );

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      res.json({ message: 'User successfully updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $push: {
            friends: req.params.friendId
          }
        }
        );

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      res.json({ message: 'User successfully updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeFriend (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $pull: {
            friends: req.params.friendId
          }
        }
        );

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      res.json({ message: 'User successfully updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}