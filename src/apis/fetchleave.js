// var endpoint = 'http://7a1d81b0.ngrok.io';
var endpoint = 'http://ec2-15-206-69-32.ap-south-1.compute.amazonaws.com';
var path = '/api/fetch-leave';
var uri = endpoint + path;
// var uri = 'http://localhost/api/login';
// var uri = 'http://ec2-15-206-69-32.ap-south-1.compute.amazonaws.com/api/login';
export const fetchLeave = async (token, start = 0, length = 15) => {
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
  if (response.status === 400) {
    var parsedBody = JSON.parse(await response.text());
    const errMessage = parsedBody.errors[Object.keys(parsedBody['errors'])[0]];
    throw new Error(errMessage);
  }
  const errMessage = await response.text();
  throw new Error(errMessage);
};
