import {
  increaseTemp,
  decreaseTemp,
} from "../../../API";
import MainControls from "./MainControls";
import SliderControls from "./SliderControls";

export default function HomeControls({
  originalTemp,
  currentTemp,
  updateTemp,
  setLoading,
  updatePage,
  handleSliderConfirm,
  handleSliderCancel,
}) {
  const decreaseTempClick = () => {
    setLoading(true);
    const amount = 5; // decrease temp by 5 degrees
    decreaseTemp(amount, (success) => {
      setLoading(false);
      if (success) {
        updateTemp(currentTemp - amount);
        alert("Temp decreased");
      } else alert("Error updating temp");
    });
  };
  const increaseTempClick = () => {
    setLoading(true);
    const amount = 5; // increase temp by 5 degrees
    increaseTemp(amount, (success) => {
      setLoading(false);
      if (success) {
        updateTemp(currentTemp + amount);
        alert("Temp increased");
      } else alert("Error updating temp");
    });
  };
  const handleSchedClick = () => {
    updatePage("schedule");
  };
  return originalTemp === currentTemp ? (
    <MainControls
      decreaseTempClick={decreaseTempClick}
      increaseTempClick={increaseTempClick}
      handleSchedClick={handleSchedClick}
    />
  ) : (
    <SliderControls
      handleSliderCancel={handleSliderCancel}
      handleSliderConfirm={handleSliderConfirm}
    />
  );
}
