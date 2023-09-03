import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';

import { Route, Routes, useNavigate } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';



function App() {

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      } else {
        dispatch(logout());
        navigate("/");
      }
    })

    return unsubscribe;
  }, [dispatch, navigate])


  return (
    <div className="App">
      {/* <h1>Lets build Netflix</h1> */}

      {/* <HomeScreen /> */}

      {!user ? <LoginScreen /> : (
        <Routes>
          <Route path='/profile' element={<ProfileScreen />} />
          <Route exact path='/' element={<HomeScreen />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
