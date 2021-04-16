
import color from './color'
export default {
	name: 'theme',
	vsfunction(json: any) {
		for (var clave in json) {
			let colorx
			if (/^[rgb(]/g.test(json[clave])) {
				colorx = json[clave].replace(/[rgb()]/g, '')
			} else if (/[#]/g.test(json[clave])) {
				let rgbx = color.hexToRgb(json[clave]);
				if (rgbx === null)
					colorx = `0,0,0`
				else
					colorx = `${rgbx.r},${rgbx.g},${rgbx.b}`
			} else {
				colorx = json[clave]
			}
			color.setCssVariable('--vs-' + clave, colorx)
		}
	},
}
