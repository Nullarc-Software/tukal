<template>
	<div class="tu-pagination-wrapper">
		<!-- Horizontal Layout: Total | Pagination Controls | Page Size -->
		<div v-if="(showTotal || showSizeChanger) && !simple" class="tu-pagination-horizontal-layout">
			<!-- Total Items Display (Left) -->
			<div v-if="showTotal" class="tu-pagination__total-left">
				Total {{ total || (actualLength * (perPage || 10)) }} items
			</div>
			
			<!-- Pagination Controls (Center) -->
			<div class="tu-pagination-content" :style="{
				['--tu-color']: color ? getColor(color) : '',
				'--tu-color-rgb': color ? getColorAsRgb(color) : ''
			}" :class="[
			{
				buttonsDotted: buttonsDotted,
				circle: circle,
				square: square,
				disabled: disabled,
				notMargin: notMargin,
				simple: simple
			},
			{ [`tu-component--${color}`]: color },
			{ [`tu-pagination--${size}`]: size }
		]" v-bind="$attrs">
				<button v-if="!notArrows" class="tu-pagination__arrow prev" :disabled="infinite ? false : val <= 1"
					@click="prevClicked">
					<slot v-if="$slots.arrowPrev" name="arrowPrev" />
					<tu-icon v-else>keyboard_arrow_left</tu-icon>
				</button>
				<slot v-if="$slots.default" />
				<div class="tu-pagination" ref="pagination" v-if="!onlyArrows && !$slots.default">
					<template v-for="(item, index) of paginationItems" :key="index">
						<div 
							v-if="item.type === 'dotted'" 
							class="tu-pagination__dotted"
							:class="{ next: item.direction === 'next' }"
							@click="handleDottedClick(item.direction)"
						>
							<span class="dotted">...</span>
							<span class="con-arrows">
								<tu-icon>keyboard_arrow_left</tu-icon>
								<tu-icon>keyboard_arrow_left</tu-icon>
							</span>
						</div>
						<button 
							v-else-if="item.page !== undefined"
							class="tu-pagination__button"
							:class="{
								active: item.page === props.modelValue,
								'tu-pagination__active': item.page === props.modelValue,
								flat: props.flat,
								prevActive: item.page === props.modelValue - 1,
								nextActive: item.page === props.modelValue + 1,
								disabled: isDisabledItem(item.page),
								loading: isLoadingItem(item.page)
							}"
							@click="setValuePage(item.page)"
						>
							{{ props.buttonsDotted ? '' : item.page }}
						</button>
					</template>
				</div>
				<button v-if="!notArrows" class="tu-pagination__arrow next" :disabled="infinite ? false : val >= actualLength"
					@click="nextClicked">
					<slot v-if="$slots.arrowNext" name="arrowNext" />
					<tu-icon v-else>keyboard_arrow_right</tu-icon>
				</button>
				<div v-if="progress" class="tu-pagination__progress">
					<div class="progress" :style="{ width: `${getProgress}%` }"></div>
				</div>
			</div>
			
			<!-- Page Size Changer (Right) -->
			<div v-if="showSizeChanger" class="tu-pagination__size-changer-right">
				<select 
					:value="perPage"
					@change="handlePageSizeChange"
					class="tu-pagination__size-select"
				>
					<option v-for="size in pageSizeOptions" :key="size" :value="size">
						{{ size }}
					</option>
				</select>
				<span>per page</span>
			</div>
		</div>

		<!-- Fallback: Original Layout for cases without showTotal or showSizeChanger -->
		<div v-else class="tu-pagination-content" :style="{
			['--tu-color']: color ? getColor(color) : '',
			'--tu-color-rgb': color ? getColorAsRgb(color) : ''
		}" :class="[
		{
			buttonsDotted: buttonsDotted,
			circle: circle,
			square: square,
			disabled: disabled,
			notMargin: notMargin,
			simple: simple
		},
		{ [`tu-component--${color}`]: color },
		{ [`tu-pagination--${size}`]: size }
	]" v-bind="$attrs">
			<button v-if="!notArrows" class="tu-pagination__arrow prev" :disabled="infinite ? false : val <= 1"
				@click="prevClicked">
				<slot v-if="$slots.arrowPrev" name="arrowPrev" />
				<tu-icon v-else>keyboard_arrow_left</tu-icon>
			</button>
			<slot v-if="$slots.default" />
			<div class="tu-pagination" ref="pagination" v-if="!onlyArrows && !$slots.default">
				<template v-for="(item, index) of paginationItems" :key="index">
					<div 
						v-if="item.type === 'dotted'" 
						class="tu-pagination__dotted"
						:class="{ next: item.direction === 'next' }"
						@click="handleDottedClick(item.direction)"
					>
						<span class="dotted">...</span>
						<span class="con-arrows">
							<tu-icon>keyboard_arrow_left</tu-icon>
							<tu-icon>keyboard_arrow_left</tu-icon>
						</span>
					</div>
					<button 
						v-else-if="item.page !== undefined"
						class="tu-pagination__button"
						:class="{
							active: item.page === props.modelValue,
							'tu-pagination__active': item.page === props.modelValue,
							flat: props.flat,
							prevActive: item.page === props.modelValue - 1,
							nextActive: item.page === props.modelValue + 1,
							disabled: isDisabledItem(item.page),
							loading: isLoadingItem(item.page)
						}"
						@click="setValuePage(item.page)"
					>
						{{ props.buttonsDotted ? '' : item.page }}
					</button>
				</template>
			</div>
			<button v-if="!notArrows" class="tu-pagination__arrow next" :disabled="infinite ? false : val >= actualLength"
				@click="nextClicked">
				<slot v-if="$slots.arrowNext" name="arrowNext" />
				<tu-icon v-else>keyboard_arrow_right</tu-icon>
			</button>
			<div v-if="progress" class="tu-pagination__progress">
				<div class="progress" :style="{ width: `${getProgress}%` }"></div>
			</div>

			<!-- Simple Pagination Override -->
			<div v-if="simple" class="text-center mt-sm text-sm tu-pagination__simple-counter">
				{{ props.modelValue }} / {{ actualLength }}
			</div>
		</div>

		<!-- Additional Features (Outside main pagination) - Only for features not in horizontal layout -->
		<div class="tu-pagination-extras">
			<!-- Jump to Page -->
			<div v-if="showJumper && !simple" class="text-center mt-sm">
				<div class="inline-flex items-center gap-sm text-sm">
					<span>Go to</span>
					<input 
						v-model="jumpPage"
						@keyup.enter="handleJump"
						type="number" 
						:min="1" 
						:max="actualLength"
						class="tu-pagination__jump-input"
					/>
					<span>page</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { TuIcon } from "../tuIcon";
import { getColor, getColorAsRgb } from "../../utils";

// Type definitions
type PaginationItem = number | string;
type PaginationItemData = {
	type: "page" | "dotted";
	page?: number;
	direction?: "prev" | "next";
};

defineOptions({
	name: "TuPagination"
});

interface Props {
	modelValue?: number;
	infinite?: boolean;
	flat?: boolean;
	progress?: boolean;
	notMargin?: boolean;
	buttonsDotted?: boolean;
	notArrows?: boolean;
	onlyArrows?: boolean;
	circle?: boolean;
	square?: boolean;
	disabled?: boolean;
	disabledItems?: number[];
	loadingItems?: number[];
	length?: number;
	max?: number;
	dottedNumber?: number;
	color?: string;
	// New props for total/per-page API
	total?: number;
	perPage?: number;
	// Additional props used by showcase
	showTotal?: boolean;
	showSizeChanger?: boolean;
	showJumper?: boolean;
	simple?: boolean;
	size?: "sm" | "lg";
	pageSizeOptions?: number[];
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: 1,
	infinite: false,
	flat: false,
	progress: false,
	notMargin: false,
	buttonsDotted: false,
	notArrows: false,
	onlyArrows: false,
	circle: false,
	square: false,
	disabled: false,
	disabledItems: () => [],
	loadingItems: () => [],
	length: 1,
	max: 9,
	dottedNumber: 5,
	color: "primary",
	// New prop defaults
	total: undefined,
	perPage: 10,
	showTotal: false,
	showSizeChanger: false,
	showJumper: false,
	simple: false,
	size: undefined,
	pageSizeOptions: () => [10, 20, 50, 100]
});

const emit = defineEmits<{
	"update:modelValue": [value: number];
	"page-size-change": [size: number];
}>();

const val = ref(1);
const activeClassMove = ref(false);
const pagination = ref<HTMLDivElement>();
const jumpPage = ref(1);

// Calculate actual length from total/perPage or use length prop
const actualLength = computed(() => {
	if (props.total !== undefined && props.perPage) 
		return Math.ceil(props.total / props.perPage);
	
	return props.length || 1;
});

const getProgress = computed(() => {
	let percent = 0;
	if (props.modelValue)
		percent = (props.modelValue * 100) / actualLength.value;

	return percent;
});

const setValuePage = function (NumberPage: number) {
	emit("update:modelValue", NumberPage);
};

const handleJump = function () {
	const page = parseInt(jumpPage.value.toString());
	if (page >= 1 && page <= actualLength.value) 
		setValuePage(page);
};

const handlePageSizeChange = function (event: Event) {
	const target = event.target as HTMLSelectElement;
	const newSize = parseInt(target.value);
	emit("page-size-change", newSize);
};

const handleDottedClick = function (direction?: "prev" | "next") {
	let newVal = val.value;
	if (direction === "next")
		newVal += props.dottedNumber;
	else
		newVal -= props.dottedNumber;
	
	if (newVal > actualLength.value) newVal = actualLength.value;
	else if (newVal < 1) newVal = 1;

	setValuePage(newVal);
};

const isDisabledItem = function (item: number) {
	return props.disabledItems.indexOf(item) !== -1;
};

const isLoadingItem = function (item: number) {
	return props.loadingItems.indexOf(item) !== -1;
};

const getButtons = function (start = 1, end = 6) {
	const buttons: number[] = [];
	for (start > 0 ? start : 1; start <= end; start++)
		buttons.push(start);

	return buttons;
};

const paginationItems = computed<PaginationItemData[]>(() => {
	const length = actualLength.value;
	const max = props.max;
	const even = max % 2 === 0 ? 1 : 0;
	const prevRange = Math.floor(max / 2);
	const nextRange = length - prevRange + 1 + even;

	const createItemsFromArray = (array: PaginationItem[]): PaginationItemData[] => {
		return array.map(item => {
			if (item === "...>" || item === "<...") {
				return {
					type: "dotted",
					direction: item === "...>" ? "next" : "prev"
				};
			}
			return {
				type: "page",
				page: item as number
			};
		});
	};

	if (
		props.modelValue >= prevRange &&
				props.modelValue <= nextRange &&
				!props.buttonsDotted
	) {
		const start = props.modelValue - prevRange + 2;
		const end = props.modelValue + prevRange - 2 - even;

		return createItemsFromArray([
			1,
			"<...",
			...getButtons(start, end),
			"...>",
			length
		]);
	}
	else if (!props.buttonsDotted && length > 6) {
		return createItemsFromArray([
			...getButtons(1, prevRange),
			"...>",
			...getButtons(nextRange, length)
		]);
	}
	else if (props.buttonsDotted || length <= 6) {
		return createItemsFromArray([
			...getButtons(1, length === 0 ? 1 : length)
		]);
	}

	return [];
});

const prevClicked = function (evt: MouseEvent) {
	const newVal = (val.value -= 1);
	if (newVal > 0) setValuePage(newVal);
	else if (props.infinite) setValuePage(actualLength.value);
	evt.stopImmediatePropagation();
};

const nextClicked = function (evt: MouseEvent) {
	const newVal = (val.value += 1);
	if (newVal <= actualLength.value) setValuePage(newVal);
	else if (props.infinite) setValuePage(1);
	evt.stopImmediatePropagation();
};

watch(
	() => actualLength.value,
	() => {
		val.value = 1;
		setValuePage(1);
		nextTick(() => {
			setTimeout(() => {
				activeClassMove.value = false;
			}, 300);
		});
	}
);

watch(
	() => props.modelValue,
	(valNew, prevValue) => {
		if (isDisabledItem(valNew) || isLoadingItem(valNew)) {
			let newVal = valNew;
			if (valNew > (prevValue || 0)) newVal += 1;
			else newVal -= 1;

			if (newVal > actualLength.value)
				newVal = props.infinite ? 1 : (prevValue || 1);
			else if (newVal <= 0)
				newVal = props.infinite ? actualLength.value : (prevValue || 1);

			val.value = newVal;
			setValuePage(newVal);
		}
		else {
			val.value = valNew;
			jumpPage.value = valNew; // Sync jump page input
			if (pagination.value) {
				activeClassMove.value = true;
				nextTick(() => {
					setTimeout(() => {
						activeClassMove.value = false;
					}, 300);
				});
			}
		}
	},
	{ immediate: true }
);

</script>

<style lang="scss" scoped>
@import "../../style/sass/_functions";

// Wrapper for the entire pagination component
.tu-pagination-wrapper {
	display: block;
	width: 100%;
}

// Horizontal layout for total + pagination + page size
.tu-pagination-horizontal-layout {
	display: flex;
	align-items: center;
	justify-content: flex-end; // Right-align the entire set
	gap: 16px;
	width: 100%;
	
	.tu-pagination__total-left {
		font-size: 14px;
		color: var(--pagination-text-color, #{getColor("text")});
		white-space: nowrap;
		order: 1; // Left position
	}
	
	.tu-pagination-content {
		order: 2; // Center position
		margin: 0; // Remove default margins for horizontal layout
	}
	
	.tu-pagination__size-changer-right {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		color: var(--pagination-text-color, #{getColor("text")});
		white-space: nowrap;
		order: 3; // Right position
		
		.tu-pagination__size-select {
			padding: 4px 8px;
			border: 1px solid getColorAlpha("text", 0.15);
			border-radius: 4px;
			background: getColor("background");
			color: getColor("text");
			font-size: 14px;
			min-width: 60px;
			
			&:focus {
				outline: none;
				border-color: getColor("primary");
				box-shadow: 0 0 0 2px getColorAlpha("primary", 0.1);
			}
		}
	}
	
	// Responsive adjustments
	@media (max-width: 768px) {
		flex-direction: column;
		gap: 8px;
		align-items: flex-end; // Keep right alignment even when stacked
		
		.tu-pagination__total-left {
			order: 1;
			font-size: 12px;
		}
		
		.tu-pagination-content {
			order: 2;
		}
		
		.tu-pagination__size-changer-right {
			order: 3;
			font-size: 12px;
		}
	}
}

.tu-pagination-extras {
	display: block;
	width: 100%;
}

// Base content with CSS custom properties
.tu-pagination-content {
	--tu-getColor: var(--tu-primary);
	--pagination-size: 36px;
	--pagination-border-radius: 12px;
	--pagination-margin: 2px;
	--pagination-background: #{getColor("gray-2")};
	--pagination-text-color: #{getColor("text")};
	--pagination-active-bg: #{getColor("color")};
	--pagination-active-color: #fff;
	
	position: relative;
	display: flex;
	align-self: center;
	justify-content: center;

	// State modifiers
	&.disabled {
		opacity: 0.5;
		pointer-events: none;
		user-select: none;
	}

	// Shape modifiers  
	&.square {
		--pagination-border-radius: 0px;
	}

	&.circle {
		--pagination-border-radius: 50%;
	}

	// Layout modifiers
	&.notMargin {
		--pagination-margin: 0px;
		
		.tu-pagination__dotted {
			background: getColor("gray-3");
		}

		.tu-pagination__arrow {
			&:first-of-type {
				border-radius: 12px 0px 0px 12px;
			}
			&:last-of-type {
				border-radius: 0px 12px 12px 0px;
			}
		}
	}

	// Dotted buttons variant
	&.buttonsDotted {
		--pagination-size: 12px;
		
		.tu-pagination__arrow {
			width: 15px;
			height: 12px;
			min-width: 15px;
			padding: 0px;
			background: var(--pagination-text-color) !important;

			i {
				width: 6px;
				height: 6px;
				&:before { width: 1px; }
				&:after { height: 1px; }
			}
		}

		.tu-pagination__dotted {
			width: 12px;
			height: 12px;
			font-size: 0.9rem;
			letter-spacing: 1px;
		}

		.tu-pagination__button {
			width: 12px;
			height: 12px;
			&.active { transform: scale(1); }
		}

		.tu-pagination__active {
			width: 12px;
			height: 12px;
			box-shadow: 0px 2px 10px 0px getColorAlpha("color", 0.4);
			transform: scale(1);
			&.move { transform: scale(1.2); }
		}
	}
}

// Base pagination container
.tu-pagination {
	display: flex;
	align-self: center;
	justify-content: center;
	position: relative;
	transition: background-color 0.2s ease;

	&__progress {
		width: calc(100% - 16px);
		height: 3px;
		background: getColor("gray-3");
		position: absolute;
		bottom: -8px;
		border-radius: 10px;

		.progress {
			width: 0px;
			background: var(--pagination-active-bg);
			height: 100%;
			position: relative;
			border-radius: inherit;
			transition: all 0.25s ease;
			max-width: 100%;
		}
	}

	&__slot {
		min-height: var(--pagination-size);
		min-width: var(--pagination-size);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

// Shared button base styles
%pagination-button-base {
	width: var(--pagination-size);
	height: var(--pagination-size);
	border-radius: var(--pagination-border-radius);
	display: flex;
	align-items: center;
	justify-content: center;
	margin: var(--pagination-margin);
	background: var(--pagination-background);
	transition: all 0.25s ease;
	color: var(--pagination-text-color);
	border: 0px;
	position: relative;
	cursor: pointer;

	&:disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	&:hover:not(:disabled) {
		background: getColor("gray-4");
	}

	&:active:not(:disabled) {
		transform: scale(0.9);
	}
}

// Arrow navigation buttons
.tu-pagination__arrow {
	@extend %pagination-button-base;
	min-width: var(--pagination-size);

	// Ensure icon is perfectly centered
	.tu-icon,
	i {
		width: 10px;
		height: 10px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		&:before { width: 2px; }
		&:after { height: 2px; }
	}
}

// Active state for pagination buttons
.tu-pagination__active {
	background: var(--pagination-active-bg) !important;
	color: var(--pagination-active-color) !important;

	&.flat {
		background: getColorAlpha("color", 0.15) !important;
		color: getColor("color") !important;
	}

	&.move {
		transform: scale(1.1);
	}
}

// Dotted navigation elements
.tu-pagination__dotted {
	@extend %pagination-button-base;
	font-size: 1.4rem;
	letter-spacing: 2px;

	&:hover {
		span.dotted {
			opacity: 0;
			margin-left: -1px;
			transition: all 0.25s ease;
		}

		.con-arrows {
			opacity: 1;
			margin-left: -1px;
			transition: all 0.25s ease;
		}
	}

	&.next:hover {
		span.dotted {
			margin-left: 1px;
		}
		.con-arrows {
			margin-left: 1px;
		}
	}

	span.dotted {
		margin-right: -2px;
		text-align: center;
	}

	.con-arrows {
		width: 10px;
		height: 10px;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 5px;
		opacity: 0;
		transition: all 0.1s ease;

		&.next {
			transform: rotate(180deg);
			margin-left: -5px;
		}

		i {
			width: 10px;
			height: 10px;
			position: relative;
			display: block;
			transform: rotate(-45deg) scale(0.8);
			&:before { width: 2px; }
			&:after { height: 2px; }
			&:last-child {
				position: absolute;
				top: 0px;
				margin-left: 6px;
			}
		}
	}
}

// Page number buttons
.tu-pagination__button {
	@extend %pagination-button-base;
	font-size: 0.9rem;

	&.loading {
		border-radius: 50%;
		opacity: 0.5;
		pointer-events: none;
		user-select: none;

		&:after,
		&:before {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: 2px solid getColor("color");
			border-top: 2px solid getColorAlpha("background", 0);
			border-left: 2px solid getColorAlpha("background", 0);
			border-bottom: 2px solid getColorAlpha("background", 0);
			box-sizing: border-box;
			transition: all 0.25s ease;
			display: block;
			box-shadow: 0px 0px 0px 0px getColor("color");
			animation: loadingPagination 0.6s ease infinite;
		}

		&:before {
			border: 2px dashed getColor("color");
			animation: loadingPagination 0.6s linear infinite;
		}
	}

	&.disabled {
		opacity: 0.4;
		pointer-events: none;
		user-select: none;
	}
}

// Size variations using CSS custom properties
.tu-pagination--sm {
	--pagination-size: 28px;
	font-size: 12px;
}

.tu-pagination--lg {
	--pagination-size: 44px;  
	font-size: 16px;
}

// Simple pagination styles
.tu-pagination-content.simple {
	.tu-pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
	}
	
	.tu-pagination__arrow {
		background: getColor("background");
		border: 1px solid getColor("gray-3");
		
		&:hover:not(:disabled) {
			border-color: getColor("color");
		}
		
		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}
}

// Additional component styles for new elements
.tu-pagination__simple-counter,
.tu-pagination__total {
	color: getColor("gray-5");
}

.tu-pagination__jump-input {
	width: 60px;
	padding: 4px 8px;
	border: 1px solid getColor("gray-3");
	border-radius: var(--pagination-border-radius, 4px);
	text-align: center;
	color: var(--pagination-text-color);
	background: getColor("background");
	
	&:focus {
		outline: none;
		border-color: getColor("color");
	}
}

.tu-pagination__size-select {
	padding: 4px 8px;
	border: 1px solid getColor("gray-3");
	border-radius: var(--pagination-border-radius, 4px);
	color: var(--pagination-text-color);
	background: getColor("background");
	
	&:focus {
		outline: none;
		border-color: getColor("color");
	}
}

@keyframes loadingPagination {
	0% { transform: rotate(0); }
	100% { transform: rotate(360deg); }
}

// =============================================================================
// DARK THEME SUPPORT
// =============================================================================
.tu-dark-theme {
	.tu-pagination-content {
		--pagination-background: #{getColor("gray-1")};
		--pagination-text-color: #{getColor("text")};
		
		// notMargin variant adjustments for dark theme
		&.notMargin {
			.tu-pagination__dotted {
				background: getColor("gray-2");
			}
		}
		
		// Enhanced shadow for dark theme
		.tu-pagination__button,
		.tu-pagination__arrow {
			&:hover:not(:disabled) {
				background: getColor("gray-2");
				box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
			}
		}
		
		.tu-pagination__active {
			box-shadow: 0 2px 8px rgba(var(--tu-color-rgb), 0.3);
			
			&.flat {
				background: getColorAlpha("color", 0.2) !important;
				color: getColor("color") !important;
			}
		}
		
		// Improved progress bar visibility in dark theme
		.tu-pagination__progress {
			background: getColor("gray-3");
			
			.progress {
				box-shadow: 0 0 4px rgba(var(--tu-color-rgb), 0.4);
			}
		}
		
		// Better contrast for simple pagination counter and total
		.tu-pagination__simple-counter,
		.tu-pagination__total {
			color: getColorAlpha("text", 0.8);
		}
		
		// Enhanced form elements for dark theme
		.tu-pagination__jump-input,
		.tu-pagination__size-select {
			background: getColor("gray-2");
			border-color: getColor("gray-3");
			color: getColor("text");
			
			&:focus {
				border-color: getColor("color");
				box-shadow: 0 0 0 2px getColorAlpha("color", 0.2);
			}
			
			&:hover {
				border-color: getColorAlpha("color", 0.6);
			}
		}
		
		// Select dropdown arrow styling for dark theme
		.tu-pagination__size-select {
			option {
				background: getColor("gray-1");
				color: getColor("text");
			}
		}
		
		// Simple pagination arrows with better contrast
		&.simple {
			.tu-pagination__arrow {
				background: getColor("gray-2");
				border-color: getColor("gray-3");
				
				&:hover:not(:disabled) {
					border-color: getColor("color");
					background: getColor("gray-1");
				}
			}
		}
		
		// Dotted navigation with improved visibility
		.tu-pagination__dotted {
			color: getColorAlpha("text", 0.8);
			
			&:hover {
				background: getColor("gray-2");
			}
			
			.con-arrows i {
				&:before,
				&:after {
					background: getColor("text");
				}
			}
		}
		
		// Dotted buttons variant with dark theme adjustments
		&.buttonsDotted {
			.tu-pagination__arrow {
				background: getColorAlpha("text", 0.8) !important;
			}
			
			.tu-pagination__active {
				box-shadow: 0px 2px 10px 0px getColorAlpha("color", 0.6);
			}
		}
		
		// Enhanced loading state visibility
		.tu-pagination__button.loading {
			&:after,
			&:before {
				border-color: getColor("color");
				border-top-color: transparent;
				border-left-color: transparent;
				border-bottom-color: transparent;
			}
		}
		
		// Disabled state with better contrast
		.tu-pagination__button.disabled,
		.tu-pagination__arrow:disabled {
			opacity: 0.3;
			background: getColor("gray-3");
		}
	}
}
</style>

