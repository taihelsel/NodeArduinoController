import "./Schedule.css";
import BackArrow from "../Components/BackArrow/BackArrow";
import ScheduleCard from "../Components/ScheduleCard/ScheduleCard";
import AddSchedBtn from "../Components/AddSchedBtn/AddSchedBtn";
function Schedule({ updatePage }) {
    const backArrowClick = () => {
        updatePage("home");
    }
    const addSchedClick = () => {

    }
    return (
        <section id="Schedule">
            <nav>
                <div className="nav-back">
                    <BackArrow handleClick={backArrowClick} />
                </div>
                <h3>Edit</h3>
            </nav>
            <div id="schedule-content">
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
            </div>
            <div id="add-sched-btn">
                <AddSchedBtn handleClick={addSchedClick} />
            </div>
        </section>
    );
}

export default Schedule;