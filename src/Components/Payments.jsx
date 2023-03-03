import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import SpinRotate from "../utils/SpinRotate"
// import "bootswatch/dist/lux/bootstrap.min.css";
import "../assets/payments.css";

const stripePromise = loadStripe(process.env.REACT_APP_CARD_KEY)

const CheckoutForm = ({amount, handler}) => {

    const [loading, setLoading] = useState(false)
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
                const client_id= 1
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
    return <form onSubmit={handleSubmit}>
        <div>
            <p className='text-center'>Saldo Actual 0€</p>
        </div>
        <div className="form-group">
            <CardElement className="numberCard" />
            {loading ? <SpinRotate/> :
            <button className="btn btn-outline-warning">
                Comprar
            </button>}
        </div>
    </form>
}

const Payments = () => {
    const [amount , setAmount] = useState(null)
    return (
        <Elements stripe={stripePromise}>
            <div className="container p-4">                            
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