import "./Temp5deg.css";
function Temp5deg({ handleClick, direction }) {
    return (
        <div className={`temp5deg temp5deg-${direction}`} onClick={handleClick}>
            <h3 className="temp5deg-label">{direction === "cold" ? "-5°" : "+5°"}</h3>
        </div>
    )
}
export default Temp5deg;