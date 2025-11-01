import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getAllContacts", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getChatsPartner = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnersId = [
      ...new Set(
        messages
          .map((msg) => {
            // check if senderId and recieverId are invalid
            if (!msg.senderId || !msg.receiverId) return null;

            return msg.senderId.toString() === loggedInUserId.toString()
              ? msg.receiverId.toString()
              : msg.senderId.toString();
          })
          .filter((id) => id !== null)
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnersId },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in getChatPartners ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error with getting messages");
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    if (!text && !image)
      return res.status(400).json({ message: "Text or Image is required" });

    const recieverExist = await User.exists({ _id: receiverId });

    if (!recieverExist)
      return res.status(404).json({ message: "Reciever not found" });

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error sending message", error.message);
  }
};
