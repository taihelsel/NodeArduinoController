import "./ScheduleCard.css";
function ScheduleCard({ data }) {
    const { desc } = data;
    const cardHighlight = (txt) => {
        return <h3 className="schedule-card-highlight">{txt}</h3>
    }
    const renderEvery = (arr) => {
        if (arr[0] === "day") {
            return ["Every ", cardHighlight(arr[0]), " at ", cardHighlight(arr[1])];
        } else if (arr[0] === "hours" || arr[0] === "minutes") {
            return ["Every ", cardHighlight(arr[1]), cardHighlight(arr[0])];
        }
        else {
            console.error("something weird happened getting 'every' rendering cards");
            return "";
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