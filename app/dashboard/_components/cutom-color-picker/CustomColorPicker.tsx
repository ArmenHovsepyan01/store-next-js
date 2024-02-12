import React, { FC, useState } from 'react';
import { ColorPicker } from 'antd';

interface CustomColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}
const CustomColorPicker: FC<CustomColorPickerProps> = ({ color, setColor }) => {
  return (
    <ColorPicker
      defaultValue={color}
      size={'small'}
      showText
      onChange={(value, hex) => {
        setColor(hex);
      }}
    />
  );
};

export default CustomColorPicker;
