<template>
	<div>
		<calendar-view
			:show-date="showDate"
			:items="events"
			:show-times="true"
			:displayWeekNumbers="true"
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
					<tu-table>
						<template #tbody>
							<tu-tr invisible>
								<tu-td>
									<span title="Label">Title</span>
								</tu-td>
								<tu-td>
									<tu-input
										primary
										v-model="newItemTitle"
										state="primary"
										placeholder="Title"
									/>
								</tu-td>
							</tu-tr>
							<tu-tr invisible>
								<tu-td>
									<span title="Label">Start Date</span>
								</tu-td>
								<tu-td>
									<tu-input
										type="date"
										v-model="newItemStartDate"
									/>
								</tu-td>
							</tu-tr>
							<tu-tr invisible>
								<tu-td>
									<span title="Label">Start Time</span>
								</tu-td>
								<tu-td>
									<tu-input
										type="time"
										v-model="newItemStartTime"
									/>
								</tu-td>
							</tu-tr>
							<tu-tr invisible>
								<tu-td>
									<span title="Label">End Date</span>
								</tu-td>
								<tu-td>
									<tu-input
										type="date"
										v-model="newItemEndDate"
									/>
								</tu-td>
							</tu-tr>
							<tu-tr invisible>
								<tu-td>
									<span title="Label">End Time</span>
								</tu-td>
								<tu-td>
									<tu-input
										type="time"
										v-model="newItemEndTime"
									/>
								</tu-td>
							</tu-tr>
							<tu-tr invisible>
								<tu-td>
									<span title="Label">description</span>
								</tu-td>
								<tu-td>
									<div class="tu-ckeditor">
										<ckeditor
											:editor="editor"
											v-model="editorData"
											:config="editorConfig"
										></ckeditor>
									</div>
								</tu-td>
							</tu-tr>
						</template>
					</tu-table>
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
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./css/style.css";
import "./css/index.css";
interface Items {
	title?: string;
	startDate: Date;
	endDate?: Date;
	id: String;
}
export default defineComponent({
	name: "TuCalendar",
	components: {
		CalendarView,
		CalendarViewHeader,
		ckeditor: CKEditor.component
	},
	props: {
		items: {
			type: Object as PropType<Array<Items>>,
			default: []
		}
	},
	emits: ["onClickDay"],
	data () {
		return {
			editor: ClassicEditor,
			editorConfig: {

			}
		};
	},
	setup (props, context) {
		const showDate = ref(new Date());
		const activateDialog = ref(false);
		const newItemTitle = ref("");
		const newItemStartDate = ref();
		const newItemStartTime = ref();
		const newItemEndDate = ref();
		const newItemEndTime = ref();
		const events: Ref<Items[]> = ref(props.items);
		const editorData = ref("");
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
			console.log(editorData.value);
			if (newItemEndDate.value === undefined)
				newItemEndDate.value = newItemStartDate.value;
			events.value.push({
				startDate: new Date(
					newItemStartDate.value + " " + newItemStartTime.value
				),
				endDate: new Date(
					newItemEndDate.value + " " + newItemEndTime.value
				),
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
			editorData
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
</style>
