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

  const formData = new FormData();

  for( var x in data) {
    let value;
    if (data[x].toString === '[object Object]') value = JSON.stringify(data[x]);
      else value = data[x];

    formData.append(x, value);
  }

  return fetch(url, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: formData
  })
    .then(handleErrors)
    .then(res => {
      return res.json();
    });
}
