'use client';

import NextTopLoader from 'nextjs-toploader';

const TopLoader = () => (
  <NextTopLoader
    color="#2cb57c"
    initialPosition={0.08}
    crawlSpeed={30}
    height={6}
    crawl={true}
    showSpinner={false}
    easing="ease"
    speed={200}
    shadow="0 0 10px #2cb57c,0 0 5px #2cb57c"
    zIndex={1600}
    showAtBottom={false}
  />
);

export default TopLoader;
