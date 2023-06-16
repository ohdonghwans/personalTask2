const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
  });
  
  postsSchema.set('timestamps', true);


  // postsSchema.set('ObjectId', {
  //   _id: "postId"
  // });
// _id를 postid로 바꿔야하는데 어케하냐이거 
//   postsSchema.virtual('postId').get(function(){
//     return this._id.toHexString();
// });
//   postsSchema.set('toJSON', {
//     virtuals: true
// });

  module.exports = mongoose.model("Posts", postsSchema);