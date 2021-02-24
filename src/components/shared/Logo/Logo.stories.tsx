import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import Logo, { LogoProps } from './index';

export default {
    title: 'Circles Web/Logo',
    component: Logo,
    argTypes: {
        style: { description: "Style passed to the root element.", control: 'object' },
        onClick: { description: "Callback used for handling clicks.", action: "clicked" }
    },
} as Meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {

};