import { RequestHandler } from "express";

export type METHOD = "GET" | "POST" | "PUT" | "OPTIONS" | "ANY" | "DELETE"
export interface GroupRoute {
	prefix: string;
	middleware?: RequestHandler[]
}