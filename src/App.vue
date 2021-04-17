<template>
	<div>
		<h1>
			Vuesax3 (Typescript + composition API Demo) - TheCelebrimbor -
			Github
		</h1>
		<br />
		<br />
		<br />
		<h3>Buttons:</h3>
		<hr />
		<vs-button type="filled" color="primary" style="margin-right: 10px">
			Some text here
		</vs-button>
		<vs-button type="border" color="primary" style="margin-right: 10px">
			Some text here
		</vs-button>
		<vs-button type="flat" color="primary" style="margin-right: 10px">
			Some text here
		</vs-button>
		<vs-button type="line" color="primary" style="margin-right: 10px">
			Some text here
		</vs-button>
		<vs-button type="gradient" color="primary" style="margin-right: 10px">
			Some text here
		</vs-button>
		<vs-button type="relief" color="primary" style="margin-right: 10px">
			Some text here
		</vs-button>
		<br />
		<br />
		<h3>Alerts:</h3>
		<hr />
		<vs-alert
			title="Lorem ipsum dolor sit amet"
			color="rgb(231, 154, 23)"
			active="true"
		>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
			ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
			aliquip ex ea commodo consequat
		</vs-alert>
		<div class="centerx">
		<vs-button @click="active1=!active1" color="primary" type="filled">{{!active1?'Open Alert':'Close Alert'}}</vs-button>
		<vs-alert
			v-model:active="active1"
			closable
			close-icon="close">
		Lorem ip
		sum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
		</vs-alert>
	</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import vsButton from "./components/vsButton";
import vsAlert from "./components/vsAlert";
import * as components from "./components"



export default defineComponent({
	components: {
		...components	
	},
	setup(props, context){

		let active1 = ref(true);

		return {
			active1
		}
	}
});
</script>
