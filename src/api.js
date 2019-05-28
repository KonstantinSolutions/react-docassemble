function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
}

export function get(url) {
  return fetch(url)
    .then(handleErrors)
    .then(res => {
      return res.json();
    });
}

export function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(handleErrors)
    .then(res => {
      return res.json();
    });
}
