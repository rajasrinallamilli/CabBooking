import { Link } from "react-router-dom";

function Landing() {

    return (

        <div
            className="container-fluid min-vh-100 d-flex align-items-center"
            style={{
                background:
                    "linear-gradient(135deg,#0d6efd,#20c997)"
            }}
        >

            <div className="container">

                <div className="text-center text-white mb-5">

                    <h1
                        className="display-3 fw-bold"
                    >

                        🚖 UCab Booking

                    </h1>

                    <p
                        className="lead"
                    >

                        Book Smarter. Travel Safer.

                    </p>

                </div>

                <div className="row justify-content-center">

                    {/* USER */}

                    <div className="col-lg-5 col-md-6 mb-4">

                        <div className="card shadow-lg border-0 h-100">

                            <div className="card-body text-center">

                                <h1>👤</h1>

                                <h3>User/Admin</h3>

                                <p>

                                    Book rides anywhere
                                    anytime.

                                </p>

                                <Link
                                    to="/user/login"
                                    className="btn btn-primary w-100 mb-2"
                                >

                                    Login

                                </Link>

                                <Link
                                    to="/user/register"
                                    className="btn btn-outline-primary w-100"
                                >

                                    Register

                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* DRIVER */}

                    <div className="col-lg-5 col-md-6 mb-4">

                        <div className="card shadow-lg border-0 h-100">

                            <div className="card-body text-center">

                                <h1>🚖</h1>

                                <h3>Driver</h3>

                                <p>

                                    Accept rides and
                                    manage trips.

                                </p>

                                <Link
                                    to="/driver/login"
                                    className="btn btn-success w-100"
                                >

                                    Driver Login

                                </Link>

                            </div>

                        </div>

                    </div>

                   

                </div>

            </div>

        </div>

    );

}

export default Landing;