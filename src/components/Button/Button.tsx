import type { ButtonTypes } from "./types";
import "./button.css";

export const Button = ({ variant, className, type, children }: ButtonTypes) => {
  return (
    <button type={type} className={`${className} ${variant}`}>
      {children}
    </button>
  );
};
