import Card from "./Card";
import Slider from "./Slider";

export const Home = () => {
  document.title = "Online Clinic";
  return (
    <>
      <Slider />
      <Card />
    </>
  );
};
