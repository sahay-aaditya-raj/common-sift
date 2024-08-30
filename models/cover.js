import mongoose, { Schema, models } from "mongoose";

const coverSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        link:{
            type: String,
            required: true
        },
        image: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Cover = models.Cover || mongoose.model("Cover", coverSchema);
export default Cover;
