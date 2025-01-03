import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Sticker} from './Sticker';

const meta: Meta<typeof Sticker> = {
  component: Sticker,
};

export default meta;

type Story = StoryObj<typeof Sticker>;

export const Basic: Story = {args: {}};
