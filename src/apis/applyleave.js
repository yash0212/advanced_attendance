var endpoint = 'http://7a1d81b0.ngrok.io';
var path = '/api/apply-leave';
var uri = endpoint + path;
// var uri = 'http://localhost/api/login';
// var uri = 'http://ec2-15-206-69-32.ap-south-1.compute.amazonaws.com/api/login';
export const applyLeave = async (token, visitTo, reason, outDate, inDate) => {
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
      out_date: Math.floor(new Date(outDate).getTime() / 1000),
      in_date: Math.floor(new Date(inDate).getTime() / 1000),
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
