import lodash from "lodash";

export const trim = (str: string, char: string = ' '): string => lodash.trim(str, char)
export const trimStart = (str: string, char: string = ' '): string => lodash.trimStart(str, char)
export const trimEnd = (str: string, char: string = ' '): string => lodash.trimEnd(str, char)
export const lower = (str: string) => str.toLowerCase()
export const upper = (str: string) => str.toUpperCase()
export const contains = (str: string, search: string) => str.includes(search)
export const is = (pattern: string, str: string) => new RegExp(pattern.replace('*', '.*') + '$', '').test(str)

export const kebab = (str: string) => lodash.kebabCase(str)
export const random = (length: number) => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export const slug = (str: string, separator: string = '-') => str.toString()
	.normalize('NFD')
	.replace(/[\u0300-\u036f]/g, '')
	.toLowerCase()
	.trim()
	.replace(/[^a-z0-9 ]/g, '')
	.replace(/\s+/g, separator)
	.replace(/^-+/, "")
	.replace(/-+$/, "")


export const title = (str: string) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export const limit = (str: string, limit: number = 17, complement: string = '...') => {
	let newstr: string[] = [];
	if (str.length > limit) {
		str.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newstr.push(cur);
			}
			return acc + cur.length;
		}, 0);

		return `${newstr.join(' ')}${complement}`;
	}

	return str;
}