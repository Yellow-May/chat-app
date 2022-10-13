const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { v4: uuid } = require("uuid");
const authMiddleware = require('./middlewares/auth');
const UserModel = require('./models/users');
const ChatModel = require('./models/chats')

router.post("/auth/register", async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ message: "Please provide both email and password" })
      }

      const user = await UserModel.create({ email, password });
      const accessToken = jwt.sign({ id: user._id }, 'Secret', { expiresIn: "3 hours" });

      return res.status(200).json({ message: "Registration successfully", data: { user: { _id: user._id, email: user.email }, accessToken } })

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

router.post("/auth/login", async (req, res) => {
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

      const accessToken = jwt.sign({ id: user._id }, 'Secret', { expiresIn: "3 hours" });

      return res.status(200).json({ message: "Login successfully", data: { user: { _id: user._id, email: user.email }, accessToken } })

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" })
   }
})

router.get('/users', authMiddleware, async (req, res) => {
   const { _id } = req.user;

   try {
      const ignore_ids = await ChatModel.find({ participants: { $in: _id } }).select("participants").transform(async res => {
         if (res == null) return res;

         return [...res.map((e) => e.participants.find(f => !f.equals(_id))), _id];
      })

      const users = await UserModel.find({ _id: { $nin: ignore_ids } }).select("email");

      res.status(200).json(users);
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" })
   }
})

router.get('/users/:id', authMiddleware, async (req, res) => {
   const { id } = req.params;

   try {
      const user = await UserModel.findById(id).select("email");

      if (!user) return res.status(404).json({ message: "No user with such id" })

      res.status(200).json(user);
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" })
   }
})

router.get("/contacts", authMiddleware, async (req, res) => {
   try {
      const { _id } = req.user;
      const contacts = await ChatModel.find({ participants: { $in: _id } }).select("participants seen").transform(async res => {
         if (res == null) return res;

         return await Promise.all(res.map(async e => {
            const contactId = e.participants.find(f => !f.equals(_id));
            const contact = await UserModel.findById(contactId).select("email");
            const unread = e.seen.length > 0 ? !e.seen.includes(_id) : false;
            return { chatid: e._id, contact, unread }
         }))
      })

      res.status(200).json(contacts)
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" })
   }
})

router.post("/chats", authMiddleware, async (req, res) => {
   try {
      const { _id } = req.user;
      const { contactid } = req.body;

      const chat = await ChatModel.create({ room: uuid(), participants: [_id, contactid] });

      res.status(201).json(chat)
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" })
   }
})

router.get("/chats/:chatid", authMiddleware, async (req, res) => {
   try {
      const { chatid } = req.params;
      const chats = await ChatModel.findById(chatid).select("room messages");

      res.status(200).json(chats)
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" })
   }
})

router.patch("/chats/:chatid", authMiddleware, async (req, res) => {
   try {
      const { _id } = req.user;
      const { chatid } = req.params;
      const chats = await ChatModel.findById(chatid)
      if (!chats.seen.includes(_id)) {
         chats.seen.push(_id);
      }
      await chats.save();

      res.status(200).json({ message: 'updated' })
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" })
   }
})

module.exports = router