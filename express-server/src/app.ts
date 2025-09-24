import express, { Request, Response } from "express";
import responseTime from "response-time";
import deserializeUser from "./middleware/deserializeUser";
import requestLogger from "./middleware/requestLogger";
import { restResponseTimeHistogram } from "./utils/metrics";
import routes from "./routes/index.routes";

const app = express();

app.use(express.json());

// Request logging middleware (should be first)
app.use(requestLogger);

app.use(deserializeUser);

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.version
  });
});

// Health check endpoint (alternative)
app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

// API Routes
routes(app);

export default app;
