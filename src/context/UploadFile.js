import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fbstorage } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

export const uploadFileToFirebase = async (file) => {
  try {
    const fileRef = ref(fbstorage, `${uuidv4()}`);
    const uploadResult = await uploadBytes(fileRef, file);
    const fileURL = await getDownloadURL(uploadResult.ref);
    return fileURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
