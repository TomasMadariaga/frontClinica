import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "react-toastify";

export const Payment = ({ patient, onPaymentComplete, plan }) => {
  const updatePaymentStatus = async (paciente) => {
    const { id, ...updatedPatient } = paciente;
    updatedPatient.paymentStatus = true;
    const patientId = patient.id;
    try {
      const response = await axios.put(
        `http://localhost:3000/pacientes/${patientId}`,
        updatedPatient
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (data) => {
    return await fetch("http://localhost:3000/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          description: plan.type,
          cost: plan.price,
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = async (data) => {
    return await fetch("http://localhost:3000/payment/capture-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID
      }),
    })
      .then((response) => response.json())
      .then((payment) => {
        toast.success(`Your purchase of the ${plan.type} plan has been successful.`);
        updatePaymentStatus(patient);
        onPaymentComplete(false)
        setTimeout(() => {window.location.reload()}, 1000)
      });
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
