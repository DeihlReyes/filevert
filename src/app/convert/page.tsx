"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ReactDropzone from "react-dropzone";
import { useToast } from "@/components/hooks/use-toast";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { FiUploadCloud } from "react-icons/fi";
import { LuFileSymlink } from "react-icons/lu";
import { MdClose, MdDone } from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";
import { HiOutlineDownload } from "react-icons/hi";
import { BiError } from "react-icons/bi";
import bytesToSize from "@/utils/bytes-to-size";
import fileToIcon from "@/utils/file-to-icon";
import compressFileName from "@/utils/compress-file-name";
import convertFile from "@/utils/convert";
import loadFfmpeg from "@/utils/load-ffmpeg";
import type { Action } from "@/types";

const extensions = {
  image: [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "ico",
    "tif",
    "tiff",
    "svg",
    "raw",
    "tga",
  ],
  video: [
    "mp4",
    "m4v",
    "mp4v",
    "3gp",
    "3g2",
    "avi",
    "mov",
    "wmv",
    "mkv",
    "flv",
    "ogv",
    "webm",
    "h264",
    "264",
    "hevc",
    "265",
  ],
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

const accepted_files = {
  "image/*": [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".ico",
    ".tif",
    ".tiff",
    ".raw",
    ".tga",
  ],
  "audio/*": [],
  "video/*": [],
};

export default function ConvertPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [is_hover, setIsHover] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [is_ready, setIsReady] = useState(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const [is_loaded, setIsLoaded] = useState(false);
  const [is_converting, setIsConverting] = useState(false);
  const [, setIsDone] = useState(false);
  const ffmpegRef = useRef<unknown>(null);
  const [defaultValues, setDefaultValues] = useState("video");
  const [selected, setSelected] = useState("...");

  const reset = () => {
    setIsDone(() => false);
    setActions(() => []);
    setFiles(() => []);
    setIsReady(() => false);
    setIsConverting(() => false);
    setStep(() => 1);
  };

  const downloadAll = (): void => {
    for (const action of actions) {
      !action.is_error && download(action);
    }
  };

  const download = (action: Action) => {
    const a = document.createElement("a");
    a.style.display = "none";
    if (action.url) {
      a.href = action.url;
    }

    a.download = action.output || "default_filename";

    document.body.appendChild(a);
    a.click();

    if (action.url) {
      URL.revokeObjectURL(action.url);
    }
    document.body.removeChild(a);
  };

  const convert = async (): Promise<void> => {
    let tmp_actions = actions.map((elt) => ({
      ...elt,
      is_converting: true,
    }));
    setActions(tmp_actions);
    setIsConverting(true);
    for (const action of tmp_actions) {
      try {
        const { url, output } = await convertFile(
          ffmpegRef.current as FFmpeg,
          action,
        );
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: true,
                is_converting: false,
                url,
                output,
              }
            : elt,
        );
        setActions(tmp_actions);
      } catch (err) {
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: false,
                is_converting: false,
                is_error: true,
              }
            : elt,
        );
        setActions(tmp_actions);
      }
    }
    setIsDone(true);
    setIsConverting(false);
    setStep(3);
  };

  const handleUpload = (data: File[]): void => {
    setIsHover(false);
    setFiles(data);
    const tmp: Action[] = [];
    data.forEach((file: File) => {
      tmp.push({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_converted: false,
        is_converting: false,
        is_error: false,
      });
    });
    setActions(tmp);
    setStep(2);
  };

  const updateAction = (file_name: string, to: string) => {
    setActions(
      actions.map((action): Action => {
        if (action.file_name === file_name) {
          return {
            ...action,
            to,
          };
        }
        return action;
      }),
    );
  };

  const checkIsReady = useCallback((): void => {
    let tmp_is_ready = true;
    actions.forEach((action: Action) => {
      if (!action.to) tmp_is_ready = false;
    });
    setIsReady(tmp_is_ready);
  }, [actions, setIsReady]);

  const deleteAction = (action: Action): void => {
    setActions(actions.filter((elt) => elt !== action));
    setFiles(files.filter((elt) => elt.name !== action.file_name));
  };

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setFiles([]);
      setIsReady(false);
      setIsConverting(false);
      setStep(1);
    } else checkIsReady();
  }, [actions, checkIsReady]);

  useEffect(() => {
    loadFfmpeg().then((ffmpeg_response: FFmpeg) => {
      ffmpegRef.current = ffmpeg_response;
      setIsLoaded(true);
    });
  }, []);

  const StepContent = () => {
    switch (step) {
      case 1:
        return (
          <ReactDropzone
            onDrop={handleUpload}
            onDragEnter={() => setIsHover(true)}
            onDragLeave={() => setIsHover(false)}
            accept={accepted_files}
            onDropRejected={() => {
              setIsHover(false);
              toast({
                variant: "destructive",
                title: "Error uploading your file(s)",
                description: "Allowed Files: Audio, Video and Images.",
                duration: 5000,
              });
            }}
            onError={() => {
              setIsHover(false);
              toast({
                variant: "destructive",
                title: "Error uploading your file(s)",
                description: "Allowed Files: Audio, Video and Images.",
                duration: 5000,
              });
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex h-72 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-secondary bg-background shadow-sm lg:h-80 xl:h-96"
              >
                <input {...getInputProps()} />
                <div className="space-y-4 text-foreground">
                  {is_hover ? (
                    <>
                      <div className="flex justify-center text-6xl">
                        <LuFileSymlink />
                      </div>
                      <h3 className="text-center text-2xl font-medium">
                        Yes, right there
                      </h3>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center text-6xl">
                        <FiUploadCloud />
                      </div>
                      <h3 className="text-center text-xl font-medium">
                        Click, or drop your files here
                      </h3>
                    </>
                  )}
                </div>
              </div>
            )}
          </ReactDropzone>
        );
      case 2:
        return (
          <div className="space-y-6">
            {actions.map((action: Action, i: number) => (
              <div
                key={i}
                className="relative flex h-fit w-full cursor-pointer flex-wrap items-center justify-between space-y-2 rounded-xl border px-4 py-4 lg:h-20 lg:flex-nowrap lg:px-10 lg:py-0"
              >
                {!is_loaded && (
                  <Skeleton className="absolute -ml-10 h-full w-full cursor-progress rounded-xl" />
                )}
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-orange-600">
                    {fileToIcon(action.file_type)}
                  </span>
                  <div className="flex w-fit items-center gap-1">
                    <span className="text-md overflow-x-hidden font-medium">
                      {compressFileName(action.file_name)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({bytesToSize(action.file_size)})
                    </span>
                  </div>
                </div>

                <div className="text-md flex items-center gap-4 text-muted-foreground">
                  <span>Convert to</span>
                  <Select
                    onValueChange={(value) => {
                      if (extensions.audio.includes(value)) {
                        setDefaultValues("audio");
                      } else if (extensions.video.includes(value)) {
                        setDefaultValues("video");
                      }
                      setSelected(value);
                      updateAction(action.file_name, value);
                    }}
                    value={selected}
                  >
                    <SelectTrigger className="text-md w-32 bg-background text-center font-medium text-muted-foreground outline-none focus:outline-none focus:ring-0">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                    <SelectContent className="h-fit">
                      {action.file_type.includes("image") && (
                        <div className="grid w-fit grid-cols-2 gap-2">
                          {extensions.image.map((elt, i) => (
                            <div key={i} className="col-span-1 text-center">
                              <SelectItem value={elt} className="mx-auto">
                                {elt}
                              </SelectItem>
                            </div>
                          ))}
                        </div>
                      )}
                      {action.file_type.includes("video") && (
                        <Tabs defaultValue={defaultValues} className="w-full">
                          <TabsList className="w-full">
                            <TabsTrigger value="video" className="w-full">
                              Video
                            </TabsTrigger>
                            <TabsTrigger value="audio" className="w-full">
                              Audio
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="video">
                            <div className="grid w-fit grid-cols-3 gap-2">
                              {extensions.video.map((elt, i) => (
                                <div key={i} className="col-span-1 text-center">
                                  <SelectItem value={elt} className="mx-auto">
                                    {elt}
                                  </SelectItem>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          <TabsContent value="audio">
                            <div className="grid w-fit grid-cols-3 gap-2">
                              {extensions.audio.map((elt, i) => (
                                <div key={i} className="col-span-1 text-center">
                                  <SelectItem value={elt} className="mx-auto">
                                    {elt}
                                  </SelectItem>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      )}
                      {action.file_type.includes("audio") && (
                        <div className="grid w-fit grid-cols-2 gap-2">
                          {extensions.audio.map((elt, i) => (
                            <div key={i} className="col-span-1 text-center">
                              <SelectItem value={elt} className="mx-auto">
                                {elt}
                              </SelectItem>
                            </div>
                          ))}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <span
                    onClick={() => deleteAction(action)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-2xl text-foreground hover:bg-muted"
                  >
                    <MdClose />
                  </span>
                </div>
              </div>
            ))}
            <div className="flex w-full justify-end">
              <Button
                size="lg"
                disabled={!is_ready || is_converting}
                className="text-md relative flex w-44 items-center rounded-xl py-4 font-semibold"
                onClick={convert}
              >
                {is_converting ? (
                  <span className="animate-spin text-lg">
                    <ImSpinner3 />
                  </span>
                ) : (
                  <span>Convert Now</span>
                )}
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            {actions.map((action: Action, i: number) => (
              <div
                key={i}
                className="relative flex h-fit w-full cursor-pointer flex-wrap items-center justify-between space-y-2 rounded-xl border px-4 py-4 lg:h-20 lg:flex-nowrap lg:px-10 lg:py-0"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-orange-600">
                    {fileToIcon(action.file_type)}
                  </span>
                  <div className="flex w-96 items-center gap-1">
                    <span className="text-md overflow-x-hidden font-medium">
                      {compressFileName(action.output || action.file_name)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({action.to})
                    </span>
                  </div>
                </div>

                {action.is_error ? (
                  <Badge variant="destructive" className="flex gap-2">
                    <span>Error Converting File</span>
                    <BiError />
                  </Badge>
                ) : (
                  <Badge variant="default" className="flex gap-2 bg-green-500">
                    <span>Done</span>
                    <MdDone />
                  </Badge>
                )}

                {!action.is_error && (
                  <Button variant="outline" onClick={() => download(action)}>
                    Download
                  </Button>
                )}
              </div>
            ))}
            <div className="flex w-full justify-end space-x-4">
              <Button
                size="lg"
                className="text-md relative flex items-center gap-2 rounded-xl py-4 font-semibold"
                onClick={downloadAll}
              >
                {actions.length > 1 ? "Download All" : "Download"}
                <HiOutlineDownload />
              </Button>
              <Button
                size="lg"
                onClick={reset}
                variant="outline"
                className="rounded-xl"
              >
                Convert Another File(s)
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto h-full max-w-7xl space-y-10 py-20">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Convert Your Files
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Transform your files quickly and easily. Support for video, audio, and
          image formats.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <ol className="flex w-full max-w-3xl items-center">
          {["Upload", "Convert", "Download"].map((title, index) => (
            <li
              key={index}
              className={`flex items-center ${index < 2 ? "w-full" : ""}`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:h-12 lg:w-12 ${
                  step > index + 1
                    ? "bg-primary text-primary-foreground"
                    : step === index + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`ml-2 text-sm font-medium ${
                  step > index + 1
                    ? "text-primary"
                    : step === index + 1
                      ? "text-primary"
                      : "text-muted-foreground"
                }`}
              >
                {title}
              </span>
              {index < 2 && (
                <div className="ml-2 mr-2 flex-1">
                  <div
                    className={`h-0.5 w-full ${
                      step > index + 1 ? "bg-primary" : "bg-muted"
                    }`}
                  ></div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle>
            {
              [
                "Upload Your Files",
                "Convert Files",
                "Download Converted Files",
              ][step - 1]
            }
          </CardTitle>
          <CardDescription>
            {
              [
                "Drag and drop your files or click to browse",
                "Select output format and start conversion",
                "Your converted files are ready",
              ][step - 1]
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StepContent />
        </CardContent>
      </Card>
    </div>
  );
}
