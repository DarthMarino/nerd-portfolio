import { For, type Component } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { technologies } from "../statics/objects";
import "./html.css";
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

type HtmlPageProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
};

const HtmlPage: Component<HtmlPageProps> = (props) => {
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
      <div class="year-range" style={{ gap: "0.5rem" }}>
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
      <div class="year-range" style={{ height: "2rem" }}>
        <span class="yearBox">{year1}</span>
        <p>
          <i class="arrow" />
        </p>
        <span class="yearBox">{year2 ? year2 : "Present"}</span>
      </div>
    </div>
  );

  const Skills = ({ skillArray = [] }: { skillArray: string[] }) => (
    <div class="flex flex-wrap gap-4 max-w-4xl">
      <For each={skillArray}>
        {(skill) => (
          <div class="badge badge-primary badge-lg p-3 text-base font-normal">
            {skill}
          </div>
        )}
      </For>
    </div>
  );

  return (
    <div class="bodyDiv">
      <div class="content">
        <div class="title">
          <h1>MARINO GOMEZ</h1>
          <h2>Software Engineer</h2>
        </div>
        <p>{props.t("cv_intro")}</p>
        <h1 class="subtitle">CONTACT</h1>
        <div class="flex flex-wrap gap-4 my-6">
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
          <Range year1={2022} role={props.t("frontend_eng_title")} company="Tecno-Logica" />
          <Dropdown
            text="PVenta Mobile"
            images={[pventa1, pventa2, pventa3, pventa4]}
            url={"https://play.google.com/store/apps/details?id=pventa.mobile"}
          />
          <Dropdown text="SIC" images={[sic1, sic2, sic3, sic4, sic5]} />

          <Range
            year1={2021}
            year2={2023}
            role={props.t("software_eng_title")}
            company="Curbo Technologies"
          />
          <Dropdown
            text="Curbo"
            images={[curbo1, curbo2, curbo3, curbo4]}
            url={"https://curbo.do/"}
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
            role={props.t("software_eng")}
            company={props.t("intec")}
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
            role={props.t("digital_electronics")}
            company={props.t("loyola")}
            link="https://ipl.edu.do/"
          />
        </div>
        <h1 class="subtitle">PROJECTS</h1>
        <div class="flex flex-wrap gap-4 my-6">
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
