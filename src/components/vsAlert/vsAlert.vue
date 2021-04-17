<template lang="html">
  <transition
	@before-enter="beforeEnter"
	@enter="enter"
	@leave="leave"
	>

	<div
	  v-if="active"
	  ref="alert"
	  :class="[`con-vs-alert-${color}`,{
		'con-icon':icon,
	  }]"
	  :style="styleAlert"
	  class="con-vs-alert"
	  v-bind="$attrs"
	  >
	  <div
		v-if="closable"
		class="con-x vs-alert--close"
		@click="$emit('update:active',false)">
		<vs-icon
		  :icon-pack="iconPack"
		  :icon="closeIcon"
		></vs-icon>
	  </div>

	  <h4
		v-if="title"
		:style="styleTitle"
		class="titlex vs-alert--title"
		v-text="title"
	  ></h4>

	  <div
		:class="{'con-icon': icon}"
		class="vs-alert">
		<vs-icon
		  v-if="icon"
		  :icon-pack="iconPack"
		  :icon="icon"
		  class="icon-alert"
		></vs-icon>
		<slot/>
	  </div>
	</div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref } from "vue";
import _color from "../../utils/color";

export default defineComponent({
	name: "VsAlert",
	props: {
		active: {
			type: [Boolean, String],
			default: true,
		},
		title: {
			type: String,
			default: null,
		},
		closable: {
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
			default: "primary",
		},
		margin: {
			type: [String, Boolean],
			default: "10px",
		},
		icon: {
			type: String,
			default: null,
		},
		closeIcon: {
			type: String,
			default: "close",
		},
		iconPack: {
			type: String,
			default: "material-icons",
		},
	},
	setup(props, context) {
		
		let alert = ref<HTMLDivElement>();

		const styleAlert = computed(() => {
			return {
				background: _color.getColor(props.color, 0.15),
				boxShadow: `0px 0px 25px 0px ${_color.getColor(
					props.color,
					0.15
				)}`,
				color: _color.getColor(props.color, 1),
			};
		});
		const styleTitle = computed(() => {
			return {
				boxShadow: `0px 6px 15px -7px ${_color.getColor(
					props.color,
					0.4
				)}`,
			};
		});

		const beforeEnter = (el) => {
			el.style.height = 0;
			el.style.opacity = 0;
		};
		const enter = (el, done) => {
			let h = alert.value?.scrollHeight;
			(alert.value as any).style.height = h + "px";
			el.style.opacity = 1;
			done();
		};
		const leave = (el, done) => {
			el.style.height = 0 + "px";
			el.style.opacity = 0;
		
		}

		onMounted(() => {
			if(alert.value){
				nextTick(() => {
					let h = alert.value?.scrollHeight;
					(alert.value as any).style.height = h + "px";	
				});
			}
		});


		return {
			alert,
			styleAlert,
			styleTitle,
			beforeEnter,
			enter,
			leave
		}
	}
});
</script>
