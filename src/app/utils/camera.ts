import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

export const isNative = () => {
  return Capacitor.isNativePlatform();
};

export const takePictureNative = async (): Promise<string | null> => {
  try {
    console.log('Requesting camera permissions...');
    
    // Request camera permissions
    const permission = await Camera.requestPermissions();
    console.log('Permission result:', permission);
    
    if (permission.camera === 'granted' || permission.photos === 'granted') {
      console.log('Camera permission granted, opening camera...');
      
      const image = await Camera.getPhoto({
        quality: 70, // ⭐ REDUCED from 90 to 70 for better performance
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        saveToGallery: false,
        width: 1280, // ⭐ NEW - Limit width for faster processing
        height: 960, // ⭐ NEW - Limit height for faster processing
        correctOrientation: true, // ⭐ NEW - Auto-rotate based on device orientation
        promptLabelHeader: 'Take Photo', // ⭐ NEW - Better user experience
        promptLabelPhoto: 'From Photos', // ⭐ NEW
        promptLabelPicture: 'Take Picture', // ⭐ NEW
      });

      console.log('Photo captured successfully');
      return image.dataUrl || null;
    } else {
      console.error('Camera permission denied');
      throw new Error('Camera permission denied. Please enable camera access in settings.');
    }
  } catch (error) {
    console.error('Error taking picture:', error);
    // Re-throw the error instead of returning null
    throw error;
  }
};

export const pickImageNative = async (): Promise<string | null> => {
  try {
    console.log('Opening gallery...');
    
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      promptLabelHeader: 'Select Photo', // ⭐ NEW - Better user experience
      promptLabelCancel: 'Cancel', // ⭐ NEW
    });

    console.log('Image picked successfully');
    return image.dataUrl || null;
  } catch (error) {
    console.error('Error picking image:', error);
    // Re-throw the error instead of returning null
    throw error;
  }
};

// Fallback for web browsers
export const takePictureWeb = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    };

    input.click();
  });
};

// Main camera function that switches between native and web
export const takePicture = async (): Promise<string | null> => {
  console.log('takePicture called, isNative:', isNative());
  
  if (isNative()) {
    return await takePictureNative();
  } else {
    return await takePictureWeb();
  }
};

// Main gallery picker function that switches between native and web
export const pickImage = async (): Promise<string | null> => {
  console.log('pickImage called, isNative:', isNative());
  
  if (isNative()) {
    return await pickImageNative();
  } else {
    // Web fallback - just use file picker
    return await takePictureWeb();
  }
};