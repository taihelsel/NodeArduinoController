import "./Home.css";
import PowerBtn from "../Components/PowerBtn/PowerBtn";
import TempSlider from "../Components/TempSlider/TempSlider";
import Temp5deg from "../Components/Temp5deg/Temp5deg";
import SetTimerBtn from "../Components/SetTimerBtn/SetTimerBtn";
import CustomSched from "../Components/CustomSchedBtn/CustomSchedBtn";
function Home() {
    const powerClick = () => {
        alert("handle power");
    }
    const handle5degClick = direction => e => {
        alert("handle deg");
    }
    const handleTimerClick = () => {
        alert("handle timer");
    }
    const handleSchedClick = () => {
        alert("handle sched");
    }
    return (
        <section id="Home">
            <PowerBtn handlePower={powerClick} />
            <TempSlider />
            <div id="controls-container">
                <div className="home-btns-row">
                    <Temp5deg handleClick={handle5degClick} direction={"cold"} />
                    <Temp5deg handleClick={handle5degClick} direction={"hot"} />
                </div>
                <div className="home-btns-row">
                    <SetTimerBtn handleClick={handleTimerClick} />
                    <CustomSched handleClick={handleSchedClick} />
                </div>
            </div>
        </section>
    );
}

export default Home;