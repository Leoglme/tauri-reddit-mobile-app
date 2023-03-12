<template>
  <div class="upload">
    <div
      class="drop-zone"
      :class="{ 'drag-over': isDragging }"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <p><i class="fa fa-upload"></i> Déposez vos images ici ou cliquez pour sélectionner des images à uploader.</p>
    </div>
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      multiple
      @change="handleInputChange"
    />
    <div v-if="images.length">
      <h3>Images à uploader :</h3>
      <ul>
        <li
          v-for="(image, index) in images"
          :key="index"
        >
          <div class="image-preview">
            <img
              :src="image.preview"
              alt="image preview"
            />
            <div class="image-details">
              <p>{{ image.name }}</p>
              <p>{{ formatBytes(image.size) }}</p>
            </div>
            <button @click="removeImage(index)">Supprimer</button>
          </div>
        </li>
      </ul>
      <button @click="uploadImages">Uploader les images</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      isDragging: false,
    }
  },
  methods: {
    handleDragOver(event) {
      event.preventDefault()
      this.isDragging = true
    },
    handleDragLeave(event) {
      event.preventDefault()
      this.isDragging = false
    },
    handleDrop(event) {
      event.preventDefault()
      this.isDragging = false
      const files = event.dataTransfer.files
      this.handleFiles(files)
    },
    handleInputChange(event) {
      const files = event.target.files
      this.handleFiles(files)
    },
    handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageData = {
            name: file.name,
            size: file.size,
            type: file.type,
            preview: e.target.result,
            file: file,
          }
          this.images.push(imageData)
        }
        reader.readAsDataURL(file)
      }
    },
    removeImage(index) {
      this.images.splice(index, 1)
    },
    formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    uploadImages() {
      // TODO: Implement image upload functionality
    },
  },
}
</script>

<style scoped>
.upload {
  margin: 50px;
  text-align: center;
}

.drop-zone {
  border: 3px dashed #ccc;
  padding: 50px;
  margin-bottom: 50px;
}

.drag-over {
  background-color: #f1f1f1;
}

.image-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.image-preview img {
  max-width: 100px;
  max-height: 100px;
  margin-right: 10px;
}

.image-details {
  flex-grow: 1;
  text-align: left;
}

.upload button {
  background-color: #007aff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.upload button:hover {
  background-color: #0056b3;
}
</style>
