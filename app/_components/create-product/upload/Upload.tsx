'use client';

import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';

interface UploadProps {
  handleUploadChanges: (e: UploadChangeParam<UploadFile<any>>) => void;
  removeFromFilesList: (e: UploadFile<any>) => void;
  isManinImage?: boolean;
}

const App: React.FC<UploadProps> = ({ handleUploadChanges, removeFromFilesList, isManinImage }) => (
  <>
    <Upload
      listType="picture"
      onChange={handleUploadChanges}
      onRemove={removeFromFilesList}
      multiple={true}
      maxCount={isManinImage ? 1 : undefined}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  </>
);

export default App;
