<template>
	<div class="tu-calendar">
		<calendar-view :show-date="showDate" :items="events" :show-times="true" :displayWeekNumbers="true"
			:categories="eventCategories" @click-date="onClickDay" :displayPeriodUom="periodUOM" @updateItems="updateItems"
			@deleteItem="deleteItem" :components="components" :class="colorTheme">
			<template #header="{ headerProps }">
				<calendar-view-header :header-props="headerProps" @input="setShowDate" @updatePeriod="updatePeriod"
					@updateTheme="updateTheme" @updateCategory="updateCategory" />
			</template>
		</calendar-view>
		<tu-dialog width="550px" v-model="activateDialog">
			<header v-if="$slots.dialogHeader">
				<slot name="dialogHeader" />
			</header>
			<header v-else>
				<h2 class="dialog-header">Create Event</h2>
			</header>
			<div v-if="$slots.dialogContent" class="con-content">
				<slot name="dialogContent" />
			</div>
			<div v-else class="center">
				<div>
					<table>
						<tr>
							<td>
								<span title="Label">Title</span>
							</td>
							<td>
								<tu-input primary v-model="newItem.Title" state="primary" placeholder="Title" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label"></span>
							</td>
							<td>
								<tu-checkbox v-model="allDay">
									All Day
								</tu-checkbox>
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Start Date</span>
							</td>
							<td>
								<tu-input type="date" v-model="newItem.StartDate" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Start Time</span>
							</td>
							<td>
								<tu-input type="time" v-model="newItem.StartTime" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">End Date</span>
							</td>
							<td>
								<tu-input type="date" v-model="newItem.EndDate" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">End Time</span>
							</td>
							<td>
								<tu-input type="time" v-model="newItem.EndTime" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Category</span>
							</td>
							<td>
								<tu-select inline v-model="newItem.Category">
									<tu-select-option v-for="category in categories" :key="category" :label="category.name"
										:value="category.name">
										<span class="dot" :style="styleChip(category.color)"></span>
										{{ category.name }}
									</tu-select-option>
								</tu-select>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<template v-slot:footer>
				<tu-button success @click="submitNewItem"> Submit </tu-button>
			</template>
		</tu-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, reactive } from "vue";
import CalendarView from "./CalendarView.vue";
import CalendarViewHeader from "./CalendarViewHeader.vue";
import { isUndefined } from "lodash";
import { ICalendarItem, TuCalendarServerModel } from "./ICalendarItem";
import _color from "../../utils/color";
import "./css/light.scss";
import "./css/index.scss";
import { TukalGlobals } from "../tukalGlobals";
import { XHRRequestWrapper } from "../../utils/apiWrapper";
import dayjs from "dayjs";

type Category = {
	name: string;
	color: string;
}

interface Props {
	modelValue?: unknown;
	items?: ICalendarItem[];
	categories?: Category[];
	model?: string;
	serverSideConfig?: TuCalendarServerModel;
	components?: unknown;
	theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined,
	items: () => [],
	categories: () => [],
	model: "local",
	serverSideConfig: () => ({} as TuCalendarServerModel),
	components: undefined,
	theme: "theme-default"
});

const emit = defineEmits<{
	onClickDay: [date?: Date];
	"update:modelValue": [value: ICalendarItem[]];
	categoriesUpdated: [category: Category];
}>();

defineOptions({
	name: "TuCalendar"
});

const showDate = ref(new Date());
const activateDialog = ref(false);
const newItem = reactive({
	Title: null as string | null,
	StartDate: null as string | null,
	EndDate: null as string | null,
	StartTime: null as string | null,
	EndTime: null as string | null,
	Category: null as string | null
});
const periodUOM = ref("month");
const allDay = ref(false);
const colorTheme: Ref<string> = ref("theme-default");
let events: Ref<ICalendarItem[]>;
const eventCategories = ref(props.categories);

if (props.model === "local") {
	events = ref(props.items);
} else {
	events = ref([]);
	const xhrRequest = new XHRRequestWrapper();
	const serverSideModel: Ref<TuCalendarServerModel> = ref(
		props.serverSideConfig
	);

	if (isUndefined(serverSideModel.value.method))
		serverSideModel.value.method = "GET";

	xhrRequest.request.onreadystatechange = function () {
		if (
			xhrRequest.request.readyState === XMLHttpRequest.DONE &&
			xhrRequest.request.status === 200
		) {
			if (xhrRequest.request.responseType === "json")
				events.value = xhrRequest.request.response.data;
			else if (xhrRequest.request.responseType === "text")
				events.value = JSON.parse(xhrRequest.request.responseText);
			else {
				events.value = JSON.parse(xhrRequest.request.responseText);
			}
		}
	};
	xhrRequest.open(
		serverSideModel.value.method,
		TukalGlobals.ApiRequestTarget + serverSideModel.value.ajaxUrl,
	);
	xhrRequest.request.setRequestHeader("Content-Type", "application/json");
	xhrRequest.request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhrRequest.request.send();
}

// Remove unused variables and functions
// const content = ref();
// function log(value: unknown) {
// 	console.log(value);
// }

const onClickDay = (d: Date) => {
	const date = dayjs(d).format("YYYY-MM-DD");
	emit("onClickDay");
	newItem.StartDate = date;
	activateDialog.value = true;
};

const submitNewItem = () => {
	if (newItem.EndDate === undefined)
		newItem.EndDate = newItem.StartDate;
	events.value.push({
		startDate: new Date(
			newItem.StartDate + " " + newItem.StartTime
		),
		endDate: new Date(newItem.EndDate + " " + newItem.EndTime),
		category: newItem.Category || undefined,
		title: newItem.Title || "",
		id: "e" + Math.random().toString(36).substring(2, 11)
	});
	activateDialog.value = false;
};

const setShowDate = (d: Date) => {
	showDate.value = d;
};

watch(allDay, () => {
	if (allDay.value === true) {
		newItem.StartTime = "00:00";
		newItem.EndTime = "23:59";
		newItem.EndDate = newItem.StartDate;
	}
});

const updateItems = (item: ICalendarItem) => {
	const itemIndex = events.value.findIndex(
		(obj) => obj.id === item.id
	);
	events.value[itemIndex] = item;
	emit("update:modelValue", events.value);
};

const deleteItem = (id: string) => {
	const itemIndex = events.value.findIndex((obj) => obj.id === id);
	events.value.splice(itemIndex, 1);
	emit("update:modelValue", events.value);
};

const updatePeriod = (period: string) => {
	periodUOM.value = period;
};

const updateTheme = (theme: string) => {
	colorTheme.value = theme;
};

const updateCategory = ([color, name]: [string, string]) => {
	const newCategory = {
		name: name,
		color: color
	};
	eventCategories.value.push(newCategory);
	console.log(newCategory);
	emit("categoriesUpdated", newCategory);
};

const styleChip = (categoryColor: string) => {
	let background;
	console.log(categoryColor);
	if (/^(rgb|rgba)/.test(categoryColor)) 
		background = categoryColor;
	else 
		background = `rgba(${_color.getColor(categoryColor, 0.6)})`;
	
	return {
		background: background
	};
};
</script>

<style>
.center {
	display: flex;
	align-items: center;
	justify-content: center;
}

.dot {
	height: 20px;
	width: 20px;
	margin-right: 5px;
	border-radius: 50%;
	display: inline-block;
}

.tu-calendar {
	border-radius: 25px;
}

.dialog-header {
	text-align: center;
}
</style>
