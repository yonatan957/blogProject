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

const CommentSchema = new Schema<IComment>({});

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [CommentSchema],
});


export default mongoose.model<IPost>("Post", PostSchema);
