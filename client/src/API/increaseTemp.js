export default function increaseTemp(amount, cb) {
  fetch("/temp/inc", {
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
