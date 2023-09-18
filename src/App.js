import React, { useEffect, useState } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';

import { Route, Routes, useNavigate } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import db, { auth } from './firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';
import { collection, getDocs } from 'firebase/firestore';



function App() {

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);

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


  useEffect(() => {

    if (user?.uid) {
      const getSubs = async () => {
        const colRef = collection(db, `customers/${user.uid}/subscriptions`);

        const docSnap = await getDocs(colRef);

        docSnap.forEach(async sub => {
          setSubscription({
            role: sub.data().role,
            current_period_end: sub.data().current_period_end.seconds,
            current_period_start: sub.data().current_period_start.seconds,
          });
        });

      };

      getSubs();
    }


  }, [user?.uid]);



  return (
    <div className="App">

      {!user ? <LoginScreen /> : (
        <>
          {subscription ?
            <Routes>
              <Route path='/profile' element={<ProfileScreen />} />
              <Route exact path='/' element={<HomeScreen />} />
            </Routes> : <ProfileScreen />}
        </>
      )}
    </div>
  );
}

export default App;
