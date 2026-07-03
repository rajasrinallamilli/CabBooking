import Unav from "../../components/user/Unav";
import Footer from "../../components/common/Footer";
import CabCard from "../../components/user/CabCard";
import { Link } from "react-router-dom";
function Home() {

    return (

        <>

            <Unav />

            {/* Hero */}

            <section className="hero">

                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-md-6">

                            <h1>

                                Book Your Ride

                                <br />

                                Anytime, Anywhere

                            </h1>

                            <p>

                                Fast, Safe and Affordable rides with RideReady.

                            </p>

                  <Link
to="/user/cabs"
className="btn btn-primary btn-lg"
>

Book Cab

</Link>

<Link
    to="/user/cabs"
    className="btn btn-outline-dark btn-lg"
>
    Explore Cabs
</Link>

                        </div>

                        <div className="col-md-6 text-center">

                            <img

                                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"

                                className="img-fluid hero-img"

                                alt="Cab"

                            />

                        </div>

                    </div>

                </div>

            </section>

            {/* Services */}

            <section className="container py-5">

                <h2 className="text-center mb-5">

                    Our Services

                </h2>

                <div className="row text-center">

                    <div className="col-md-3">

                        <h1>🚖</h1>

                        <h5>Local Ride</h5>

                    </div>

                    <div className="col-md-3">

                        <h1>✈</h1>

                        <h5>Airport</h5>

                    </div>

                    <div className="col-md-3">

                        <h1>🏢</h1>

                        <h5>Office</h5>

                    </div>

                    <div className="col-md-3">

                        <h1>🌆</h1>

                        <h5>Outstation</h5>

                    </div>

                </div>

            </section>

            {/* Featured Cars */}

            <section className="container py-5 text-center">

    <h2 className="mb-4">Featured Cars</h2>

    <p className="mb-4">
        Explore our wide range of comfortable and affordable cars.
    </p>

    <Link
        to="/user/cabs"
        className="btn btn-primary btn-lg"
    >
        View Available Cars
    </Link>

</section>

            {/* Why Choose */}

            <section className="choose-us">

                <div className="container">

                    <h2 className="text-center mb-5">

                        Why Choose RideReady?

                    </h2>

                    <div className="row text-center">

                        <div className="col-md-3">

                            <h3>✔</h3>

                            <p>Verified Drivers</p>

                        </div>

                        <div className="col-md-3">

                            <h3>📍</h3>

                            <p>Live Tracking</p>

                        </div>

                        <div className="col-md-3">

                            <h3>💰</h3>

                            <p>Affordable Fare</p>

                        </div>

                        <div className="col-md-3">

                            <h3>🕒</h3>

                            <p>24/7 Support</p>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Home;