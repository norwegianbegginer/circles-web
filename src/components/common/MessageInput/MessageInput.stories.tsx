import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import MessageInput, { MessageInputProps } from './index';

export default {
    title: 'Circles Web/MessageInput',
    component: MessageInput,
    argTypes: {
        value: { control: 'string' },
    },
} as Meta;

const Template: Story<MessageInputProps> = (args) => <MessageInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    value: "Hello World!"
};