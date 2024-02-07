'use client';

import { Image } from 'antd';
import { FC, useState } from 'react';

interface CustomImageProps {
  src: string;
  width: number;
}
const CustomImage: FC<CustomImageProps> = ({ src, width }) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  return (
    <Image
      alt={'Image'}
      src={imgSrc}
      width={width}
      onError={(e) => {
        e.stopPropagation();
        setImgSrc('https://miro.medium.com/v2/resize:fit:1358/1*ylV603DJXpTpBsiGm4BcAQ.png');
      }}
    />
  );
};

export default CustomImage;
