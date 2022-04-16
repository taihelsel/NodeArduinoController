import "./SetTimerBtn.css";
function SetTimerBtn({ handleClick }) {
    return (
        <div className="set-timer-btn" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48.142" height="46.093"><path data-name="290115_alarm_clock_schedule_time_timer_icon" d="M44.537 12.407a24.131 24.131 0 0 0-1.14-1.809 4.274 4.274 0 1 0-5.853-5.852 23.423 23.423 0 0 0-1.809-1.14 6.413 6.413 0 1 1 8.8 8.8Zm.963 11.664a21.325 21.325 0 0 1-5.571 14.377l5.266 5.266a1.047 1.047 0 1 1-1.48 1.48l-5.266-5.266a21.335 21.335 0 0 1-28.753 0l-5.268 5.266a1.047 1.047 0 1 1-1.48-1.48l5.266-5.266A21.418 21.418 0 1 1 45.5 24.071ZM24.071 4.786a19.285 19.285 0 1 0 19.285 19.285A19.286 19.286 0 0 0 24.071 4.786ZM25.142 28.2V38a1.071 1.071 0 0 1-2.143 0v-9.8a4.24 4.24 0 0 1-2.595-6.32l-4.6-4.6a1.047 1.047 0 0 1 1.48-1.48l4.6 4.6a4.24 4.24 0 0 1 2.187-.619 4.277 4.277 0 0 1 1.071 8.419Zm-1.071-6.276a2.143 2.143 0 1 0 2.143 2.143 2.144 2.144 0 0 0-2.143-2.139ZM6.928 2.643A4.274 4.274 0 0 0 4.746 10.6a23.616 23.616 0 0 0-1.14 1.809 6.412 6.412 0 1 1 8.8-8.8c-.621.355-1.226.732-1.809 1.14a4.268 4.268 0 0 0-3.669-2.106Z" fill="#f3f4f6" stroke="#f3f4f6" fillRule="evenodd" /></svg>
            <h3 className="set-timer-label">
                Set Timer
            </h3>
        </div>
    )
}
export default SetTimerBtn;