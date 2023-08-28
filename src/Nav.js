import { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {

    const [show, setShow] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);

        return () => window.removeEventListener("scroll", transitionNavBar);
    }, [])


    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents" >
                <img className="nav__logo" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="" />

                <img className="nav__avatar" src="https://pbs.twimg.com/profile_images/1356333120992149505/-qvakEK7_200x200.jpg" alt="" />
            </div>

        </div>
    )
};

export default Nav;