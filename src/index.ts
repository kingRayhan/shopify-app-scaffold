import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connect } from "mongoose";
import localtunnel from "localtunnel";
import { getAccessToken, oAuthInstallationUrl } from "./lib/shopify";

const app = express();

dotenv.config({
  path: ".env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "Hello World",
  });
});

app.get("/app", (req: Request, res: Response) => {
  return res.json({
    message: "Shopify App!!",
    body: req.body,
    query: req.query,
  });
});

app.get("/install", (req: Request, res: Response) => {
  const shop = req.query.shop as string;

  if (!shop) {
    return res.status(400).json({
      error: "you must provide a shop",
    });
  }

  return res.redirect(oAuthInstallationUrl(shop));
});

app.get("/auth/callback", async (req: Request, res: Response) => {
  // @ts-ignore
  const token = await getAccessToken(req.query.shop, req.query.code);
  if (!token) {
  }
  res.redirect(`https://${req.query.shop}/admin/apps/order-summery`);

  // res.json({
  //   token,
  // });
});

const port = Number(process.env.PORT) || 2345;
app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

  const { url } = await localtunnel({
    port,
    subdomain: "shopify-order-manager",
  });
  console.log(`⚡️[server]: Server is running at ${url}`);
});
