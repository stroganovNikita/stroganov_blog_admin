async function checkTokenFetch() {
  try {
  const token = localStorage.getItem("token");
  const response = await fetch("https://celebrated-vision-production.up.railway.app/session/admin", {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((response) => response);
    return response;
  } catch {
    return {errors: [{msg: 'Error during fetch'}]}
  }
}

export default checkTokenFetch;
