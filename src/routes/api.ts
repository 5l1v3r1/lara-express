import { Route } from "../bootstrap/fundation";
import { Request, Response } from "express";


Route.get('', (req: Request, res: Response) => {
	return res.send('mantap')
})


Route.group({ prefix: 'admin' }, () => {
	Route.get('', (req: Request, res: Response) => res.send('ok'))
	Route.group({ prefix: 'test' }, () => {
		Route.get('work', (req: Request, res: Response) => res.send('buset'))
	})
	Route.get('nice-work', (req: Request, res: Response) => res.send('mantap'))
})

Route.get('with/:id', (req: Request, res: Response) => res.send(req.params.id))


export default Route