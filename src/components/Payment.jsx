import {PayPalButtons} from '@paypal/react-paypal-js'
import { toast } from "react-toastify";

export const Payment = () => {
  const createOrder = (data) => {
    // Order is created on the server and the order id is returned
    return fetch("http://localhost:3000/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product:{
          description: "Classic Plan",
          cost: "50.00"
        }
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = (data) => {
    return fetch("http://localhost:3000/payment/capture-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
      
    }).then((response) => response.json())
    .then((payment) => {
      toast.success("Pago completado!")
    })
  };

  return (
    <>
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </>
  );
};
