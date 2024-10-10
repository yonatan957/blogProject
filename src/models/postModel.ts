import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface IPost extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>({
  content: { type: String, required: true ,minlength: 2, maxlength: 200},
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true, minlength: 2, maxlength: 100 },
  content: { type: String, required: true, minlength: 2 },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [CommentSchema],
});


export default mongoose.model<IPost>("Post", PostSchema);
