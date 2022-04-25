import "./ScheduleCard.css";
function ScheduleCard({ data }) {
    const { desc, command } = data;
    const setSidebarColor = (cmd) => {
        if (cmd === "power") return "yellow";
        if (cmd.indexOf("temp=") !== -1) {
            const tempCmd = cmd.split("=");
            const temp = parseInt(tempCmd[1]);
            if (temp > 75) return "red";
            if (temp <= 74) return "blue";
        }
        if (cmd.indexOf("temp-") !== -1) return "blue";
        if (cmd.indexOf("temp+") !== -1) return "red";
    }
    const cardHighlight = (txt) => {
        return <h3 className="schedule-card-highlight">{txt}</h3>
    }
    const renderEvery = (arr) => {
        if (arr[0] === "day") {
            return ["Every ", cardHighlight(arr[0]), <h4 className="schedule-card-every-splitter">at</h4>, cardHighlight(arr[1])];
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
            <div className={`schedule-card-sidebar schedule-card-sidebar-${setSidebarColor(command.toLowerCase())}`}>&nbsp;</div>
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