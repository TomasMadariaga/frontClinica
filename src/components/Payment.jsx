// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51OAK8lKBEdr5FkTmOTU5MMGSFsiJjavSvnn6VW91sgcIi02xGbdShuQYk6XXuvqyt9tRtXFEsTa7mQUjbOTQjadU00VAWcJnUs"
// );

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />

//       <button className="mt-8 block rounded-lg px-6 py-4 text-center text-sm font-semibold leading-4 text-white bg-teal-500 hover:bg-teal-600 shadow-md">
//         Buy
//       </button>
//     </form>
//   );
// };

// function Payment() {
//   return (
//     <Elements stripe={stripePromise}>
//       <div className="container p-4">
//         <div className="row">
//           <div className="mx-auto grid max-w-7xl lg:grid-cols-2 gap-12 lg:gap-8 py-24 px-4 sm:px-6 lg:px-24">
//             <CheckoutForm />
//           </div>
//         </div>
//       </div>
//     </Elements>
//   );
// }

// export default Payment;
