import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import routeRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schemas/users";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Server OK.");
});

app.use(express.json());

app.use("/api", routeRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server started on: 3000");
});
