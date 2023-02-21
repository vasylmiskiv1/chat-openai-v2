export const postMessage = (
  message = "",
  language,
  setResponse,
  setResponseError,
  setLoader,
  setMessage
) => {
  setLoader(true);
  fetch(`http://192.168.0.103:5000/openai-api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, language }),
  })
    .then((res) => res.json())
    .then((data) => {
      setResponse(data.message);
      if (setMessage) {
        setMessage("");
      }
    })
    .catch((err) => setResponseError(err.message))
    .finally(() => setLoader(false));
};
