import { Router, RequestHandler } from "express";

// Helpers
import { trim } from '../../app/helpers'

interface groupRoute {
	prefix: string;
	middleware?: RequestHandler[]
}


type METHOD = "GET" | "POST" | "PUT" | "OPTIONS" | "ANY"


class RouteClass {
	private static singleton: RouteClass
	public routes: Router = Router()
	private prefix_stack: string[] = [];
	constructor() {
		if (RouteClass.singleton instanceof RouteClass) return RouteClass.singleton
		RouteClass.singleton = this
	}


	get = (prefix: string, ...controller: Array<RequestHandler>) => this.routes.get(this.getFullPrefix(prefix), ...controller)
	post = (prefix: string, ...controller: Array<RequestHandler>) => this.routes.post(this.getFullPrefix(prefix), ...controller)
	delete = (prefix: string, ...controller: Array<RequestHandler>) => this.routes.delete(this.getFullPrefix(prefix), ...controller)
	put = (prefix: string, ...controller: Array<RequestHandler>) => this.routes.put(this.getFullPrefix(prefix), ...controller)
	all = (prefix: string, ...controller: Array<RequestHandler>) => this.routes.all(this.getFullPrefix(prefix), ...controller)

	group = async (options: groupRoute, callback: Function) => {
		this.prefix_stack.push(trim(options.prefix, '/'))
		return await new Promise((resolve, reject) => {
			try {
				callback()
				resolve(RouteClass)
				this.prefix_stack.pop()
			} catch (error) {
				reject(error)
			}
		})
	}

	private getFullPrefix = (prefix: string) => `/${this.prefix_stack.length > 0 ? this.prefix_stack.join('/') + '/' : ''}${trim(prefix, '/')}`
}


export const Route = new RouteClass()