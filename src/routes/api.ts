import { Route } from "@lara-express";
import { Request, Response, NextFunction } from "express";


// controllers
import Controller from "../app/Http/Controllers/Controller";

const mid = (req: Request, res: Response, next: NextFunction) => {
  console.log('admin');
  return next();
};

Route.get("", Controller.index);

Route.get("with/:id", mid, (req: Request, res: Response) =>
  res.send(req.params.id)
);


Route.group({ prefix: "admin", middleware: [mid] }, () => {
  Route.get("", Controller.index);
  Route.group({ prefix: "test" }, () => {
    Route.get("work", Controller.index);
  });
  Route.get("nice-work", Controller.index);
});


export default Route;
