
import ImageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
    try {
        const options = {
            maxSizeMB: 1, 
            maxWidthOrHeight: 1920, 
            useWebWorker: true
        };
        const compressedFile = await ImageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.error('Error compressing the image:', error);
        throw error;
    }
};
