import { Router } from "express";
// import { messagesManager } from "../Dao/managers/messagesManager.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("chat");
});

export default router;
