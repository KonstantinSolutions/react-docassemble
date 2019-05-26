export function get(url) {
  return fetch(url).then(res => res.json());
}

export function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function fetchQuestion({i, session, setQuestion}) {
  fetch(`/docassemble/api/session/question?i=${i}&session=${session}`)
    .then(res => res.json())
    .then(data => {
      setQuestion(data);
    });
}

function goBack({i, session, setQuestion}) {
  post(`/docassemble/api/session/back`, data).then(data => {
    setQuestion(data);
  });
}

function saveVariables({isValid, i, session, variables, setQuestion}) {
  if (!isValid()) {
    return;
  }
  post(`/docassemble/api/session`, {
    i,
    session,
    variables
  }).then(data => {
    setQuestion(data);
  });
}
