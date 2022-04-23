function BackArrow({ handleClick }) {
    return (
        <div onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.666 40" width="26.666" height="40">
                <path d="m8.541 20.003 16.925-14.1A3.336 3.336 0 1 0 21.2.773l-20 16.665a3.338 3.338 0 0 0 0 5.123l20 16.665a3.335 3.335 0 0 0 4.27-5.123Z" fill="#f3f4f6" />
            </svg>
        </div>
    );
}
export default BackArrow;