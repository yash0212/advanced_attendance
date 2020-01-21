// var endpoint = 'http://7a1d81b0.ngrok.io';
var endpoint = 'http://ec2-15-206-69-32.ap-south-1.compute.amazonaws.com';
var path = '/api/apply-outing';
var uri = endpoint + path;
// var uri = 'http://localhost/api/login';
// var uri = 'http://ec2-15-206-69-32.ap-south-1.compute.amazonaws.com/api/login';
export const applyOuting = async (token, visitTo, reason, outTime, inTime) => {
  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      visit_to: visitTo,
      reason: reason,
      out_time: Math.floor(new Date(outTime).getTime() / 1000),
      in_time: Math.floor(new Date(inTime).getTime() / 1000),
    }),
  });
  if (response.ok) {
    const {status, msg, data} = await response.json();
    if (status === 'success') {
      return {status, msg};
    } else {
      const errMessage = await response.text();
      throw new Error(errMessage);
    }
  }
  if (response.status === 400 || response.status === 422) {
    var parsedBody = JSON.parse(await response.text());
    const errMessage = parsedBody.errors[Object.keys(parsedBody['errors'])[0]];
    throw new Error(errMessage);
  }
  const errMessage = await response.text();
  throw new Error(errMessage);
};
