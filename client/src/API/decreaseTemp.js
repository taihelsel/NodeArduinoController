export default function decreaseTemp(amount, cb) {
  fetch("/temp/dec", {
    method: "POST",
    body: { amount },
  })
    .then((res) => res.json())
    .then((data) => {
      cb(true);
    })
    .catch((err) => {
      cb(false);
    });
}
