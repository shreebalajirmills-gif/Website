import React from 'react';
import { Meta, Story } from '@storybook/react';
import InquiryForm, { FormData } from './InquiryForm';

export default {
  title: 'Components/InquiryForm',
  component: InquiryForm,
} as Meta;

const Template: Story = (args) => <InquiryForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (data: FormData) => {
    // noop for story
    console.log('Submitted from story', data);
  },
};
