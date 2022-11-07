<template>
	<div>
		<calendar-view
			:show-date="showDate"
			:items="events"
			:show-times="true"
			:displayWeekNumbers="true"
			:categories="categories"
			@click-date="onClickDay"
			class="theme-default holiday-us-traditional holiday-us-official"
		>
			<template #header="{ headerProps }">
				<calendar-view-header
					:header-props="headerProps"
					@input="setShowDate"
				/>
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
								<tu-input
									primary
									v-model="newItemTitle"
									state="primary"
									placeholder="Title"
								/>
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Start Date</span>
							</td>
							<td>
								<tu-input
									type="date"
									v-model="newItemStartDate"
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
									v-model="newItemStartTime"
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
									v-model="newItemEndDate"
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
									v-model="newItemEndTime"
								/>
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Category</span>
							</td>
							<td>
								<tu-select inline v-model="selectedCategory">
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
import { defineComponent, ref, Ref, PropType, watch } from "vue";
import CalendarView from "../tuCalendar/CalendarView.vue";
import CalendarViewHeader from "../tuCalendar/CalendarViewHeader.vue";
import * as _color from "../../utils";
import "./css/style.css";
import "./css/index.css";
interface Items {
	title?: string;
	startDate: Date;
	endDate?: Date;
	category?: String;
	id: String;
}
interface category {
	name: String;
	color: String;
}
export default defineComponent({
	name: "TuCalendar",
	components: {
		CalendarView,
		CalendarViewHeader
	},
	props: {
		items: {
			type: Object as PropType<Array<Items>>,
			default: []
		},
		categories: {
			type: Object as PropType<Array<category>>,
			default: []
		}
	},
	emits: ["onClickDay"],
	setup (props, context) {
		const showDate = ref(new Date());
		const activateDialog = ref(false);
		const newItemTitle = ref("");
		const newItemStartDate = ref();
		const newItemStartTime = ref();
		const newItemEndDate = ref();
		const newItemEndTime = ref();
		const events: Ref<Items[]> = ref(props.items);
		const categories = ref(props.categories);
		const selectedCategory = ref("");
		const content = ref();
		console.log(categories);
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
			newItemStartDate.value = date;
			activateDialog.value = true;
		};
		const submitNewItem = () => {
			if (newItemEndDate.value === undefined)
				newItemEndDate.value = newItemStartDate.value;
			events.value.push({
				startDate: new Date(
					newItemStartDate.value + " " + newItemStartTime.value
				),
				endDate: new Date(
					newItemEndDate.value + " " + newItemEndTime.value
				),
				category: selectedCategory.value,
				title: newItemTitle.value,
				id: "e" + Math.random().toString(36).substring(2, 11)
			});
		};
		const setShowDate = (d) => {
			showDate.value = d;
		};
		watch(events.value, () => {
			activateDialog.value = false;
		});
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
			newItemTitle,
			newItemStartDate,
			newItemStartTime,
			newItemEndDate,
			newItemEndTime,
			submitNewItem,
			selectedCategory,
			content,
			styleChip
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
