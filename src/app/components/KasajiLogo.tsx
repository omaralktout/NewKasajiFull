import logo from "../../imports/image_75-2.png";

interface KasajiLogoProps {
  size?: number;
  variant?: "color" | "white";
  className?: string;
}

export function KasajiLogo({ size = 32, className = "" }: KasajiLogoProps) {
  return (
    <img
      src={logo}
      alt="Kasaji Logo"
      style={{ width: size, height: size, objectFit: "contain", display: "block" }}
      className={className}
    />
  );
}
