import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import type { Action } from "@/types";

export default async function convertFile(ffmpeg: FFmpeg, action: Action) {
  const { file, to, file_name } = action;
  const input = file_name;
  const output = `output.${to}`;

  await ffmpeg.writeFile(input, await fetchFile(file));

  await ffmpeg.exec(["-i", input, output]);

  const data = await ffmpeg.readFile(output);
  const blob = new Blob([data], { type: `audio/${to}` });
  const url = URL.createObjectURL(blob);

  return { url, output };
}
