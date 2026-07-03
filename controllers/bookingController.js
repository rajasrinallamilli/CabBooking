import Booking from "../models/BookingSchema.js";
import Car from "../models/CarSchema.js";
import Driver from "../models/Driver.js";

export const bookRide = async (req, res) => {

    try {

        const {
            car,
            pickupLocation,
            dropLocation,
            distance
        } = req.body;

        const selectedCar = await Car.findById(car);

        if (!selectedCar) {

            return res.status(404).json({
                success: false,
                message: "Car Not Found"
            });
        }

        const availableDriver = await Driver.findOne({
            car: selectedCar._id,
            isAvailable: true
        });
        console.log("========== BOOK RIDE ==========");
console.log("Selected Car:", selectedCar._id.toString());
console.log("Assigned Driver:", availableDriver?._id.toString());
console.log("Driver Name:", availableDriver?.name);

        if (!availableDriver) {
            return res.status(400).json({
                success: false,
                message: "No driver available for this car"
            });
        }

        if (!selectedCar.available) {
            return res.status(400).json({
                success: false,
                message: "Car is currently unavailable"
            });
        }

        const fare = distance * selectedCar.pricePerKm;

        const booking = await Booking.create({

            user: req.user.id,

            car,

            driver: availableDriver._id,

            pickupLocation,

            dropLocation,

            distance,

            fare

        });
        console.log("========== BOOK RIDE ==========");
console.log("Selected Car:", selectedCar._id.toString());
console.log("Assigned Driver:", availableDriver._id.toString());
console.log("Driver Name:", availableDriver.name);
console.log("Booking Driver:", booking.driver.toString());
console.log("===============================");

        selectedCar.available = false;
        await selectedCar.save();

        availableDriver.isAvailable = false;
        await availableDriver.save();

        res.status(201).json({

            success: true,

            message: "Ride Booked Successfully",

            booking

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({

            user: req.user.id

        }).populate("car")
        .populate("driver", "name phone averageRating");

        res.status(200).json({

            success: true,

            count: bookings.length,

            bookings

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            });
        }

        // Check if the booking belongs to the logged-in user
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only cancel your own bookings."
            });
        }

        // Check if booking is already cancelled
        if (booking.status === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: "Booking is already cancelled."
            });
        }

        if (booking.status === "Completed") {
            return res.status(400).json({
                success: false,
                message: "Completed rides cannot be cancelled."
            });
        }

        // Cancel booking
        booking.status = "Cancelled";
        await booking.save();

        // Make the car available again
        const car = await Car.findById(booking.car);

        if (car) {
            car.available = true;
            await car.save();
        }

        // Make the driver available again
        const driver = await Driver.findById(booking.driver);

        if (driver) {
            driver.isAvailable = true;
            await driver.save();
        }

        res.status(200).json({
            success: true,
            message: "Booking Cancelled Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()

           .populate("user", "name email phone")
.populate("car")
.populate("driver", "name phone");

        res.status(200).json({

            success: true,

            bookings

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Get Single Booking
export const getBookingById = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id)
            .populate("car")
            .populate("driver", "name phone averageRating");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            });
        }

        // Security check
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        res.status(200).json({
            success: true,
            booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Rate Driver
export const rateDriver = async (req, res) => {

    try {

        const { rating } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            });
        }

        // Only the rider who booked can rate
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (booking.status !== "Completed") {
            return res.status(400).json({
                success: false,
                message: "You can only rate completed rides."
            });
        }

        if (booking.isRated) {
            return res.status(400).json({
                success: false,
                message: "You have already rated this ride."
            });
        }

        const driver = await Driver.findById(booking.driver);

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver Not Found"
            });
        }

        driver.ratings.push(rating);

        const total = driver.ratings.reduce(
            (sum, value) => sum + value,
            0
        );

        driver.averageRating = total / driver.ratings.length;

        await driver.save();

        booking.isRated = true;
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Driver Rated Successfully",
            averageRating: driver.averageRating
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};