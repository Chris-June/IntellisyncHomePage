import { GptBuilder } from '@/components/sections/gpt-builder';
import { GptPricing } from '@/components/sections/gpt-pricing';

export default function GptBuilderPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-20">
        <div className="pt-20">
          <GptBuilder />
        </div>
        <GptPricing />
      </div>
    </div>
  );
}
