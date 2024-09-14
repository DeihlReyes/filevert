import { FileType, Zap, Lock, Globe, Clock, Sparkles } from "lucide-react";

export const Features = [
  {
    icon: <FileType className="w-10 h-10" />,
    title: "Multiple Formats",
    description:
      "Support for a wide range of video, audio, and image formats. Convert between popular file types with ease.",
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Lightning Fast",
    description:
      "Optimized algorithms for quick and efficient file conversion. Save time with our high-speed processing.",
  },
  {
    icon: <Lock className="w-10 h-10" />,
    title: "Secure & Private",
    description:
      "Your files are encrypted and automatically deleted after conversion. We prioritize your privacy and data security.",
  },
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Cloud-Based",
    description:
      "Access our converter from anywhere, on any device. No software installation required.",
  },
  {
    icon: <Clock className="w-10 h-10" />,
    title: "Batch Processing",
    description:
      "Convert multiple files simultaneously. Perfect for handling large projects efficiently.",
  },
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: "High Quality",
    description:
      "Advanced conversion algorithms maintain the highest possible quality in your output files.",
  },
];

export const Steps = [
  {
    number: 1,
    title: "Choose Your File",
    description:
      "Select the file you want to convert from your device. We support a wide range of formats for your convenience.",
  },
  {
    number: 2,
    title: "Select Output Format",
    description:
      "Pick the desired format for your converted file. Our intelligent system will suggest the best options based on your input file.",
  },
  {
    number: 3,
    title: "Download & Enjoy",
    description:
      "Get your converted file instantly, ready to use. Our fast processing ensures minimal wait times.",
  },
];

export const FileTypes = [
  {
    title: "Video Conversion",
    description: "Convert between popular video formats",
    formats: ["MP4", "AVI", "MOV", "WMV", "MKV", "FLV"],
  },
  {
    title: "Image Conversion",
    description: "Transform your images to various formats",
    formats: ["JPG", "PNG", "GIF", "WebP", "TIFF", "SVG"],
  },
  {
    title: "Audio Conversion",
    description: "Convert audio files with a click",
    formats: ["MP3", "WAV", "AAC", "FLAC", "OGG", "M4A"],
  },
];

export const Testimonials = [
  {
    quote:
      "This converter saved me hours of work. It's fast, easy to use, and the quality is excellent!",
    author: "Sarah K.",
    role: "Graphic Designer",
  },
  {
    quote:
      "I've tried many converters, but this one is by far the best. The interface is intuitive and the results are always perfect.",
    author: "Michael R.",
    role: "Video Editor",
  },
  {
    quote:
      "As a musician, I need reliable audio conversion. This tool has never let me down. Highly recommended!",
    author: "Emily L.",
    role: "Music Producer",
  },
];
