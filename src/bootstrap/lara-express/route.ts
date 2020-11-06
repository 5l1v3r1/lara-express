import { Router, RequestHandler } from "express";
import { METHOD, GroupRoute } from '@lara-express'
import { Str } from "@lara-express/helpers";


class RouteClass {
	private static singleton: RouteClass
	public routes: Router = Router()
	/**
	 * 
	 * * GOALS
	 * 
	 * prefix stack/tumpukan digunakan untuk menumpuk prefix pada route group. contohnya pada 
	 * route group yang memiliki prefix `admin` supaya prefix admin tetap diingat pada child
	 * route maka,perlu dimasukkan kedalam `prefix_stack` sehingga ketika child route 
	 * diisi `dashboard`.Bisa dipastikan prefixnya yaitu `/admin/dashboard`
	 * 
	 * * Check: this.group untuk kodingan nya
	 * 
	 */
	private prefix_stack: string[] = [];
	private middleware_stack: RequestHandler[] = [];


	constructor() {
		if (RouteClass.singleton instanceof RouteClass) return RouteClass.singleton
		RouteClass.singleton = this
	}


	get = (prefix: string, ...handler: Array<RequestHandler>) => this.handleRoute("GET", prefix, ...handler)
	post = (prefix: string, ...handler: Array<RequestHandler>) => this.handleRoute("POST", prefix, ...handler)
	delete = (prefix: string, ...handler: Array<RequestHandler>) => this.handleRoute("DELETE", prefix, ...handler)
	put = (prefix: string, ...handler: Array<RequestHandler>) => this.handleRoute("PUT", prefix, ...handler)
	all = (prefix: string, ...handler: Array<RequestHandler>) => this.handleRoute("ANY", prefix, ...handler)

	/**
	 * TODO: Mengelompokkan route yang ada didalam callback
	 * @param options opsi group route
	 * @param callback 
	 */
	group = async (options: GroupRoute, callback: Function) => {
		this.prefix_stack.push(Str.trim(options.prefix, '/'))
		if (typeof options.middleware !== 'undefined')
			this.middleware_stack = [...this.middleware_stack, ...options.middleware]
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

	/**
	 * TODO: Menangani routes dari mulai menyatukan prefix sampai dengan menyatukan middleware
	 * @param method METHOD type
	 * @param prefix url
	 * @param handler RequestHandler[]
	 */
	private handleRoute = (method: METHOD, prefix: string, ...handler: Array<RequestHandler>) => {
		let fullPrefix = this.getFullPrefix(prefix)
		handler = [...this.middleware_stack, ...handler]
		switch (method) {
			case 'GET':
				this.routes.get(fullPrefix, ...handler)
				break
			case 'POST':
				this.routes.post(fullPrefix, ...handler)
				break
			case 'PUT':
				this.routes.put(fullPrefix, ...handler)
				break
			case 'DELETE':
				this.routes.delete(fullPrefix, ...handler)
				break
			case 'OPTIONS':
				this.routes.options(fullPrefix, ...handler)
				break
			case 'ANY':
				this.routes.all(fullPrefix, ...handler)
				break
		}
	}


	/**
	 * TODO: Menyatukan prefix stack dan prefix saat ini
	 * @param prefix url
	 */
	private getFullPrefix = (prefix: string) => `/${this.prefix_stack.length > 0 ? this.prefix_stack.join('/') + '/' : ''}${Str.trim(prefix, '/')}`
}

export const Route = new RouteClass()