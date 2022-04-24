import "./ScheduleCard.css";
function ScheduleCard({ data }) {
    const { desc } = data;
    const cardHighlight = (txt) => {
        return <h3 className="schedule-card-highlight">{txt}</h3>
    }
    const renderEvery = (arr) => {
        if (arr[0] === "day") {
            return ["Every ", cardHighlight("day"), " at ", cardHighlight(arr[1])];
        }
    }
    return (
        <div className="schedule-card">
            <div className="schedule-card-sidebar">&nbsp;</div>
            <ul className="schedule-card-content">
                <li className="schedule-card-row">
                    {renderEvery(desc.every)}
                </li>
                <li className="schedule-card-row">
                    {desc.task}{cardHighlight(desc.command)}
                </li>
            </ul>
        </div>
    );
}
export default ScheduleCard;