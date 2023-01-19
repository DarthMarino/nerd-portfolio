import { HTMLAttributeAnchorTarget } from "react";
import "../pages/style.css";

const Button = ({
  text = "",
  url = "",
  target = "",
}: {
  text: string;
  url?: string;
  target?: HTMLAttributeAnchorTarget;
}) => (
  <a href={url} className="button" target={target}>
    <span className="border" />
    <span className="label" style={{ color: "white" }}>
      {text}
    </span>
    <span className="label-hover">
      <span className="inner">{text}</span>
    </span>
  </a>
);

export default Button;
