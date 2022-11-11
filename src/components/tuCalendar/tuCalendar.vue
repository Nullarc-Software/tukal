<template>
	<div>
		<calendar-view
			:show-date="showDate"
			:items="events"
			:show-times="true"
			:displayWeekNumbers="true"
			:categories="categories"
			@click-date="onClickDay"
			:displayPeriodUom="periodUOM"
			@updateItems="updateItems"
			@deleteItem="deleteItem"
			:components="components"
			:class="colorTheme"
		>
			<template #header="{ headerProps }">
				<calendar-view-header
					:header-props="headerProps"
					@input="setShowDate"
					@updatePeriod="updatePeriod"
					@updateTheme="updateTheme"
				/>
			</template>
		</calendar-view>
		<tu-dialog width="550px" v-model="activateDialog" @close="closeDialog">
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
								<tu-input
									primary
									v-model="newItem.Title"
									state="primary"
									placeholder="Title"
								/>
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
								<tu-input
									type="date"
									v-model="newItem.StartDate"
								/>
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Start Time</span>
							</td>
							<td>
								<tu-input
									type="time"
									v-model="newItem.StartTime"
								/>
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">End Date</span>
							</td>
							<td>
								<tu-input
									type="date"
									v-model="newItem.EndDate"
								/>
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">End Time</span>
							</td>
							<td>
								<tu-input
									type="time"
									v-model="newItem.EndTime"
								/>
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Category</span>
							</td>
							<td>
								<tu-select inline v-model="newItem.Category">
									<tu-select-option
										v-for="category in categories"
										:key="category"
										:label="category.name"
										:value="category.name"
									>
										<span
											class="dot"
											:style="styleChip(category.color)"
										></span>
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

<script lang="ts">
import { defineComponent, ref, Ref, PropType, watch, reactive } from "vue";
import CalendarView from "../tuCalendar/CalendarView.vue";
import CalendarViewHeader from "../tuCalendar/CalendarViewHeader.vue";
import { isUndefined } from "lodash";
import { ICalendarItem, TuCalendarServerModel } from "./ICalendarItem";
import * as _color from "../../utils";
import "./css/light.css";
import "./css/dark.css";
import "./css/index.css";
import tuComponent from "../tuComponent";
interface category {
	name: String;
	color: string;
}
export default defineComponent({
	name: "TuCalendar",
	extends: tuComponent,
	components: {
		CalendarView,
		CalendarViewHeader
	},
	props: {
		modelValue: {},
		items: {
			type: Object as PropType<Array<ICalendarItem>>,
			default: []
		},
		categories: {
			type: Object as PropType<Array<category>>,
			default: []
		},
		model: {
			type: String,
			default: "local"
		},
		serverSideConfig: {
			type: Object as PropType<TuCalendarServerModel>,
			default: () => {
				return {};
			}
		},
		components: {
			default: null
		},
		theme: {
			type: String,
			default: "theme-default"
		}
	},
	emits: ["onClickDay", "update:modelValue"],
	setup (props, context) {
		const showDate = ref(new Date());
		const activateDialog = ref(false);
		const newItem = reactive({
			Title: null,
			StartDate: null,
			EndDate: null,
			StartTime: null,
			EndTime: null,
			Category: null
		});
		const periodUOM = ref("month");
		const allDay = ref(false);
		const colorTheme: Ref<string> = ref("theme-default");
		let events: Ref<ICalendarItem[]>;
		if (props.model === "local") events = ref(props.items);
		else {
			const request: XMLHttpRequest = new XMLHttpRequest();
			const serverSideModel: Ref<TuCalendarServerModel> = ref(
				props.serverSideConfig
			);
			request.onreadystatechange = function () {
				if (
					request.readyState === XMLHttpRequest.DONE &&
					request.status === 200
				) {
					if (request.responseType === "json")
						events.value = request.response.data;
					else if (request.responseType === "text")
						events.value = JSON.parse(request.responseText);
					else events.value = JSON.parse(request.responseText);
				}
			};

			if (isUndefined(serverSideModel.value.method))
				serverSideModel.value.method = "GET";

			request.open(
				serverSideModel.value.method,
				serverSideModel.value.ajaxUrl,
				true
			);
			request.setRequestHeader("Content-Type", "application/json");
			request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		}
		const content = ref();
		const onClickDay = (d: String) => {
			const convertstring = d.toString();
			const parts = convertstring.split(" ");
			const months = {
				Jan: "01",
				Feb: "02",
				Mar: "03",
				Apr: "04",
				May: "05",
				Jun: "06",
				Jul: "07",
				Aug: "08",
				Sep: "09",
				Oct: "10",
				Nov: "11",
				Dec: "12"
			};
			const date = parts[3] + "-" + months[parts[1]] + "-" + parts[2];
			context.emit("onClickDay", date);
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
				category: newItem.Category,
				title: newItem.Title,
				id: "e" + Math.random().toString(36).substring(2, 11)
			});
			activateDialog.value = false;
		};
		const setShowDate = (d) => {
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
			context.emit("update:modelValue", events.value);
		};
		const deleteItem = (id: string) => {
			const itemIndex = events.value.findIndex((obj) => obj.id === id);
			events.value.splice(itemIndex, 1);
			context.emit("update:modelValue", events.value);
		};
		const updatePeriod = (period: string) => {
			periodUOM.value = period;
		};
		const updateTheme = (theme: string) => {
			console.log(theme);
			colorTheme.value = theme;
		};
		// const closeDialog = () => {
		// 	allDay.value = false;
		// 	newItemStartTime.value = "";
		// 	newItemEndTime.value = "";
		// 	newItemEndDate.value = null;
		// 	newItemTitle.value = null;
		// };
		const styleChip = (categoryColor: string) => {
			const background = _color.getApplyColor(categoryColor, 0.6);
			return {
				background: background
			};
		};
		return {
			showDate,
			setShowDate,
			activateDialog,
			onClickDay,
			events,
			newItem,
			submitNewItem,
			content,
			styleChip,
			periodUOM,
			allDay,
			updateItems,
			deleteItem,
			updatePeriod,
			colorTheme,
			updateTheme
			// closeDialog
		};
	}
});
</script>

<style>
.center {
	display: flex;
	align-items: center;
	justify-content: center;
}
.tu-ckeditor {
	width: 350px !important;
}
.dot {
	height: 20px;
	width: 20px;
	margin-right: 5px;
	border-radius: 50%;
	display: inline-block;
}
</style>
