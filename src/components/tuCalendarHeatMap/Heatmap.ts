export interface TuHeatmapValue {
	date: Date | string;
	count: number;
}

export interface Activity {
	count: number;
	colorIndex: number;
}

export type Activities = Map<string, Activity>;


export interface TuHeatmapCalendarItem {
	date: Date;
	count?: number;
	colorIndex: number;
	isEmpty?: boolean; // True for cells outside the actual date range (padding cells)
}

export type TuHeatmapCalendar = TuHeatmapCalendarItem[][];

export interface TuHeatmapMonth {
	value: number;
	index: number;
}

export interface TuHeatmapLocale {
	months: string[];
	days: string[];
	on: string;
	less: string;
	more: string;
}

export type TuHeatmapTooltipFormatter = (item: TuHeatmapCalendarItem, unit: string) => string;


export class Heatmap {

	static readonly DEFAULT_RANGE_COLOR_LIGHT = [ "#ebedf0", "#dae2ef", "#c0ddf9", "#73b3f3", "#3886e1", "#17459e" ];
	static readonly DEFAULT_RANGE_COLOR_DARK  = [ "#1f1f22", "#1e334a", "#1d466c", "#1d5689", "#1d69ac", "#1B95D1" ];
	// other color candidates
	// static readonly DEFAULT_RANGE_COLOR_LIGHT = [ '#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39' ];
	// static readonly DEFAULT_RANGE_COLOR_DARK  = [ '#161b22', '#0e4429', '#006d32', '#26a641', '#39d353' ];
	// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#011526', '#012E40', '#025959', '#02735E', '#038C65' ];
	// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#161b22', '#015958', '#008F8C', '#0CABA8', '#0FC2C0' ];
	// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#012030', '#13678A', '#45C4B0', '#9AEBA3', '#DAFDBA' ];
	static readonly DEFAULT_LOCALE: TuHeatmapLocale = {
		months: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
		days  : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
		on    : "on",
		less  : "Less",
		more  : "More"
	};
	static readonly DEFAULT_TOOLTIP_UNIT   = "contributions";
	static readonly DAYS_IN_ONE_YEAR       = 365;
	static readonly DAYS_IN_WEEK           = 7;
	static readonly SQUARE_SIZE            = 10;

	startDate: Date;
	endDate: Date;
	max: number;

	private _values: TuHeatmapValue[];
	private _firstFullWeekOfMonths?: TuHeatmapMonth[];
	private _activities?: Activities;
	private _calendar?: TuHeatmapCalendar;

	constructor(endDate: Date | string, values: TuHeatmapValue[], max?: number) {
		this.endDate   = this.parseDate(endDate);
		this.max       = max || (values.length > 0 ? Math.ceil((Math.max(...values.map(day => day.count)) / 5) * 4) : 10);
		
		// Calculate startDate: For a full calendar year, use Jan 1 of the same year as endDate
		// If endDate is Dec 31, startDate should be Jan 1 of that year
		const endDateObj = this.parseDate(endDate);
		
		// Check if endDate is December 31st (or close to it)
		if (endDateObj.getMonth() === 11 && endDateObj.getDate() >= 28) {
			// It's a year-end date, so use Jan 1 of that year as start
			this.startDate = new Date(endDateObj.getFullYear(), 0, 1);
		}
		else {
			// Otherwise, go back 365 days from endDate
			this.startDate = this.shiftDate(endDate, -Heatmap.DAYS_IN_ONE_YEAR);
		}
		
		this._values   = values;
	}

	set values(v: TuHeatmapValue[]) {
		this.max                    = Math.ceil((Math.max(...v.map(day => day.count)) / 5) * 4);
		this._values                = v;
		this._firstFullWeekOfMonths = undefined;
		this._calendar              = undefined;
		this._activities            = undefined;
	}

	get values(): TuHeatmapValue[] {
		return this._values;
	}

	get activities(): Activities {
		if (!this._activities) {
			this._activities = new Map();
			for (let i = 0, len = this.values.length; i < len; i++) {
				this._activities.set(this.keyDayParser(this.values[ i ].date), {
					count     : this.values[ i ].count,
					colorIndex: this.getColorIndex(this.values[ i ].count)
				});
			}
		}
		return this._activities;
	}

	get weekCount() {
		const days = this.getDaysCount();
		const weeks = Math.ceil(days / Heatmap.DAYS_IN_WEEK);
		// Ensure we have a valid positive number
		return Math.max(1, weeks);
	}

	get calendar() {
		if (!this._calendar) {
			// Create calendar starting from startDate's week beginning (Sunday)
			// This creates the "imperfect" grid with empty cells before and after actual dates
			const date     = this.shiftDate(this.startDate, -this.getCountEmptyDaysAtStart());
			this._calendar = new Array(this.weekCount);
			
			for (let i = 0, len = this._calendar.length; i < len; i++) {
				this._calendar[ i ] = new Array(Heatmap.DAYS_IN_WEEK);
				for (let j = 0; j < Heatmap.DAYS_IN_WEEK; j++) {
					const currentDate = new Date(date.valueOf());
					
					// Only add data if the date is within startDate and endDate range
					const isInRange = currentDate >= this.startDate && currentDate <= this.endDate;
					const dayValues = isInRange ? this.activities.get(this.keyDayParser(currentDate)) : undefined;
					
					this._calendar[ i ][ j ] = {
						date      : currentDate,
						count     : dayValues ? dayValues.count : undefined,
						colorIndex: isInRange ? (dayValues ? dayValues.colorIndex : 0) : 0,
						isEmpty   : !isInRange // Mark cells outside the range as empty
					};
					date.setDate(date.getDate() + 1);
				}
			}
		}
		return this._calendar;
	}

	get firstFullWeekOfMonths(): TuHeatmapMonth[] {
		if (!this._firstFullWeekOfMonths) {
			const cal                   = this.calendar;
			this._firstFullWeekOfMonths = [];
			for (let index = 1, len = cal.length; index < len; index++) {
				const lastWeek = cal[ index - 1 ][ 0 ].date;
				const currentWeek = cal[ index ][ 0 ].date;
				if (lastWeek.getFullYear() < currentWeek.getFullYear() || lastWeek.getMonth() < currentWeek.getMonth()) 
					this._firstFullWeekOfMonths.push({ value: currentWeek.getMonth(), index });
				
			}
		}
		return this._firstFullWeekOfMonths;
	}

	getColorIndex(count?: number) {
		if (count === null || count === undefined) 
			return 0;
		
		else if (count <= 0) 
			return 1;
		
		else if (count >= this.max) 
			return 5;
		
		else 
			return (Math.ceil(((count * 100) / this.max) * (0.03))) + 1;
		
	}

	getCountEmptyDaysAtStart() {
		return this.startDate.getDay(); // Days before startDate to reach previous Sunday
	}

	getCountEmptyDaysAtEnd() {
		return (Heatmap.DAYS_IN_WEEK - 1) - this.endDate.getDay(); // Days after endDate to reach next Saturday
	}

	getDaysCount() {
		// Calculate actual days between startDate and endDate
		const msPerDay = 1000 * 60 * 60 * 24;
		const startTime = this.startDate.getTime();
		const endTime = this.endDate.getTime();
		const actualDays = Math.round((endTime - startTime) / msPerDay) + 1;
		
		// Add padding days to complete the week grid
		return actualDays + this.getCountEmptyDaysAtStart() + this.getCountEmptyDaysAtEnd();
	}

	private shiftDate(date: Date | string, numDays: number) {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() + numDays);
		return newDate;
	}

	private parseDate(entry: Date | string) {
		return (entry instanceof Date) ? entry : (new Date(entry));
	}

	private keyDayParser(date: Date | string) {
		const day = this.parseDate(date);
		return String(day.getFullYear()) + String(day.getMonth()).padStart(2, "0") + String(day.getDate()).padStart(2, "0");
	}

}