function TempInput({ tempType }) {
    return (
        <div className="sched-step-container">
            <h1 className="sched-step-title">Set Temp</h1>
            <div className="sched-step-body-row">
                {tempType}
            </div>
        </div>
    );
}
export default TempInput;