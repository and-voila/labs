import MarketingIndexBenefits from '@/components/marketing/marketing-index-benefits';
import MarketingIndexHero from '@/components/marketing/marketing-index-hero';
import MarketingIndexOpenSource from '@/components/marketing/marketing-index-open-source';

export default async function IndexPage() {
  return (
    <>
      <MarketingIndexHero />
      <MarketingIndexBenefits />
      <MarketingIndexOpenSource />
    </>
  );
}
