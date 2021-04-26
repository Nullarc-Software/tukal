<template>
    <div
        type="checkbox"
        :style="{
            ['--vs-color']: color ? getColor(color) : ''
        }"
        :class="[
            'vs-switch',
            {
                'vs-switch--loading': loading,
                'vs-switch--square': square,
                'vs-switch--indeterminate': indeterminate,
                'vs-switch--icon': icon
            },
            {
                [`vs-component--primary`]:
                    !danger && !success && !warn && !dark && !color
            },
            { [`vs-component--danger`]: !!danger },
            { [`vs-component--warn`]: !!warn },
            { [`vs-component--success`]: !!success },
            { [`vs-component--dark`]: !!dark },
            { isChecked: !!isChecked }
        ]"
    >
        <input
            type="checkbox"
            v-bind="$attrs"
            :checked="isChecked"
            v-on="inputListener"
            :class="['vs-switch__input']"
        />
        <div class="vs-switch__circle">
            <slot name="circle" />
        </div>
        <div ref="on" :class="['vs-switch__text', 'on']">
            <slot v-if="$slots.on" name="on" />
            <slot v-else />
        </div>
        <div ref="off" :class="['vs-switch__text', 'off']">
            <slot v-if="$slots.off" name="off" />
            <slot v-else />
        </div>
        <div class="vs-switch__background" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import _color from "../../utils/color";
import vsComponent from "../vsComponent";
export default defineComponent({
    name: "VsSwitch",
    inheritAttrs: false,
	extends: vsComponent,
    props: {
        value: { default: "" },
        val: { default: "" },
        notValue: { default: "" },
        loading: { type: Boolean, default: false },
        square: { type: Boolean, default: false },
        indeterminate: { type: Boolean, default: false },
        icon: { type: Boolean, default: false }
    },
    setup(props, context) {
        const isChecked = computed(() => {
            let isChecked = false;

            if (props.value) {
                if (typeof props.value == "boolean") {
                    isChecked = props.value;
                } else if (
                    typeof props.value == "object" &&
                    props.value !== null
                ) {
                    const array = props.value as Array<any>;
                    const containValue =
                        array.indexOf(props.val) === -1 &&
                        JSON.stringify(array).indexOf(
                            JSON.stringify(props.val)
                        ) === -1;
                    let indexVal = 0;

                    array.forEach((item: any, index: number) => {
                        if (JSON.stringify(item) == JSON.stringify(props.val)) {
                            indexVal = index;
                        }
                    });

                    if (containValue) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                isChecked = false;
            }
            return isChecked;
        });

        const inputListener = computed(() => {
            return {
                input: (evt: any) => {
                    if (typeof props.value == "boolean") {
                        context.emit("update:value", !props.value);
                    } else if (
                        typeof props.value == "object" &&
                        props.value !== null
                    ) {
                        const array = props.value as Array<any>;
                        const containValue =
                            array.indexOf(props.val) === -1 &&
                            JSON.stringify(array).indexOf(
                                JSON.stringify(props.val)
                            ) === -1;
                        let indexVal = 0;

                        array.forEach((item: any, index: number) => {
                            if (
                                JSON.stringify(item) ==
                                JSON.stringify(props.val)
                            ) {
                                indexVal = index;
                            }
                        });

                        if (containValue) {
                            array.push(props.val);
                        } else {
                            array.splice(indexVal, 1);
                        }

                        context.emit("update:value", array);
                    } else {
                        if (props.val !== props.value) {
                            context.emit("update:value", props.val);
                        } else {
                            context.emit("update:value", props.notValue || null);
                        }
                    }
                    context.emit("change", evt);
                }
            };
        });


		return {

			isChecked,
			inputListener
		}
    }
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

@keyframes rotateSwitch {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.vs-switch {

	--vs-color: var(--vs-primary);
  color: #fff;
  padding: 5px;
  border-radius: 20px;
  min-width: 48px;
  width: fit-content;
  height: 26px;
  border: 0px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: -getColor("gray-3");
  transition: all 0.25s ease;
  overflow: hidden;

  &--icon {
    .vs-switch__input {
      &:checked {
        ~ .vs-switch__circle {
          color: #fff !important;
        }
      }
    }

    .vs-switch__circle {
      background: transparent !important;
      box-shadow: none !important;

      i {
        opacity: 1;
        font-size: 1.3rem;
      }
    }
  }

  &--indeterminate {
    .vs-switch__input {
      pointer-events: none;
    }

    .vs-switch__circle {
      left: 50% !important;
      transform: translate(-50%);
    }
  }

  &--square {
    border-radius: 5px;

    .vs-switch__background {
      border-radius: 5px !important;
    }

    .vs-switch__circle {
      border-radius: 5px !important;
    }
  }

  &:after {
    transition: all 0s ease 0s;
    opacity: 0;
    visibility: hidden;
    content: "";
    position: absolute;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    border: 3px dashed -getColor("color");
    z-index: 200;
    border-radius: 50%;
    border-top: 3px solid transparent;
    border-right: 3px solid transparent;
	.isChecked {
    	animation: rotateSwitch 0.6s linear infinite 0.25s;
	}
    pointer-events: none;
  }

  &:before {
    pointer-events: none;
    transition: all 0s ease 0s;
    opacity: 0;
    visibility: hidden;
    content: "";
    position: absolute;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    border: 3px solid -getColor("color");
    z-index: 200;
    border-radius: 50%;
    border-top: 3px solid transparent;
    border-right: 3px solid transparent;
	.isChecked {
    	animation: rotateSwitch 0.6s linear infinite 0.25s;
	}
    
  }

  &--loading {
    width: 28px !important;
    min-width: 28px !important;
    pointer-events: none;
    border-radius: 20px !important;

    .vs-switch__circle {
      border-radius: 50% !important;
    }

    .vs-switch__background {
      opacity: 0 !important;
    }

    &:after {
      opacity: 1;
      visibility: visible;
      transition: all 0.25s ease 0.3s;
    }

    &:before {
      opacity: 1;
      visibility: visible;
      transition: all 0.25s ease 0.3s;
    }
  }

  &:hover {
    background: -getColor("gray-4");
  }

  &:active {
    transform: scale(0.9);
  }

  &__background {
    width: 100%;
    height: auto;
    position: absolute;
    background: -getColor("color");
    border-radius: inherit;
    z-index: 2;
    transition: all 0.25s ease-out;
    transform: scale(1);

    // left: 8px
    left: -100%;
    border-radius: 50%;
    padding-bottom: 100%;
  }

  &__text {
    font-size: 0.7rem;
    padding: 5px;
    padding-left: 25px;
    transition: all 0.25s ease 0.05s;
    color: -getColor("text");
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    &.on {
      transform: translate(-100%);
      position: absolute;
      opacity: 0;
    }

    i {
      font-size: 1rem;
      opacity: 0.7;
    }
  }

  &__circle {
    width: 20px;
    height: 20px;
    background: -getColor("background");
    border-radius: 20px;
    transition: all 0.25s ease;
    position: absolute;
    z-index: 10;
    left: 4px;
    color: -getColor("text");
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 0.8rem;
    }
  }

  &__input {
    position: absolute;
    width: 100%;
    opacity: 0 !important;
    height: 100%;
    border-radius: inherit;
    z-index: 100;
    top: 0px;
    left: 0px;
    margin: 0px;
    cursor: pointer;

    &:active {
      &:checked {
        ~ .vs-switch__circle {
          left: calc(100% - 30px);
        }
      }

      ~ .vs-switch__circle {
        width: 25px;
      }
    }

    &:checked {
      ~ .vs-switch__background {
        opacity: 1;
        transform: scale(1);
        width: 100%;
        padding-bottom: 100%;
        left: 0px;
        border-radius: 50%;
        transition: all 0.25s ease;
      }

      ~ .vs-switch__text {
        padding-left: 5px;
        padding-right: 25px;
        color: #fff;

        i {
          opacity: 1;
        }

        &.on {
          transform: translate(0);
          position: relative;
          opacity: 1;
        }

        &.off {
          transform: translate(100%);
          position: absolute;
          opacity: 0;
        }
      }

      ~ .vs-switch__circle {
        left: calc(100% - 24px);
        box-shadow: (-5px) 0px 25px 0px -getColor("background", 0.6);
        color: -getColor("color");
      }
    }
  }
}
</style>
