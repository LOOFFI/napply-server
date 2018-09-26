const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // document structure & rules
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^.+@.+\..+$/
    },
    company: { type: String, required: true },
    birthday: { type: Date, required: true },
    phoneNumber: { type: Number, required: true },
    encryptedPassword: { type: String, required: true },
    role: {
      type: String,
      enum: ["normal", "admin"],
      required: true,
      default: "normal"
    }
  },
  {
    // additional settings for Schema constructor function (class)
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
