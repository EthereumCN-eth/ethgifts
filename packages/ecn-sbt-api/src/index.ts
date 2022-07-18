import { app } from "./server";
import * as dotenv from "dotenv";

dotenv.config(); // Load the environment variables
const PORT = process.env.PORT || 3010;

app
  .listen(PORT, () =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`)
  )
  .on("error", (e) => {
    console.log("Api error happened: ", e.message);
  });
