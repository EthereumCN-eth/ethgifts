import { app } from "./server";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { generateSignature } from "./generateSign/index";

dotenv.config(); // Load the environment variables
const PORT = process.env.PORT || 3010;

app.use(bodyParser.json());

app.post("/sign", async (req, res) => {
  const { discordId, expressId } = req.body;
  const status = await generateSignature(discordId, expressId);
  res.send({
    success: status.success,
    error: status.error,
    signatureRecord: status.signatureRecord,
  });
});

app
  .listen(PORT, () =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`)
  )
  .on("error", (e) => {
    console.log("Api error happened: ", e.message);
  });

app.get("", (req, res) => {
  res.send({ status: "ok" });
});
