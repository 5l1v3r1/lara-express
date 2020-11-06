import { Request, Response } from "express";

class Controller {
	index = (req: Request, res: Response) => {
		return res.send("mantappp");
	}
}



export default new Controller()