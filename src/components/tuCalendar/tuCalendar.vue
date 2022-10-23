<template>
    <div>
        <calendar-view
            :show-date="showDate"
            :items="items"
			@click-date="onClickDay"
            class="theme-default holiday-us-traditional holiday-us-official">
                <template #header="{ headerProps }">
                    <calendar-view-header
                    :header-props="headerProps"
                    @input="setShowDate" />
                </template>
		</calendar-view>
		<tu-dialog width="550px" v-model="activateDialog">
            <header v-if="$slots.dialogHeader">
                <slot name="dialogHeader" />
            </header>
                <div v-if="$slots.dialogContent" class="con-content">
                    <slot name="dialogContent" />
                </div>
                <template v-slot:footer>
                </template>
            </tu-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropType } from "vue";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import "vue-simple-calendar/dist/style.css";
interface Items {
            startDate: Date,
            endDate?: Date,
            id: String
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
		}
	},
	emits: [
		"onClickDay"
	],
	setup (props, context) {
		const showDate = ref(new Date());
		const activateDialog = ref(false);
		const items: Ref<Items[]> = ref(props.items);
		const onClickDay = (d: String) => {
            const convertstring = d.toString();
			const parts = convertstring.split(" ");
			const months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
			const date = parts[3] + "-" + months[parts[1]] + "-" + parts[2];
			context.emit("onClickDay", date);
			activateDialog.value = true;
		};
		const setShowDate = (d) => {
			showDate.value = d;
		};
		return { showDate, setShowDate, activateDialog, onClickDay, items };
	}
});
</script>
