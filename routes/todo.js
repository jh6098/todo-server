const express = require("express");
const router = express.Router();

const { getTodos, updateCompleted } = require("../controllers/todo");
router.route("/").get(getTodos);
router.route("/completed").put(updateCompleted);
module.exports = router;
