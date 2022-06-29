const { string } = require("@hapi/joi");
const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
    },
    // index: {
    //   type: Number,
    // },
    id_comic: 
      {
        type: String,
        ref: "Comic",
      },
    
    id_chapter: 
     [ {
        type: String,
        ref: "Chapter",
      },
     ]
    
    
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
