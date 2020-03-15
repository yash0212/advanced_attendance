import endpoint from '../config/api';
var path = '/api/login';
var uri = endpoint + path;
export const login = async (email, password, deviceHash) => {
  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      device_hash: deviceHash,
    }),
  });

  if (response.ok) {
    const {message, access_token, user} = await response.json();
    if (message !== undefined) {
      throw new Error(message);
    }
    return {token: access_token, user: user};
  }
  if (response.status === 400 || response.status === 422) {
    var parsedBody = JSON.parse(await response.text());
    const errMessage = parsedBody.errors[Object.keys(parsedBody['errors'])[0]];
    throw new Error(errMessage);
  }
  const errMessage = await response.text();
  throw new Error(errMessage);
};
