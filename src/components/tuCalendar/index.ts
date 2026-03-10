import tuComponent from "./tuCalendar.vue";
import tuComponent2 from "./tuCalendarDialog.vue";
import type { 
	ICalendarItem, 
	TuCalendarServerModel, 
	CalendarCategory, 
	CalendarTheme, 
	CalendarPeriod 
} from "./ICalendarItem";



tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent2.name, tuComponent2);  
};

if (typeof window !== "undefined" && (<any>window).Vue) 
	tuComponent.install((<any>window).Vue);  

export {tuComponent as TuCalendar, tuComponent2 as TuCalendarDialog};
export type { 
	ICalendarItem, 
	TuCalendarServerModel, 
	CalendarCategory, 
	CalendarTheme, 
	CalendarPeriod 
};