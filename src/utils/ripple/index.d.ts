import './style.sass';
declare const ripple: (evt: any, color?: any, solid?: boolean) => void;
declare const rippleReverse: (evt: any) => void;
declare const rippleCut: (evt: any) => void;
export default ripple;
export { rippleReverse, rippleCut };
