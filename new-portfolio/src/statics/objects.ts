const technologies = [
  "React",
  "Typescript",
  "Javascript",
  "Node.JS",
  "CSS",
  "TailwindCSS",
  "GraphQL",
  "Git",
  "Three.js",
  "UITools",
  "Design",
  "GoLang",
  "C#",
  "Net",
  "SQL",
  "Blender",
  "Rust",
];

type Certification = {
  title: string;
  date: Date;
  description: string;
};
const certifications: Certification[] = [
  {
    title: "Three.JS Journey",
    date: new Date(2023, 0, 1),
    description: "threejs-journey.com/certificate/view/1913",
  },
  {
    title: "UI/UX Course",
    date: new Date(2022, 11, 1),
    description: "designcourse.com/certificate/63968757b7b36500195474bc",
  },
];

export { technologies, certifications };
