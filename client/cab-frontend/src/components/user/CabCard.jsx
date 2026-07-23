import { Link } from "react-router-dom";

function CabCard({ car }) {

    return (

        <div className="card p-3">

            <h3>{car.carName}</h3>

            <p>ID : {car._id}</p>

            <Link to={`/user/bookcab/${car._id}`}>

                CLICK HERE

            </Link>

        </div>

    );

}

export default CabCard;
