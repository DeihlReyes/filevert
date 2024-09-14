import {
  BsFileEarmarkText,
  BsFileEarmarkImage,
  BsFileEarmarkPlay,
} from "react-icons/bs";

export default function fileToIcon(fileType: string) {
  if (fileType.includes("video")) return <BsFileEarmarkPlay />;
  if (fileType.includes("image")) return <BsFileEarmarkImage />;
  return <BsFileEarmarkText />;
}
