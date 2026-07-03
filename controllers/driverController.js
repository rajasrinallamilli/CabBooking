import Driver from "../models/Driver.js";
import Booking from "../models/BookingSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/CarSchema.js";

// Register Driver
export const registerDriver = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone,
            licenseNumber,
            car
        } = req.body;

        const existingDriver = await Driver.findOne({ email });

        if (existingDriver) {
            return res.status(400).json({
                success: false,
                message: "Driver already exists"
            });
        }

        const existingCar = await Car.findById(car);

        if (!existingCar) {
            return res.status(404).json({
                success: false,
                message: "Car Not Found"
            });
        }

        const driverWithCar = await Driver.findOne({ car });

if (driverWithCar) {

    return res.status(400).json({
        success: false,
        message: "This car is already assigned to another driver."
    });

}

const hashedPassword = await bcrypt.hash(password, 10);

        const newDriver = await Driver.create({
            name,
            email,
            password: hashedPassword,
            phone,
            licenseNumber,
            car
        });

        const driverResponse = await Driver.findById(newDriver._id).select("-password");

        res.status(201).json({
            success: true,
            message: "Driver Registered Successfully",
            data: driverResponse
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Login Driver
export const loginDriver = async (req, res) => {

    try {

        const { email, password } = req.body;

        const driver = await Driver.findOne({ email }).populate("car");

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver Not Found"
            });
        }

        const checkPassword = await bcrypt.compare(password, driver.password);

        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: driver._id,
                role: "driver"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            driver: {
    id: driver._id,
    name: driver.name,
    email: driver.email,
    phone: driver.phone,
    licenseNumber: driver.licenseNumber,
    isAvailable: driver.isAvailable,
    totalEarnings: driver.totalEarnings,
    averageRating: driver.averageRating,
    car: driver.car
}
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Driver Profile
export const getDriverProfile = async (req, res) => {

    try {

        const driver = await Driver.findById(req.user.id)
            .populate("car")
            .select("-password");

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver Not Found"
            });
        }

        res.status(200).json({
            success: true,
            driver
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Driver Profile
export const updateDriverProfile = async (req, res) => {

    try {

        const updatedDriver = await Driver.findByIdAndUpdate(
            req.user.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!updatedDriver) {
            return res.status(404).json({
                success: false,
                message: "Driver Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            driver: updatedDriver
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Accept Ride
export const acceptRide = async (req, res) => {

    try {

        const updatedBooking = await Booking.findById(booking._id)
.populate("user","name phone")
.populate("car")
.populate("driver","name");


        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            });
        }

        // Ensure the booking belongs to the logged-in driver
        if (booking.driver.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only accept your assigned rides."
            });
        }

        if (booking.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "Ride cannot be accepted."
            });
        }

        booking.status = "Accepted";
        await booking.save();

        // Make driver unavailable
        const driver = await Driver.findById(req.user.id);

        if (driver) {
            driver.isAvailable = false;
            await driver.save();
        }

        res.status(200).json({
            success: true,
            message: "Ride Accepted Successfully",
            booking:updatedBooking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Reject Ride
export const rejectRide = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            });
        }

        // Check if the booking belongs to the logged-in driver
        if (booking.driver.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only reject your assigned rides."
            });
        }

        if (booking.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "Ride cannot be rejected."
            });
        }

        booking.status = "Cancelled";
        await booking.save();

        // Make the driver available again
        const driver = await Driver.findById(req.user.id);

        if (driver) {
            driver.isAvailable = true;
            await driver.save();
        }

        // Make the car available again
        const car = await Car.findById(booking.car);

        if (car) {
            car.available = true;
            await car.save();
        }

        res.status(200).json({
            success: true,
            message: "Ride Rejected Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Start Ride
export const startRide = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            });
        }

        // Check if the booking belongs to the logged-in driver
        if (booking.driver.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only start your assigned rides."
            });
        }

        if (booking.status !== "Accepted") {
            return res.status(400).json({
                success: false,
                message: "Only accepted rides can be started."
            });
        }

        booking.status = "Started";
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Ride Started Successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Complete Ride
export const completeRide = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            });
        }

        // Check if the booking belongs to the logged-in driver
        if (booking.driver.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only complete your assigned rides."
            });
        }

        if (booking.status !== "Started") {
            return res.status(400).json({
                success: false,
                message: "Only started rides can be completed."
            });
        }
booking.status = "Completed";
booking.paymentStatus = "Paid";
await booking.save();

        // Make driver available again
        const driver = await Driver.findById(req.user.id);

        if (driver) {
            driver.isAvailable = true;
            driver.totalEarnings += booking.fare;
            await driver.save();
        }

        // Make car available again
        const car = await Car.findById(booking.car);

        if (car) {
            car.available = true;
            await car.save();
        }

        res.status(200).json({
            success: true,
            message: "Ride Completed Successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Driver Ride History
export const getRideHistory = async (req, res) => {

    try {

        console.log("============== DRIVER ==============");
        console.log("Logged Driver:", req.user.id);

        const allBookings = await Booking.find();

        console.log(
            "All Booking Drivers:",
            allBookings.map(b => ({
                booking: b._id,
                driver: b.driver,
                status: b.status
            }))
        );

        const bookings = await Booking.find({
            driver: req.user.id
        })
        .populate("user", "name phone")
        .populate("car", "carName brand")
        .sort({ createdAt: -1 });

        console.log("Bookings Found:", bookings.length);
        console.log("====================================");

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// Driver Earnings
export const getDriverEarnings = async (req, res) => {

    try {

        const driver = await Driver.findById(req.user.id)
            .select("name totalEarnings");
            const completedTrips = await Booking.countDocuments({
    driver: req.user.id,
    status: "Completed"
});

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver Not Found"
            });
        }

        res.status(200).json({
            success: true,
           driver: {
    name: driver.name,
    totalEarnings: driver.totalEarnings,
    completedTrips,
    averageRating: driver.averageRating
}
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};