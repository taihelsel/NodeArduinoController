export default function SliderControls({ handleSliderCancel, handleSliderConfirm }) {
  return (
    <div id="controls-container">
      <div className="home-btns-row">
        <div className="temp-slider-controls temp-slider-cancel" onClick={handleSliderCancel}><h3>Cancel</h3></div>
        <div className="temp-slider-controls temp-slider-confirm" onClick={handleSliderConfirm}><h3>Confirm</h3></div>
      </div>
    </div>
  );
}
