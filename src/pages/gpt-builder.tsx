import { GptBuilder } from '@/components/sections/gpt-builder';
import { GptPricing } from '@/components/sections/gpt-pricing';
import { GptHero } from '@/components/sections/gpt-hero';
import { GptCta } from '@/components/sections/gpt-cta';

export default function GptBuilderPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-20">
        <GptHero />
        <GptBuilder />
        <GptCta />
        <GptPricing />
      </div>
    </div>
  );
}
