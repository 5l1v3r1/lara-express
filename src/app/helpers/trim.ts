export const trim = (str: string, char: string): string => {
	while (~char.indexOf(str[0])) {
		str = str.slice(1)
	}
	while (~char.indexOf(str[str.length - 1])) {
		str = str.slice(0, -1)
	}
	return str
}

export const rtrim = (str: string, char: string): string => {
	if (str.slice(str.length - char.length) === char) {
		return rtrim(char, str.slice(0, 0 - char.length));
	} else {
		return str;
	}
}

export const ltrim = (str: string, char: string): string => {
	if (str.slice(0, char.length) === char) {
		return ltrim(char, str.slice(char.length));
	} else {
		return str;
	}
}