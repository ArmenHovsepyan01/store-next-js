import React from 'react';
import { Carousel } from 'antd';
import styles from './Slide.module.scss';

import shoes from '../../../public/images/shoes.jpg';
import furniture from '../../../public/images/furniture.jpg';
import clothes from '../../../public/images/clothes.jpg';
import electronics from '../../../public/images/electronics.png';
import Image from 'next/image';

const slides = [clothes, shoes, furniture, electronics];

const Slide = () => {
  return (
    <div style={{ width: '100%' }}>
      <Carousel autoplay={true}>
        {slides.map((item, i) => (
          <div key={i} style={{ width: '100%', height: '100%' }}>
            {/*<Image src={item.src} alt={'slide'} width={1920} height={1200} />*/}
            <div className={styles.slideItem} style={{ backgroundImage: `url(${item.src})` }}></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slide;
