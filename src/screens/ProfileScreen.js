import { useSelector } from "react-redux";
import Nav from "../Nav";
import "./ProfileScreen.css";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebaseConfig";
import PlanScreen from "./PlanScreen";

const ProfileScreen = () => {

    const user = useSelector(selectUser);
    return (
        <div className="profileScreen">
            <Nav />

            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src="https://pbs.twimg.com/profile_images/1356333120992149505/-qvakEK7_200x200.jpg" alt="" />

                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                    </div>

                </div>

                <div className="profileScreen__plans">
                    <h3>Plans</h3>
                    {<PlanScreen />}
                    <button className="profileScreen__signOut" onClick={() => auth.signOut()}>Sign Out</button>
                </div>


            </div>
        </div>
    )
};

export default ProfileScreen;