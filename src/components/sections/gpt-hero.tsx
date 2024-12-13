import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { AiShowcaseModal } from '@/components/ai-showcase-modal';

export function GptHero() {
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);
  
  const handleStartBuilding = () => {
    window.open('https://intellisyncsolutions.io', '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main heading with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 px-6 py-2 mb-6">
              <span className="text-sm md:text-base font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Build Your Custom AI Assistant in Minutes
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl mx-auto">
              Transform Your Business with{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Custom AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create, customize, and deploy AI assistants tailored to your business needs. No coding required.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="gradient-primary group"
              onClick={handleStartBuilding}
            >
              Start Building Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group"
              onClick={() => setIsShowcaseOpen(true)}
            >
              View Demo
              <Bot className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              { title: 'No Code Required', icon: Sparkles },
              { title: '24/7 Support', icon: Bot },
              { title: 'Custom Training', icon: ArrowRight },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-muted/50"
              >
                <feature.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  {feature.title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <AiShowcaseModal 
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
      />
    </section>
  );
}
