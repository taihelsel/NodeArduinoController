export default function togglePower(cb) {
  fetch("/power/", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      cb(true);
    })
    .catch((err) => {
      cb(false);
    });
}
