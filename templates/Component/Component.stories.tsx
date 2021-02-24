import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import Component from './index';
import { ComponentProps } from "./types";

export default {
    title: 'Circles Web/Component',
    component: Component,
    argTypes: {
        className: { description: "Classes passed to the root element.", control: 'string' },
        style: { description: "Style passed to the root element.", control: 'object' },
    },
} as Meta;

const Template: Story<ComponentProps> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {
    style: { color: "#9C6" }
};