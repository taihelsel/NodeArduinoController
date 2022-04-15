import "./Home.css";
import PowerBtn from "../Components/PowerBtn/PowerBtn";
import TempSlider from "../Components/TempSlider/TempSlider";
function Home() {
    const powerClick = () => {
        alert("working");
    }
    return (
        <section id="Home">
            <PowerBtn handlePower={powerClick} />
            <TempSlider />
        </section>
    );
}

export default Home;