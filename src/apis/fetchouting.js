import endpoint from './apiConfig';
var path = '/api/apply-leave';
var uri = endpoint + path;
export const fetchOuting = async (token, start = 0, length = 15) => {
  const response = await fetch(uri, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (response.ok) {
    // console.log(await response.json());
    const {status, data} = await response.json();
    if (status === 'success') {
      return data;
    }
    // throw new Error(message);
  }
  if (response.status === 400 || response.status === 422) {
    var parsedBody = JSON.parse(await response.text());
    const errMessage = parsedBody.errors[Object.keys(parsedBody['errors'])[0]];
    throw new Error(errMessage);
  }
  const errMessage = await response.text();
  throw new Error(errMessage);
};
