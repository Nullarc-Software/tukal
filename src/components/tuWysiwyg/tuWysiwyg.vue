<template>
<div class="flex editor-wrapper">
	<div v-if="editor" class="flex editor-header">
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().toggleBold().run()"
			:disabled="!editor.can().chain().focus().toggleBold().run()"
			:class="{ 'is-active': editor.isActive('bold') }"
		>
			<tu-icon size="0.8rem">format_bold</tu-icon>
		</tu-button>
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().toggleItalic().run()"
			:disabled="!editor.can().chain().focus().toggleItalic().run()"
			:class="{ 'is-active': editor.isActive('italic') }"
		>
			<tu-icon size="0.8rem">format_italic</tu-icon>
		</tu-button>
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().toggleStrike().run()"
			:disabled="!editor.can().chain().focus().toggleStrike().run()"
			:class="{ 'is-active': editor.isActive('strike') }"
		>
			<tu-icon size="0.8rem">format_strikethrough</tu-icon>
		</tu-button>
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().toggleCode().run()"
			:disabled="!editor.can().chain().focus().toggleCode().run()"
			:class="{ 'is-active': editor.isActive('code') }"
		>
			<tu-icon size="0.8rem">code</tu-icon>
		</tu-button>
		<tu-button
			class="bold padding"
			circle
			transparent
			size="0.5rem"
			@click="editor.chain().focus().setParagraph().run()"
			:class="{ 'is-active': editor.isActive('paragraph') }"
		>
			P
		</tu-button>
		<tu-button
			class="bold"
			circle
			transparent
			size="0.5rem"
			@click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
		>
			H1
		</tu-button>
		<tu-button
			class="bold"
			circle
			transparent
			size="0.5rem"
			@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
		>
			H2
		</tu-button>
		<tu-button
			class="bold"
			circle
			transparent
			size="0.8rem"
			@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
		>
			H3
		</tu-button>
		<tu-button
			class="bold"
			circle
			transparent
			size="0.8rem"
			@click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
		>
			H4
		</tu-button>
		<tu-button
			class="bold"
			circle
			transparent
			size="0.8rem"
			@click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
		>
			H5
		</tu-button>
		<tu-button
			class="bold"
			circle
			transparent
			size="0.8rem"
			@click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
		>
			H6
		</tu-button>
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().toggleBulletList().run()"
			:class="{ 'is-active': editor.isActive('bulletList') }"
		>
			<tu-icon size="0.8rem">format_list_bulleted</tu-icon>
		</tu-button>
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().toggleOrderedList().run()"
			:class="{ 'is-active': editor.isActive('orderedList') }"
		>
			<tu-icon size="0.8rem">format_list_numbered</tu-icon>
		</tu-button>
		<tu-button
			circle
			transparent
			size="0.8rem"
			@click="editor.chain().focus().toggleCodeBlock().run()"
			:class="{ 'is-active': editor.isActive('codeBlock') }"
		>
			code block
		</tu-button>
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().toggleBlockquote().run()"
			:class="{ 'is-active': editor.isActive('blockquote') }"
		>
			<tu-icon size="0.8rem">format_quote</tu-icon>
		</tu-button>
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().setHorizontalRule().run()"
		>
			<tu-icon size="0.8rem">horizontal_rule</tu-icon>
		</tu-button>
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().undo().run()"
			:disabled="!editor.can().chain().focus().undo().run()"
		>
			<tu-icon size="0.8rem">undo</tu-icon>
		</tu-button>
		<tu-button
			circle
			transparent
			@click="editor.chain().focus().redo().run()"
			:disabled="!editor.can().chain().focus().redo().run()"
		>
			<tu-icon size="0.8rem">redo</tu-icon>
		</tu-button>
	</div>
		<div><editor-content :editor="editor" v-model="content" /></div>
	</div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

export default {
	components: {
		EditorContent
	},

	props: {
		modelValue: {
			type: String,
			default: ""
		}
	},

	emits: ["update:modelValue"],

	setup (props, context) {
		const editor = ref(null);
		const content = ref(null);

		onMounted(() => {
			editor.value = new Editor({
				extensions: [StarterKit],
				content: "",
				onUpdate: () => {
					// HTML
					context.emit("update:modelValue", editor.value.getHTML());
					console.log(editor.value.getHTML());
					// JSON
					// this.$emit('update:modelValue', this.editor.getJSON())
				}
			});
		});

		watch(props.modelValue, (value) => {
			// HTML
			const isSame = editor.value.getHTML() === value;

			// JSON
			// const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

			if (isSame) return;

			editor.value.commands.setContent(value, false);
		});

		return { editor, content };
	}
};
</script>

<style lang="scss">
.ProseMirror {
	border: 2px solid transparent;
	background: rgba(var(--tu-gray-2), 1);
	color: rgba(var(--tu-text), 1);
	padding: 7px 13px;
	border-radius: inherit;
	transition: all 0.25s ease;
	padding-left: 10px;
	min-height: 100px;
}
/* Basic editor styles */
.ProseMirror {
	> * + * {
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
			font-size: 0.8rem;
		}
	}

	img {
		max-width: 100%;
		height: auto;
	}

	blockquote {
		padding-left: 1rem;
		border-left: 2px solid rgba(#0d0d0d, 0.1);
	}

	hr {
		border: none;
		border-top: 2px solid rgba(#0d0d0d, 0.1);
		margin: 2rem 0;
	}
}
.bold {
	font-weight: bold;
	font-size: 0.8rem;
}

.editor-header.flex {
	display: flex;
	flex-wrap: wrap;
}
.editor-wrapper.flex {
	margin: 5px;
	padding: 5px;
	display: flex;
	flex-direction: column;
	width: auto;
}
</style>
