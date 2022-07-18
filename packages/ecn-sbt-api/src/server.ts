import { PrismaClient } from "@prisma/client";
import express from "express";

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// app.post("/user", async (req, res) => {
//   const { name, location } = req.body;
//   try {
//     const response: any = (await prisma.$queryRaw`
//     insert into "User" ("name", "location") values
//     (${name}, "public"."st_point"(${location.lng}, ${location.lat}))
//     returning id`) as any;

//     res.json({
//       success: true,
//       id: response[0].id,
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({
//       error: "Server error!",
//     });
//   }
// });

// app.post("addRawMessage", async (req, res) => {
//   const { rawMessage, discordId } = req.body;
// });

export { app };
