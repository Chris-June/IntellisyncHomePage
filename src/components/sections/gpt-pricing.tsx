import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gptPricingTiers } from '@/lib/gpt-pricing-data';
import { motion } from 'framer-motion';
import { CustomAIModal } from '@/components/custom-ai-modal';

export function GptPricing() {
  const [showCustomModal, setShowCustomModal] = useState(false);

  const handleTierAction = (tier: typeof gptPricingTiers[0]) => {
    if (tier.id === 'enterprise') {
      setShowCustomModal(true);
    } else {
      window.location.href = 'https://intellisyncsolutions.io';
    }
  };

  return (
    <section className="w-full py-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Choose Your Plan
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Select the perfect plan to power your AI journey
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {gptPricingTiers.map((tier) => (
              <motion.div
                key={tier.id}
                whileHover={{ scale: 1.02 }}
                className={`relative flex flex-col p-6 bg-background rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 ${
                  tier.highlighted ? 'scale-105 shadow-xl' : ''
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 text-sm font-medium text-white text-center">
                    Most Popular
                  </div>
                )}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tier.description}</p>
                  </div>
                  <div className="space-y-2">
                    {tier.price !== undefined ? (
                      <>
                        <span className="text-3xl font-bold">${tier.price}</span>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/month</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold">Custom Pricing</span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6">
                  <Button
                    onClick={() => handleTierAction(tier)}
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    {tier.id === 'enterprise' ? 'Contact Us' : 'Get Started'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <CustomAIModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
      />
    </section>
  );
}
