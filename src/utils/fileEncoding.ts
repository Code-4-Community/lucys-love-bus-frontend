export function convertToBase64String(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const res: string | ArrayBuffer | null = reader.result;

      if (res === null || res instanceof ArrayBuffer) {
        reject(
          new Error(
            'FileReader.readAsDataURL yielded a non-string result for a base64 string conversion.',
          ),
        );
      } else {
        resolve(res);
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

interface FileField {
  file: File;
}

export const encodeProfileFieldFile = async (
  field: FileField,
): Promise<string | null> => {
  return field
    ? await convertToBase64String(field.file).catch((e) => null)
    : null;
};
