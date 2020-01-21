// var endpoint = 'http://7a1d81b0.ngrok.io';
var endpoint = 'http://ec2-15-206-69-32.ap-south-1.compute.amazonaws.com';
var path = '/api/register';
var uri = endpoint + path;
// var uri = 'http://localhost/api/register';
// var uri = 'http://ec2-15-206-69-32.ap-south-1.compute.amazonaws.com/api/register';
export const register = async (
  email,
  name,
  password,
  password_confirmation,
  regno,
  type,
) => {
  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
      password_confirmation: password_confirmation,
      regno: regno,
      user_type: type,
    }),
  });

  if (response.ok) {
    const {access_token, user} = await response.json();
    return {
      token: access_token,
      user: user,
      msg: 'Registered Successfully, Login to Continue',
    };
  }
  if (response.status === 400) {
    var parsedBody = JSON.parse(await response.text());
    const errMessage = parsedBody.errors[Object.keys(parsedBody['errors'])[0]];
    // const errMessage = parsedBody.message;
    throw new Error(errMessage);
  }
  const errMessage = await response.text();
  throw new Error(errMessage);
};
