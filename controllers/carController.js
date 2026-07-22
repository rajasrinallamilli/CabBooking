import Car from "../models/CarSchema.js";

// Add New Car
export const addCar = async (req, res) => {

    try {

        const {
            carName,
            carType,
            brand,
            seats,
            pricePerKm
        } = req.body;

        const newCar = await Car.create({
            carName,
            carType,
            brand,
            seats,
            pricePerKm,
            image: req.file ? req.file.filename : ""
        });

        res.status(201).json({
            success: true,
            message: "Car Added Successfully",
            car: newCar
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Cars
export const getAllCars = async (req, res) => {

    try {

        const cars = await Car.find();

        res.status(200).json({
            success: true,
            count: cars.length,
            cars
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Single Car
export const getCarById = async (req, res) => {

    try {

        const car = await Car.findById(req.params.id);

        if (!car) {

            return res.status(404).json({
                success: false,
                message: "Car Not Found"
            });

        }

        res.status(200).json({
            success: true,
            car
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Car
export const updateCar = async (req, res) => {

    try {

        // If a new image is uploaded, update the image field
        if (req.file) {
            req.body.image = req.file.filename;
        }

        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        // Check if car exists
        if (!updatedCar) {
            return res.status(404).json({
                success: false,
                message: "Car Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Car Updated Successfully",
            car: updatedCar
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Car
export const deleteCar = async (req, res) => {

    try {

        await Car.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Car Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
