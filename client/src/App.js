import React, { useState } from "react";

import { postMessage } from "./service/openai.js";
import spinner from "./assets/loader.gif";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loader, setLoader] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    postMessage(message, language, setResponse, setResponseError, setLoader, setMessage);
  };

  return (
    <div className="h-screen flex flex-col py-20 items-center">
      <div className="w-[600px] border border-slate-400 p-30 max-lg:max-w-[400px] px-5 py-20  rounded-lg">
        <h2 className="font-bold text-2xl text-center">
          Chat with AI Software Engineer{" "}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full mt-20 rounded flex gap-5"
        >
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="border w-full border-neutral-200 rounded px-4 outline-none hover:border-slate-400 focus:border-slate-400 focus:"
            placeholder={`${
              language === "us"
                ? "How to create simple html template..."
                : "Як зробити просту html сторінку..."
            }`}
          />
          <button
            type="submit"
            className={`${
              !message.length || !language.length
                ? `bg-gray-200`
                : `hover:bg-green-400 duration-200`
            } bg-green-200 py-2 px-6 rounded-lg transition`}
            disabled={!message.length || !language.length}
          >
            Send
          </button>
        </form>

        <div className="flex gap-5 py-4 items-center justify-between border-b-2">
          <div>Please, choose your language before start the question:</div>
          <div className="flex gap-5">
            <div
              className={`bg-blue-100 px-4 py-1 cursor-pointer rounded ${
                language === "ua" && `bg-blue-400`
              } hover:bg-blue-400`}
              onClick={() => setLanguage("ua")}
            >
              UA
            </div>
            <div
              className={`px-4 py-1 cursor-pointer bg-blue-100 rounded ${
                language === "us" && `bg-blue-400`
              } hover:bg-blue-400`}
              onClick={() => setLanguage("us")}
            >
              US
            </div>
          </div>
        </div>
        <div className="mt-5">
          {loader ? (
            <div className="mt-20 text-xl text-center">
              <img src={spinner} alt="loader" className="h-32 m-auto" />
            </div>
          ) : (
            <>
              {!language && (
                <div className="bg-yellow-400 px-4 py-1 rounded">
                  Please choose your language
                </div>
              )}
              {!responseError && language && response.length ? (
                <div className="h-60 w-full overflow-auto m-auto mt-5 bg-slate-100 p-4 rounded-lg">
                  {response}
                </div>
              ) : (
                <p className="mt-5 text-red-200 text-sm">{responseError}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
