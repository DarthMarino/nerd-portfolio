const Button = ({
  text = "",
  url = "",
  target = "",
}: {
  text: string;
  url?: string;
  target?: HTMLAnchorElement["target"];
}) => (
  <a href={url} class="button" target={target}>
    <span class="label" style={{ color: "white" }}>
      {text}
    </span>
    <span class="label-hover">
      <span class="inner">{text}</span>
    </span>
    <span class="border"></span>
  </a>
);

export default Button;
