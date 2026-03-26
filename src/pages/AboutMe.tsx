import { type Component } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import BackgroundScene from "../components/BackgroundScene";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb";
import ContactForm from "../components/ContactForm";
import profileImage from "../assets/profile.png";
import "./AboutMe.css";

type AboutMeProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
};

const AboutMe: Component<AboutMeProps> = (props) => {
  const breadcrumbItems = (): BreadcrumbItem[] => [
    { label: props.t("home"), href: "/" },
    { label: "About Me" },
  ];

  return (
    <div class="about-me-container">
      <BackgroundScene />

      <div class="page-content">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems()} />

        {/* Header */}
        <div class="page-header">
          <div class="about-profile-image">
            <img src={profileImage} alt="Marino Gomez" />
          </div>
          <h1 class="page-title">About Me</h1>
          <h2 class="about-me-name">{props.t("name")}</h2>
          <p class="about-me-role">{props.t("title")}</p>
        </div>

        {/* Bio Section */}
        <div class="about-section">
          <h3 class="section-title">Introduction</h3>
          <p class="section-text">
            {typeof props.t("cv_intro") === "function"
              ? props.t("cv_intro")()
              : props.t("cv_intro")}
          </p>
        </div>

        {/* Languages Section */}
        <div class="about-section">
          <h3 class="section-title">{props.t("languages")}</h3>
          <div class="languages-grid">
            <div class="language-item">
              <h4 class="language-name">{props.t("lang_2")}</h4>
              <p class="language-level">{props.t("lang_2_level")}</p>
            </div>
            <div class="language-item">
              <h4 class="language-name">{props.t("lang_1")}</h4>
              <p class="language-level">{props.t("lang_1_level")}</p>
            </div>
            <div class="language-item">
              <h4 class="language-name">{props.t("lang_3")}</h4>
              <p class="language-level">{props.t("lang_3_level")}</p>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div id="contact" class="about-section">
          <h3 class="section-title">Get In Touch</h3>

          {/* Contact Form */}
          <ContactForm t={props.t} />

          {/* Social Links */}
          <div class="contact-divider"></div>
          <p class="contact-text">Or connect with me on:</p>
          <div class="contact-links">
            <a
              href="https://github.com/DarthMarino"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link"
            >
              <span class="contact-link-icon">🔗</span>
              <span class="contact-link-text">{props.t("github")}</span>
            </a>
            <a
              href="https://www.linkedin.com/in/maghiworks/"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link"
            >
              <span class="contact-link-icon">🔗</span>
              <span class="contact-link-text">{props.t("linkedin")}</span>
            </a>
            <a href="mailto:marinogomez24@gmail.com" class="contact-link">
              <span class="contact-link-icon">📧</span>
              <span class="contact-link-text">{props.t("email")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
