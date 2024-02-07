import { Flex, Skeleton } from 'antd';
import Input from 'antd/lib/skeleton/Input';
import SkeletonButton from 'antd/lib/skeleton/Button';
import SkeletonImage from 'antd/lib/skeleton/Image';

const Loading = () => {
  return (
    <main>
      <Flex gap={24}>
        <div className="image-slider">
          <Flex
            align={'center'}
            justify={'space-between'}
            style={{ width: 400 }}
            vertical={true}
            gap={24}
          >
            <SkeletonImage active={true} style={{ width: 400, height: 400 }} />
            <Flex justify={'space-between'} style={{ width: '100%' }}>
              <SkeletonImage active={true} />
              <SkeletonImage active={true} />
              <SkeletonImage active={true} />
            </Flex>
          </Flex>
        </div>
        <Flex gap={24} vertical={true} className="product">
          <Input active={true} />
          <Skeleton active={true} style={{ width: 400 }} />
          <SkeletonButton active={true} />
        </Flex>
      </Flex>
    </main>
  );
};

export default Loading;
