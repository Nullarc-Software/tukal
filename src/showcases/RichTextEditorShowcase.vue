<template>
	<div class="showcase-component">
		<h3>Rich Text Editor:</h3>
		<hr />
		
		<!-- Basic Editor -->
		<div style="margin: 20px 0;">
			<h4>Basic Rich Text Editor:</h4>
			<TuRichTextEditor 
				code
				horizontal-rule
				heading3
				heading4
				heading5
				heading6
				undo
				redo
				block-quote
				ordered-list
				bullet-list
				link
				image
				bold
				italic
				underline
				strikethrough
				clear-format
				v-model="basicContent" 
				placeholder="Start typing your content here..."
				height="200"
			/>
			<p style="margin-top: 10px; font-size: 14px;">
				Content length: {{ basicContent.length }} characters
			</p>
		</div>

		<!-- Editor with Custom Toolbar -->
		<div style="margin: 20px 0;">
			<h4>Custom Toolbar:</h4>
			<TuRichTextEditor 
				v-model="customContent" 
				:toolbar="customToolbar"
				height="250"
				placeholder="Rich editor with custom toolbar..."
			/>
		</div>

		<!-- Minimal Editor -->
		<div style="margin: 20px 0;">
			<h4>Minimal Editor:</h4>
			<TuRichTextEditor 
				v-model="minimalContent" 
				:toolbar="minimalToolbar"
				height="150"
				placeholder="Simple editor for basic formatting..."
			/>
		</div>

		<!-- Email Composer -->
		<div style="margin: 20px 0;">
			<h4>Email Composer:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #f8f9fa;">
				<h5>Compose Email</h5>
				<div style="margin: 15px 0;">
					<TuInput v-model="emailData.to" label="To" placeholder="recipient@example.com" />
				</div>
				<div style="margin: 15px 0;">
					<TuInput v-model="emailData.subject" label="Subject" placeholder="Email subject" />
				</div>
				<div style="margin: 15px 0;">
					<label style="display: block; margin-bottom: 8px; font-weight: 500;">Message:</label>
					<TuRichTextEditor 
						v-model="emailData.body" 
						:toolbar="emailToolbar"
						height="300"
						placeholder="Write your email message..."
					/>
				</div>
				<div style="margin-top: 20px; display: flex; gap: 10px;">
					<TuButton @click="sendEmail" color="primary">Send Email</TuButton>
					<TuButton @click="saveDraft">Save Draft</TuButton>
					<TuButton @click="clearEmail" color="danger" outline>Clear</TuButton>
				</div>
			</div>
		</div>

		<!-- Blog Post Editor -->
		<div style="margin: 20px 0;">
			<h4>Blog Post Editor:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #f8f9fa;">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
					<h5>Write New Post</h5>
					<div style="display: flex; gap: 10px;">
						<TuChip :color="getStatusColor(blogPost.status)" size="sm">{{ blogPost.status }}</TuChip>
						<TuButton @click="togglePreview" size="sm" :color="showPreview ? 'success' : 'primary'">
							{{ showPreview ? 'Edit' : 'Preview' }}
						</TuButton>
					</div>
				</div>
				
				<div v-if="!showPreview">
					<div style="margin: 15px 0;">
						<TuInput v-model="blogPost.title" label="Post Title" placeholder="Enter your blog post title" />
					</div>
					
					<div style="margin: 15px 0;">
						<TuInput v-model="blogPost.slug" label="URL Slug" placeholder="post-url-slug" />
					</div>
					
					<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
						<TuSelect v-model="blogPost.category" label="Category" :select-items="blogCategories" />
						<TuInput v-model="blogPost.tags" label="Tags" placeholder="tag1, tag2, tag3" />
					</div>
					
					<div style="margin: 15px 0;">
						<label style="display: block; margin-bottom: 8px; font-weight: 500;">Content:</label>
						<TuRichTextEditor 
							v-model="blogPost.content" 
							:toolbar="blogToolbar"
							height="400"
							placeholder="Write your blog post content..."
						/>
					</div>
					
					<div style="margin: 15px 0;">
						<TuInput v-model="blogPost.excerpt" label="Excerpt" placeholder="Brief description of your post" type="textarea" />
					</div>
				</div>
				
				<div v-else class="blog-preview">
					<h1>{{ blogPost.title || 'Untitled Post' }}</h1>
					<div class="meta-info">
						<span>Category: {{ blogPost.category || 'Uncategorized' }}</span>
						<span v-if="blogPost.tags">Tags: {{ blogPost.tags }}</span>
					</div>
					<div class="content" v-html="blogPost.content || '<p>No content yet...</p>'"></div>
				</div>
				
				<div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
					<div style="display: flex; gap: 10px;">
						<TuButton @click="saveBlogPost" color="success">Save</TuButton>
						<TuButton @click="publishBlogPost" color="primary" :disabled="!canPublish">Publish</TuButton>
						<TuButton @click="saveDraftBlogPost">Save as Draft</TuButton>
					</div>
					
					<div style="font-size: 14px; color: #666;">
						Last saved: {{ lastSaved || 'Never' }}
					</div>
				</div>
			</div>
		</div>

		<!-- Document Editor -->
		<div style="margin: 20px 0;">
			<h4>Document Editor:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #f8f9fa;">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
					<h5>{{ documentData.title || 'Untitled Document' }}</h5>
					<div style="display: flex; gap: 10px; align-items: center;">
						<span style="font-size: 14px; color: #666;">{{ getWordCount(documentData.content) }} words</span>
						<TuButton @click="exportDocument" size="sm" color="primary">Export</TuButton>
						<TuButton @click="shareDocument" size="sm" color="success">Share</TuButton>
					</div>
				</div>
				
				<div style="margin: 15px 0;">
					<TuInput v-model="documentData.title" placeholder="Document title" style="font-size: 18px; font-weight: bold;" />
				</div>
				
				<TuRichTextEditor 
					v-model="documentData.content" 
					:toolbar="documentToolbar"
					height="350"
					placeholder="Start writing your document..."
					@change="onDocumentChange"
				/>
				
				<div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid #dee2e6;">
					<div style="display: flex; gap: 15px; font-size: 14px; color: #666;">
						<span>Characters: {{ documentData.content.length }}</span>
						<span>Words: {{ getWordCount(documentData.content) }}</span>
						<span>Paragraphs: {{ getParagraphCount(documentData.content) }}</span>
					</div>
					
					<div style="display: flex; gap: 10px;">
						<TuButton @click="saveDocument" size="sm" color="primary" :disabled="!documentChanged">
							{{ documentChanged ? 'Save Changes' : 'Saved' }}
						</TuButton>
					</div>
				</div>
			</div>
		</div>

		<!-- Comment System -->
		<div style="margin: 20px 0;">
			<h4>Comment System:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #f8f9fa;">
				<h5>Comments ({{ comments.length }})</h5>
				
				<!-- Existing Comments -->
				<div style="margin: 20px 0;">
					<div 
						v-for="comment in comments" 
						:key="comment.id"
						style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px; border-left: 4px solid #007bff;"
					>
						<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
							<div style="display: flex; align-items: center; gap: 10px;">
								<TuAvatar :src="comment.avatar" size="sm" />
								<div>
									<strong>{{ comment.author }}</strong>
									<div style="font-size: 12px; color: #666;">{{ formatCommentDate(comment.date) }}</div>
								</div>
							</div>
							<div style="display: flex; gap: 5px;">
								<TuButton @click="replyToComment(comment.id)" size="xs">Reply</TuButton>
								<TuButton @click="editComment(comment.id)" size="xs" color="warn">Edit</TuButton>
								<TuButton @click="deleteComment(comment.id)" size="xs" color="danger">Delete</TuButton>
							</div>
						</div>
						
						<div v-html="comment.content" style="margin: 10px 0; line-height: 1.6;"></div>
						
						<div v-if="comment.replies && comment.replies.length > 0" style="margin-top: 15px; padding-left: 20px; border-left: 2px solid #e9ecef;">
							<div 
								v-for="reply in comment.replies" 
								:key="reply.id"
								style="background: #f8f9fa; border-radius: 6px; padding: 10px; margin-bottom: 10px;"
							>
								<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
									<div style="display: flex; align-items: center; gap: 8px;">
										<TuAvatar :src="reply.avatar" size="xs" />
										<strong style="font-size: 14px;">{{ reply.author }}</strong>
										<span style="font-size: 12px; color: #666;">{{ formatCommentDate(reply.date) }}</span>
									</div>
								</div>
								<div v-html="reply.content" style="font-size: 14px; line-height: 1.5;"></div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Add New Comment -->
				<div style="background: white; border-radius: 8px; padding: 15px;">
					<h6>Add a Comment</h6>
					<TuRichTextEditor 
						v-model="newComment" 
						:toolbar="commentToolbar"
						height="150"
						placeholder="Write your comment..."
					/>
					<div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
						<div style="display: flex; align-items: center; gap: 10px;">
							<TuAvatar size="sm" />
							<span style="font-weight: 500;">Current User</span>
						</div>
						<div style="display: flex; gap: 10px;">
							<TuButton @click="previewComment" size="sm" outline>Preview</TuButton>
							<TuButton @click="addComment" size="sm" color="primary" :disabled="!newComment.trim()">
								Post Comment
							</TuButton>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Content Preview -->
		<div style="margin: 20px 0;">
			<h4>Content Outputs:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
				<div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
					<h6>Basic Content (Raw HTML):</h6>
					<pre style="font-size: 12px; background: white; padding: 10px; border-radius: 4px; overflow-x: auto; max-height: 200px;">{{ basicContent }}</pre>
				</div>
				
				<div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
					<h6>Basic Content (Rendered):</h6>
					<div v-html="basicContent" style="background: white; padding: 10px; border-radius: 4px; min-height: 100px; max-height: 200px; overflow-y: auto;"></div>
				</div>
			</div>
		</div>

		<!-- Editor Statistics -->
		<div style="margin: 20px 0;">
			<h4>Editor Statistics:</h4>
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
				<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
					<div style="font-size: 24px; font-weight: bold; color: #007bff;">{{ getWordCount(basicContent) }}</div>
					<div style="font-size: 14px; color: #666;">Words (Basic)</div>
				</div>
				
				<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
					<div style="font-size: 24px; font-weight: bold; color: #28a745;">{{ emailData.body.length }}</div>
					<div style="font-size: 14px; color: #666;">Email Characters</div>
				</div>
				
				<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
					<div style="font-size: 24px; font-weight: bold; color: #ffc107;">{{ getWordCount(blogPost.content) }}</div>
					<div style="font-size: 14px; color: #666;">Blog Words</div>
				</div>
				
				<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
					<div style="font-size: 24px; font-weight: bold; color: #17a2b8;">{{ comments.length }}</div>
					<div style="font-size: 14px; color: #666;">Comments</div>
				</div>
			</div>
		</div>

		<!-- Current State -->
		<div style="margin: 20px 0;">
			<h4>Current State:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Blog Post Status:</strong> {{ blogPost.status }}</p>
				<p><strong>Blog Post Category:</strong> {{ blogPost.category || 'None' }}</p>
				<p><strong>Document Changed:</strong> {{ documentChanged }}</p>
				<p><strong>Show Preview:</strong> {{ showPreview }}</p>
				<p><strong>Email Recipient:</strong> {{ emailData.to || 'None' }}</p>
				<p><strong>New Comment Length:</strong> {{ newComment.length }} characters</p>
				<p><strong>Last Saved:</strong> {{ lastSaved || 'Never' }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { TuButton } from "../components/tuButton";
import { TuChip } from "../components/tuChip";
import { TuInput } from "../components/tuInput";
import { TuAvatar } from "../components/tuAvatar";
import { TuSelect } from "../components/tuSelect";
import { TuRichTextEditor } from "@/components/tuRichTextEditor";
// Basic content
const basicContent = ref("<p>Welcome to the <strong>rich text editor</strong>! You can format your text with <em>italics</em>, <strong>bold</strong>, and much more.</p>");

// Custom content
const customContent = ref("<h2>Custom Toolbar Demo</h2><p>This editor has a custom set of toolbar options for specific use cases.</p>");

// Minimal content
const minimalContent = ref("<p>Simple editor with basic formatting options.</p>");

// Email data
const emailData = ref({
	to: "",
	subject: "",
	body: "<p>Dear [Recipient],</p><p>I hope this email finds you well.</p><p>Best regards,<br>Your Name</p>"
});

// Blog post data
const blogPost = ref({
	title: "",
	slug: "",
	category: "",
	tags: "",
	content: "<h1>Your Blog Post Title</h1><p>Start writing your amazing blog post content here...</p>",
	excerpt: "",
	status: "draft"
});

const blogCategories = ref([
	{ label: "Technology", value: "technology" },
	{ label: "Business", value: "business" },
	{ label: "Lifestyle", value: "lifestyle" },
	{ label: "Education", value: "education" },
	{ label: "Travel", value: "travel" }
]);

// Document data
const documentData = ref({
	title: "Project Proposal",
	content: "<h1>Executive Summary</h1><p>This document outlines our project proposal for the upcoming quarter...</p>"
});

const documentChanged = ref(false);
const showPreview = ref(false);
const lastSaved = ref("");

// Comments
const comments = ref([
	{
		id: 1,
		author: "John Doe",
		avatar: "/avatars/john.jpg",
		date: new Date(Date.now() - 3600000),
		content: "<p>Great article! I especially liked the section about <strong>performance optimization</strong>.</p>",
		replies: [
			{
				id: 11,
				author: "Jane Smith",
				avatar: "/avatars/jane.jpg", 
				date: new Date(Date.now() - 1800000),
				content: "<p>I agree! The performance tips were very helpful.</p>"
			}
		]
	},
	{
		id: 2,
		author: "Mike Johnson",
		avatar: "/avatars/mike.jpg",
		date: new Date(Date.now() - 7200000),
		content: "<p>Could you provide more examples of the implementation? It would be really helpful.</p>",
		replies: []
	}
]);

const newComment = ref("");

// Toolbar configurations
const customToolbar = ref([
	"bold", "italic", "underline", "|",
	"h1", "h2", "h3", "|", 
	"bulletList", "orderedList", "|",
	"link", "image", "|",
	"undo", "redo"
]);

const minimalToolbar = ref([
	"bold", "italic", "|",
	"bulletList", "|", 
	"link"
]);

const emailToolbar = ref([
	"bold", "italic", "underline", "|",
	"bulletList", "orderedList", "|",
	"link", "image", "|",
	"textColor", "backgroundColor", "|",
	"align", "|",
	"undo", "redo"
]);

const blogToolbar = ref([
	"bold", "italic", "underline", "strike", "|",
	"h1", "h2", "h3", "h4", "|",
	"bulletList", "orderedList", "blockquote", "|",
	"link", "image", "video", "|",
	"textColor", "backgroundColor", "|",
	"align", "|",
	"table", "horizontalRule", "|",
	"code", "codeBlock", "|",
	"undo", "redo", "|",
	"fullscreen"
]);

const documentToolbar = ref([
	"bold", "italic", "underline", "|",
	"h1", "h2", "h3", "|",
	"bulletList", "orderedList", "blockquote", "|",
	"link", "image", "table", "|",
	"textColor", "backgroundColor", "|",
	"align", "|",
	"horizontalRule", "|",
	"undo", "redo"
]);

const commentToolbar = ref([
	"bold", "italic", "|",
	"bulletList", "|",
	"link", "|",
	"undo", "redo"
]);

// Computed properties
const canPublish = computed(() => {
	return blogPost.value.title && blogPost.value.content && blogPost.value.category;
});

// Methods
const sendEmail = () => {
	if (!emailData.value.to || !emailData.value.subject) {
		alert("Please fill in recipient and subject fields");
		return;
	}
	
	console.log("Sending email:", emailData.value);
	alert("Email sent successfully!");
	
	// Clear form
	emailData.value = {
		to: "",
		subject: "",
		body: "<p>Dear [Recipient],</p><p>I hope this email finds you well.</p><p>Best regards,<br>Your Name</p>"
	};
};

const saveDraft = () => {
	console.log("Saving email draft:", emailData.value);
	alert("Email draft saved!");
};

const clearEmail = () => {
	if (confirm("Clear all email content?")) {
		emailData.value = {
			to: "",
			subject: "",
			body: ""
		};
	}
};

const togglePreview = () => {
	showPreview.value = !showPreview.value;
};

const getStatusColor = (status: string): string => {
	const colors = {
		draft: "warning",
		published: "success",
		scheduled: "info",
		archived: "secondary"
	};
	return colors[status as keyof typeof colors] || "default";
};

const saveBlogPost = () => {
	console.log("Saving blog post:", blogPost.value);
	lastSaved.value = new Date().toLocaleTimeString();
	alert("Blog post saved!");
};

const publishBlogPost = () => {
	if (!canPublish.value) {
		alert("Please fill in all required fields before publishing");
		return;
	}
	
	blogPost.value.status = "published";
	console.log("Publishing blog post:", blogPost.value);
	lastSaved.value = new Date().toLocaleTimeString();
	alert("Blog post published successfully!");
};

const saveDraftBlogPost = () => {
	blogPost.value.status = "draft";
	saveBlogPost();
};

const getWordCount = (content: string): number => {
	const textContent = content.replace(/<[^>]*>/g, "");
	return textContent.trim().split(/\s+/).filter(word => word.length > 0).length;
};

const getParagraphCount = (content: string): number => {
	const paragraphs = content.split(/<\/p>|<br\s*\/?>/i);
	return paragraphs.filter(p => p.trim().length > 0).length;
};

const onDocumentChange = () => {
	documentChanged.value = true;
};

const saveDocument = () => {
	console.log("Saving document:", documentData.value);
	documentChanged.value = false;
	lastSaved.value = new Date().toLocaleTimeString();
	alert("Document saved!");
};

const exportDocument = () => {
	const content = `# ${documentData.value.title}\n\n${documentData.value.content}`;
	console.log("Exporting document:", content);
	alert("Document exported! (Would download file in real implementation)");
};

const shareDocument = () => {
	console.log("Sharing document:", documentData.value);
	alert("Share link copied to clipboard!");
};

const formatCommentDate = (date: Date): string => {
	const now = new Date();
	const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
	
	if (diffInMinutes < 1) return "Just now";
	if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
	if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
	return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

const addComment = () => {
	if (!newComment.value.trim()) return;
	
	const comment = {
		id: Date.now(),
		author: "Current User",
		avatar: "/avatars/current.jpg",
		date: new Date(),
		content: newComment.value,
		replies: []
	};
	
	comments.value.unshift(comment);
	newComment.value = "";
	alert("Comment added successfully!");
};

const replyToComment = (commentId: number) => {
	console.log("Replying to comment:", commentId);
	alert("Reply feature would open here");
};

const editComment = (commentId: number) => {
	console.log("Editing comment:", commentId);
	alert("Edit comment feature would open here");
};

const deleteComment = (commentId: number) => {
	if (confirm("Delete this comment?")) {
		const index = comments.value.findIndex(c => c.id === commentId);
		if (index > -1) {
			comments.value.splice(index, 1);
		}
	}
};

const previewComment = () => {
	if (!newComment.value.trim()) {
		alert("Please write a comment first");
		return;
	}
	
	alert("Comment preview would open here");
};
</script>

<style scoped>
.blog-preview {
	background: white;
	padding: 30px;
	border-radius: 8px;
	border: 1px solid #ddd;
}

.blog-preview h1 {
	margin-top: 0;
	margin-bottom: 20px;
	color: #2c3e50;
}

.meta-info {
	display: flex;
	gap: 20px;
	margin-bottom: 30px;
	padding-bottom: 15px;
	border-bottom: 1px solid #eee;
	font-size: 14px;
	color: #666;
}

.content {
	line-height: 1.7;
}

.content h1, .content h2, .content h3 {
	margin-top: 30px;
	margin-bottom: 15px;
	color: #2c3e50;
}

.content h1 {
	font-size: 28px;
}

.content h2 {
	font-size: 24px;
}

.content h3 {
	font-size: 20px;
}

.content p {
	margin-bottom: 15px;
}

.content ul, .content ol {
	margin: 15px 0;
	padding-left: 30px;
}

.content blockquote {
	margin: 20px 0;
	padding: 15px 20px;
	background: #f8f9fa;
	border-left: 4px solid #007bff;
	font-style: italic;
}

.content img {
	max-width: 100%;
	height: auto;
	border-radius: 4px;
	margin: 15px 0;
}

.content pre {
	background: #f8f9fa;
	padding: 15px;
	border-radius: 4px;
	overflow-x: auto;
	font-family: 'Courier New', monospace;
	margin: 15px 0;
}

.content code {
	background: #f8f9fa;
	padding: 2px 6px;
	border-radius: 3px;
	font-family: 'Courier New', monospace;
	font-size: 90%;
}
</style>
