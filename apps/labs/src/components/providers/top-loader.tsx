'use client';

import NextTopLoader from 'nextjs-toploader';

const TopLoader = () => (
  <NextTopLoader
    color="#87F500"
    initialPosition={0.08}
    crawlSpeed={30}
    height={6}
    crawl={true}
    showSpinner={false}
    easing="ease"
    speed={200}
    shadow="0 0 10px #87F500,0 0 5px #87F500"
    zIndex={1600}
    showAtBottom={false}
  />
);
export default TopLoader;
