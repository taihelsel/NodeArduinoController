import "./Home.css";
import PowerBtn from "../Components/PowerBtn/PowerBtn";

function Home() {
    const powerClick = () => {
        alert("working");
    }
    return (
        <section id="Home">
            <PowerBtn handlePower={powerClick} />
        </section>
    );
}

export default Home;