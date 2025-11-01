import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllContacts,
  getMessageByUserId,
  sendMessage,
  getChatsPartner,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/contacts", protectRoute, getAllContacts);
router.get("/chats", protectRoute, getChatsPartner);

router.get("/:id", protectRoute, getMessageByUserId);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
