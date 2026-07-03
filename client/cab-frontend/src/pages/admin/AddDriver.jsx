import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddDriver() {

    const navigate = useNavigate();

    const [cars, setCars] = useState([]);

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        phone: "",
        licenseNumber: "",
        car: ""

    });

    useEffect(() => {

        fetchCars();

    }, []);

    const fetchCars = async () => {

        try {

            const res = await api.get("/cars");

            setCars(res.data.cars);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const registerDriver = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post(

                "/drivers/register",

                formData

            );

            alert(res.data.message);

            navigate("/driver/login");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow p-4 mt-5">

                        <h2 className="text-center mb-4">

                            Driver Register

                        </h2>

                        <form onSubmit={registerDriver}>

                            <input
                                className="form-control mb-3"
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Email"
                                name="email"
                                type="email"
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Phone"
                                name="phone"
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="License Number"
                                name="licenseNumber"
                                onChange={handleChange}
                                required
                            />

                            <select
                                className="form-select mb-3"
                                name="car"
                                onChange={handleChange}
                                required
                            >

                                <option value="">

                                    Select Car

                                </option>

                                {

                                    cars.map((car)=>(

                                        <option

                                            key={car._id}

                                            value={car._id}

                                        >

                                            {car.carName}

                                        </option>

                                    ))

                                }

                            </select>

                            <button
                                className="btn btn-success w-100"
                            >

                                Register

                            </button>

                        </form>

                        <p className="text-center mt-3">

                            Already Registered?

                            {" "}

                            <Link to="/driver/login">

                                Login

                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddDriver;