'use client';

import NextTopLoader from 'nextjs-toploader';

const TopLoader = () => (
  <NextTopLoader
    color="#C2E000"
    initialPosition={0.08}
    crawlSpeed={30}
    height={6}
    crawl={true}
    showSpinner={false}
    easing="ease"
    speed={200}
    shadow="0 0 10px #C2E000,0 0 5px #C2E000"
    zIndex={1600}
    showAtBottom={false}
  />
);

export default TopLoader;
