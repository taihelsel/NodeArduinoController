export default function setCustomTemp(temp, cb) {
    fetch("/temp/custom/", {
        method: "POST",
        body: JSON.stringify({ temp }),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => {
            cb(true);
        })
        .catch(err => {
            cb(false);
        })

}