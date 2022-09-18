export default function decreaseTemp(amount, cb) {
  fetch("/temp/dec", {
    method: "POST",
    body: { amount },
  })
    .then((res) => res.json())
    .then(() => {
      cb(true);
    })
    .catch(() => {
      cb(false);
    });
}
