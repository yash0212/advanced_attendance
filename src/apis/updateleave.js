import endpoint from '../config/api';
var path = '/api/update-leave';
var uri = endpoint + path;
export const updateLeave = async (token, leave_id, requestStatus = 0) => {
  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      leave_id: leave_id,
      status: requestStatus === 0 ? 'rejected' : 'approved',
    }),
  });

  if (response.ok) {
    const {status, msg, data} = await response.json();
    if (status === 'success') {
      return {
        updateLeaveMsgType: 'success',
        leaveRequests: data,
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
