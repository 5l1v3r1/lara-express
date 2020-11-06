import { Route } from "@lara-express";
import { Request, Response, NextFunction } from "express";

const mid = (req: Request, res: Response, next: NextFunction) => {
  console.log('admin');
  return next();
};
Route.get("", (req: Request, res: Response) => {
  return res.send("mantappp");
});

Route.group({
  prefix: "admin",
  middleware: [mid]
}, () => {
  Route.get("", (req: Request, res: Response) => res.send("ok"));
  Route.group({ prefix: "test" }, () => {
    Route.get("work", (req: Request, res: Response) => res.send("buset"));
  });
  Route.get("nice-work", (req: Request, res: Response) => res.send("mantap"));
});

Route.get("with/:id", mid, (req: Request, res: Response) =>
  res.send(req.params.id)
);

export default Route;
