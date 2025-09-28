<template>
	<!-- Rich Text Editor Wrapper -->
	<div class="flex editor-wrapper" :style="{
		width: width
	}">
		<!-- Toolbar Header -->
		<div v-if="editor" class="flex editor-header">
			<!-- Text Formatting Buttons -->
			<TuButton title="Bold" color="primary" circle border v-if="bold || standard" :active="editor.isActive('bold')"
				@click="editor.chain().focus().toggleBold().run()"
				:disabled="!editor.can().chain().focus().toggleBold().run()"
				:class="{ 'is-active': editor.isActive('bold') }">
				<TuIcon size="1rem">format_bold</TuIcon>
			</TuButton>
			<TuButton title="Italics" circle border v-if="italics || standard" :active="editor.isActive('italic')"
				@click="editor.chain().focus().toggleItalic().run()"
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
				:class="{ 'is-active': editor.isActive('italic') }">
				<TuIcon size="1rem">format_italic</TuIcon>
			</TuButton>
			<TuButton title="Underline" circle border v-if="underline || standard" :active="editor.isActive('underline')"
				@click="editor.chain().focus().toggleUnderline().run()" :disabled="!editor.can().chain().focus().toggleUnderline().run()
					" :class="{ 'is-active': editor.isActive('underline') }">
				<TuIcon size="1rem">format_underline</TuIcon>
			</TuButton>
			<TuButton title="Strike-through" circle border v-if="strikeThrough || standard"
				:active="editor.isActive('strike')" @click="editor.chain().focus().toggleStrike().run()"
				:disabled="!editor.can().chain().focus().toggleStrike().run()"
				:class="{ 'is-active': editor.isActive('strike') }">
				<TuIcon size="1rem">format_strikethrough</TuIcon>
			</TuButton>

			<!-- Text Alignment Controls -->
			<TuButtonGroup v-if="textAlignment || standard">
				<TuButton border title="Left Align" :active="editor.isActive({ textAlign: 'left' })"
					@click="editor.chain().focus().setTextAlign('left').run()" :class="{
						'is-active': editor.isActive({ textAlign: 'left' })
					}">
					<TuIcon size="1rem">format_align_left</TuIcon>
				</TuButton>
				<TuButton border title="Center Align" :active="editor.isActive({ textAlign: 'center' })"
					@click="editor.chain().focus().setTextAlign('center').run()" :class="{
						'is-active': editor.isActive({ textAlign: 'center' })
					}">
					<TuIcon size="1rem">format_align_center</TuIcon>
				</TuButton>
				<TuButton border title="Right Align" :active="editor.isActive({ textAlign: 'right' })"
					@click="editor.chain().focus().setTextAlign('right').run()" :class="{
						'is-active': editor.isActive({ textAlign: 'right' })
					}">
					<TuIcon size="1rem">format_align_right</TuIcon>
				</TuButton>
				<TuButton border title="Justify" :active="editor.isActive({ textAlign: 'justify' })" @click="
					editor.chain().focus().setTextAlign('justify').run()
					" :class="{
		'is-active': editor.isActive({ textAlign: 'justify' })
	}">
					<TuIcon size="1rem">format_align_justify</TuIcon>
				</TuButton>
			</TuButtonGroup>

			<!-- Inline Code -->
			<TuButton circle border v-if="code" title="Code" :active="editor.isActive('code')"
				@click="editor.chain().focus().toggleCode().run()"
				:disabled="!editor.can().chain().focus().toggleCode().run()"
				:class="{ 'is-active': editor.isActive('code') }">
				<TuIcon size="1rem">code</TuIcon>
			</TuButton>

			<!-- Heading Buttons -->
			<!-- <TuButton
				class="bold padding"
				circle
				border
				size="0.5rem"
				:active="editor.isActive('paragraph')"
				@click="editor.chain().focus().setParagraph().run()"
				:class="{ 'is-active': editor.isActive('paragraph') }"
			>
				P
			</TuButton> -->
			<TuButton class="bold" circle border size="sm" title="Heading 1" v-if="heading1 || standard"
				:active="editor.isActive('heading', { level: 1 })" @click="
					editor.chain().focus().toggleHeading({ level: 1 }).run()
					" :class="{
		'is-active': editor.isActive('heading', { level: 1 })
	}">
				H1
			</TuButton>
			<TuButton class="bold" circle border size="sm" title="Heading 2" v-if="heading2 || standard"
				:active="editor.isActive('heading', { level: 2 })" @click="
					editor.chain().focus().toggleHeading({ level: 2 }).run()
					" :class="{
		'is-active': editor.isActive('heading', { level: 2 })
	}">
				H2
			</TuButton>
			<TuButton class="bold" circle border size="sm" v-if="heading3" title="Heading 3"
				:active="editor.isActive('heading', { level: 3 })" @click="
					editor.chain().focus().toggleHeading({ level: 3 }).run()
					" :class="{
		'is-active': editor.isActive('heading', { level: 3 })
	}">
				H3
			</TuButton>
			<TuButton class="bold" circle border size="sm" v-if="heading4" title="Heading 4"
				:active="editor.isActive('heading', { level: 4 })" @click="
					editor.chain().focus().toggleHeading({ level: 4 }).run()
					" :class="{
		'is-active': editor.isActive('heading', { level: 4 })
	}">
				H4
			</TuButton>
			<TuButton class="bold" circle border size="sm" v-if="heading5" title="Heading 5"
				:active="editor.isActive('heading', { level: 5 })" @click="
					editor.chain().focus().toggleHeading({ level: 5 }).run()
					" :class="{
		'is-active': editor.isActive('heading', { level: 5 })
	}">
				H5
			</TuButton>
			<TuButton class="bold" circle border size="sm" v-if="heading6" title="Heading 6"
				:active="editor.isActive('heading', { level: 6 })" @click="
					editor.chain().focus().toggleHeading({ level: 6 }).run()
					" :class="{
		'is-active': editor.isActive('heading', { level: 6 })
	}">
				H6
			</TuButton>

			<!-- List Controls -->
			<TuButton circle border title="Unordered List" v-if="unorderedList || standard"
				:active="editor.isActive('bulletList')" @click="editor.chain().focus().toggleBulletList().run()"
				:class="{ 'is-active': editor.isActive('bulletList') }">
				<TuIcon size="1rem">format_list_bulleted</TuIcon>
			</TuButton>
			<TuButton circle border title="Ordered List" v-if="orderedList || standard"
				:active="editor.isActive('orderedList')" @click="editor.chain().focus().toggleOrderedList().run()"
				:class="{ 'is-active': editor.isActive('orderedList') }">
				<TuIcon size="1rem">format_list_numbered</TuIcon>
			</TuButton>

			<!-- Block Elements -->
			<TuButton circle border size="sm" v-if="codeBlock" title="Code Block" :active="editor.isActive('codeBlock')"
				@click="editor.chain().focus().toggleCodeBlock().run()"
				:class="{ 'is-active': editor.isActive('codeBlock') }">
				Code block
			</TuButton>
			<TuButton circle border v-if="blockQuote" title="Block Quote" :active="editor.isActive('blockquote')"
				@click="editor.chain().focus().toggleBlockquote().run()"
				:class="{ 'is-active': editor.isActive('blockquote') }">
				<TuIcon size="1rem">format_quote</TuIcon>
			</TuButton>
			<TuButton circle border v-if="horizontalRule" title="Horizontal Rule"
				@click="editor.chain().focus().setHorizontalRule().run()">
				<TuIcon size="1rem">remove</TuIcon>
			</TuButton>

			<TuButton circle border v-if="link" title="Horizontal Rule"
				@click="editor.chain().focus().set().run()">
				<TuIcon size="1rem">remove</TuIcon>
			</TuButton>

			<!-- History Controls -->
			<TuButton circle border v-if="undo" title="Undo" @click="editor.chain().focus().undo().run()"
				:disabled="!editor.can().chain().focus().undo().run()">
				<TuIcon size="1rem">undo</TuIcon>
			</TuButton>
			<TuButton circle border v-if="redo" title="Redo" @click="editor.chain().focus().redo().run()"
				:disabled="!editor.can().chain().focus().redo().run()">
				<TuIcon size="1rem">redo</TuIcon>
			</TuButton>
		</div>

		<!-- Editor Content Area -->
		<div class="editor-content-wrapper" ref="editorContentWrapper">
			<!-- TipTap Editor Content -->
			<editor-content :editor="editor" v-model="content" />
			
			<!-- Resize Handle -->
			<div v-if="resizable" class="resize-handle" 
				@mousedown="startResize"
				title="Drag to resize">
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent } from "@tiptap/vue-3";
import TuButton from "../tuButton/tuButton.vue";
import TuIcon from "../tuIcon/tuIcon.vue";
import TuButtonGroup from "../tuButton/tuButtonGroup.vue";

defineOptions({
	name: "TuRichTextEditor"
});

/**
 * TuRichTextEditor - A feature-rich WYSIWYG text editor component
 * 
 * Built on top of TipTap editor, this component provides a comprehensive
 * rich text editing experience with customizable toolbar options.
 * 
 * @example
 * ```vue
 * <!-- Basic usage with standard toolbar -->
 * <tu-rich-text-editor v-model="content" />
 * 
 * <!-- Custom toolbar configuration -->
 * <tu-rich-text-editor 
 *   v-model="content"
 *   :bold="true"
 *   :italic="true"
 *   :heading1="true"
 *   :heading2="true"
 *   :unorderedList="true"
 *   width="600px"
 *   height="400px"
 * />
 * 
 * <!-- Non-resizable editor -->
 * <tu-rich-text-editor 
 *   v-model="content"
 *   :resizable="false"
 *   width="500px"
 *   height="300px"
 * />
 * ```
 */

interface Props {
	/**
	 * The content of the rich text editor
	 * @default ""
	 */
	modelValue?: string;

	// === APPEARANCE & LAYOUT ===
	/**
	 * Width of the editor
	 * @default "unset"
	 * @example "500px", "100%", "50rem"
	 */
	width?: string;

	/**
	 * Height of the editor
	 * @default "unset"
	 * @example "300px", "20rem"
	 */
	height?: string;

	/**
	 * Whether the editor can be resized using the bottom-right handle
	 * @default true
	 */
	resizable?: boolean;

	// === TOOLBAR PRESETS ===
	/**
	 * Enable standard toolbar with common formatting options
	 * Includes: bold, italic, underline, strike, headings (H1, H2), lists, text alignment
	 * @default true
	 */
	standard?: boolean;

	// === TEXT FORMATTING ===
	/**
	 * Show bold formatting button
	 * @default false
	 */
	bold?: boolean;

	/**
	 * Show italic formatting button
	 * @default false
	 */
	italics?: boolean;

	/**
	 * Show underline formatting button
	 * @default false
	 */
	underline?: boolean;

	/**
	 * Show strikethrough formatting button
	 * @default false
	 */
	strikeThrough?: boolean;

	/**
	 * Show inline code formatting button
	 * @default false
	 */
	code?: boolean;

	// === HEADINGS ===
	/**
	 * Show heading 1 (H1) button
	 * @default false
	 */
	heading1?: boolean;

	/**
	 * Show heading 2 (H2) button
	 * @default false
	 */
	heading2?: boolean;

	/**
	 * Show heading 3 (H3) button
	 * @default false
	 */
	heading3?: boolean;

	/**
	 * Show heading 4 (H4) button
	 * @default false
	 */
	heading4?: boolean;

	/**
	 * Show heading 5 (H5) button
	 * @default false
	 */
	heading5?: boolean;

	/**
	 * Show heading 6 (H6) button
	 * @default false
	 */
	heading6?: boolean;

	// === LISTS ===
	/**
	 * Show bullet/unordered list button
	 * @default false
	 */
	unorderedList?: boolean;

	/**
	 * Show numbered/ordered list button
	 * @default false
	 */
	orderedList?: boolean;

	// === BLOCKS ===
	/**
	 * Show code block button
	 * @default false
	 */
	codeBlock?: boolean;

	/**
	 * Show blockquote button
	 * @default false
	 */
	blockQuote?: boolean;

	/**
	 * Show horizontal rule/divider button
	 * @default false
	 */
	horizontalRule?: boolean;

	// === TEXT ALIGNMENT ===
	/**
	 * Show text alignment buttons (left, center, right, justify)
	 * @default false
	 */
	textAlignment?: boolean;

	// === HISTORY ===
	/**
	 * Show undo button
	 * @default false
	 */
	undo?: boolean;

	/**
	 * Show redo button
	 * @default false
	 */
	redo?: boolean;

	/**
	 * Show link button
	 * @default false
	 */
	link?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	// Content
	modelValue: "",

	// Appearance & Layout
	width: "unset",
	height: "unset",
	resizable: true,

	// Toolbar Presets
	standard: true,

	// Text Formatting
	bold: false,
	italics: false,
	underline: false,
	strikeThrough: false,
	code: false,

	// Headings
	heading1: false,
	heading2: false,
	heading3: false,
	heading4: false,
	heading5: false,
	heading6: false,

	// Lists
	unorderedList: false,
	orderedList: false,

	// Blocks
	codeBlock: false,
	blockQuote: false,
	horizontalRule: false,

	// Text Alignment
	textAlignment: false,

	// Link
	link: false,

	// History
	undo: false,
	redo: false
});

/**
 * Component events
 */
const emit = defineEmits<{
	/**
	 * Emitted when the content of the editor changes
	 * @param value - The new HTML content of the editor
	 */
	"update:modelValue": [value: string];
}>();

// === REACTIVE STATE ===
/** The TipTap editor instance */
const editor = ref<Editor>();

/** Editor content reference (for v-model binding) */
const content = ref(null);

/** Reference to the editor content wrapper element */
const editorContentWrapper = ref<HTMLDivElement>();

/** Flag indicating if the editor is currently being resized */
const isResizing = ref(false);

// === RESIZE FUNCTIONALITY ===
/**
 * Initiates the resize operation when the resize handle is clicked
 * Supports diagonal resizing (both width and height simultaneously)
 * 
 * @param e - The mouse event from the resize handle
 */
const startResize = (e: MouseEvent) => {
	e.preventDefault();
	isResizing.value = true;
	
	const startX = e.clientX;
	const startY = e.clientY;
	const startHeight = editorContentWrapper.value?.offsetHeight || 200;
	const startWidth = editorContentWrapper.value?.offsetWidth || 400;
	
	const handleMouseMove = (e: MouseEvent) => {
		if (!isResizing.value || !editorContentWrapper.value) return;
		
		const deltaX = e.clientX - startX;
		const deltaY = e.clientY - startY;
		const newHeight = Math.max(120, startHeight + deltaY); // Minimum height of 120px
		const newWidth = Math.max(200, startWidth + deltaX); // Minimum width of 200px
		
		editorContentWrapper.value.style.height = `${newHeight}px`;
		editorContentWrapper.value.style.width = `${newWidth}px`;
		
		// Update the parent wrapper width as well
		if (editorContentWrapper.value.parentElement)
			editorContentWrapper.value.parentElement.style.width = `${newWidth}px`;
		
		// Update the ProseMirror editor height
		if (editor.value?.view?.dom)
			editor.value.view.dom.style.height = `${newHeight - 40}px`; // Account for padding
	};
	
	const handleMouseUp = () => {
		isResizing.value = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
		document.body.style.cursor = "";
		document.body.style.userSelect = "";
	};
	
	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUp);
	document.body.style.cursor = "nw-resize";
	document.body.style.userSelect = "none";
};

// === LIFECYCLE HOOKS ===
/**
 * Initialize the TipTap editor instance and set up initial dimensions
 */
onMounted(() => {
	editor.value = new Editor({
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"]
			})
		],
		content: "",
		onUpdate: () => {
			// HTML
			if (editor.value)
				emit("update:modelValue", editor.value.getHTML());
			// JSON
			// this.$emit('update:modelValue', this.editor.getJSON())
		}
	});

	// Set initial height for both the wrapper and the ProseMirror editor
	if (editorContentWrapper.value) {
		const initialHeight = props.height ? 
			(parseInt(props.height.replace("px", "")) || 200) : 200;
		editorContentWrapper.value.style.height = `${initialHeight}px`;
		
		const initialWidth = props.width && props.width !== "unset" ? 
			props.width : "auto";
		if (initialWidth !== "auto")
			editorContentWrapper.value.style.width = initialWidth;
	}

	if (editor.value.view && editor.value.view.dom) {
		const editorHeight = props.height ? 
			(parseInt(props.height.replace("px", "")) - 40 || 160) : 160;
		editor.value.view.dom.style.height = `${editorHeight}px`;
	}
});

// === WATCHERS ===
/**
 * Watch for changes to the modelValue prop and update the editor content
 * Prevents infinite loops by checking if the content actually changed
 */
watch(
	() => props.modelValue,
	(value: string) => {
		if (!editor.value) return;
		
		// HTML
		const isSame = editor.value.getHTML() === value;

		// JSON
		// const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

		if (isSame) return;

		editor.value.commands.setContent(value, false);
	}
);
</script>

<style lang="scss">
@import "../../style/sass/_functions";

/* === PROSEMIRROR EDITOR STYLES === */
.ProseMirror {
	border: 2px solid getColorAlpha("text", 0.1);
	border-top: none; // Connect seamlessly with toolbar
	border-bottom: none; // Connect with resize handle
	background: rgba(var(--tu-gray-2), 1);
	color: rgba(var(--tu-text), 1);
	padding: 15px;
	transition: all 0.25s ease;
	min-height: 100px;
	overflow: auto;
	font-family: inherit;
	font-size: 14px;
	line-height: 1.6;
	flex: 1;
	
	&:focus {
		outline: none;
		border-color: rgba(var(--tu-primary-rgb), 0.3);
		background: rgba(var(--tu-background), 1);
	}
	
	&:focus-visible {
		outline: none;
		box-shadow: none;
	}
}

/* === CONTENT FORMATTING STYLES === */
/* Basic editor styles */
.ProseMirror {
	>*+* {
		margin-top: 0.75em;
	}

	ul,
	ol {
		padding: 0 1rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.1;
	}

	code {
		background-color: rgba(#616161, 0.1);
		color: #616161;
	}

	pre {
		background: #0d0d0d;
		color: #fff;
		font-family: "JetBrainsMono", monospace;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;

		code {
			color: inherit;
			padding: 0;
			background: none;
			font-size: 1rem;
		}
	}

	img {
		max-width: 100%;
		height: auto;
	}

	blockquote {
		padding-left: 1rem;
		border-left: 2px solid getColor("text");
	}

	hr {
		border: none;
		border-top: 2px solid getColor("text");
		margin: 2rem 0;
	}
}

/* === COMPONENT LAYOUT STYLES === */
.bold {
	font-weight: bold;
	font-size: 1rem;
}

/* === TOOLBAR STYLES === */
.editor-header.flex {
	display: flex;
	flex-wrap: wrap;
	border-left: 2px solid getColorAlpha("text", 0.1);
	border-right: 2px solid getColorAlpha("text", 0.1);
	border-top: 2px solid getColorAlpha("text", 0.1);
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	padding: 8px;
	gap: 4px;
	background: rgba(var(--tu-gray-1), 1);

	// Enhanced styles for toolbar buttons
	.tu-button {
		transition: all 0.2s ease;
		min-width: 36px;
		min-height: 36px;
		
		// Default state
		&:not(.is-active) {
			background: rgba(var(--tu-gray-2), 1);
			color: rgba(var(--tu-text), 0.8);
			border-color: rgba(var(--tu-text), 0.2);
			
			// Hover state with better contrast
			&:hover:not(:disabled) {
				background: rgba(var(--tu-primary-rgb), 0.1);
				color: rgba(var(--tu-primary-rgb), 1);
				border-color: rgba(var(--tu-primary-rgb), 0.3);
				transform: translateY(-1px);
				box-shadow: 0 2px 8px rgba(var(--tu-primary-rgb), 0.2);
			}
			
			// Focus state for keyboard navigation
			&:focus {
				outline: 2px solid rgba(var(--tu-primary-rgb), 0.5);
				outline-offset: 2px;
			}
		}
		
		// Active state (when formatting is applied)
		&.is-active {
			background: rgba(var(--tu-primary-rgb), 0.9);
			color: white;
			border-color: rgba(var(--tu-primary-rgb), 1);
			
			&:hover:not(:disabled) {
				background: rgba(var(--tu-primary-rgb), 1);
				transform: translateY(-1px);
				box-shadow: 0 2px 8px rgba(var(--tu-primary-rgb), 0.3);
			}
			
			&:focus {
				outline: 2px solid rgba(var(--tu-secondary-rgb), 0.8);
				outline-offset: 2px;
			}
		}
		
		// Disabled state
		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
			
			&:hover {
				transform: none;
				box-shadow: none;
			}
		}
		
		// Icon styling for better visibility
		.tu-icon {
			transition: color 0.2s ease;
		}
		
		// Text buttons (H1, H2, etc.)
		&.bold {
			font-weight: 600;
			font-size: 12px;
		}
	}
	
	// Button group specific styling
	.tu-button-group {
		.tu-button {
			border-radius: 0;
			
			&:first-child {
				border-top-left-radius: 6px;
				border-bottom-left-radius: 6px;
			}
			
			&:last-child {
				border-top-right-radius: 6px;
				border-bottom-right-radius: 6px;
			}
		}
	}
}

/* === EDITOR CONTENT WRAPPER === */
.editor-content-wrapper {
	position: relative;
	display: flex;
	flex-direction: column;
	border: 2px solid getColorAlpha("text", 0.1);
	border-top: none;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	overflow: hidden;
	min-height: 120px;
	transition: all 0.25s ease;

	&:focus-within {
		border-color: rgba(var(--tu-primary-rgb), 0.5);
		box-shadow: 0 0 0 3px rgba(var(--tu-primary-rgb), 0.1);
	}
	
	.ProseMirror-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
}

/* === RESIZE HANDLE STYLES === */
.resize-handle { 
	position: absolute;
	bottom: 0;
	right: 0;
	width: 20px;
	height: 20px;
	background: rgba(var(--tu-text-rgb), 0.1);
	border-top-left-radius: 8px;
	cursor: nw-resize;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;
	opacity: 0.6;
	
	// Create a visual grip pattern using CSS
	&::before {
		content: "";
		width: 12px;
		height: 12px;
		background-image: 
			linear-gradient(45deg, transparent 40%, rgba(var(--tu-text-rgb), 0.4) 40%, rgba(var(--tu-text-rgb), 0.4) 60%, transparent 60%),
			linear-gradient(-45deg, transparent 40%, rgba(var(--tu-text-rgb), 0.4) 40%, rgba(var(--tu-text-rgb), 0.4) 60%, transparent 60%);
		background-size: 4px 4px;
		background-position: 0 0, 2px 2px;
		transition: opacity 0.2s ease;
	}
	
	&:hover {
		background: rgba(var(--tu-primary-rgb), 0.2);
		opacity: 1;
		transform: scale(1.1);
		
		&::before {
			background-image: 
				linear-gradient(45deg, transparent 40%, rgba(var(--tu-primary-rgb), 0.7) 40%, rgba(var(--tu-primary-rgb), 0.7) 60%, transparent 60%),
				linear-gradient(-45deg, transparent 40%, rgba(var(--tu-primary-rgb), 0.7) 40%, rgba(var(--tu-primary-rgb), 0.7) 60%, transparent 60%);
		}
	}
	
	&:active {
		background: rgba(var(--tu-primary-rgb), 0.3);
	}
}

/* === MAIN WRAPPER STYLES === */
.editor-wrapper.flex {
	margin: 5px;
	padding: 0;
	display: flex;
	flex-direction: column;
	width: auto;
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(var(--tu-text-rgb), 0.1);
	transition: box-shadow 0.2s ease;
	
	&:focus-within {
		box-shadow: 0 4px 16px rgba(var(--tu-primary-rgb), 0.15);
	}
	
	// When editor has content, slightly different styling
	&.has-content {
		.editor-header {
			background: rgba(var(--tu-background), 1);
		}
	}
}
</style>
