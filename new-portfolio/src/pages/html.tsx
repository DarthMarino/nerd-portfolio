import i18n from "i18next";
import Button from "../components/Button";
import { technologies } from "../statics/objects";
import sic1 from "../assets/images/sic-1.png";
import sic2 from "../assets/images/sic-2.png";
import sic3 from "../assets/images/sic-3.png";
import sic4 from "../assets/images/sic-4.png";
import sic5 from "../assets/images/sic-5.png";
import pventa1 from "../assets/images/pventa-1.png";
import pventa2 from "../assets/images/pventa-2.png";
import pventa3 from "../assets/images/pventa-3.png";
import pventa4 from "../assets/images/pventa-4.png";
import curbo1 from "../assets/images/curbo-1.png";
import curbo2 from "../assets/images/curbo-2.jpeg";
import curbo3 from "../assets/images/curbo-3.png";
import curbo4 from "../assets/images/curbo-4.png";

const HtmlPage = () => {
  const Range = ({
    year1 = 0,
    year2,
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
      <div class="range" style={{ gap: "0.5rem" }}>
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
      <div class="range" style={{ height: "2rem" }}>
        <span class="yearBox">{year1}</span>
        <p>
          <i class="arrow" />
        </p>
        <span class="yearBox">{year2 ? year2 : "Present"}</span>
      </div>
    </div>
  );

  const Skills = ({ skillArray = [] }: { skillArray: string[] }) => (
    <div
      class="range"
      style={{ gap: "1rem", "max-width": "80%", "flex-wrap": "wrap" }}
    >
      {skillArray.map((skill) => (
        <span id={skill} class="yearBox">
          {skill}
        </span>
      ))}
    </div>
  );

  return (
    <div class="bodyDiv">
      <div class="content">
        <div class="title">
          <h1>MARINO GOMEZ</h1>
          <h2>Software Engineer</h2>
        </div>
        <p>{i18n.t("cv_intro")}</p>
        <h1 class="subtitle">CONTACT</h1>
        <div class="button-list">
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
        <h1 class="subtitle">EXPERIENCE</h1>
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            "flex-wrap": "wrap",
            gap: "1.5rem",
            "margin-top": "-15px",
          }}
        >
          <Range year1={2022} role="Frontend Engineer" company="Tecno-Logica" />

          <Range
            year1={2021}
            year2={2023}
            role="Software Engineer"
            company="Curbo Technologies"
          />
        </div>
        <h1 class="subtitle">SKILLS</h1>
        <Skills skillArray={technologies} />
        <h1 class="subtitle">STUDIES</h1>
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            "flex-wrap": "wrap",
            gap: "1rem",
            "margin-top": "-15px",
          }}
        >
          <Range
            year1={2017}
            year2={2021}
            role={i18n.t("software_eng")}
            company={i18n.t("intec")}
            link="https://www.intec.edu.do/en/"
          />
        </div>
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            "flex-wrap": "wrap",
            gap: "1rem",
            "margin-top": "15px",
          }}
        >
          <Range
            year1={2017}
            year2={2021}
            role={i18n.t("digital_electronics")}
            company={i18n.t("loyola")}
            link="https://ipl.edu.do/"
          />
        </div>
        <h1 class="subtitle">PROJECTS</h1>
        <div class="button-list">
          <Button text="Curbo" url="https://curbo.do/" />
          <Button
            text="PVenta"
            url="https://play.google.com/store/apps/details?id=pventa.mobile"
          />
          <Button text="SentinelsLabs" url="https://www.sentinelslabs.com/" />
          <Button
            text="Tinacos Hércules"
            url="https://tinacos-hercules.vercel.app/"
          />
          <Button
            text="Bizcord - 3D Landing"
            url="https://bizcord-3d-landing.vercel.app/"
          />
          <Button
            text="Space Portfolio"
            url="https://scroll-portfolio.vercel.app/"
          />
        </div>
      </div>
      <span class="background background0" />
      <span class="background background1" />
    </div>
  );
};

export default HtmlPage;
