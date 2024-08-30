import mongoose, { Schema, models } from "mongoose";

const consumerSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        uname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: false
        },
        sex: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: false
        }
    },
    { timestamps: true }
);

const Consumer = models.Consumer || mongoose.model("Consumer", consumerSchema);
export default Consumer;
