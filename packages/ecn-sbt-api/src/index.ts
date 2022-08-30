import "dotenv/config";
import { app } from "./server";
import bodyParser from "body-parser";
// import { sign } from "./generateSign/index";
// import { signAndSaveSignature } from "./generateSign/queue/sign.queue";

const PORT = process.env.PORT || 3010;

app.use(bodyParser.json());

// app.post("/sign", async (req, res) => {
//   const { discordId, expressId } = req.body;
//   const status = await sign(discordId, expressId);
//   res.send({
//     success: status.success,
//     error: status.error,
//     signatureRecord: status.data,
//   });
// });

// app.post("/signWithQueue", async (req, res) => {
//   const { discordId, expressId } = req.body;
//   const status = await signAndSaveSignature({
//     discordId: discordId,
//     expressId: expressId,
//   });
//   res.send({
//     success: status,
//   });
// });

app
  .listen(PORT, () =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`)
  )
  .on("error", (e) => {
    console.log("Api error happened: ", e.message);
  });
