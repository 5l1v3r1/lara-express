import { Route } from "@lara-express";
import { Request, Response, NextFunction } from "express";

Route.get("", (req: Request, res: Response) => {
  return res.send("mantap");
});

Route.group({ prefix: "admin" }, () => {
  Route.get("", (req: Request, res: Response) => res.send("ok"));
  Route.group({ prefix: "test" }, () => {
    Route.get("work", (req: Request, res: Response) => res.send("buset"));
  });
  Route.get("nice-work", (req: Request, res: Response) => res.send("mantap"));
});

const mid = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);

  return next();
};
Route.get("with/:id", mid, (req: Request, res: Response) =>
  res.send(req.params.id)
);

export default Route;
