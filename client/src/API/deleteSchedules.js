export default function deleteSchedules(data, cb) {
  const body = { list: data };
  fetch("/schedule/delete", {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    method: "DELETE",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then(() => {
      cb(true);
    }).catch(() => {
      cb(false);
    });
}
