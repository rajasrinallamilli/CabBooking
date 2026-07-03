import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Alogin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post(
                "/users/login",
                formData
            );

            if (res.data.user.role !== "admin") {

                alert("Access Denied. Admin account required.");

                return;

            }

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "admin",
                JSON.stringify(res.data.user)
            );

            alert("Admin Login Successful");

            navigate("/admin/home");

        }

        catch (err) {

            alert(
                err.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow mt-5 p-4">

                        <h2 className="text-center mb-4">

                            Admin Login

                        </h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                className="form-control mb-3"
                                type="email"
                                name="email"
                                placeholder="Admin Email"
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />

                            <button
                                className="btn btn-dark w-100"
                            >

                                Login

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Alogin;