import "./ManageSchedulesBtn.css";
function ManageSchedulesBtn({ handleClick }) {
    return (
        <div className="set-timer-btn" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="54.474" height="45"><path data-name="290104_calendar_clock_date_event_schedule_icon (1)" d="M49.737 45h-45A4.737 4.737 0 0 1 0 40.263V4.737A4.737 4.737 0 0 1 4.737 0h45a4.737 4.737 0 0 1 4.737 4.737v35.526A4.737 4.737 0 0 1 49.737 45Zm2.368-40.263a2.369 2.369 0 0 0-2.368-2.368h-45a2.369 2.369 0 0 0-2.369 2.368v7.105h49.737Zm0 9.474H2.368v26.052a2.369 2.369 0 0 0 2.368 2.368h45a2.369 2.369 0 0 0 2.368-2.368Zm-4.737 16.578H45a1.184 1.184 0 0 1-1.184-1.184v-2.368A1.185 1.185 0 0 1 45 26.053h2.368a1.184 1.184 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.184 1.184Zm0-8.289H45a1.184 1.184 0 0 1-1.184-1.184v-2.369A1.184 1.184 0 0 1 45 17.763h2.368a1.183 1.183 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.184 1.185Zm-9.474 8.289h-2.368a1.184 1.184 0 0 1-1.184-1.184v-2.368a1.185 1.185 0 0 1 1.184-1.184h2.368a1.184 1.184 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.183 1.184Zm0-8.289h-2.368a1.184 1.184 0 0 1-1.184-1.184v-2.369a1.184 1.184 0 0 1 1.184-1.184h2.368a1.183 1.183 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.183 1.185Zm-9.474 8.289h-2.367a1.183 1.183 0 0 1-1.184-1.184v-2.368a1.184 1.184 0 0 1 1.184-1.184h2.368a1.184 1.184 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.184 1.184Zm0-8.289h-2.367a1.183 1.183 0 0 1-1.184-1.184v-2.369a1.183 1.183 0 0 1 1.184-1.184h2.368a1.183 1.183 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.184 1.185Zm-9.473 16.579h-2.368a1.183 1.183 0 0 1-1.184-1.184v-2.369a1.183 1.183 0 0 1 1.184-1.184h2.368a1.183 1.183 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.184 1.185Zm0-8.289h-2.368a1.183 1.183 0 0 1-1.184-1.184v-2.369a1.184 1.184 0 0 1 1.184-1.184h2.368a1.184 1.184 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.184 1.184Zm0-8.289h-2.368a1.183 1.183 0 0 1-1.184-1.184v-2.37a1.183 1.183 0 0 1 1.184-1.184h2.368a1.183 1.183 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.184 1.185ZM9.474 39.079H7.105a1.183 1.183 0 0 1-1.184-1.184v-2.369a1.183 1.183 0 0 1 1.184-1.184h2.368a1.183 1.183 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.183 1.185Zm0-8.289H7.105a1.183 1.183 0 0 1-1.184-1.184v-2.369a1.184 1.184 0 0 1 1.184-1.184h2.368a1.184 1.184 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.183 1.184Zm16.579 3.553h2.368a1.183 1.183 0 0 1 1.184 1.184v2.368a1.183 1.183 0 0 1-1.184 1.184h-2.368a1.183 1.183 0 0 1-1.184-1.184v-2.369a1.183 1.183 0 0 1 1.184-1.184Z" fill="#f3f4f6" fillRule="evenodd" /></svg>            <h3 className="set-timer-label">
                Manage Schedules
            </h3>
        </div>
    )
}
export default ManageSchedulesBtn;