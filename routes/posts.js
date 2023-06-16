// routes/goods.js

const express = require('express');

const router = express.Router();

// const posts = [
//     {      
//         postId: "62d6d12cd88cadd496a9e54e",      
//         user: "Developer",      
//         title: "안녕하세요",      
//         createdAt: "2022-07-19T15:43:40.266Z"    
//         },  
//          {      
//         postId: "62d6cc66e28b7aff02e82954",      
//         user: "Developer",      
//         title: "안녕하세요",      
//         createdAt: "2022-07-19T15:23:18.433Z"   
//          }
// ];

// localhost:3000/api/ GET

const Posts = require("../schemas/posts.js");

router.get("/", (req, res) => {
    res.send("default url for posts.js GET Method");
  });

router.post("/posts", async (req, res) => {
    const { user, password, title, content } = req.body;

  const posts = await Posts;
  if (posts.length === 0) {
    return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다" });
  }

  const createdPosts = await Posts.create({ user, password, title, content });

  res.json({ posts: createdPosts });
});


//게시물 조회 API
router.get("/posts", async (req, res) => {
    const posts = await Posts.find();
	res.json({ data: posts });
});

// 게시물 상세 조회 API
router.get("/posts/:_id", async (req, res) => {
	const { _id } = req.params;
    const postsDetail = await Posts.find({ _id: String(_id)});
	if (postsDetail.length === 0) {
        return res.json({ success: false, errormessage: "데이터 형식이 올바르지 않습니다"});
    }
	res.json({ postsDetail });
});
//게시물 수정
router.put("/posts/:_id/:password", async (req, res) => {
    const { _id, password } = req.params;
    const { content } = req.body;

  const editPosts = await Posts.find({ _id: String(_id), password: String(password)});
  if (editPosts.length === 0) {
    return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다" });
  } else if (editPosts._id === 0) {
    return res.status(404).json({ success: false, errorMessage: "게시글 조회에 실패하였습니다" });
  } else { await Posts.updateOne({ password: editPosts.password}, { $set: { content } })}


  res.json({ posts: editPosts });

});

module.exports = router;