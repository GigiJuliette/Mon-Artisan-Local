import gradiant from "@/assets/gradiant.png";
import maskFlower from "@/assets/maskFlower.png";
import type { FlowerProps } from "./types";

export const Flower = ({ size }: FlowerProps) => {
  return (
    <div
      aria-hidden="true"
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${gradiant})`,
        maskImage: `url(${maskFlower})`,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskImage: `url(${maskFlower})`,
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};
