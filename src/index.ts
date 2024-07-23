import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import routeRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { logger } from "./middlewares/logger";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Server OK.");
});

app.use(express.json());

app.use(logger);

app.use("/api", routeRouter);

export const prismaClient = new PrismaClient({
  log: ["error"],
}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true,
        },
        compute(addr) {
          return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country} - ${addr.pincode}`;
        },
      },
    },
  },
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server started on: 3000");
});
