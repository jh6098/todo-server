const connection = require("../db/mysql_connection");

// @desc        모든 할일 목록을 불러오는 API
// @route       GET /api/v1/todos?offset=
// @request
// @response    success, items[], cnt

exports.getTodos = async (req, res, next) => {
  let offset = req.query.offset;

  if (offset == null) {
    res.status(401).json({ success: false });
  }

  let query = `select * from todo limit ${offset},25`;
  try {
    [rows] = await connection.query(query);
    res.status(200).json({ success: true, cnt: rows.length, items: rows });
  } catch (e) {
    res.status(500).json({ success: false, e });
  }
};

// @desc        완료 여부 체크 및 해제 하는 API
// @route       PUT /api/v1/todos/completed
// @request     todo_id,completed (boolean)
// @response    success

exports.updateCompleted = async (req, res, next) => {
  let completed = req.body.completed;
  let todo_id = req.body.todo_id;

  if (completed == null || todo_id == null) {
    res.status(401).json({ success: false });
  }

  let query = `update todo set completed = ${completed} where id = ${todo_id}`;
  try {
    [result] = await connection.query(query);
    if (!result.changedRows == 1) {
      res.status(400).json({ success: false });
      return;
    }
    res.status(200).json({ success: true, result });
  } catch (e) {
    res.status(500).json({ success: false, e });
  }
};
