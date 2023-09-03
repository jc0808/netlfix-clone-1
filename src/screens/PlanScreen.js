import { useEffect, useState } from "react";
import "./PlanScreen.css"
import db from "../firebaseConfig";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

import { loadStripe } from '@stripe/stripe-js';

const PlanScreen = () => {

    const [products, setProducts] = useState([]);

    const user = useSelector(selectUser);

    const [subscription, setSubscription] = useState(null);

    useEffect(() => {

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


    }, [user.uid]);



    useEffect(() => {


        const fetchData = async () => {
            const colRef = collection(db, "products");
            const docSnap = await getDocs(colRef);

            const products = [];

            docSnap.forEach(doc => {
                products.push({
                    productId: doc.id,
                    product: doc.data(),
                });

                getDocs(collection(doc.ref, "prices"))
                    .then(r => r)
                    .then(doc => setProducts(products => products.map(product => {

                        const found = doc.docs.filter(p => p.data().product === product?.productId)[0]

                        if (found) {
                            return {
                                ...product,
                                price: {
                                    priceId: found?.id,
                                    price: found?.data().unit_amount
                                }
                            }
                        }

                        return {
                            ...product
                        }

                    })));


            });



            setProducts(products)
        }

        fetchData();

    }, []);

    // console.log(user)

    const loadCheckout = async (priceId) => {
        // const docRef = await collection(db, "customers").doc(user.uid).collection("checkout_sessions")
        //     .add({
        //         price: priceId,
        //         success_url: window.location.origin,
        //         cancel_url: window.location.origin,

        //     });

        // docRef.onSnapshot(async (snap) => {
        //     const { error, sessionId } = snap.data();

        //     if (error) {
        //         alert(`An error has occured: ${error.message}`);
        //     }

        //     if (sessionId) {
        //         const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

        //         stripe.redirectToCheckout({ sessionId });
        //     }
        // })


        const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        onSnapshot(docRef, async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error has occured: ${error.message}`);
            }

            if (sessionId) {
                const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

                stripe.redirectToCheckout({ sessionId });
            }
        });

        // docSnap.forEach(customer => console.log(customer.data()))
    };





    return (
        <div className="PlanScreen">
            <br />
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {products.map(product => {

                const isCurrentPackage = product.product?.name.toLowerCase().includes(subscription?.role);

                return (
                    <div key={product.product.id} className={`${isCurrentPackage && "planScreen__plan--disabled"} planScreen__plan`}>
                        <div className="planScreen__info">
                            <h5>{product?.product?.name}</h5>
                            <h6>{product?.product?.description}</h6>
                        </div>

                        <button onClick={() => loadCheckout(product.price.priceId)}>{isCurrentPackage ? 'Subscribed' : "Subscribe"}</button>
                    </div >

                )
            })}
        </div >
    )
};

export default PlanScreen;