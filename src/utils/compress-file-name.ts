export default function compressFileName(fileName: string) {
  if (fileName.length > 25) {
    return fileName.slice(0, 25) + "...";
  }
  return fileName;
}
