import { NextFunction, Request, Response } from "express";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { randomBytes } from "crypto";
import { allColors } from "winston/lib/winston/config";

const { combine, timestamp, json, printf } = winston.format;
const appVersion = process.env.npm_package_version;
const generateLogId = (): string => randomBytes(16).toString("hex");
const timestampFormat = "MMM-DD-YYYY HH:mm:ss";

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

const httpLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        logId: generateLogId(),
        timestamp,
        appInfo: {
          appVersion,
          environment: process.env.Node_ENV,
          processId: process.pid,
        },
        message,
        data,
      };

      return JSON.stringify(response);
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      format: combine(errorFilter(), timestamp(), json()),
      level: "error",
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d",
    }),
  ],
});

const formatHTTPLoggerResponse = (
  req: Request,
  res: Response,
  responseBody: any,
) => {
  return {
    request: {
      headers: req.headers,
      host: req.headers.host,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req?.params,
      query: req?.query,
      clientIp: req?.headers["x-forwarded-for"] ?? req?.socket.remoteAddress,
    },
    response: {
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      body: responseBody,
    },
  };
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  let responseSent = false;

  res.send = function (body: any): Response {
    if (!responseSent) {
      if (res.statusCode < 400) {
        httpLogger.info(
          "successful request",
          formatHTTPLoggerResponse(req, res, null),
        );
      } else {
        httpLogger.error(
          body.message,
          formatHTTPLoggerResponse(req, res, body),
        );
      }

      responseSent = true;
    }

    return originalSend.call(this, body);
  };

  next();
};
