const { Schema, model } = require("mongoose");
// const { isEmail } = require("validator");
// const bcrypt = require("bcrypt");

const articleSchema = Schema({
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft", 
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    // ref: "User", // Fait référence au modèle User
    // required: true,
  },
});

module.exports = model("Article", articleSchema);
