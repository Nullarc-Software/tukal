interface ICalendarItem {
	// Required properties
	id: string;
	startDate: Date;
	title: string;

	// Optional properties
	endDate?: Date;
	category?: string;
	tooltip?: string;
	url?: string;
	classes?: string[];
	style?: string;
	data?: Record<string, unknown>;
}

interface INormalizedCalendarItem extends ICalendarItem {
	endDate: Date;
	originalItem: ICalendarItem;
	classes: string[];
	itemRow?: number;
}

export interface TuCalendarServerModel {
	ajaxUrl: string;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	ajaxLoadedFn?: (data: ICalendarItem[]) => void;
	ajaxErrorFn?: (error: Error) => void;
}

interface CalendarCategory {
	name: string;
	color: string;
}

interface CalendarTheme {
	name: string;
	className: string;
}

interface CalendarPeriod {
	type: "month" | "week" | "day";
	label: string;
}

type DateTimeFormatOption = "long" | "short" | "narrow" | undefined;

export type { 
	ICalendarItem, 
	INormalizedCalendarItem, 
	DateTimeFormatOption,
	CalendarCategory,
	CalendarTheme,
	CalendarPeriod
};
