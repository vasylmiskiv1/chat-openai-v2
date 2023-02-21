export const postMessage = (
  message = "",
  language,
  setResponse,
  setResponseError,
  setLoader,
  setMessage
) => {
  setLoader(true);
  fetch(`http://vmiskivchat-openai-v2.onrender.com/api`, {
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
