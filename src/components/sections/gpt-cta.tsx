import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Zap } from 'lucide-react';
import { useState } from 'react';
import { GptContactForm } from '@/components/gpt-contact-form';

export function GptCta() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const handleStartBuilding = () => {
    window.open('https://intellisyncsolutions.io', '_blank');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background -z-10" />

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-muted/50 to-muted border border-muted"
        >
          <div className="relative p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              {/* Left side content */}
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 px-4 py-1.5">
                  <span className="text-sm font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Ready to Transform?
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                  Start Building Your
                  <br />
                  Custom AI Today
                </h2>
                <p className="text-muted-foreground max-w-[600px]">
                  Join thousands of businesses already using our platform to create powerful, 
                  custom AI assistants that drive growth and efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="gradient-primary group"
                    onClick={handleStartBuilding}
                  >
                    Get Started Free
                    <Zap className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="group"
                    onClick={() => setShowContactForm(true)}
                  >
                    Talk to an Expert
                    <Bot className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  </Button>
                </div>
              </div>

              {/* Right side stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                {[
                  { stat: '10x', label: 'Faster Development' },
                  { stat: '24/7', label: 'Customer Support' },
                  { stat: '100%', label: 'Customizable' },
                  { stat: '0', label: 'Code Required' },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                      {item.stat}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <GptContactForm 
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />
    </section>
  );
}
