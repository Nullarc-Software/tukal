<template>
    <div>
        <calendar-view
            :show-date="showDate"
            class="theme-default holiday-us-traditional holiday-us-official">
                <template #header="{ headerProps }">
                    <calendar-view-header
                    :header-props="headerProps"
                    @input="setShowDate" />
                </template>
		</calendar-view>
		<tu-dialog width="550px" v-model="activateDialog">
                <template v-slot:header>
                    <h4>Welcome to <b>Vuesax3</b></h4>
                </template>
                <tu-text-area />
                <div class="con-content">
                    Vuesax3 is a relatively new framework with a refreshing
                    design and in the latest trends, vuesax based on vuejs which
                    means that we go hand in hand with one of the most popular
                    javascript frameworks in the world and with a huge community
                    with which you will have all the help and documentation to
                    create and make your project
                </div>

                <template v-slot:footer>
                    <tu-button
                        width="100px"
                        style="margin: 5px"
                        @click="activateDialog = false"
                        block
                    >
                        Ok
                    </tu-button>
                    <tu-button type="flat" color="secondary" width="100px">
                        Cancel
                    </tu-button>
                </template>
            </tu-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import "vue-simple-calendar/dist/style.css";
export default defineComponent({
	name: "TuCalendar",
	components: {
		CalendarView,
		CalendarViewHeader
	},
	props: {

	},
	setup (props, context) {
		const showDate = ref(new Date());
		const activateDialog = ref(false);
		const setShowDate = (d) => {
			showDate.value = d;
		};

		return { showDate, setShowDate, activateDialog };
	}
});
</script>
