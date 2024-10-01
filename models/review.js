import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to Product
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
