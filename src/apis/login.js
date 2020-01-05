export const login = async (regno, password) => {
  const response = await fetch(
    'https://dizpw6y7m8.execute-api.ap-south-1.amazonaws.com/prod/auth/login',
    {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({regno: regno, password: password}),
    },
  );
  if (response.ok) {
    const {token} = await response.json();
    return token;
  }
  if ((response.status = 400)) {
    var parsedBody = JSON.parse(await response.text());
    const errMessage = parsedBody.message;
    throw new Error(errMessage);
  }
  const errMessage = await response.text();
  throw new Error(errMessage);
};
