import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useClientContext } from "../context/clientDataContext"
import SpinRotate from "../utils/SpinRotate"
// import "bootswatch/dist/lux/bootstrap.min.css";
import "../assets/payments.css";

const stripePromise = loadStripe(process.env.REACT_APP_CARD_KEY)

const CheckoutForm = ({amount, handler}) => {
   
    const [loading, setLoading] = useState(false)
    const { clientData } = useClientContext();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            })
            if (!error) {
                const client_id= clientData.client_id
                const { id } = paymentMethod
                setLoading(true)
                const { data } = await axios.post(`http://localhost:3005/payment/${client_id}`, {
                    id,
                    amount: amount,
                    currency: "EUR",
                    description: "Recarga 10€",
                })
                console.log(data)
                elements.getElement(CardElement).clear();
                handler(null)
            }
        }catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    return <form onSubmit={handleSubmit} className="Payment-form-main">
        <div>
            <p className='text-center'>{`Saldo Actual ${clientData.balance}€`}</p>
        </div>
        <div className="form-group">
            <CardElement className="numberCard " />
            {loading ? <SpinRotate className="btn-outline-warning"/> :
            <button className="btn btn-outline-warning">
                Comprar
            </button>}
        </div>
    </form>
}

const Payments = () => {
    const [amount , setAmount] = useState(null)
    const toHome = useNavigate()
    const goHome= ()=>{
        toHome("/home")
    }
    return (
        <Elements stripe={stripePromise}>
            <div className="container p-4 Payments-form">
                <RxCrossCircled className="Payment-cross" onClick={goHome} />                            
                <div className="row"> 
                
                    <div className="col-md-4 offset-md-4">
                        { amount ? <CheckoutForm amount={amount} handler={setAmount}/> :
                        <div className="payments-div">
                            <div className="payments-title"><h2>Selecciona pago:</h2></div>
                            <button className="payments-money" onClick={()=> setAmount(1000)}>
                                10 €
                            </button>
                            <button className="payments-money" onClick={() => setAmount(2000)}>
                                20 €
                            </button>
                            <button className="payments-money" onClick={() => setAmount(3000)}>
                                30 €
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </Elements>
    );
};

export default Payments;