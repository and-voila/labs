'use client';

import { useTheme } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';

const TopLoader = () => {
  const { theme } = useTheme();
  const color = theme === 'dark' ? '#a6fd29' : '#5aa300';

  return (
    <NextTopLoader
      color={color}
      initialPosition={0.08}
      crawlSpeed={30}
      height={6}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow={`0 0 10px ${color}, 0 0 5px ${color}`}
      zIndex={1600}
      showAtBottom={false}
    />
  );
};

export default TopLoader;
