export default {
	name:"easing",
	// no easing, no acceleration
	linear(t: number, b: number, c: number, d: number): number {
		return c*t/d + b;
	},
	// accelerating from zero velocity
	easeInQuad(t: number, b: number, c: number, d: number): number {
		t /= d;
		return c*t*t + b;
	},
	// decelerating to zero velocity
	easeOutQuad(t: number, b: number, c: number, d: number): number {
		t /= d;
		return -c * t*(t-2) + b;
	},
	// acceleration until halfway, then deceleration
	easeInOutQuad (t: number, b: number, c: number, d: number): number {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	},
	// accelerating from zero velocity
	easeInCubic(t: number, b: number, c: number, d: number): number {
		t /= d;
		return c*t*t*t + b;
	},
	// decelerating to zero velocity
	easeOutCubic(t: number, b: number, c: number, d: number): number {
		t /= d;
		t--;
		return c*(t*t*t + 1) + b;
	},
	// acceleration until halfway, then deceleration
	easeInOutCubic(t: number, b: number, c: number, d: number): number {
		t /= d/2;
		if (t < 1) return c/2*t*t*t + b;
		t -= 2;
		return c/2*(t*t*t + 2) + b;
	},
	// accelerating from zero velocity
	easeInQuart(t: number, b: number, c: number, d: number): number {
		t /= d;
		return c*t*t*t*t + b;
	},
	// decelerating to zero velocity
	easeOutQuart(t: number, b: number, c: number, d: number): number {
		t /= d;
		t--;
		return -c * (t*t*t*t - 1) + b;
	},
	// acceleration until halfway, then deceleration
	easeInOutQuart(t: number, b: number, c: number, d: number): number {
		t /= d/2;
		if (t < 1) return c/2*t*t*t*t + b;
		t -= 2;
		return -c/2 * (t*t*t*t - 2) + b;
	},
	// accelerating from zero velocity
	easeInQuint(t: number, b: number, c: number, d: number): number {
		t /= d;
		return c*t*t*t*t*t + b;
	},
	// decelerating to zero velocity
	easeOutQuint(t: number, b: number, c: number, d: number): number {
		t /= d;
		t--;
		return c*(t*t*t*t*t + 1) + b;
	},
	// acceleration until halfway, then deceleration
	easeInOutQuint(t: number, b: number, c: number, d: number): number {
		t /= d/2;
		if (t < 1) return c/2*t*t*t*t*t + b;
		t -= 2;
		return c/2*(t*t*t*t*t + 2) + b;
	},
	easeInSine(t: number, b: number, c: number, d: number): number {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine(t: number, b: number, c: number, d: number): number {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine(t: number, b: number, c: number, d: number): number {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo(t: number, b: number, c: number, d: number): number {
		return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
	},
	easeOutExpo(t: number, b: number, c: number, d: number): number {
		return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
	},
	easeInOutExpo(t: number, b: number, c: number, d: number): number {
		t /= d/2;
		if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
		t--;
		return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
	},
	easeInCirc(t: number, b: number, c: number, d: number): number {
		t /= d;
		return -c * (Math.sqrt(1 - t*t) - 1) + b;
	},
	easeOutCirc(t: number, b: number, c: number, d: number): number {
		t /= d;
		t--;
		return c * Math.sqrt(1 - t*t) + b;
	},
	easeInOutCirc(t: number, b: number, c: number, d: number): number {
		t /= d/2;
		if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		t -= 2;
		return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
	}
};
