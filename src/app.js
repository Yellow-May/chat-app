const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/users');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/register", async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ message: "Please provide both email and password" })
      }

      const user = await UserModel.create({ email, password });
      const token = jwt.sign({ id: user._id }, 'Secret', { expiresIn: "3 hours" });

      return res.status(200).json({ message: "Registration successfully", data: { user, token } })

   } catch (error) {
      console.log(error);

      let errorObj = {
         statusCode: 500,
         message: `There was an internal error, Try again later`,
      };

      if (error.code === 11000) {
         const message = `email ${error.keyValue.email} already registered, please login`;
         errorObj = {
            statusCode: 400,
            message,
         };
      }

      const { statusCode, message } = errorObj;
      res.status(statusCode).json({ message });
   }
})

app.post("/auth/login", async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ message: "Please provide both email and password" })
      }

      const user = await UserModel.findOne({ email })
      if (!user) {
         return res.status(400).json({ message: "No user with such email" })
      }

      const isCorrect = await user.comparePassword(password);
      if (!isCorrect) {
         return res.status(400).json({ message: "Incorrect password" })
      }

      const token = jwt.sign({ id: user._id }, 'Secret', { expiresIn: "3 hours" });

      return res.status(200).json({ message: "Login successfully", data: { user, token } })

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" })
   }
})

module.exports = app