interface ICalendarItem {
	// Required
	id: string
	startDate: Date
	title: string

	// Optional
	data?: any
	category?: string
	tooltip?: string
	endDate?: Date
	url?: string
	classes?: string[] | null
	style?: string
}

interface INormalizedCalendarItem extends ICalendarItem {
	endDate: Date
	originalItem: ICalendarItem
	classes: string[]
	itemRow?: number
}

export interface TuCalendarServerModel {
	ajaxUrl: string;
	method?: string;
	ajaxLoadedFn?: Function;
	ajaxErrorFn?: Function;
}

type DateTimeFormatOption = "long" | "short" | "narrow" | undefined

export { ICalendarItem, INormalizedCalendarItem, DateTimeFormatOption };
