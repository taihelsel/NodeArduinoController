function AddSchedBtn({ handleClick }) {
    return (
        <div onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                <g fill="#f3f4f6">
                    <path d="M25 0a25 25 0 1 0 25 25A25.038 25.038 0 0 0 25 0Zm0 5A20 20 0 1 1 5 25 19.962 19.962 0 0 1 25 5Z" />
                    <path d="M25 12.667a2.5 2.5 0 0 0-2.533 2.466v7.4h-7.6a2.467 2.467 0 1 0 0 4.933h7.6v7.4a2.534 2.534 0 0 0 5.067 0v-7.4h7.6a2.467 2.467 0 1 0 0-4.933h-7.601v-7.4A2.5 2.5 0 0 0 25 12.667Z" />
                </g>
            </svg>
        </div>
    );
}
export default AddSchedBtn;