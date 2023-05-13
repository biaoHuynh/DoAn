import React from 'react';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Panel from 'rc-color-picker/lib/Panel';
import * as s from './Tables.styles';
export default function InputColor(props: any) {
  const { color, onChange, de } = props;

  const [internalColor, setInternalColor] = React.useState(color);

  const handleChange = (color: any) => {
    setInternalColor(color.color);

    if (onChange) {
      onChange(color);
    }
  };

  console.log(internalColor);

  const overlay = (
    <s.ColorPicker>
      <Panel color={internalColor} enableAlpha={false} onChange={handleChange} />
    </s.ColorPicker>
  );

  return (
    <>
      <Input
        value={internalColor || ''}
        onChange={(e) => setInternalColor(e.target.value)}
        suffix={
          <Dropdown trigger={['click']} overlay={overlay}>
            <Button style={{ background: internalColor }}> </Button>
          </Dropdown>
        }
        required
      />
      {internalColor}
    </>
  );
}
