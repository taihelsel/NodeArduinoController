export default function togglePower(cb) {
  fetch("/power/", {
    method: "POST",
  })
    .then((res) => res.json())
    .then(() => {
      cb(true);
    })
    .catch(() => {
      cb(false);
    });
}
