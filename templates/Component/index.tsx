// Deps scoped imports.
import React from "react";
import { useLittera } from "react-littera";
import cx from "classnames";

// Project scoped imports.

// Component scoped imports. 
import { useStyles } from "./styles";
import { translations } from "./trans";
import { ComponentProps } from './types';

/**
 * Example component
 * @description This is an example component including translations and theming.
 * @version 1.0.0
 * @author Assembless <support@assembless.tech>
 */
const Component = (props: ComponentProps) => {
    const translated = useLittera(translations);
    const classes = useStyles();

    return <div className={cx(classes.root, props.className)} style={props.style}>
        <h4 className={classes.h4}>{translated.example}</h4>
    </div>
}

// Time to export! 🚚
export default Component;