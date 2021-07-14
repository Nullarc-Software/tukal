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
import VsIcon from "../vsIcon"

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
	},
	components: {
		VsIcon
	}
});
</script>

<style lang="scss" scoped>

@import "../../style/sass/_mixins";
@import "../../style/sass/_colors";

.con-vs-alert {
	border-radius: 6px;
	color: #fff;
	width: 100%;
	position: relative;
	font-size: 0.8rem;
	cursor: default;
	transition: all 0.25s ease;
	overflow: hidden;
}
.icon-alert {
	height: 100%;
	position: absolute;
	padding: 10px;
	top: 0px;
	font-size: 1.1rem;
	display: flex;
	align-items: center;
}
.vs-alert {
	padding: 10px;
	overflow: hidden;
	position: relative;
}
.vs-alert--title {
	font-size: 0.9rem;
	font-weight: bold;
	padding: 8px 10px;
}
.vs-alert--close {
	position: relative;
	margin-top: 4px;
	display: inline-block;
	padding: 4px;
	border-radius: 6px;
	padding-bottom: 1px;
	cursor: pointer;
	transition: all 0.2s ease;
	&:hover {
		box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.1);
	}
}

@each $color, $index in --vs-colors{
    .con-vs-alert-#{$color}{
        background: -getColor($color, .15);
        box-shadow: 0px 0px 25px 0px -getColor($color, .15);
        color: -getColor($color, 1);
        h4{
            box-shadow: 0px 6px 15px -7px -getColor($color, .4);
        }
        
        .con-x{
            background: -getColor($color, 1);
            color: rgb(255,255,255);
        }   
        
    }    
}


</style>
