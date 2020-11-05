import express, { Request, Response } from "express"
import cors from "cors"
import path from "path"

import { Route } from "./foundation"

export class App {
	public server = express()
	private static singleton: App
	constructor() {
		if (App.singleton instanceof App) return App.singleton

		this.middlewares()
		this.createCors()
		this.pageNotFound()
		App.singleton = this
	}

	middlewares() {
		this.server.use(express.json())
		this.server.use(express.static(path.resolve(__dirname, '..', '..', 'public')))
	}

	createCors() {
		this.server.use(cors())
	}

	pageNotFound = () => {
		Route.all("*", (req: Request, res: Response) => res.json({ code: 404, message: "404 Not Found" }))
	}
}