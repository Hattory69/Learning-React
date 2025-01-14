import React from "react";
import { Link, LinkProps } from "react-router-dom";
import "./linkComponent.css";

type LinkComponentProps = {url: LinkProps['to']}

export function LinkComponent({ url }: LinkComponentProps) {
  return (
    <Link
      className='link-style'
      to={url}
    />
  );
}
