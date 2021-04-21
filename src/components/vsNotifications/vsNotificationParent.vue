<template>
	<div>
		<div
			:class="[
				'vs-notification-parent',
				`vs-notification-parent--top-left`
			]"
		>
			<component :is="'vs-notification'" v-for="(item, index) in tLeftArray" :key="index" v-bind="item"  @close="handleClose(this, 'top-left')" />
		</div>
		<div
			:class="[
				'vs-notification-parent',
				`vs-notification-parent--top-right`
			]"
		>
			<component :is="'vs-notification'" v-for="(item, index) in tLeftArray" :key="index" v-bind="item"  @close="handleClose(this, 'top-right')" />
		</div>
		<div
			:class="[
				'vs-notification-parent',
				`vs-notification-parent--bottom-left`
			]"
		>
			<component :is="'vs-notification'" v-for="(item, index) in tLeftArray" :key="index" v-bind="item"  @close="handleClose('bottom-left')" />
		</div>
		<div
			:class="[
				'vs-notification-parent',
				`vs-notification-parent--bottom-right`
			]"
		>
			<component :is="'vs-notification'" v-for="(item, index) in tLeftArray" :key="index" v-bind="item"  @close="handleClose('bottom-right')" />
		</div>
		<div
			:class="[
				'vs-notification-parent',
				`vs-notification-parent--top-middle`
			]"
		>
			<component :is="'vs-notification'" v-for="(item, index) in tLeftArray" :key="index" v-bind="item"  @close="handleClose('top-middle')" />
		</div>
		<div
			:class="[
				'vs-notification-parent',
				`vs-notification-parent--bottom-middle`
			]"
		>
			<component :is="'vs-notification'" v-for="(item, index) in tLeftArray" :key="index" v-bind="item"  @close="handleClose('bottom-middle')" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import _ from "lodash";

export default defineComponent({
	props: {
		position: {
			type: String,
			default: "bottom-right"
		},
		notifications: {
			type: Array,
			default: null
		}
	},
	setup(props, context) {
		let tLeftArray = reactive<Array<any>>([]);
		let tRightArray = reactive<Array<any>>([]);
		let bLeftArray = reactive<Array<any>>([]);
		let bRightArray = reactive<Array<any>>([]);
		let tMidArray = reactive<Array<any>>([]);
		let bMidArray = reactive<Array<any>>([]);

		let tLid = ref(0);
		let tRid = ref(0);
		let bLid = ref(0);
		let bRid = ref(0);
		let tMid = ref(0);
		let bMid = ref(0);

		watch(
			props.notifications,
			(newValue: Array<any>, oldValue: Array<any>) => {
								
				//new item added
				let toAdd = _.difference(newValue, oldValue);
				for (let item of toAdd) {
					if(item.position = "top-right") {							
						item.id = ++tRid.value;
						tRightArray.push(item);
					}
					if(item.position = "bottom-right") {							
						item.id = ++bRid.value;
						bRightArray.push(item);
					}
					if(item.position = "top-left") {							
						item.id = ++tLid.value;
						tLeftArray.push(item);
					}
					if(item.position = "bottom-left") {							
						item.id = ++bLid.value;
						bLeftArray.push(item);
					}
					if(item.position = "top-middle") {							
						item.id = ++tMid.value;
						tMidArray.push(item);
					}
					if(item.position = "bottom-middle") {							
						item.id = ++bMid.value;
						bMidArray.push(item);
					}
				}
				 
			}
		);


		const handleClose = function(category){

		}

		return {
			tLeftArray,
			tRightArray,
			bLeftArray,
			bRightArray,
			tMidArray,
			bMidArray
		};
	}
});
</script>

<style>
</style>