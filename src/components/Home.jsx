import Card from "./Card";
import Slider from "./Slider";

export const Home = () => {
  document.title = "Online Clinic";

  const createOrder = async () => {
    const response = await fetch("/create-order", {
      method: "POST",
    });
    const data = await response.json();
    window.location.href = data.links[1].href;
  };
  return (
    <>
      <Slider />
      <button className="border rounded-md bg-cyan-500 text-slate-200 hover:bg-cyan-700 p-2 m-2" onClick={createOrder}>
        LOCOO
      </button>
      <Card />
    </>
  );
};
