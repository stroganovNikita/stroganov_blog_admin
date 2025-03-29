async function checkTokenFetch() {
  try {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/session/admin", {
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
