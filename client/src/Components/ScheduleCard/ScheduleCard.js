import "./ScheduleCard.css";
function ScheduleCard() {
    return (
        <div className="schedule-card">
            <div className="schedule-card-sidebar">&nbsp;</div>
            <ul className="schedule-card-content">
                <li className="schedule-card-row">
                    Every <h3 className="schedule-card-highlight">Day</h3>  at <h3 className="schedule-card-highlight">9:00am</h3>
                </li>
                <li className="schedule-card-row">
                    Set <h3 className="schedule-card-highlight">Temp = 75°</h3>
                </li>
            </ul>
        </div>
    );
}
export default ScheduleCard;