export const saveImageToPublic = async (file: File): Promise<string> => {
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const fileName = `${timestamp}_${sanitizedName}`;

  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

export const uploadImageToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Server upload failed, using base64:', error);
    return saveImageToPublic(file);
  }
};
