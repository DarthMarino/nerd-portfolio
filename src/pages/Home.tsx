import { type Component } from "solid-js";
import { A } from "@solidjs/router";
import * as i18n from "@solid-primitives/i18n";
import BackgroundScene from "../components/BackgroundScene";
import profileImage from "../assets/profile.jpg";
import "./Home.css";

type HomeProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
};

const Home: Component<HomeProps> = (props) => {
  return (
    <div class="home-container">
      <BackgroundScene />

      <div class="page-content">
        {/* Hero Section - Row 1 */}
        <div class="hero-section">
          <div class="hero-profile-image">
            <img src={profileImage} alt="Marino Gomez" />
          </div>
          <h1 class="hero-name">Marino Gomez</h1>
          <h2 class="hero-title">{props.t("title")}</h2>
          <p class="hero-tagline">
            Building scalable full-stack applications with modern technologies.
            Specialized in React, Node.js, and cloud solutions.
          </p>

          {/* CTA Buttons */}
          <div class="hero-cta">
            <A href="/projects" class="cta-button primary">
              <span>View Projects</span>
              <span>→</span>
            </A>
            <A href="/about#contact" class="cta-button secondary">
              <span>Contact Me</span>
              <span>📧</span>
            </A>
          </div>
        </div>

        {/* Quick Stats - Row 2 */}
        <div class="stats-section">
          <div class="hero-stats">
            <div class="stat-card">
              <div class="stat-number">5+</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">20+</div>
              <div class="stat-label">Projects Delivered</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">15+</div>
              <div class="stat-label">Technologies</div>
            </div>
          </div>
        </div>

        {/* Featured Skills Section */}
        <div class="featured-skills">
          <h3 class="skills-heading">Core Technologies</h3>
          <div class="skills-grid">
            <div class="skill-pill" style={{ "border-left-color": "#61DAFB" }}>
              <span class="skill-icon">⚛️</span>
              <span>React</span>
            </div>
            <div class="skill-pill" style={{ "border-left-color": "#3178C6" }}>
              <span class="skill-icon">📘</span>
              <span>TypeScript</span>
            </div>
            <div class="skill-pill" style={{ "border-left-color": "#339933" }}>
              <span class="skill-icon">🟢</span>
              <span>Node.js</span>
            </div>
            <div class="skill-pill" style={{ "border-left-color": "#4479A1" }}>
              <span class="skill-icon">🗄️</span>
              <span>SQL</span>
            </div>
            <div class="skill-pill" style={{ "border-left-color": "#2496ED" }}>
              <span class="skill-icon">🐳</span>
              <span>Docker</span>
            </div>
            <div class="skill-pill" style={{ "border-left-color": "#00ADD8" }}>
              <span class="skill-icon">🐹</span>
              <span>Go</span>
            </div>
            <div class="skill-pill" style={{ "border-left-color": "#02569B" }}>
              <span class="skill-icon">🎯</span>
              <span>Flutter</span>
            </div>
            <div class="skill-pill" style={{ "border-left-color": "#00599C" }}>
              <span class="skill-icon">⚙️</span>
              <span>C++</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div class="quick-links">
          <A href="/experience" class="quick-link-card">
            <div class="link-icon-large">🚀</div>
            <h4>Experience</h4>
            <p>5+ years building enterprise solutions</p>
          </A>
          <A href="/skills" class="quick-link-card">
            <div class="link-icon-large">⚡</div>
            <h4>Skills & Education</h4>
            <p>Full-stack expertise across platforms</p>
          </A>
          <A href="/cv" class="quick-link-card">
            <div class="link-icon-large">📄</div>
            <h4>Download CV</h4>
            <p>Get my complete resume</p>
          </A>
        </div>
      </div>
    </div>
  );
};

export default Home;
