<template>
	<div class="flex editor-wrapper" :style="{
		width: width
	}">
		<div v-if="editor" class="flex editor-header">
			<tu-button title="Bold" color="gray" circle border v-if="bold || standard" :active="editor.isActive('bold')"
				@click="editor.chain().focus().toggleBold().run()"
				:disabled="!editor.can().chain().focus().toggleBold().run()"
				:class="{ 'is-active': editor.isActive('bold') }">
				<tu-icon size="1rem">format_bold</tu-icon>
			</tu-button>
			<tu-button title="Italics" circle border v-if="italics || standard" :active="editor.isActive('italic')"
				@click="editor.chain().focus().toggleItalic().run()"
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
				:class="{ 'is-active': editor.isActive('italic') }">
				<tu-icon size="1rem">format_italic</tu-icon>
			</tu-button>
			<tu-button title="Underline" circle border v-if="underline || standard"
				:active="editor.isActive('underline')" @click="editor.chain().focus().toggleUnderline().run()"
				:disabled="
					!editor.can().chain().focus().toggleUnderline().run()
				" :class="{ 'is-active': editor.isActive('underline') }">
				<tu-icon size="1rem">format_underline</tu-icon>
			</tu-button>
			<tu-button title="Strike-through" circle border v-if="strikeThrough || standard"
				:active="editor.isActive('strike')" @click="editor.chain().focus().toggleStrike().run()"
				:disabled="!editor.can().chain().focus().toggleStrike().run()"
				:class="{ 'is-active': editor.isActive('strike') }">
				<tu-icon size="1rem">format_strikethrough</tu-icon>
			</tu-button>
			<tu-button-group v-if="textAlignment || standard">
				<tu-button circle border title="Left Align" :active="editor.isActive({ textAlign: 'left' })"
					@click="editor.chain().focus().setTextAlign('left').run()" :class="{
						'is-active': editor.isActive({ textAlign: 'left' })
					}">
					<tu-icon size="1rem">format_align_left</tu-icon>
				</tu-button>
				<tu-button circle border title="Center Align" :active="editor.isActive({ textAlign: 'center' })"
					@click="editor.chain().focus().setTextAlign('center').run()" :class="{
						'is-active': editor.isActive({ textAlign: 'center' })
					}">
					<tu-icon size="1rem">format_align_center</tu-icon>
				</tu-button>
				<tu-button circle border title="Right Align" :active="editor.isActive({ textAlign: 'right' })"
					@click="editor.chain().focus().setTextAlign('right').run()" :class="{
						'is-active': editor.isActive({ textAlign: 'right' })
					}">
					<tu-icon size="1rem">format_align_right</tu-icon>
				</tu-button>
				<tu-button circle border title="Justify" :active="editor.isActive({ textAlign: 'justify' })" @click="
					editor.chain().focus().setTextAlign('justify').run()
				" :class="{
	'is-active': editor.isActive({ textAlign: 'justify' })
}">
					<tu-icon size="1rem">format_align_justify</tu-icon>
				</tu-button>
			</tu-button-group>
			<tu-button circle border v-if="code" title="Code" :active="editor.isActive('code')"
				@click="editor.chain().focus().toggleCode().run()"
				:disabled="!editor.can().chain().focus().toggleCode().run()"
				:class="{ 'is-active': editor.isActive('code') }">
				<tu-icon size="1rem">code</tu-icon>
			</tu-button>
			<!-- <tu-button
				class="bold padding"
				circle
				border
				size="0.5rem"
				:active="editor.isActive('paragraph')"
				@click="editor.chain().focus().setParagraph().run()"
				:class="{ 'is-active': editor.isActive('paragraph') }"
			>
				P
			</tu-button> -->
			<tu-button class="bold" circle border size="0.5rem" title="Heading 1" v-if="heading1 || standard"
				:active="editor.isActive('heading', { level: 1 })" @click="
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				" :class="{
	'is-active': editor.isActive('heading', { level: 1 })
}">
				H1
			</tu-button>
			<tu-button class="bold" circle border size="0.5rem" title="Heading 2" v-if="heading2 || standard"
				:active="editor.isActive('heading', { level: 2 })" @click="
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				" :class="{
	'is-active': editor.isActive('heading', { level: 2 })
}">
				H2
			</tu-button>
			<tu-button class="bold" circle border size="1rem" v-if="heading3" title="Heading 3"
				:active="editor.isActive('heading', { level: 3 })" @click="
					editor.chain().focus().toggleHeading({ level: 3 }).run()
				" :class="{
	'is-active': editor.isActive('heading', { level: 3 })
}">
				H3
			</tu-button>
			<tu-button class="bold" circle border size="1rem" v-if="heading4" title="Heading 4"
				:active="editor.isActive('heading', { level: 4 })" @click="
					editor.chain().focus().toggleHeading({ level: 4 }).run()
				" :class="{
	'is-active': editor.isActive('heading', { level: 4 })
}">
				H4
			</tu-button>
			<tu-button class="bold" circle border size="1rem" v-if="heading5" title="Heading 5"
				:active="editor.isActive('heading', { level: 5 })" @click="
					editor.chain().focus().toggleHeading({ level: 5 }).run()
				" :class="{
	'is-active': editor.isActive('heading', { level: 5 })
}">
				H5
			</tu-button>
			<tu-button class="bold" circle border size="1rem" v-if="heading6" title="Heading 6"
				:active="editor.isActive('heading', { level: 6 })" @click="
					editor.chain().focus().toggleHeading({ level: 6 }).run()
				" :class="{
	'is-active': editor.isActive('heading', { level: 6 })
}">
				H6
			</tu-button>
			<tu-button circle border title="Unordered List" v-if="unorderedList || standard"
				:active="editor.isActive('bulletList')" @click="editor.chain().focus().toggleBulletList().run()"
				:class="{ 'is-active': editor.isActive('bulletList') }">
				<tu-icon size="1rem">format_list_bulleted</tu-icon>
			</tu-button>
			<tu-button circle border title="Ordered List" v-if="orderedList || standard"
				:active="editor.isActive('orderedList')" @click="editor.chain().focus().toggleOrderedList().run()"
				:class="{ 'is-active': editor.isActive('orderedList') }">
				<tu-icon size="1rem">format_list_numbered</tu-icon>
			</tu-button>
			<tu-button circle border size="1rem" v-if="codeBlock" title="Code Block"
				:active="editor.isActive('codeBlock')" @click="editor.chain().focus().toggleCodeBlock().run()"
				:class="{ 'is-active': editor.isActive('codeBlock') }">
				Code block
			</tu-button>
			<tu-button circle border v-if="blockQuote" title="Block Quote" :active="editor.isActive('blockquote')"
				@click="editor.chain().focus().toggleBlockquote().run()"
				:class="{ 'is-active': editor.isActive('blockquote') }">
				<tu-icon size="1rem">format_quote</tu-icon>
			</tu-button>
			<tu-button circle border v-if="horizontalRule" title="Horizontal Rule"
				@click="editor.chain().focus().setHorizontalRule().run()">
				<tu-icon size="1rem">horizontal_rule</tu-icon>
			</tu-button>
			<tu-button circle border v-if="undo" title="Undo" @click="editor.chain().focus().undo().run()"
				:disabled="!editor.can().chain().focus().undo().run()">
				<tu-icon size="1rem">undo</tu-icon>
			</tu-button>
			<tu-button circle border v-if="redo" title="Redo" @click="editor.chain().focus().redo().run()"
				:disabled="!editor.can().chain().focus().redo().run()">
				<tu-icon size="1rem">redo</tu-icon>
			</tu-button>
		</div>
		<editor-content :editor="editor" v-model="content" />
	</div>
</template>

<script lang="ts">
import { ref, onMounted, watch, Ref, defineComponent } from "vue";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { tuButtonGroup } from "../tuButton";
import tuComponent from "../tuComponent";

export default defineComponent({
	components: {
		EditorContent,
		tuButtonGroup
	},
	name: "TuRichTextEditor",
	extends: tuComponent,
	props: {
		standard: {
			type: Boolean,
			default: false
		},
		bold: {
			type: Boolean,
			default: false
		},
		italics: {
			type: Boolean,
			default: false
		},
		underline: {
			type: Boolean,
			default: false
		},
		strikeThrough: {
			type: Boolean,
			default: false
		},
		code: {
			type: Boolean,
			default: false
		},
		heading1: {
			type: Boolean,
			default: false
		},
		heading2: {
			type: Boolean,
			default: false
		},
		heading3: {
			type: Boolean,
			default: false
		},
		heading4: {
			type: Boolean,
			default: false
		},
		heading5: {
			type: Boolean,
			default: false
		},
		heading6: {
			type: Boolean,
			default: false
		},
		unorderedList: {
			type: Boolean,
			default: false
		},
		orderedList: {
			type: Boolean,
			default: false
		},
		codeBlock: {
			type: Boolean,
			default: false
		},
		textAlignment: {
			type: Boolean,
			default: false
		},
		blockQuote: {
			type: Boolean,
			default: false
		},
		horizontalRule: {
			type: Boolean,
			default: false
		},
		undo: {
			type: Boolean,
			default: false
		},
		redo: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: "unset"
		},
		height: {
			type: String,
			default: "unset"
		},
		modelValue: {
			type: String,
			default: ""
		}
	},

	emits: ["update:modelValue"],

	setup(props, context) {
		const editor: Ref<Editor> = ref(null);
		const content = ref(null);
		const editorComponent = ref<HTMLDivElement>();

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
					context.emit("update:modelValue", editor.value.getHTML());
					// JSON
					// this.$emit('update:modelValue', this.editor.getJSON())
				}
			});

			if (editor.value.view && editor.value.view.dom) {
				// editor.value.view.dom.style.width = props.width;
				editor.value.view.dom.style.height = props.height;
			}
		});

		watch(
			() => props.modelValue,
			(value: string) => {
				// HTML
				const isSame = editor.value.getHTML() === value;

				// JSON
				// const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

				if (isSame) return;

				editor.value.commands.setContent(value, false);
			}
		);

		return { editor, content, editorComponent };
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

.ProseMirror {
	border: 2px solid -getColorAlpha("text", 0.1);
	background: rgba(var(--tu-gray-2), 1);
	color: rgba(var(--tu-text), 1);
	padding: 7px 13px;
	border-radius: inherit;
	transition: all 0.25s ease;
	padding-left: 10px;
	min-height: 100px;
	overflow: auto;
}

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
		border-left: 2px solid -getColor("text");
	}

	hr {
		border: none;
		border-top: 2px solid -getColor("text");
		margin: 2rem 0;
	}
}

.bold {
	font-weight: bold;
	font-size: 1rem;
}

.editor-header.flex {
	display: flex;
	flex-wrap: wrap;
	border-left: 2px solid -getColorAlpha("text", 0.1);
	border-right: 2px solid -getColorAlpha("text", 0.1);
	border-top: 2px solid -getColorAlpha("text", 0.1);
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
}

.editor-wrapper.flex {
	margin: 5px;
	padding: 5px;
	display: flex;
	flex-direction: column;
	width: auto;
}
</style>
