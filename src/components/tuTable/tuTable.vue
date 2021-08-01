<template>
	<div class="tu-table-content">
		<header v-if="$slots.header" class="tu-table__header">
			<slot name="header" />
		</header>
		<div
			class="tu-table"
			:class="{
				isSelectedValue: modelValue,
				striped: striped,
				isMultipleSelected: isMultipleSelected,
			}"
		>
			<table>
				<thead ref="thead" class="tu-table__thead">
					<slot name="thead" />
				</thead>
				<tbody class="tu-table__tbody">
					<slot name="tbody" />
				</tbody>
			</table>
		</div>
		<footer v-if="$slots.footer">
			<slot name="footer" />
		</footer>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";
import _ from "lodash";
import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuTable",
	extends: tuComponent,
	props: {
		modelValue: {},
		striped: {
			default: false,
			type: Boolean,
		},
		loading: {
			default: false,
			type: Boolean,
		},
	},
	emits: ["update:modelValue"],
    provide(){
        return {
            selected: (data) => {
                this.selected(data);
            }
        }
    },
	setup(props, context) {
		let colspan = ref(0);
		let thead = ref<HTMLHeadElement>();

		const isMultipleSelected = computed(() => {
			return _.isArray(props.modelValue);
		});

		function selected(val: any) {
			if (isMultipleSelected.value) {
				selectedMultiple(val);
			} else {
				context.emit("update:modelValue", val);
			}
		}

		function selectedMultiple(val: any) {
			const newVal = props.modelValue as Array<any>;
			if (newVal.includes(val)) {
				newVal.splice(newVal.indexOf(val), 1);
			} else {
				newVal.push(val);
			}

			context.emit("update:modelValue", newVal);
		}

		onMounted(() => {
			if(thead.value) {
				colspan.value = thead.value.querySelectorAll("th").length;
			}
		})

		return {
			thead,
			isMultipleSelected,
            selected
		};
	},
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.tu-table-content {
  width: 100%;

  // box-shadow: 0px 5px 22px 0px rgba(0,0,0, -var(shadow-opacity))
  border-radius: 16px;
}

.tu-table {
  width: 100%;
  font-size: 0.9rem;
  margin: 0px;
  overflow: auto;

  ::v-deep(table) {
    margin: 0px;
    border-collapse: collapse;
    width: 100%;
    min-width: 500px;
    border: 0px;
  }

  &.striped {
    ::v-deep(.tu-table__tr) {
      &:nth-child(even) {
        background: -getColor("gray-1") !important;
      }
    }
  }

  &_not-found {
    display: none;
    padding: 20px;
    text-align: center;
    width: 100%;

   ::v-deep(tr) {
      text-align: center;

      ::v-deep(td) {
        padding: 20px;
        border: 0px;

        // width: 100%
     
      }
    }
  }

  &__tbody {
    &:empty {
      display: none;
      background: #000;

      ~ .tu-table_not-found {
        display: table-row-group;
      }
    }
  }

  &.isSelectedValue {
    ::v-deep(tr) {
      cursor: pointer;
    }
  }

  &__footer {
    padding: 8px 10px;
    background: -getColor("gray-2");
    border-radius: 0px 0px 14px 14px;
  }

  &__header {
    width: 100%;
    padding: 10px;
    background: -getColor("gray-2");
    border-radius: 14px 14px 0px 0px;

    & ~ .tu-table {
      ::v-deep(.tu-table__th) {
        &:first-child {
          border-radius: 0px;
        }

        &:last-child {
          border-radius: 0px;
        }
      }
    }
  }

  &__thead {
    width: 100%;

    ::v-deep(.tu-table__th) {
      background: -getColor("gray-2");

      &:first-child {
        border-radius: 14px 0px 0px 0px;
      }

      &:last-child {
        border-radius: 0px 14px 0px 0px;
      }
    }
  }
}
</style>