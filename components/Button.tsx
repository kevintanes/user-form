import { Button as ButtonMUI } from "@mui/material";
import React from "react";

interface ButtonProps {
  title?: string;
  color?: "info" | "primary" | "error" | "warning";
  onClick?: () => void;
  variant?: "contained" | "outlined" | "text";
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <ButtonMUI type={props.type} variant={props.variant} color={props.color} onClick={props.onClick}>
      {props.title}
    </ButtonMUI>
  );
};

export default Button;
