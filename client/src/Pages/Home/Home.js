import React, { useState } from 'react';
import "./Home.css";
import { togglePower } from '../../API';
import {
    PowerBtn,
    HomeContent,
} from "./components";
import LoadingWheel from '../../Components/LoadingWheel/LoadingWheel';

function Home({ updatePage }) {
    const [temp, setTemp] = useState(70);
    const [loading, setLoading] = useState(false);
    const powerClick = () => {
        setLoading(true);
        togglePower(function (success) {
            setLoading(false);
            if (success) alert("Power toggled");
            else alert("Error updating power state");
        })
    }
    return (
        <section id="Home">
            <LoadingWheel loadingStatus={loading} />
            <PowerBtn handlePower={powerClick} />
            <HomeContent
                originalTemp={temp}
                setTemp={setTemp}
                setLoading={setLoading}
                updatePage={updatePage}
            />
        </section>
    )
}

export default Home;