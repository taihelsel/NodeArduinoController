export default function setCustomTemp(temp, cb) {
  fetch("/temp/custom/", {
    method: "POST",
    body: JSON.stringify({ temp }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => {
      cb(true);
    })
    .catch(() => {
      cb(false);
    });
}
