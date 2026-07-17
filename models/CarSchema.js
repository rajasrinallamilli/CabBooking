import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
{
    carName: {
        type: String,
        required: true,
    },

    carType: {
        type: String,
        enum: ["Mini", "Sedan", "SUV", "Luxury"],
        required: true,
    },

    brand: {
        type: String,
        required: true,
    },

    seats: {
        type: Number,
        required: true,
    },

    pricePerKm: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        default: "",
    },

    available: {
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true,
});
const Car = mongoose.models.Car || mongoose.model("Car", carSchema);
export default Car