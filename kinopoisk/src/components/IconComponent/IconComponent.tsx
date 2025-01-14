import React from "react";

interface IconComponentTypes {
  icon: string;
  iconStyle?: string;
  viewBox?: string;
}

export function IconComponent({ icon, iconStyle, viewBox }: IconComponentTypes) {
  return (
    <svg className={iconStyle} viewBox={viewBox || "0 0 100 100"}>
      <use href={`${icon}`} />
    </svg>
  );
}
