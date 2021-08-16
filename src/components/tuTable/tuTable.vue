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
				[`size-${size}`]: true,
			}"
		>
			<table>
				<thead ref="thead" class="tu-table__thead">
					<slot name="thead" />
				</thead>
				<tbody class="tu-table__tbody">
					<slot v-if="$slots.tbody" name="tbody" />
					<tu-tr v-else :key="i" v-for="(tr, i) in table.getTableData.value" :data="tr.rowData" :rowId="tr.index" @rowClick="rowListeners.click($event)">
						<tu-td v-for="(th, j) in table.getTableHeaders.value" :key="j" >
							{{ tr.rowData[th.field] ?? "undefined" }}
						</tu-td>
					</tu-tr>
				</tbody>
			</table>
		</div>
		<footer v-if="$slots.footer">
			<slot name="footer" />
		</footer>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as _ from "lodash";
import tuComponent from "../tuComponent";
import { TableIdentifierAuto, TuTable } from "./tuTableStore";

export default defineComponent({
	name: "TuTable",
	extends: tuComponent,
	props: {
		modelValue: {},
		pageSize: {
			type: Number,
			default: -1
		},
		page: {
			type: Number,
			default: 0
		},
		/**
		 * Enables striped rows on the table
		 */
		striped: {
			default: false,
			type: Boolean
		},
		/**
		 * Set to true if data is loading. Ignored in Server Side model.
		 */
		loading: {
			default: false,
			type: Boolean
		},
		/**
		 * The Size of the table.
		 * @values fitData, fill, <custom size string>
		 */
		size: {
			type: String,
			default: "fitData"
		},
		/**
		 * Specifies the model for the table. Server side model will send pagination, sorting and filtering params to the server.
		 * @values server, local
		 */
		model: {
			type: String,
			default: "local"
		},
		/**
		 * The Data for the table. ignored in Server Side model
		 */
		data: {
			type: Object,
			default: () => {
				return {};
			}
		},
		id: {
			type: String,
			default: () => `tu-table-${TableIdentifierAuto.id++}`
		}
	},
	emits: ["update:modelValue"],
	provide () {
		return {
			selected: (data) => {
				this.selected(data);
			},
			tableInstance: this.table,
			tableId: this.id
		};
	},
	setup (props, context) {
		const colspan = ref(0);
		const thead = ref<HTMLHeadElement>();

		let table = new TuTable(props.id);
		table.setTableData(props.data);
		table.constructHeaders(context.slots.thead());

		const isMultipleSelected = computed(() => {
			return _.isArray(props.modelValue);
		});

		function selected (val: any) {
			if (isMultipleSelected.value) selectedMultiple(val);
			else context.emit("update:modelValue", val);
		}

		function selectedMultiple (val: any) {
			const newVal = props.modelValue as Array<any>;
			if (newVal.includes(val)) newVal.splice(newVal.indexOf(val), 1);
			else newVal.push(val);

			context.emit("update:modelValue", newVal);
		}

		const rowListeners = {
			click: function (event, tr) {
				console.log(tr);
			}
		};

		onMounted(() => {
			if (thead.value)
				colspan.value = thead.value.querySelectorAll("th").length;
		});

		onBeforeUnmount(() => {
			table = undefined; // Force free up mem on next gc call
		});

		watch([() => props.pageSize, () => props.page], () => {
			table.setPaging(props.pageSize, props.page);
		}, {
			immediate: true
		});

		return {
			thead,
			isMultipleSelected,
			selected,
			table,
			rowListeners
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.tu-table-content {
	width: fit-content;

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
		border: 0px;
	}

	&.striped {
		::v-deep(.tu-table__tr) {
			&:nth-child(even) {
				background: -getColor("gray-1") !important;
			}
		}
	}

	&.size-fitData {
		::v-deep(table) {
			width: auto;
			max-width: 100%;
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
