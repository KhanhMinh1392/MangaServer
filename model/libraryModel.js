const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibrarySchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
    },
    comic: [
      {
        type: String,
        ref: "Comic",
      },
    ],
  },
  { timestamps: true }
);

const Library = mongoose.model("Library", LibrarySchema);

module.exports = Library;
