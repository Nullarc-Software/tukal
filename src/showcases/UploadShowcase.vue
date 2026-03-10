<template>
	<div class="showcase-component">
		<h3>Upload:</h3>
		<hr />
		
		<!-- Basic Upload -->
		<div style="margin: 20px 0;">
			<h4>Basic Upload:</h4>
			<tu-upload v-model="basicFiles" @change="onBasicUpload">
				<TuButton>Choose Files</TuButton>
			</tu-upload>
			<div v-if="basicFiles.length > 0" style="margin-top: 15px;">
				<h5>Selected Files:</h5>
				<div v-for="file in basicFiles" :key="file.name" style="padding: 8px; border: 1px solid #eee; margin: 5px 0; border-radius: 4px;">
					{{ file.name }} ({{ formatFileSize(file.size) }})
				</div>
			</div>
		</div>

		<!-- Drag and Drop Upload -->
		<div style="margin: 20px 0;">
			<h4>Drag & Drop Upload:</h4>
			<tu-upload v-model="dragDropFiles" drag-drop @change="onDragDropUpload">
				<div style="padding: 40px; text-align: center; border: 2px dashed #ccc; border-radius: 8px;">
					<tu-icon style="font-size: 48px; color: #999; margin-bottom: 10px;">cloud_upload</tu-icon>
					<p>Drag files here or click to browse</p>
					<p style="font-size: 12px; color: #666;">Supports multiple files</p>
				</div>
			</tu-upload>
			<div v-if="dragDropFiles.length > 0" style="margin-top: 15px;">
				<div v-for="file in dragDropFiles" :key="file.name" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid #eee; margin: 5px 0; border-radius: 4px;">
					<div>
						<strong>{{ file.name }}</strong>
						<div style="font-size: 12px; color: #666;">{{ formatFileSize(file.size) }} • {{ file.type || 'Unknown type' }}</div>
					</div>
					<TuButton @click="removeFile(dragDropFiles, file.name)" size="xs" color="danger">Remove</TuButton>
				</div>
			</div>
		</div>

		<!-- Image Upload with Preview -->
		<div style="margin: 20px 0;">
			<h4>Image Upload with Preview:</h4>
			<tu-upload v-model="imageFiles" accept="image/*" @change="onImageUpload">
				<div style="padding: 20px; text-align: center; border: 2px dashed #007bff; border-radius: 8px; background: #f8f9ff;">
					<tu-icon style="font-size: 32px; color: #007bff; margin-bottom: 10px;">image</tu-icon>
					<p>Upload Images</p>
					<p style="font-size: 12px; color: #666;">JPG, PNG, GIF up to 10MB</p>
				</div>
			</tu-upload>
			<div v-if="imagePreviews.length > 0" style="margin-top: 15px;">
				<h5>Image Previews:</h5>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
					<div v-for="preview in imagePreviews" :key="preview.name" style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
						<img :src="preview.url" :alt="preview.name" style="width: 100%; height: 120px; object-fit: cover;" />
						<div style="padding: 8px;">
							<div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">{{ preview.name }}</div>
							<div style="font-size: 10px; color: #666;">{{ formatFileSize(preview.size) }}</div>
							<TuButton @click="removeImagePreview(preview.name)" size="xs" color="danger" style="margin-top: 5px;">Remove</TuButton>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Multiple File Types -->
		<div style="margin: 20px 0;">
			<h4>Document Upload:</h4>
			<tu-upload v-model="documentFiles" accept=".pdf,.doc,.docx,.txt,.xlsx" multiple @change="onDocumentUpload">
				<div style="padding: 30px; text-align: center; border: 2px dashed #28a745; border-radius: 8px; background: #f8fff8;">
					<tu-icon style="font-size: 32px; color: #28a745; margin-bottom: 10px;">description</tu-icon>
					<p>Upload Documents</p>
					<p style="font-size: 12px; color: #666;">PDF, DOC, DOCX, TXT, XLSX</p>
				</div>
			</tu-upload>
			<div v-if="documentFiles.length > 0" style="margin-top: 15px;">
				<div v-for="file in documentFiles" :key="file.name" style="display: flex; align-items: center; padding: 10px; border: 1px solid #eee; margin: 5px 0; border-radius: 4px;">
					<tu-icon style="margin-right: 10px; color: #666;">{{ getFileIcon(file.name) }}</tu-icon>
					<div style="flex: 1;">
						<div style="font-weight: bold;">{{ file.name }}</div>
						<div style="font-size: 12px; color: #666;">{{ formatFileSize(file.size) }}</div>
					</div>
					<TuButton @click="removeFile(documentFiles, file.name)" size="xs" color="danger">Remove</TuButton>
				</div>
			</div>
		</div>

		<!-- Upload with Progress -->
		<div style="margin: 20px 0;">
			<h4>Upload with Progress:</h4>
			<tu-upload v-model="progressFiles" @change="onProgressUpload">
				<TuButton :disabled="uploading">
					{{ uploading ? 'Uploading...' : 'Choose Files to Upload' }}
				</TuButton>
			</tu-upload>
			<div v-if="progressFiles.length > 0" style="margin-top: 15px;">
				<div v-for="file in progressFiles" :key="file.name" style="padding: 10px; border: 1px solid #eee; margin: 5px 0; border-radius: 4px;">
					<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
						<span>{{ file.name }}</span>
						<span>{{ uploadProgress[file.name] || 0 }}%</span>
					</div>
					<TuProgress :value="uploadProgress[file.name] || 0" :color="getProgressColor(uploadProgress[file.name] || 0)" />
				</div>
			</div>
			<div style="margin-top: 10px;">
				<TuButton @click="simulateUpload" :disabled="uploading || progressFiles.length === 0" color="primary">
					Start Upload
				</TuButton>
				<TuButton @click="cancelUpload" :disabled="!uploading" color="danger" style="margin-left: 10px;">
					Cancel Upload
				</TuButton>
			</div>
		</div>

		<!-- File Size Limit -->
		<div style="margin: 20px 0;">
			<h4>File Size Limit (Max 2MB):</h4>
			<tu-upload v-model="limitedFiles" :max-size="2048" @change="onLimitedUpload" @error="onUploadError">
				<div style="padding: 20px; text-align: center; border: 2px dashed #ffc107; border-radius: 8px; background: #fffbf0;">
					<tu-icon style="font-size: 32px; color: #ffc107; margin-bottom: 10px;">warning</tu-icon>
					<p>Upload Files (Max 2MB each)</p>
				</div>
			</tu-upload>
			<div v-if="uploadErrors.length > 0" style="margin-top: 10px;">
				<TuAlert v-for="error in uploadErrors" :key="error" color="danger" style="margin: 5px 0;">
					{{ error }}
				</TuAlert>
			</div>
			<div v-if="limitedFiles.length > 0" style="margin-top: 15px;">
				<div v-for="file in limitedFiles" :key="file.name" style="padding: 8px; border: 1px solid #eee; margin: 5px 0; border-radius: 4px;">
					{{ file.name }} ({{ formatFileSize(file.size) }})
				</div>
			</div>
		</div>

		<!-- Avatar Upload -->
		<div style="margin: 20px 0;">
			<h4>Avatar Upload:</h4>
			<div style="display: flex; align-items: center; gap: 20px;">
				<div>
					<TuAvatar :src="avatarUrl" :text="!avatarUrl ? 'U' : ''" size="80" />
				</div>
				<div>
					<tu-upload v-model="avatarFiles" accept="image/*" single @change="onAvatarUpload">
						<TuButton size="sm">Change Avatar</TuButton>
					</tu-upload>
					<p style="font-size: 12px; color: #666; margin-top: 5px;">
						Recommended: Square image, max 1MB
					</p>
					<TuButton v-if="avatarUrl" @click="removeAvatar" size="xs" color="danger" style="margin-top: 5px;">
						Remove Avatar
					</TuButton>
				</div>
			</div>
		</div>

		<!-- Bulk Upload Manager -->
		<div style="margin: 20px 0;">
			<h4>Bulk Upload Manager:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
					<h5>Upload Queue ({{ bulkFiles.length }} files)</h5>
					<div>
						<TuButton @click="clearAllFiles" size="sm" :disabled="bulkFiles.length === 0">Clear All</TuButton>
						<TuButton @click="uploadAllFiles" size="sm" color="primary" style="margin-left: 10px;" :disabled="bulkFiles.length === 0 || bulkUploading">
							{{ bulkUploading ? 'Uploading...' : 'Upload All' }}
						</TuButton>
					</div>
				</div>
				
				<tu-upload v-model="bulkFiles" multiple drag-drop @change="onBulkUpload">
					<div style="padding: 30px; text-align: center; border: 2px dashed #007bff; border-radius: 8px;">
						<tu-icon style="font-size: 48px; color: #007bff; margin-bottom: 10px;">cloud_upload</tu-icon>
						<p>Add files to upload queue</p>
						<p style="font-size: 12px; color: #666;">Drag & drop or click to browse</p>
					</div>
				</tu-upload>
				
				<div v-if="bulkFiles.length > 0" style="margin-top: 15px; max-height: 300px; overflow-y: auto;">
					<div v-for="(file, index) in bulkFiles" :key="file.name + index" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid #eee; margin: 5px 0; border-radius: 4px;">
						<div style="flex: 1;">
							<div style="font-weight: bold;">{{ file.name }}</div>
							<div style="font-size: 12px; color: #666;">{{ formatFileSize(file.size) }}</div>
						</div>
						<div style="display: flex; align-items: center; gap: 10px;">
							<TuChip :color="getUploadStatusColor(bulkUploadStatus[file.name])" size="sm">
								{{ bulkUploadStatus[file.name] || 'Pending' }}
							</TuChip>
							<TuButton @click="removeBulkFile(index)" size="xs" color="danger" :disabled="bulkUploading">
								Remove
							</TuButton>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic Files:</strong> {{ basicFiles.length }}</p>
				<p><strong>Drag Drop Files:</strong> {{ dragDropFiles.length }}</p>
				<p><strong>Image Files:</strong> {{ imageFiles.length }}</p>
				<p><strong>Document Files:</strong> {{ documentFiles.length }}</p>
				<p><strong>Progress Files:</strong> {{ progressFiles.length }}</p>
				<p><strong>Limited Files:</strong> {{ limitedFiles.length }}</p>
				<p><strong>Avatar Set:</strong> {{ !!avatarUrl }}</p>
				<p><strong>Bulk Files:</strong> {{ bulkFiles.length }}</p>
				<p><strong>Upload Errors:</strong> {{ uploadErrors.length }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import { TuButton } from "../components/tuButton";
import { TuProgress } from "../components/tuProgress";
import { TuChip } from "../components/tuChip";
import { TuAvatar } from "../components/tuAvatar";
import { TuAlert } from "../components/tuAlert";
import { TuUpload } from "../components/tuUpload";
// File arrays
const basicFiles = ref([]);
const dragDropFiles = ref([]);
const imageFiles = ref([]);
const documentFiles = ref([]);
const progressFiles = ref([]);
const limitedFiles = ref([]);
const avatarFiles = ref([]);
const bulkFiles = ref([]);

// Upload states
const uploading = ref(false);
const bulkUploading = ref(false);
const uploadProgress = reactive({});
const bulkUploadStatus = reactive({});
const uploadErrors = ref([]);

// Image previews and avatar
const imagePreviews = ref([]);
const avatarUrl = ref("");

// Methods
const formatFileSize = (bytes: number) => {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileIcon = (filename: string) => {
	const extension = filename.split(".").pop()?.toLowerCase();
	switch (extension) {
	case "pdf": return "picture_as_pdf";
	case "doc":
	case "docx": return "description";
	case "xlsx":
	case "xls": return "grid_on";
	case "txt": return "text_snippet";
	default: return "insert_drive_file";
	}
};

const getProgressColor = (progress: number) => {
	if (progress < 30) return "danger";
	if (progress < 70) return "warning";
	if (progress < 100) return "info";
	return "success";
};

const getUploadStatusColor = (status: string) => {
	switch (status) {
	case "Pending": return "default";
	case "Uploading": return "warning";
	case "Complete": return "success";
	case "Error": return "danger";
	default: return "default";
	}
};

const removeFile = (fileArray: any[], filename: string) => {
	const index = fileArray.findIndex(file => file.name === filename);
	if (index > -1) {
		fileArray.splice(index, 1);
	}
};

const removeImagePreview = (filename: string) => {
	const index = imagePreviews.value.findIndex(preview => preview.name === filename);
	if (index > -1) {
		URL.revokeObjectURL(imagePreviews.value[index].url);
		imagePreviews.value.splice(index, 1);
	}
	removeFile(imageFiles.value, filename);
};

const removeAvatar = () => {
	avatarUrl.value = "";
	avatarFiles.value = [];
};

const removeBulkFile = (index: number) => {
	const file = bulkFiles.value[index];
	delete bulkUploadStatus[file.name];
	bulkFiles.value.splice(index, 1);
};

const clearAllFiles = () => {
	bulkFiles.value = [];
	Object.keys(bulkUploadStatus).forEach(key => {
		delete bulkUploadStatus[key];
	});
};

// Event handlers
const onBasicUpload = (value: string, files: File[]) => {
	console.log("Basic upload:", files);
};

const onDragDropUpload = (value: string, files: File[]) => {
	console.log("Drag drop upload:", files);
};

const onImageUpload = (value: string, files: File[]) => {
	files.forEach(file => {
		if (file.type.startsWith("image/")) {
			const preview = {
				name: file.name,
				size: file.size,
				url: URL.createObjectURL(file)
			};
			imagePreviews.value.push(preview);
		}
	});
};

const onDocumentUpload = (value: string, files: File[]) => {
	console.log("Document upload:", files);
};

const onProgressUpload =  (value: string, files: File[]) => {
	files.forEach(file => {
		uploadProgress[file.name] = 0;
	});
};

const onLimitedUpload = (value: string, files: File[]) => {
	console.log("Limited upload:", files);
	uploadErrors.value = [];
};

const onUploadError = (error: string) => {
	uploadErrors.value.push(error);
	setTimeout(() => {
		uploadErrors.value = uploadErrors.value.filter(e => e !== error);
	}, 5000);
};

const onAvatarUpload = (value: string, files: File[]) => {
	if (files.length > 0) {
		const file = files[0];
		if (file.type.startsWith("image/")) {
			avatarUrl.value = URL.createObjectURL(file);
		}
	}
};

const onBulkUpload = (value: string, files: File[]) => {
	files.forEach(file => {
		bulkUploadStatus[file.name] = "Pending";
	});
};

const simulateUpload = () => {
	uploading.value = true;
	
	progressFiles.value.forEach(file => {
		const fileName = file.name;
		uploadProgress[fileName] = 0;
		
		const interval = setInterval(() => {
			uploadProgress[fileName] += Math.random() * 15;
			
			if (uploadProgress[fileName] >= 100) {
				uploadProgress[fileName] = 100;
				clearInterval(interval);
				
				// Check if all files are complete
				const allComplete = progressFiles.value.every(f => uploadProgress[f.name] >= 100);
				if (allComplete) {
					uploading.value = false;
				}
			}
		}, 200);
	});
};

const cancelUpload = () => {
	uploading.value = false;
	progressFiles.value.forEach(file => {
		uploadProgress[file.name] = 0;
	});
};

const uploadAllFiles = () => {
	bulkUploading.value = true;
	
	bulkFiles.value.forEach((file, index) => {
		bulkUploadStatus[file.name] = "Uploading";
		
		setTimeout(() => {
			const success = Math.random() > 0.1; // 90% success rate
			bulkUploadStatus[file.name] = success ? "Complete" : "Error";
			
			// Check if all files are processed
			const allProcessed = bulkFiles.value.every(f => 
				bulkUploadStatus[f.name] === "Complete" || bulkUploadStatus[f.name] === "Error"
			);
			
			if (allProcessed) {
				bulkUploading.value = false;
			}
		}, (index + 1) * 1000 + Math.random() * 2000);
	});
};
</script>
