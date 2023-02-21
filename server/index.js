import { OpenAIApi, Configuration } from "openai";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import path from "path";

const app = express();
const port = 5000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

const aiTemplates = [
  {
    aiTemplate: "Senior Software Engineer",
    us: "Pretend you are a Software Engineer and your name is Mykhailo. ",
    ua: "Тебе звати Михайло, ти досвідчений сеньор розробник який хоче мені допомогти. Ти розмовляєш українською тільки на тему розробки.",
  },
];

const configuration = new Configuration({
  organization: "org-11zyW7yuLZePbMkz8pTNF9hx",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());

const __rootdir = path.resolve();

app.use(express.static(path.join(__rootdir, "/client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__rootdir, "client", "build", "index.html"));
});

app.post("/api", async (req, res) => {
  const { message, language } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${aiTemplates[0][language]} ${message}.`,
    max_tokens: 3200,
    temperature: 0.5,
    top_p: 1,
    n: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });

  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
