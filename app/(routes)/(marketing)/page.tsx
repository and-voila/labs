import MarketingIndexBenefits from '@/app/components/marketing/marketing-index-benefits';
import MarketingIndexHero from '@/app/components/marketing/marketing-index-hero';
import MarketingIndexOpenSource from '@/app/components/marketing/marketing-index-open-source';

export default async function IndexPage() {
  return (
    <>
      <MarketingIndexHero />
      <MarketingIndexBenefits />
      <MarketingIndexOpenSource />
    </>
  );
}
