import CalendarMath from "./CalendarMath";
import { INormalizedCalendarItem } from "./ICalendarItem";

class CalendarViewState {
	currentDragItem?: INormalizedCalendarItem = undefined;
	dateSelectionOrigin?: Date = undefined;
	currentHoveredItemId: string = "";
	CalendarMath: object = CalendarMath;
}

export default CalendarViewState;
