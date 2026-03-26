import { type Component } from "solid-js";
import { A } from "@solidjs/router";
import * as i18n from "@solid-primitives/i18n";
import BackgroundScene from "../components/BackgroundScene";
import profileImage from "../assets/profile.png";
import {
  siReact,
  siTypescript,
  siNodedotjs,
  siMysql,
  siDocker,
  siGo,
  siFlutter,
  siCplusplus,
} from "simple-icons";
import "./Home.css";

type HomeProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
};

type SimpleIcon = { path: string; hex: string };

const TechIcon = (props: { icon: SimpleIcon }) => (
  <svg
    viewBox="0 0 24 24"
    class="skill-icon"
    fill={`#${props.icon.hex}`}
    aria-hidden="true"
  >
    <path d={props.icon.path} />
  </svg>
);

const SKILLS = [
  { icon: siReact, label: "React" },
  { icon: siTypescript, label: "TypeScript" },
  { icon: siNodedotjs, label: "Node.js" },
  { icon: siMysql, label: "SQL" },
  { icon: siDocker, label: "Docker" },
  { icon: siGo, label: "Go" },
  { icon: siFlutter, label: "Flutter" },
  { icon: siCplusplus, label: "C++" },
];

const Home: Component<HomeProps> = (props) => {
  return (
    <div class="home-container">
      <BackgroundScene />

      <div class="page-content">
        {/* Hero Section */}
        <div class="hero-section">
          <div class="hero-profile-image">
            <img src={profileImage} alt="Marino Gomez, Full-stack Developer" />
          </div>
          <h1 class="hero-name">Marino Gomez</h1>
          <h2 class="hero-title">{props.t("title")}</h2>
          <p class="hero-tagline">
            Building scalable full-stack applications with modern technologies.
            Specialized in React, Node.js, and cloud solutions.
          </p>
          <div class="hero-cta">
            <A href="/projects" class="cta-button primary">
              View Projects →
            </A>
            <A href="/about#contact" class="cta-button secondary">
              Contact Me
            </A>
          </div>
        </div>

        {/* Featured Skills */}
        <div class="featured-skills">
          <h3 class="skills-heading">Core Technologies</h3>
          <div class="skills-grid">
            {SKILLS.map(({ icon, label }) => (
              <div class="skill-pill">
                <TechIcon icon={icon} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div class="quick-links">
          <A href="/experience" class="quick-link-card">
            <h4>Experience</h4>
            <p>5+ years building enterprise solutions</p>
          </A>
          <A href="/skills" class="quick-link-card">
            <h4>Skills & Education</h4>
            <p>Full-stack expertise across platforms</p>
          </A>
          <A href="/cv" class="quick-link-card">
            <h4>Download CV</h4>
            <p>Get my complete resume</p>
          </A>
        </div>
      </div>
    </div>
  );
};

export default Home;
