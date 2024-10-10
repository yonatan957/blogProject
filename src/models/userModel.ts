import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import { IPost } from "./postModel";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[] | IPost[];
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  profile: {
    bio: String,
    socialLinks: [String],
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

export default mongoose.model<IUser>("User", UserSchema);
