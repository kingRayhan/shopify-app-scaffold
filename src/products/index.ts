import { Request, Response, Router } from "express";
import Product from "./Product.model";
import { index, show } from "quick-crud";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const data = await index({
    model: Product,
    paginationOptions: {
      page,
      limit,
    },
  });

  res.json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const productId = req.params.id;

  const data = await show({
    model: Product,
    where: {
      _id: productId,
    },
  });

  res.json(data);
});

export default router;
