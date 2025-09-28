<template>
	<div class="tu-select-content" v-bind="$attrs" :style="{
		['--tu-color']: color ? getColor(color) : ''
	}" :class="[
	{ block: block },
	{ inline: inline },
	{ 'tu-select-content--border': border },
	{ 'tu-select-content--shadow': shadow },
	{ 'tu-select-content--transparent': transparent },
	{ 'tu-select-content--square': square },
	// colors
	{ [`tu-component--${color}`]: color },
	{ [`tu-component--dropdown`]: !!dropdown },
	{ [`tu-select--has-label`]: label || labelPlaceholder}
]">
		<div class="tu-select" ref="select" :class="[
			`tu-select--state-${state}`,
			{
				'tu-select--disabled': disabled,
				'has-chips': multiple && Array.isArray(modelValue) && modelValue.length > 0,
				activeOptions: activeOptions,
				loading: loading
			}
		]" v-on="selectListener" :style="{ width: width }">
			<input :readonly="!filter && true" :id="!multiple && uid" class="tu-select__input" ref="input"
				:placeholder="!isValue && !labelPlaceholder ? placeholder : ''"
				:value="activeFilter ? textFilter : getValueLabel" :class="[
					{
						'tu-select__input--multiple': multiple,
						'tu-select__input--simple': !multiple && !filter
					}
				]" v-on="inputListener">
			<tu-icon v-if="addValue" class="tu-select__add-icon" @click="addNewOption">add</tu-icon>
			<label v-if="label || labelPlaceholder" class="tu-select__label" :for="uid" :class="{
				'tu-select__label--placeholder': labelPlaceholder,
				'tu-select__label--label': label,
				'tu-select__label--hidden': isValue,
				'chips-hovered-multiple': chipsHovered && multiple
			}">
				{{ labelPlaceholder || label }}
			</label>
			<button v-if="multiple" class="tu-select__chips" ref="chips" v-on="chipsListener">
				<input v-if="filter" class="tu-select__chips__input" ref="chipsInput" :placeholder="placeholder" :id="uid"
					:value="textFilter" v-on="chipsFilterListener" />
				<div v-for="item of getChips" :key="item">
					<component :is="item" />
				</div>
			</button>
			<transition name="tu-select">
				<div v-if="activeOptions" class="tu-select__options" ref="options" :style="{
					['--tu-color']: color ? getColor(color) : ''}" 
					:class="[
						{
							isColorDark: computedIsColorDark
						},
						// colors
						{
							[`tu-component--${color}`]: !color
						},
						`tu-select__options--state-${state}`
					]" @mouseleave="() => {
						targetSelect = false;
						targetSelectInput = false;
					}
						" @mouseenter="() => {
							targetSelect = true;
							targetSelectInput = true;
						}
							">
					<div class="tu-select__options__content" ref="content">
						<div v-if="notData" class="tu-select__options__no-data">
							<slot v-if="$slots.notData" name="notData" />
							<span v-else> No Data Available </span>
						</div>
						<slot />
						<!-- Render selectItems prop as options (sorted with selected items at top) -->
						<tu-select-option v-for="(item, index) of sortedSelectItems" :key="`select-item-${index}`"
							:label="getItemLabel(item)" :value="getItemValue(item)">
							{{ getItemLabel(item) }}
						</tu-select-option>
						<tu-select-option v-for="addedOption of addedOptions" :key="addedOption.value"
							:label="addedOption.label" :value="addedOption.value">
							{{ addedOption.label }}
						</tu-select-option>
					</div>
				</div>
			</transition>
			<div v-if="loading" class="tu-select__loading" />

			<tu-icon @click="iconClicked" class="tu-select__arrow-icon" :class="{
				'tu-select__arrow-icon--down': !activeOptions,
				'tu-select__arrow-icon--up': activeOptions
			}"></tu-icon>
		</div>

		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div v-if="$slots[`message-success`]" class="tu-select__message tu-select__message--success">
				<slot name="message-success" />
			</div>
		</transition>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div v-if="$slots['message-danger']" class="tu-select__message tu-select__message--danger">
				<slot name="message-danger" />
			</div>
		</transition>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div v-if="$slots[`message-warn`]" class="tu-select__message tu-select__message--warn">
				<slot name="message-warn" />
			</div>
		</transition>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div v-if="$slots[`message-primary`]" class="tu-select__message tu-select__message--primary">
				<slot name="message-primary" />
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import {
	ref,
	h,
	computed,
	nextTick,
	watch,
	getCurrentInstance,
	onMounted,
	onBeforeUnmount,
	provide
} from "vue";
import tuSelectOption from "../tuSelect/tuSelectOption.vue";
import { insertBody, removeBody, setCords } from "@/utils";
import tuIcon from "../tuIcon";
import * as _ from "lodash";
import { SelectOptionConstants } from ".";
import { getColor } from "@/utils";

// Type definitions for better IntelliSense support
class SelectConstants {
	public static id = 0;
}

/** Configuration for individual select options */
type ChildOptions = {
	/** Whether this option is disabled */
	disabled?: boolean;
	/** The value associated with this option */
	value: string;
	/** The display label for this option */
	label: string;
	/** Offset position for keyboard navigation */
	offsetTop?: number;
}

/** Supported color themes for the select component */
type SelectColor = "primary" | "success" | "danger" | "warn" | "dark" | string;

/** Supported visual states for the select component */
type SelectState = "success" | "danger" | "warn" | "primary" | "dark" | null;

/** Structure for select option items */
type SelectItem = {
	label: string;
	value: unknown;
} | string | number;

// Define props interface with comprehensive documentation for IntelliSense
interface Props {
	/** The current selected value(s). Can be a single value or array for multiple selection */
	modelValue?: unknown;
	
	/** The placeholder text shown when no option is selected */
	placeholder?: string;
	
	/** Label text displayed above the select component */
	label?: string;
	
	/** Placeholder text that appears as a floating label */
	labelPlaceholder?: string;
	
	/** The width of the select component. Accepts CSS width values */
	width?: string;
	
	/** Color theme for the component. Accepts theme color names */
	color?: SelectColor;
	
	/** Visual state of the component (success, danger, warn, primary, dark) */
	state?: SelectState;
	
	// Behavior Props
	/** Enable multiple selection mode */
	multiple?: boolean;
	
	/** Enable filtering/search functionality within options */
	filter?: boolean;
	
	/** Enable dynamic filtering that emits filterUpdated events */
	dynamicFilter?: boolean;
	
	/** Allow users to add new options by typing */
	addValue?: boolean;
	
	/** Disable the select component */
	disabled?: boolean;
	
	/** Show loading state with spinner */
	loading?: boolean;
	
	/** Collapse multiple selected chips into a summary (e.g., "+3 more") */
	collapseChips?: boolean;
	
	// Layout Props
	/** Display as dropdown (portal-based positioning) */
	dropdown?: boolean;
	
	/** Display as inline-block instead of block */
	inline?: boolean;
	
	/** Take full width of parent container */
	block?: boolean;
	
	// Style Variant Props
	/** Show border style with underline effect */
	border?: boolean;
	
	/** Show shadow style with elevated appearance */
	shadow?: boolean;
	
	/** Show transparent background style */
	transparent?: boolean;
	
	/** Show square corners instead of rounded */
	square?: boolean;
	
	// Data Props
	/** Array of selectable items (alternative to slot-based options) */
	selectItems?: Array<SelectItem>;
}

const props = withDefaults(defineProps<Props>(), {
	// Default values for behavior props
	multiple: false,
	filter: false,
	dynamicFilter: false,
	addValue: false,
	disabled: false,
	loading: false,
	collapseChips: false,
	
	// Default values for layout props  
	dropdown: false,
	inline: false,
	block: false,
	
	// Default values for style variant props
	border: false,
	shadow: false,
	transparent: false,
	square: false,
	
	// Default values for text props
	placeholder: "",
	labelPlaceholder: "",
	label: "",
	
	// Default values for styling props
	width: "100%",
	state: null,
	
	// Default values for data props
	selectItems: () => []
});

// Define emits with comprehensive documentation for IntelliSense  
const emit = defineEmits<{
	/** Emitted when the selected value changes. Use with v-model */
	"update:modelValue": [value: unknown];
	
	/** Emitted when the select component loses focus */
	"blur": [];
	
	/** Emitted when the select component gains focus */
	"focus": [event: Event];
	
	/** Emitted when filter text changes (only when dynamicFilter is enabled) */
	"filterUpdated": [value: string];
}>();

// Define component name and configuration
defineOptions({
	name: "TuSelect",
	inheritAttrs: false
});

/**
 * TuSelect - A versatile select/dropdown component with advanced features
 * 
 * Features:
 * - Single and multiple selection support
 * - Filtering and search functionality
 * - Custom option adding
 * - Chip-based display for multiple selections
 * - Keyboard navigation support
 * - Loading states and custom styling
 * - Accessibility enhancements
 * 
 * @example
 * ```vue
 * <tu-select 
 *   v-model="selectedValue"
 *   :options="options"
 *   placeholder="Select an option"
 *   filterable
 * />
 * ```
 * 
 * @slot default - The default slot for tu-select-option components
 * @slot icon - Icon slot displayed next to the placeholder
 * @slot notData - Custom content when no options are available
 * @slot message-success - Success message displayed below the select
 * @slot message-danger - Error message displayed below the select  
 * @slot message-warn - Warning message displayed below the select
 * @slot message-primary - Primary message displayed below the select
 */

// Reactive variables
const renderSelect = ref(false);
const activeOptions = ref(false);
const valueLabel = ref<unknown>(null);
const hoverOption = ref(-1);
const uids = ref<string[]>([]);
const addedOptions = ref<ChildOptions[]>([]);
const childOptions = ref<ChildOptions[]>([]);
const targetSelect = ref(false);
const targetSelectInput = ref(false);
const targetClose = ref(false);
const activeFilter = ref(false);
const chipsHovered = ref(false);
const textFilter = ref<string>("");

// Template refs
const chips = ref<HTMLButtonElement>();
const chipsInput = ref<HTMLInputElement>();
const input = ref<HTMLInputElement>();
const options = ref<HTMLDivElement>();
const select = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();

// Helper functions for selectItems
const getItemLabel = (item: SelectItem): string => {
	if (typeof item === "object" && item !== null && "label" in item) 
		return item.label;
	return String(item);
};

const getItemValue = (item: SelectItem): unknown => {
	if (typeof item === "object" && item !== null && "value" in item) 
		return item.value;
	return item;
};

const uid = "select-" + ++SelectConstants.id;
const instance = getCurrentInstance();

// Provide for child components
provide("dropdown", computed(() => props.dropdown));
provide("textFilter", computed(() => textFilter.value));
provide("uids", computed(() => uids.value));
provide("hoverOption", computed(() => hoverOption.value));
provide("parentSelect", getCurrentInstance());
provide("renderSelect", computed(() => renderSelect.value));
provide("isMultiple", computed(() => props.multiple));
provide("addChildOption", (
	disabled: boolean,
	value: unknown,
	label: string,
	offsetTop: number
) => {
	// Check if this option already exists to prevent duplicates
	const existingOption = childOptions.value.find(option => option.value === value);
	if (!existingOption) {
		childOptions.value.push({
			disabled,
			value: value as string,
			label,
			offsetTop
		});
	}
});
provide("addUid", (uid: string) => {
	uids.value.push(uid);
});
provide("callSetHover", () => {
	setHover();
});
provide("onClickOption", (value: unknown, label: unknown) => {
	onClickOption(value, label);
});
provide("updateActiveOptions", (value: boolean) => {
	activeOptions.value = value;
});
provide("targetSelect", computed(() => {
	return targetSelect.value;
}));
provide("targetClose", computed(() => {
	return targetClose.value;
}));
provide("parentValue", computed(() => {
	return props.modelValue;
}));

// Utility function - if it doesn't exist in utils, we'll define it here
const computedIsColorDark = computed(() => {
	// Simple implementation - you may need to adjust based on your actual isColorDark function
	return false;
});

// Functions
const setHover = function () {
	let index = -1;
	childOptions.value.forEach((item: any, i: number) => {
		if (item.value === props.modelValue) index = i;
	});

	hoverOption.value = index;
};

function addNewOption() {
	let alreadyExists = false;
	childOptions.value.forEach(child => {
		if (child.label.trim().toLowerCase() === textFilter.value?.trim().toLowerCase())
			alreadyExists = true;
		return;
	});

	if (alreadyExists || (textFilter.value?.trim() === ""))
		return;
	else {
		addedOptions.value.push({
			label: textFilter.value?.trim() || "",
			value: textFilter.value?.trim() || ""
		});
	}
}

const handleWindowClick = function (evt: any) {
	// Don't close if clicking on the main input, chips container, or filter input
	const isClickOnSelectElements = evt.target === input.value || 
		evt.target === chips.value || 
		evt.target === chipsInput.value ||
		chips.value?.contains(evt.target) ||
		select.value?.contains(evt.target);
		
	if (!targetSelectInput.value && !isClickOnSelectElements) handleBlur();

	if (props.filter && !activeOptions.value)
		activeFilter.value = false;

	// Special handling for multi-select with filter
	if (props.multiple && props.filter) {
		// If clicking on chips container but not on filter input, focus the filter input
		if (evt.target === chips.value && chipsInput.value) {
			setTimeout(() => {
				if (activeOptions.value) {
					(chipsInput.value as HTMLElement).focus();
				}
			}, 10);
			return;
		}
	}

	if (
		evt.target === input.value &&
		activeOptions.value &&
		!props.filter
	) {
		handleBlur();
		setTimeout(() => {
			input.value?.blur();
		}, 100);
	}
};

const handleBlur = function () {
	nextTick(() => {
		activeOptions.value = false;
		// Only clear childOptions for single-select mode
		// Multi-select needs to keep childOptions for chip rendering
		if (!props.multiple) 
			childOptions.value = [];
		SelectOptionConstants.id = 0;
	});
	emit("blur");
	setHover();
	window.removeEventListener("click", handleWindowClick);
	// Only clear the text filter when the dropdown is actually closing
	// In multi-select mode with filter, preserve the filter text for better UX
	nextTick(() => {
		if (!activeOptions.value) {
			// For multi-select with filter, don't clear the textFilter to preserve search state
			if (!(props.multiple && props.filter)) {
				textFilter.value = "";
			}
			if (!props.multiple) activeFilter.value = false;
		}
	});
};

const blur = () => {
	// Function to handle blur events
	handleBlur();
};

const clickOption = function (value: any, label: any) {
	if (props.multiple) {
		const oldVal = [...(props.modelValue as Array<any>)];
		if (_.indexOf(oldVal, value) === -1) oldVal.push(value);
		else oldVal.splice(_.indexOf(oldVal, value), 1);

		const labels = _.reduce(
			childOptions.value,
			function (result: any[], item, key) {
				if (_.indexOf(oldVal, item.value) !== -1) {
					result.push({
						value: item.value,
						label: item.label
					});
				}
				return result;
			},
			[]
		);

		emit("update:modelValue", oldVal);
		valueLabel.value = labels;
	}
	else {
		emit("update:modelValue", value);
		valueLabel.value = label;
	}

	setTimeout(() => {
		if (props.multiple && activeOptions.value) {
			// If filter is enabled, focus the filter input to maintain search functionality
			if (props.filter && chipsInput.value) {
				chipsInput.value.focus();
				// Keep the current filter text so user can continue searching and selecting
			} else {
				chips.value?.focus();
			}
		}
	}, 10);

	if (!props.multiple) handleBlur();
};

const onClickOption = function (value: any, label: any) {
	clickOption(value, label);
};

// Computed properties
const isValue = computed(() => {
	if (Array.isArray(props.modelValue))
		return props.modelValue.length !== 0;
	else {
		return !(
			_.isNull(props.modelValue) &&
			!_.isUndefined(props.modelValue)
		);
	}
});

// Sort selectItems with selected items at the top
const sortedSelectItems = computed(() => {
	if (!props.selectItems || !props.multiple) {
		return props.selectItems || [];
	}
	
	const selectedValues = Array.isArray(props.modelValue) ? props.modelValue : [];
	const items = [...props.selectItems];
	
	// If there's an active filter, don't sort to prevent confusing reordering
	// This prevents the issue where selected items move to top while filtering is active
	if (textFilter.value && textFilter.value.trim() !== "") {
		return items; // Return original order when filtering
	}
	
	// Sort items: selected items first, then unselected items (only when not filtering)
	return items.sort((a, b) => {
		const aValue = getItemValue(a);
		const bValue = getItemValue(b);
		const aSelected = selectedValues.includes(aValue);
		const bSelected = selectedValues.includes(bValue);
		
		// If both are selected or both are unselected, maintain original order
		if (aSelected === bSelected) return 0;
		// Selected items come first
		return aSelected ? -1 : 1;
	});
});

const getChips = computed(() => {
	let id = 0;
	const chipIds: number[] = [];
	const chip = function (item: any, isCollapse: boolean) {
		return h(
			"span",
			{
				class: ["tu-select__chips__chip", { isCollapse }],
				id: ++id
			},
			[
				h("span", {}, item.label),
				!isCollapse &&
				h(
					"span",
					{
						class: "tu-select__chips__chip__close",
						onClick: (evt: any) => {
							setTimeout(() => {
								targetClose.value = false;
							}, 100);
							if (!activeOptions.value) {
								chips.value?.blur();
								if (props.filter)
									chipsInput.value?.blur();
							}
							clickOption(item.value, item.label);
							evt.stopPropagation();
						},
						onMouseLeave: () => {
							targetClose.value = false;
						},
						onMouseEnter: () => {
							targetClose.value = true;
						},
						onMouseDown: (evt: any) => {
							evt.stopPropagation();
						}
					},
					[
						h(
							tuIcon,
							{
								hover: "less",
								style: { "font-size": "0.5rem" }
							},
							() => {
								return "close";
							}
						)
					]
				)
			]
		);
	};

	let chipsarr: any[] = [];
	if (Array.isArray(valueLabel.value)) {
		for (const item of valueLabel.value as any) {
			const chipEl = chip(item, false);
			chipsarr.push(chipEl);
		}
	}

	if (props.collapseChips) {
		chipsarr = [
			chipsarr[0],
			chipsarr.length > 1 &&
			chip(
				{ label: `+ ${chipsarr.length - 1}`, value: null },
				true
			)
		];
	}

	return chipsarr;
});

const getValue = function () {
	const options = childOptions.value;
	const filterOptions = options.filter((option: any): boolean => {
		return typeof props.modelValue === "number" ||
			typeof props.modelValue === "string"
			? props.modelValue === option.value
			: _.find(props.modelValue as Array<any>, {
				value: option.value
			}) !== undefined;
	});

	const label: any[] = [];
	filterOptions.forEach((item: any) => {
		label.push({
			label: (item as any).label,
			value: (item as any).value
		});
	});

	valueLabel.value = label;
};

const getValueLabel = computed(() => {
	const valueLabelTemp: any = valueLabel.value;
	let labels: any[] = [];
	if (Array.isArray(valueLabelTemp)) {
		valueLabelTemp.forEach((item: any) => {
			labels.push(item.label);
		});
	}
	else labels = valueLabelTemp;

	return labels;
});

const selectListener = computed(() => {
	return {
		click: (evt: Event) => {
			// Handle clicking anywhere on the select to open dropdown
			if (!activeOptions.value && !props.disabled) {
				// Prevent default to avoid focus issues
				evt.preventDefault();
				
				// Open the dropdown
				activeOptions.value = true;
				
				// Focus management for multi-select with filter
				if (props.multiple && props.filter && chipsInput.value) {
					setTimeout(() => {
						(chipsInput.value as HTMLElement).focus();
					}, 10);
				} else if (props.multiple && chips.value) {
					setTimeout(() => {
						chips.value?.focus();
					}, 10);
				} else if (input.value) {
					setTimeout(() => {
						input.value?.focus();
					}, 10);
				}
				
				window.addEventListener("mousedown", handleWindowClick);
			}
		},
		mouseleave: (evt: any) => {
			if (evt.relatedTarget !== options.value) {
				targetSelectInput.value = false;
				targetSelect.value = false;
			}
		},
		mouseenter: () => {
			targetSelectInput.value = true;
		}
	};
});

const handleKeydown = function (evt: any) {
	const optionsTemp = options.value;
	setTimeout(() => {
		setCords(optionsTemp, select.value);
	}, 50);
	if (evt.code === "ArrowDown") {
		evt.preventDefault();
		if (hoverOption.value < childOptions.value?.length - 1)
			hoverOption.value++;
		else hoverOption.value = 0;
	}
	else if (evt.code === "ArrowUp") {
		evt.preventDefault();
		if (hoverOption.value > 0) hoverOption.value--;
		else hoverOption.value = childOptions.value?.length - 1;
	}
	else if (evt.code === "Enter") {
		evt.preventDefault();
		if (hoverOption.value !== -1) {
			if (!childOptions.value?.[hoverOption.value]?.disabled) {
				clickOption(
					childOptions.value?.[hoverOption.value]?.value,
					childOptions.value?.[hoverOption.value]?.label
				);
				if (!props.multiple) {
					handleBlur();
					input.value?.blur();
				}
			}
		}
	}

	if (hoverOption.value !== -1) {
		const offsetTop = childOptions.value?.[hoverOption.value]?.offsetTop;
		if (offsetTop !== undefined) {
			(content.value as HTMLElement).scrollTop = offsetTop - 66;
		}
	}
};

const inputListener = computed(() => {
	return {
		keydown: handleKeydown,
		focus: (evt: Event) => {
			activeOptions.value = true;
			emit("focus", evt);
			if (props.filter) activeFilter.value = true;

			window.addEventListener("mousedown", handleWindowClick);
		},
		// blur: this.blur,
		input: (evt: any) => {
			textFilter.value = evt.target.value;
			if (props.dynamicFilter)
				emit("filterUpdated", textFilter.value);
		}
	};
});

const chipsListener = computed(() => {
	return {
		keydown: handleKeydown,
		mouseover: (event: any) => {
			chipsHovered.value = true;
		},
		mouseout: (event: any) => {
			chipsHovered.value = false;
		},
		focus: (evt: Event) => {
			if (!targetClose.value) {
				activeOptions.value = true;
				emit("focus", evt);
			}
			
			// Delay focusing the filter input to prevent immediate blur
			if (props.filter && props.multiple) {
				setTimeout(() => {
					if (activeOptions.value && chipsInput.value)
						(chipsInput.value as HTMLElement).focus();
				}, 10);
			}

			window.addEventListener("mousedown", handleWindowClick);
		},
		blur: () => {
			// In multi-select mode, delay blur handling to allow option clicks to complete
			if (props.multiple) {
				// Use a short timeout to allow option click handlers to execute first
				setTimeout(() => {
					// Only close if we're not clicking within the options container
					// and the filter input doesn't have focus
					const filterInputHasFocus = props.filter && 
						chipsInput.value && 
						document.activeElement === chipsInput.value;
						
					if (!targetSelect.value && !targetClose.value && !filterInputHasFocus)
						blur();
				}, 100);
			}
			else
				blur();
		}
	};
});

const chipsFilterListener = computed(() => {
	return {
		focus: (evt: Event) => {
			if (!targetClose.value) {
				activeOptions.value = true;
				emit("focus", evt);
			}
		},
		blur: () => {
			// Apply the same multi-select blur handling as chipsListener
			if (props.multiple) {
				// Use a short timeout to allow option click handlers to execute first
				setTimeout(() => {
					// Only close if we're not clicking within the options container
					// and neither the chips container nor the main input have focus
					const chipsHasFocus = chips.value && document.activeElement === chips.value;
					const inputHasFocus = input.value && document.activeElement === input.value;
					
					if (!targetSelect.value && !targetClose.value && !chipsHasFocus && !inputHasFocus)
						blur();
				}, 100);
			}
			else
				blur();
		},
		input: (evt: any) => {
			textFilter.value = evt.target.value;
			if (props.dynamicFilter)
				emit("filterUpdated", textFilter.value);
		}
	};
});

const notData = computed(() => {
	if (content.value) {
		if (content.value.querySelectorAll(".tu-select__option.hiddenOption").length === childOptions.value.length)
			return true;
	}
	else if (childOptions.value.length === 0)
		return true;
	return false;
});

const iconClicked = function () {
	if (activeOptions.value) {
		activeOptions.value = false;
		// Clear filter when dropdown is manually closed via icon
		if (props.multiple && props.filter) {
			textFilter.value = "";
		}
	}
	else input.value?.focus();
};

const beforeEnter = function (el: any) {
	el.style.height = 0;
};

const enter = function (el: any, done: any) {
	const h = el.scrollHeight;
	el.style.height = h - 1 + "px";
	done();
};

const leave = function (el: any, done: any) {
	el.style.minHeight = "0px";
	el.style.height = "0px";
};

const insertOptions = function () {
	const optionsTemp = options.value as HTMLElement;
	insertBody(optionsTemp, document.body);
	setCords(optionsTemp, select.value);

	setTimeout(() => {
		setCords(optionsTemp, select.value);
	}, 50);
};

// Watchers
watch(activeOptions, (val: boolean) => {
	nextTick(() => {
		if (val) insertOptions();
	});

	uids.value = [];
});

const handleResize = function () {
	const optionsTemp = options.value as HTMLElement;
	if (!optionsTemp) return;

	nextTick(() => {
		setCords(optionsTemp, select.value);
	});

	setTimeout(() => {
		setCords(optionsTemp, select.value);
	}, 50);
};

const handleScroll = function () {
	const optionsTemp = options.value as HTMLElement;
	if (optionsTemp) setCords(optionsTemp, select.value);
};

// Lifecycle hooks
onMounted(() => {
	// getValue();

	let children: any = instance?.slots.default?.();
	if (children?.length === 1 && typeof children[0].type === "symbol")
		children = children[0].children;
	const reduced = _.reduce(
		children,
		function (result: any[], item, index) {
			result.push({
				label: item.props?.label,
				value: item.props?.value
			});
			return result;
		},
		[]
	);

	// Also add selectItems prop to the reduced options
	if (props.selectItems && props.selectItems.length > 0) {
		props.selectItems.forEach((item) => {
			reduced.push({
				label: getItemLabel(item),
				value: getItemValue(item)
			});
		});
	}

	// set the default value first. Since the list is not rendered to the dom, get it from the default slot.
	if (!Array.isArray(props.modelValue)) {
		const labelValue = _.find(reduced, { value: props.modelValue });
		if (labelValue) valueLabel.value = labelValue.label;
	}
	else {
		const newLabelValues: any[] = [];
		props.modelValue.forEach((value) => {
			const labelValue = _.find(reduced, { value: value });
			if (labelValue) newLabelValues.push(labelValue);
		});

		valueLabel.value = newLabelValues;
	}

	window.addEventListener("resize", handleResize);
	window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
	if (activeOptions.value) {
		const optionsTemp = options.value as HTMLElement;
		removeBody(optionsTemp, document.body);
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";
@import "../../style/sass/_tokens";

// =============================================================================
// MIXINS & SHARED STYLES
// =============================================================================

// Common input/chips styles
%select-input-base {
	background: getColor("component-background");
	border: 1px solid getColorAlpha("text", 0.15);
	border-radius: border-radius('lg');
	transition: all transition('fast'), height 0s;
	min-height: component-size('md', 'height');
	padding: spacing('sm') spacing('md');
	padding-right: 40px; // Space for arrow
	width: 100%;
}

// Focused/active states
%select-focus-state {
	border-radius: border-radius('lg') border-radius('lg') 0 0;
	border-color: getColorAlpha("text", 0.2);
	border-bottom: unset;
}

// Enhanced state mixin using design tokens
@mixin select-state($color) {
	.tu-select__input,
	.tu-select__chips {
		background: getColorAlpha($color, 0.1);
		border-color: getColorAlpha($color, 0.3);
		
		&:hover { border-color: getColorAlpha($color, 0.5); }
	}
	
	.tu-select__label { color: getColor($color); }
	.tu-select-add-icon { color: getColor($color); }
}

// Chip styles
%chip-base {
	flex: 0 1 auto;
	position: relative;
	background-color: getColor("gray-2");
	border-radius: border-radius('sm'); // Smaller border radius
	display: flex;
	align-items: center;
	justify-content: center;
	padding: spacing('xs') spacing('md') spacing('xs') spacing('sm'); // Extra right padding for close button
	margin: spacing('xs') spacing('xs') spacing('xs') 0; // Remove right margin to be more compact
	font-size: font-size('xs'); // Smaller font size
	border: 1px solid getColor("gray-3");
	color: getColor("text");
	transition: all transition('fast');
	max-width: 150px; // Limit chip width
	overflow: visible; // Allow close button to be visible outside chip bounds
	text-overflow: ellipsis;
	white-space: nowrap;
}

%chip-close-base {
	position: absolute;
	top: -3px; // Slightly higher for better visibility
	right: -3px; // Slightly more to the right
	width: 16px; // Slightly larger for better usability
	height: 16px; // Slightly larger for better usability
	background: getColor("gray-4");
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: border-radius('full');
	font-size: font-size('xs');
	cursor: pointer;
	transition: all transition('fast');
	z-index: z-index('elevated'); // Ensure it's above other elements
	border: 1px solid getColor("component-background"); // Add border to separate from background
	
	&:focus-visible { @include focus-ring; }
	
	@media (pointer: coarse) {
		width: 22px; // Larger for touch devices
		height: 22px;
		top: -5px;
		right: -5px;
	}
}

// =============================================================================
// MAIN COMPONENT STYLES
// =============================================================================

.tu-select-content {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: fit-content;
	margin: spacing('xs');
	padding: spacing('xs');

	&.inline { display: inline-flex; }
	&.block { max-width: 100%; }
}

.tu-select {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: component-size('md', 'height'); // Fixed height prevents expansion
	
	// For multi-select mode, ensure consistent height
	&.has-chips {
		height: component-size('md', 'height'); // Maintain fixed height with chips
	}

	&--has-label {
		margin-top: spacing('lg');
	}

	// Focus states - only show focus ring on keyboard navigation, not when dropdown is open
	&:not(.activeOptions):focus-within {
		.tu-select__input,
		.tu-select__chips { 
			@include focus-ring; // Default focus ring, overridden by state-specific ones
		}
	}

	// Loading state
	&.loading {
		pointer-events: none;
		
		*:not(.tu-select__loading):not(.tu-select__label) { opacity: 0.6; }
		.tu-select__label { pointer-events: none; }
	}

	// Disabled state
	&--disabled {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
		
		label { pointer-events: none; }
	}

	// Active/open state
	&.activeOptions {
		.tu-select__input,
		.tu-select__chips {
			@extend %select-focus-state;
			background: getColor("component-background");
		}

		.tu-select__arrow-icon { transform: rotate(45deg); }
		
		.tu-select__label--placeholder {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			transform: translate(-1%, -30px) !important;
			font-size: font-size('sm');
			margin-top: 0 !important;
		}
	}

	// Top positioning variant
	&.top.activeOptions {
		.tu-select__input,
		.tu-select__chips {
			border-radius: 0 0 border-radius('lg') border-radius('lg') !important;
			box-shadow: shadow('lg') !important;
		}
	}

	// =============================================================================
	// CHIPS SECTION
	// =============================================================================

	&__chips {
		@extend %select-input-base;
		width: 100%;
		height: component-size('md', 'height'); // Fixed height - no auto expansion
		position: absolute;
		left: 0;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: spacing('xs');
		overflow-y: auto; // Vertical scroll when content exceeds height
		overflow-x: hidden; // Prevent horizontal scroll
		
		// Ensure scrolling behavior is smooth
		scroll-behavior: smooth;

		// Enhanced scrollbar styling
		&::-webkit-scrollbar {
			width: 6px; // Slightly wider for better visibility
			height: 4px;
		}

		&::-webkit-scrollbar-track { 
			background: getColorAlpha("text", 0.05); // Subtle track background
			border-radius: border-radius('sm');
		}

		&::-webkit-scrollbar-thumb {
			background: getColorAlpha("text", 0.3); // More visible thumb
			border-radius: border-radius('sm');
			
			&:hover {
				background: getColorAlpha("text", 0.5); // Darker on hover
			}
		}

		// Firefox scrollbar styling
		scrollbar-width: thin;
		scrollbar-color: getColorAlpha("text", 0.3) getColorAlpha("text", 0.05);



		&:focus { 
			@extend %select-focus-state; 
			outline: none; // Remove browser default focus outline
		}

		&:hover {
			
			border-color: getColorAlpha("primary", 0.3);

			~ .tu-select__arrow-icon { margin-top: -6px; }
		}

		&__input {
			width: auto;
			flex: 1 1 auto; // Allow it to grow and shrink but maintain auto basis
			max-width: 100%;
			position: relative;
			min-width: 120px; // Increase minimum width for better UX
			border: 0;
			background: transparent;
			margin: spacing('xs');
			font-size: font-size('base');
			order: -1; // Ensure it always comes first in flex layout

			&::placeholder { color: getColorAlpha("text", 0.5); }
			&:focus { outline: none; }
		}

		&__chip {
			@extend %chip-base;
			
			&:hover {
				background-color: getColor("gray-3");
				border-color: getColor("gray-4");
			}

			&.isCollapse { padding-right: spacing('sm') !important; }

			&__close {
				@extend %chip-close-base;

				&:hover {
					background: getColor("danger");
					transform: scale(1.1);

					.tu-icon-close {
						--tu-color: white;

						&:after,
						&:before {
							width: 12px;
							transform: rotate(180deg);
						}
					}
				}

				.tu-icon-close {
					--tu-color: var(--tu-text);
					transform: scale(0.6);
				}
			}
		}
	}

// =============================================================================
// INPUT & ICON ELEMENTS
// =============================================================================

.tu-select__input {
	@extend %select-input-base;
	opacity: 1;
	cursor: pointer;
	color: getColor("text") !important;
	font-size: font-size('base');

	&:focus-visible:not(.tu-select__input--multiple) { 
		@include focus-ring; // Default focus ring - only on keyboard navigation
	}
	
	&--multiple {
		color: transparent;
		background: transparent;
		border: none !important; // Remove border in multi-select mode to prevent double borders
		pointer-events: none;
	}

	&--simple { user-select: none; }

	&:focus {
		@extend %select-focus-state;
		
		~ .tu-select__label--placeholder {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			font-size: font-size('sm');
			margin-top: 0 !important;
		}
	}

	&:hover {
		background: getColor("gray-4");
		border-color: getColorAlpha("primary", 0.3);

		~ .tu-select__label { margin-top: -4px; }
		~ .tu-select__arrow-icon { margin-top: -6px; }
	}
}

.tu-select__arrow-icon {
	position: absolute;
	right: spacing('md');
	z-index: z-index('elevated');
	cursor: pointer;
	pointer-events: auto;
	transition: all transition('fast');
	
	// Touch-friendly for mobile
	@media (pointer: coarse) {
		padding: spacing('xs');
		margin-right: spacing('xs');
	}

	&--down {
		transform: rotate(0deg);
	}

	&--up {
		transform: rotate(180deg);
	}
}

.tu-select__add-icon {
	position: absolute;
	right: -20px;
	font-size: font-size('base');
	color: getColor("text");
	transition: all transition('fast');

	&:hover {
		color: getColor("primary");
		transform: rotate(180deg);
	}
}

	&__chips {
		width: 100%;
		position: absolute;
		left: 0;
		background-color: getColor("component-background");
		z-index: z-index('elevated');
		border: 1px solid getColorAlpha("text", 0.15);
		border-radius: border-radius('lg');
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: spacing('xs');
		min-height: component-size('md', 'height');
		transition: all transition('fast'), height 0s;
		padding-right: 40px; // Space for arrow icon
		max-height: 120px; // Limit height for better UX
		overflow: auto;

		// Enhanced scrollbar styling
		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: getColorAlpha("text", 0.2);
			border-radius: border-radius('sm');
		}

		&:focus {
			border-radius: border-radius('lg') border-radius('lg') 0 0;
			background-color: getColor("component-background");
			transition: all transition('fast');
		}

		&:hover {
			background: getColor("gray-4");
			border-color: getColorAlpha("primary", 0.3);
			transition: all transition('fast');

			~ .tu-select__arrow-icon {
				margin-top: -6px;
				transition: all transition('fast');
			}
		}

		&__input {
			width: auto;
			flex: 1;
			max-width: 100%;
			position: relative;
			min-width: 30px;
			border: 0;
			background: transparent;
			margin: spacing('xs');
			font-size: font-size('base');

			&::placeholder {
				color: getColorAlpha("text", 0.5);
			}

			&:focus {
				outline: none;
			}
		}

		&__chip {
			flex: 0 1 auto;
			position: relative;
			background-color: getColor("gray-3");
			border-radius: border-radius('md');
			display: flex;
			align-items: center;
			justify-content: center;
			padding: spacing('xs') spacing('sm');
			
			padding-right: spacing('md'); // Space for close button
			font-size: font-size('sm');
			border: 2px solid getColor("gray-4");
			color: getColor("text");
			transition: all transition('fast');

			&:hover {
				background-color: getColor("gray-3");
				border-color: getColor("gray-4");
			}

			&.isCollapse {
				padding-right: spacing('sm') !important;
			}

			&__close {
				position: absolute;
				top: -4px;
				right: -4px;
				width: 18px;
				height: 18px;
				background: getColor("gray-4");
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: border-radius('full');
				font-size: font-size('xs');
				cursor: pointer;
				transition: all transition('fast');
				
				// Enhanced accessibility
				&:focus-visible {
					@include focus-ring;
				}
				
				// Minimum touch target for mobile
				@media (pointer: coarse) {
					width: 24px;
					height: 24px;
					top: -6px;
					right: -6px;
				}

				&:hover {
					background: getColor("danger");
					transform: scale(1.1);

					.tu-icon-close {
						--tu-color: white;

						&:after,
						&:before {
							width: 12px;
							transform: rotate(180deg);
						}
					}
				}

				.tu-icon-close {
					--tu-color: var(--tu-text);
					transform: scale(0.6);
				}
			}
		}
	}

	// =============================================================================
	// OPTIONS DROPDOWN
	// =============================================================================

	&__options {
		--tu-color: var(--tu-primary);
		position: absolute;
		z-index: z-index('popover');
		background-color: getColor("component-background");
		border: 1px solid getColorAlpha("text", 0.15);
		padding: spacing('xs');
		border-radius: 0 0 border-radius('lg') border-radius('lg');
		overflow: hidden;
		box-shadow: shadow('lg');
		transform: translateY(3px);

		// State variants
		&--state-success { background: getColorAlpha("success", 0.1); }
		&--state-danger { background: getColorAlpha("danger", 0.1); }
		&--state-warn { background: getColorAlpha("warn", 0.1); }
		&--state-dark { background: getColorAlpha("dark", 0.1); }
		&--state-primary { background: getColorAlpha("primary", 0.1); }

		&.top {
			border-radius: border-radius('lg') border-radius('lg') 0 0;
			box-shadow: shadow('lg');

			&:after {
				top: auto;
				bottom: -10px;
			}
		}

		&:after {
			content: "";
			position: absolute;
			top: -10px;
			width: 80%;
			margin-left: 10%;
			left: 0;
			height: 10px;
			background: getColor("component-background");
			box-shadow: shadow('sm');
			z-index: z-index('elevated');
			transition: all transition('fast') 0.05s;
			opacity: 1;
		}

		&__content {
			max-height: 200px;
			overflow: auto;
			height: auto;
			z-index: z-index('base');
			transform: scale(1);
			transition: all transition('fast');
			position: relative;
			scroll-behavior: smooth;
			
			&:focus-within { outline: 2px solid transparent; }

			&__no-data {
				font-size: font-size('sm');
				text-align: center;
				padding: spacing('sm') spacing('md');
				color: getColorAlpha("text", 0.6);
			}

			// Enhanced scrollbar
			&::-webkit-scrollbar {
				width: 4px;
				height: 4px;
			}

			&::-webkit-scrollbar-track { background: transparent; }

			&::-webkit-scrollbar-thumb {
				background: getColorAlpha("text", 0.2);
				border-radius: border-radius('sm');

				&:hover { background: getColorAlpha("text", 0.3); }
			}
		}
	}

	// =============================================================================
	// LABELS & PLACEHOLDERS
	// =============================================================================

	&__label {
		position: absolute;
		left: spacing('md');
		font-size: font-size('sm');
		transition: all transition('fast');
		cursor: text;
		user-select: none;
		pointer-events: none;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		opacity: 0.6;
		z-index: z-index('elevated');
		color: getColorAlpha("text", 0.8) !important;

		&--hidden {
			opacity: 0;
			visibility: hidden;

			&.tu-select__label--placeholder {
				opacity: 1;
				visibility: visible;
				pointer-events: auto;
				transform: translate(-3%, -28px) !important;
				font-size: font-size('sm');
				margin-top: 0 !important;
			}
		}

		&--label {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			transform: translate(-3%, -28px) !important;
			font-size: font-size('sm');
			margin-top: 0 !important;
		}
	}

	// =============================================================================
	// LOADING & MESSAGE STATES
	// =============================================================================

	&__loading {
		position: absolute;
		width: 22px;
		height: 22px;
		right: spacing('sm');
		pointer-events: none;
		border-radius: border-radius('full');
		background: inherit;
		cursor: default;
		z-index: z-index('elevated');

		&:after {
			position: absolute;
			width: 100%;
			height: 100%;
			border: 2px solid getColor("primary");
			border-radius: inherit;
			border-top: 2px solid transparent;
			border-left: 2px solid transparent;
			border-right: 2px solid transparent;
			animation: rotateInputLoading 0.8s ease infinite;
			top: 0;
			content: "";
		}

		&:before {
			top: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			border: 2px dashed getColor("primary");
			border-radius: inherit;
			border-top: 2px solid transparent;
			border-left: 2px solid transparent;
			border-right: 2px solid transparent;
			animation: rotateInputLoading 0.8s linear infinite;
			opacity: 0.2;
			content: "";
		}

		& ~ .tu-select__arrow-icon { opacity: 0 !important; }
	}

	&__message {
		font-size: font-size('xs');
		position: relative;
		padding: 0 spacing('sm');
		transition: all transition('fast');
		overflow: hidden;
		height: unset !important;

		// State colors
		&--success { color: getColor("success"); }
		&--danger { color: getColor("danger"); }
		&--warn { color: getColor("warn"); }
		&--dark { color: getColor("dark"); }
		&--primary { color: getColor("primary"); }
	}

	// State modifiers with state-aware focus rings
	&--state-success { 
		@include select-state("success");
		
		// Container focus-within - only when dropdown is closed
		&:not(.activeOptions):focus-within {
			.tu-select__input,
			.tu-select__chips { 
				@include focus-ring(getColor("success"));
			}
		}
		
		// Direct element focus - only on keyboard navigation
		.tu-select__input:focus-visible,
		.tu-select__chips:focus-visible {
			@include focus-ring(getColor("success"));
		}
	}
	
	&--state-danger { 
		@include select-state("danger");
		
		&:not(.activeOptions):focus-within {
			.tu-select__input,
			.tu-select__chips { 
				@include focus-ring(getColor("danger"));
			}
		}
		
		.tu-select__input:focus-visible,
		.tu-select__chips:focus-visible {
			@include focus-ring(getColor("danger"));
		}
	}
	
	&--state-warn { 
		@include select-state("warn");
		
		&:not(.activeOptions):focus-within {
			.tu-select__input,
			.tu-select__chips { 
				@include focus-ring(getColor("warn"));
			}
		}
		
		.tu-select__input:focus-visible,
		.tu-select__chips:focus-visible {
			@include focus-ring(getColor("warn"));
		}
	}
	
	&--state-dark { 
		@include select-state("dark");
		
		&:not(.activeOptions):focus-within {
			.tu-select__input,
			.tu-select__chips { 
				@include focus-ring(getColor("dark"));
			}
		}
		
		.tu-select__input:focus-visible,
		.tu-select__chips:focus-visible {
			@include focus-ring(getColor("dark"));
		}
	}
	
	&--state-primary { 
		@include select-state("primary");
		
		&:not(.activeOptions):focus-within {
			.tu-select__input,
			.tu-select__chips { 
				@include focus-ring(getColor("primary"));
			}
		}
		
		.tu-select__input:focus-visible,
		.tu-select__chips:focus-visible {
			@include focus-ring(getColor("primary"));
		}
	}
}

// =============================================================================
// STYLE VARIANTS - BORDER, SHADOW, TRANSPARENT, SQUARE
// =============================================================================

// Border variant - underline style (no border on container)
.tu-select-content--border {
	.tu-select {
		&__input,
		&__chips {
			background: transparent;
			border: none !important;
			border-radius: 0;
			border-bottom: 2px solid getColorAlpha("text", 0.3);
			
			&:focus,
			&:hover {
				background: transparent;
				border-bottom: 2px solid getColor("primary");
				border-radius: 0;
			}
		}
		
		&.activeOptions {
			.tu-select__input,
			.tu-select__chips {
				background: transparent;
				border-bottom: 2px solid getColor("primary");
			}
		}
	}
}

// Shadow variant - elevated style (no border on container)
.tu-select-content--shadow {
	.tu-select {
		&__input,
		&__chips {
			border: none !important;
			box-shadow: shadow('md');
			
			&:focus,
			&:hover {
				box-shadow: shadow('lg');
				transform: translateY(-2px);
			}
		}
		
		&.activeOptions {
			.tu-select__input,
			.tu-select__chips {
				box-shadow: shadow('lg');
				transform: translateY(-2px);
			}
		}
	}
}

// Transparent variant - no background or border
.tu-select-content--transparent {
	.tu-select {
		&__input,
		&__chips {
			background: transparent !important;
			border: none !important;
			
			&:focus,
			&:hover {
				background: getColorAlpha("text", 0.05) !important;
			}
		}
		
		&.activeOptions {
			.tu-select__input,
			.tu-select__chips {
				background: getColorAlpha("text", 0.05) !important;
			}
		}
	}
}

// Square variant - no border radius
.tu-select-content--square {
	.tu-select {
		&__input,
		&__chips {
			border-radius: 0 !important;
		}
		
		&.activeOptions {
			.tu-select__input,
			.tu-select__chips {
				border-radius: 0 !important;
			}
		}
	}
}

// Dropdown specific styles
.tu-select-content:not(.tu-select--dropdown) .tu-select .tu-select__label--placeholder {
	opacity: 1;
	margin-left: spacing('md');
}

// Transition animations using design tokens
.tu-select-enter-active {
	transition: all transition('fast');
}

.tu-select-enter-from {
	opacity: 0;
	transform: translateY(-10px);
	transition: all transition('fast');
	box-shadow: shadow('none');

	&:after {
		opacity: 0 !important;
		box-shadow: shadow('none');
	}
}

.tu-select-leave-active {
	transition: all transition('fast');
}

.tu-select-leave-to {
	opacity: 0;
	transform: translateY(-10px);
	transition: all transition('fast');
	box-shadow: shadow('none');

	&.top {
		transform: translateY(10px) !important;
	}

	&:after {
		opacity: 0 !important;
		box-shadow: shadow('none');
	}
}

// High contrast mode support
@media (prefers-reduced-motion: reduce) {
	.tu-select,
	.tu-select *,
	.tu-select-enter-active,
	.tu-select-leave-active {
		transition: none !important;
		animation: none !important;
	}
	
	.tu-select__options {
		transform: none !important;
	}
	
	.tu-select__loading {
		&:after,
		&:before {
			animation: none !important;
		}
	}
}

// High contrast mode support
@media (prefers-contrast: high) {
	.tu-select__input,
	.tu-select__chips {
		border: 2px solid currentColor;
	}
	
	.tu-select__label {
		color: currentColor !important;
	}
	
	.tu-select__chips__chip {
		border: 2px solid currentColor;
		background: ButtonFace;
		color: ButtonText;
	}
}
</style>
