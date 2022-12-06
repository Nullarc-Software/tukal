import { ref, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core/lib/popper-lite.js";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
import flip from "@popperjs/core/lib/modifiers/flip.js";
import offset from "@popperjs/core/lib/modifiers/offset";
import arrow from "@popperjs/core/lib/modifiers/arrow";
import { PlacementType } from "../tuPopper.vue";
import { VirtualElement } from "@popperjs/core";
import {Ref} from "vue";

const toInt = x => parseInt(x, 10);



export type UsePopperOptions = {
	placement: Ref<PlacementType|any>;
	arrowPadding: Ref<string>;
	offsetX: Ref<string>;
	offsetY: Ref<string>;
	virtualElement?: VirtualElement;
}

export default function usePopper (options: UsePopperOptions) {
	const isOpen = ref(false);
	const popperInstance = ref(null);
	const popperNode = ref(null);
	const triggerNode = ref(null);

	const hide = () => {
		isOpen.value = false;
	};

	const show = () => {
		if (isOpen.value) 
			return;
		

		isOpen.value = true;
	};

	const toggle = () => {
		isOpen.value ? hide() : show();
	};

	watch(isOpen, async isOpen => {
		if (isOpen) {
			await nextTick();
			initializePopper();
		}
	});

	const initializePopper = () => {
		popperInstance.value = createPopper(
			triggerNode.value,
			popperNode.value,
			{
				placement: options.placement.value,
				modifiers: [
					preventOverflow,
					flip,
					arrow,
					{
						name: "arrow",
						options: {
							padding: toInt(options.arrowPadding.value)
						}
					},
					offset,
					{
						name: "offset",
						options: {
							offset: [
								toInt(options.offsetX.value),
								toInt(options.offsetY.value)
							]
						}
					}
				]
			}
		);

		popperInstance.value.update();
	};

	return {
		isOpen,
		hide,
		show,
		toggle,
		popperInstance,
		popperNode,
		triggerNode
	};
}
