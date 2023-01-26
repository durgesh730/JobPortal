import { useState, useEffect, useContext } from "react";
import React from "react";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

const Subscription = ({ open, onClose }) => {
    if (!open) return null
    const handlePayment = async (value) => {
        const response = await fetch(`/payment/razorpay/${value}`);
        const data = await response.json();
        console.log(data)
        displayRazorpay(data);
    };

    async function displayRazorpay(data) {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const options = {
            key: "rzp_test_CTOrgdKPfdki05",
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            name: "Search-In",
            description: "Your Shopping Companion",
            handler: function (response) {
                const PaymentStatus = [];
                PaymentStatus.push({
                    Status: "Succesfull",
                    PaymentId: response.razorpay_payment_id,
                    OrderId: response.razorpay_order_id,
                    signatre: response.razorpay_signature,
                });
                console.log(PaymentStatus);
            },
            prefill: {
                name: "demo",
                email: "",
                phone_number: "9899999999",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }


    return (

        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation()
            }} className="subscrpt_container">
                {/* <img src={svg} alt=""/> */}

                <div className="basic" style={{ marginTop: "1.4rem", padding: "2rem" }}>
                    <p className="order_type">Basic</p>
                    <p className="order_price">₹ 999</p>
                    <button onClick={() => { handlePayment(999) }} className="buy_btn">Buy Now</button>
                </div>

                <div className="premium" style={{ padding: "2rem" }} >
                    <button className="closeBtn"><p onClick={onClose}>X</p></button>
                    <p className="order_type">Premium</p>
                    <p className="order_price">₹ 1999</p>
                    <button onClick={() => { handlePayment(1999) }} className="buy_btn">Buy Now</button>
                </div>
            </div>
        </div>
    )
};

export default Subscription;