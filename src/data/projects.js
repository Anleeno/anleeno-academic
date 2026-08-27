import exPoster from "../assets/projects/ex-poster.jpg";
import exVideo from "../assets/projects/ex.mp4";
import adas from "../assets/projects/ADAS.png";
import doris from "../assets/projects/doris.png";

export const projects = [
  {
    title: "AI-Native Mixed-Reality Socializing",
    image: exPoster,
    video: exVideo,
    meta: "XR",
    text: "An AI-native mixed-reality social platform that blends spatial perception, generative interaction, and shared XR experiences. The project explores how intelligent agents can make remote socializing feel more embodied, expressive, and naturally connected.",
    note: "Showcase only. The full app will be available in the future.",
    action: "app",
  },
  {
    title: "ADAS for Micro-Mobility",
    image: adas,
    meta: "Intelligent Transportation",
    text: "A vision-based advanced driver-assistance system designed for e-bicycles and other micro-mobility vehicles. It combines real-time road perception, hazard awareness, and lightweight on-device inference to improve safety in complex urban traffic.",
    action: "github",
  },
  {
    title: "DORIS: End-to-End Detection with Object Ranking for Retrieval Instance Selection",
    image: doris,
    meta: "Object Recommendation",
    text: "We propose a novel model for visual search and shopping scenarios, such as Taobao image search and Xiaohongshu camera search, that jointly performs object detection and ranking to identify and recommend the subjects most relevant to user intent.",
    action: "demo",
    link: "https://huggingface.co/spaces/geminia/Doris",
  },
];
