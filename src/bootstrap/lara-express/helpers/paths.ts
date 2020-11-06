import path from "path";
export const public_path = (target: string = '') => {
	let public_location = path.join(__dirname, '../../../../public')
	return path.join(public_location, target)
}