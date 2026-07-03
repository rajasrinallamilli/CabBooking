import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import NotFound from "./components/common/NotFound";

// Landing
import Landing from "./pages/Landing";

// User Pages
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Uhome from "./pages/user/Uhome";
import Cabs from "./pages/user/Cabs";
import BookCab from "./pages/user/BookCab";
import MyBookings from "./pages/user/MyBookings";
import Profile from "./pages/user/Profile";

// Admin Pages
import Ahome from "./pages/admin/Ahome";
import Users from "./pages/admin/Users";
import UserEdit from "./pages/admin/UserEdit";
import Bookings from "./pages/admin/Bookings";
import Acabs from "./pages/admin/Acabs";
import Acabedit from "./pages/admin/Acabedit";
import Addcar from "./pages/admin/Addcar";
import Alogin from "./pages/admin/Alogin";
import AddDriver from "./pages/admin/AddDriver";
// Driver Pages
import Dlogin from "./pages/driver/Dlogin";
import Dregister from "./pages/driver/Dregister";
import Dhome from "./pages/driver/Dhome";
import Dprofile from "./pages/driver/Dprofile";
import RideHistory from "./pages/driver/RideHistory";
import Earnings from "./pages/driver/Earnings";
import PendingRides from "./pages/driver/PendingRides";

function App() {

    return (

        <Routes>

            {/* Landing */}

            <Route
                path="/"
                element={<Landing />}
            />

            {/* User Authentication */}

            <Route
                path="/user/login"
                element={<Login />}
            />

            <Route
                path="/user/register"
                element={<Register />}
            />

            {/* User Protected Routes */}

            <Route
                path="/user/home"
                element={
                    <ProtectedRoute>
                        <Uhome />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/cabs"
                element={
                    <ProtectedRoute>
                        <Cabs />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/bookcab/:id"
                element={
                    <ProtectedRoute>
                        <BookCab />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/mybookings"
                element={
                    <ProtectedRoute>
                        <MyBookings />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* Driver */}

            <Route
                path="/driver/login"
                element={<Dlogin />}
            />

            <Route
                path="/driver/register"
                element={<Dregister />}
            />

            <Route
                path="/driver/home"
                element={<Dhome />}
            />

            <Route
                path="/driver/profile"
                element={<Dprofile />}
            />

            <Route
                path="/driver/history"
                element={<RideHistory />}
            />

            <Route
                path="/driver/earnings"
                element={<Earnings />}
            />

            <Route
                path="/driver/pending"
                element={<PendingRides />}
            />

            {/* Admin */}
            <Route
path="/admin/login"
element={<Alogin/>}
/>
<Route
path="/admin/adddriver"
element={<AddDriver/>}
/>

            <Route
                path="/admin/home"
                element={<Ahome />}
            />

            <Route
                path="/admin/users"
                element={<Users />}
            />

            <Route
                path="/admin/users/edit/:id"
                element={<UserEdit />}
            />

            <Route
                path="/admin/bookings"
                element={<Bookings />}
            />

            <Route
                path="/admin/cabs"
                element={<Acabs />}
            />

            <Route
                path="/admin/cabs/edit/:id"
                element={<Acabedit />}
            />

            <Route
                path="/admin/addcar"
                element={<Addcar />}
            />

            {/* 404 */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default App;