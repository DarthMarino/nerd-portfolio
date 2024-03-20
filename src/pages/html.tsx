import Button from "../components/Button";
import "./style.css";

const HtmlPage = () => {
  const Range = ({
    year1 = 0,
    year2 = 100,
    company = "",
    role = "",
    link,
  }: {
    year1?: number;
    year2?: number;
    company?: string;
    role?: string;
    link?: string;
  }) => (
    <div>
      <div className="range" style={{ gap: "0.5rem" }}>
        <h4>{role}</h4>
        <h4 style={{ opacity: 0.7 }}>at</h4>

        <h4>
          {link ? (
            <a href={link} target="_blank">
              {company}
            </a>
          ) : (
            <>{company}</>
          )}
        </h4>
      </div>
      <div className="range" style={{ height: "2rem" }}>
        <span className="yearBox">{year1}</span>
        <p>
          <i className="arrow" />
        </p>
        <span className="yearBox">{year2}</span>
      </div>
    </div>
  );

  const Skills = ({ skillArray = [] }: { skillArray: string[] }) => (
    <div
      className="range"
      style={{ gap: "1rem", maxWidth: "80%", flexWrap: "wrap" }}
    >
      {skillArray.map((skill) => (
        <span key={skill} className="yearBox">
          {skill}
        </span>
      ))}
    </div>
  );

  return (
    <div className="bodyDiv">
      <div className="content">
        <div className="title">
          <h1>MARINO GOMEZ</h1>
          <h2>Software Engineer / Frontend Developer</h2>
        </div>
        <p>
          I am a Software Engineer specialized in frontend software development,
          my passion is to make projects, pages, and applications that just look
          good.
        </p>
        <h1 className="subtitle">CONTACT</h1>
        <div className="button-list">
          <Button text="Github" url="https://github.com/DarthMarino" />
          <Button
            text="Linkedin"
            url="https://www.linkedin.com/in/maghiworks/"
          />
          <Button
            text="marinogomez24@gmail.com"
            url="mailto:marinogomez24@gmail.com"
          />
        </div>
        <h1 className="subtitle">EXPERIENCE</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "-15px",
          }}
        >
          <Range
            year1={2021}
            year2={2023}
            role="Software Engineer"
            company="Curbo Technologies"
          />
          <Range
            year1={2022}
            year2={2024}
            role="Frontend Engineer"
            company="Tecno-Logica"
          />
        </div>
        <h1 className="subtitle">SKILLS</h1>
        <Skills
          skillArray={[
            "React",
            "Typescript",
            "Javascript",
            "NodeJs",
            "CSS",
            "Three.js",
            "Tailwindcss",
            "Figma",
            "Blender",
          ]}
        />
        <h1 className="subtitle">STUDIES</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "-15px",
          }}
        >
          <Range
            year1={2017}
            year2={2021}
            role="Software Engineer"
            company="Santo Domingo Institute of Technology"
            link="https://www.intec.edu.do/en/"
          />
        </div>
        <h1 className="subtitle">PROJECTS</h1>
        <div className="button-list">
          <Button text="Blog Page" url="https://alphablog.vercel.app/" />
          <Button
            text="Space Portfolio"
            url="https://scroll-portfolio.vercel.app/"
          />
          <Button
            text="Bizcord - 3D Landing"
            url="https://bizcord-3d-landing.vercel.app/"
          />
        </div>
      </div>
      <span className="background background0" />
      <span className="background background1" />
    </div>
  );
};

export default HtmlPage;
