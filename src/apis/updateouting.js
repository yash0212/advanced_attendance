import endpoint from './apiConfig';
var path = '/api/update-outing';
var uri = endpoint + path;
export const updateOuting = async (token, outing_id, requestStatus = 0) => {
  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      outing_id: outing_id,
      status: requestStatus === 0 ? 'rejected' : 'approved',
    }),
  });

  if (response.ok) {
    const {status, msg, data} = await response.json();
    if (status === 'success') {
      return {
        updateOutingMsgType: 'success',
        outingRequests: data,
        msg: msg,
      };
    } else {
      throw new Error(msg);
    }
  }
  if (response.status === 400) {
    var parsedBody = JSON.parse(await response.text());
    // console.log(parsedBody);
    // const errMessage = parsedBody.errors[Object.keys(parsedBody['errors'])[0]];
    const errMessage = parsedBody.message;
    throw new Error(errMessage);
  }
  const errMessage = await response.text();
  throw new Error(errMessage);
};
