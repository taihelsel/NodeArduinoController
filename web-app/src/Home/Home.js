import "./Home.css";
import PowerBtn from "../Components/PowerBtn/PowerBtn";
import TempSlider from "../Components/TempSlider/TempSlider";
import Temp5deg from "../Components/Temp5deg/Temp5deg";
function Home() {
    const powerClick = () => {
        alert("working");
    }
    const handle5degClick = direction => e => {
        alert("working");
    }
    return (
        <section id="Home">
            <PowerBtn handlePower={powerClick} />
            <TempSlider />
            <div className="home-btns-row">
                <Temp5deg handleClick={handle5degClick} direction={"cold"} />
                <Temp5deg handleClick={handle5degClick} direction={"hot"} />
            </div>
        </section>
    );
}

export default Home;