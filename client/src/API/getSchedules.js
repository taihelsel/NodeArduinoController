export default function getSchedules(cb) {
  fetch("/schedule/list")
    .then((res) => res.json())
    .then(({ data, ok }) => {
      if (ok === true) {
        cb(true, data);
      }
    }).catch(() => {
      cb(false);
    });
}
