// 图片格式转换工具
const ImageConverter = {
    init() {
        this.uploadedImageFile = null;
        this.convertedImageData = null;
        this.setupEventListeners();
    },

    setupEventListeners() {
        const imageUploadArea = document.getElementById(SELECTORS.imageUploadArea);
        const imageFileInput = document.getElementById(SELECTORS.imageFileInput);

        if (!imageUploadArea || !imageFileInput) return;

        // 拖拽上传
        imageUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUploadArea.classList.add('dragover');
        });

        imageUploadArea.addEventListener('dragleave', () => {
            imageUploadArea.classList.remove('dragover');
        });

        imageUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleImageFile(files[0]);
            }
        });

        // 文件选择
        imageFileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleImageFile(e.target.files[0]);
            }
        });
    },

    handleImageFile(file) {
        // 验证文件类型
        if (!Utils.validateFileType(file, CONFIG.SUPPORTED_IMAGE_MIME_TYPES)) {
            Utils.showToast('请上传支持的图片格式', 'error');
            return;
        }

        // 验证文件大小
        if (!Utils.validateFileSize(file, CONFIG.MAX_FILE_SIZE)) {
            Utils.showToast(`图片大小不能超过 ${Utils.formatFileSize(CONFIG.MAX_FILE_SIZE)}`, 'error');
            return;
        }

        this.uploadedImageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            const imagePreview = document.getElementById(SELECTORS.imagePreview);
            imagePreview.src = e.target.result;
            Utils.toggleElement(SELECTORS.imagePreviewContainer, true);
            document.querySelector('.upload-placeholder').style.display = 'none';
            Utils.toggleElement(SELECTORS.formatSelect, true);
        };
        reader.readAsDataURL(file);
    },

    reset() {
        document.getElementById(SELECTORS.imageFileInput).value = '';
        Utils.toggleElement(SELECTORS.imagePreviewContainer, false);
        document.querySelector('.upload-placeholder').style.display = 'block';
        Utils.toggleElement(SELECTORS.formatSelect, false);
        Utils.toggleElement(SELECTORS.imageResultArea, false);
        this.uploadedImageFile = null;
        this.convertedImageData = null;
    },

    removeImage() {
        this.reset();
    },

    convert() {
        if (!this.uploadedImageFile) {
            Utils.showToast('请先上传图片', 'error');
            return;
        }

        const targetFormat = document.getElementById(SELECTORS.targetFormat).value;
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);

                this.convertedImageData = canvas.toDataURL(targetFormat);
                const convertedImage = document.getElementById(SELECTORS.convertedImage);
                convertedImage.src = this.convertedImageData;
                Utils.toggleElement(SELECTORS.imageResultArea, true);
                Utils.showToast('转换成功');
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(this.uploadedImageFile);
    },

    download() {
        if (!this.convertedImageData) return;

        const format = document.getElementById(SELECTORS.targetFormat).value;
        const extension = format.split('/')[1];
        Utils.createDownloadLink(this.convertedImageData, `converted_image.${extension}`);
    }
};