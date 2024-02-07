import { Flex, Skeleton, Space } from 'antd';
import SkeletonAvatar from 'antd/lib/skeleton/Avatar';
import SkeletonInput from 'antd/lib/skeleton/Input';

const Loading = () => {
  const skeletonWidthAndHeight: number = 280;
  return (
    <Flex
      justify={'space-between'}
      align={'center'}
      wrap={'wrap'}
      gap={24}
      style={{ marginBottom: 24 }}
    >
      <Flex vertical={true} gap={24}>
        <SkeletonAvatar
          shape={'square'}
          style={{ width: skeletonWidthAndHeight, height: skeletonWidthAndHeight }}
          active={true}
        />
        <SkeletonInput size={'small'} active={true} />
      </Flex>
      <Flex vertical={true} gap={24}>
        <SkeletonAvatar
          shape={'square'}
          style={{ width: skeletonWidthAndHeight, height: skeletonWidthAndHeight }}
          active={true}
        />
        <SkeletonInput size={'small'} active={true} />
      </Flex>
      <Flex vertical={true} gap={24}>
        <SkeletonAvatar
          shape={'square'}
          style={{ width: skeletonWidthAndHeight, height: skeletonWidthAndHeight }}
          active={true}
        />
        <SkeletonInput size={'small'} active={true} />
      </Flex>
      <Flex vertical={true} gap={24}>
        <SkeletonAvatar
          shape={'square'}
          style={{ width: skeletonWidthAndHeight, height: skeletonWidthAndHeight }}
          active={true}
        />
        <SkeletonInput size={'small'} active={true} />
      </Flex>
      <Flex vertical={true} gap={24}>
        <SkeletonAvatar
          shape={'square'}
          style={{ width: skeletonWidthAndHeight, height: skeletonWidthAndHeight }}
          active={true}
        />
        <SkeletonInput size={'small'} active={true} />
      </Flex>
      <Flex vertical={true} gap={24}>
        <SkeletonAvatar
          shape={'square'}
          style={{ width: skeletonWidthAndHeight, height: skeletonWidthAndHeight }}
          active={true}
        />
        <SkeletonInput size={'small'} active={true} />
      </Flex>
    </Flex>
  );
};

export default Loading;
