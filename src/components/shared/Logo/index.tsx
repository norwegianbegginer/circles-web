import { Typography, TypographyProps } from "@material-ui/core";
import useStyles from "./styles";
import React from "react";

export type LogoProps = {
    typographyProps?: TypographyProps,
    style?: Object
    onClick?: () => void;
}

const Logo = (props: LogoProps) => {
    const classes = useStyles();

    const style = {
        ...props.style,
        // Set cursor to pointer if the Logo is clickable.
        cursor: props.onClick ? "pointer" : "initial"
    }

    return <Typography onClick={props.onClick} variant="h2" className={classes.root} style={style} {...props.typographyProps}>Circles</Typography>
}

export default Logo;