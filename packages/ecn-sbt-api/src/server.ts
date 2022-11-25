import { PrismaClient, Prisma } from "@prisma/client";
import express from "express";

import morgan from "morgan";
import { setupAddMessageRoute } from "./addMessage";
import { setupUpdateMsgRoute } from "./updateMessage";
import { setupDeleteMsgRoute } from "./deleteMessage";
import { setupUserRoute } from "./user";

export const prisma = new PrismaClient();

const app = express();
app.use(morgan("tiny"));

app.use(express.json());

setupAddMessageRoute(app, prisma);
setupUserRoute(app, prisma);
setupUpdateMsgRoute(app, prisma);
setupDeleteMsgRoute(app, prisma);

export { app };
