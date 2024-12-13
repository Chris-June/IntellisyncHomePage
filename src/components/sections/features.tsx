import { motion } from 'framer-motion';
import {
  Brain,
  ExternalLink,
  Gauge,
  Puzzle,
  Rocket,
  Settings,
  Zap,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FeatureModal } from '@/components/feature-modal';

const features = [
  {
    title: 'Built-In Analytics',
    description:
      'Gain actionable insights without third-party integrations. Monitor performance and user behavior in real-time.',
    userBenefit: 'Make data-driven decisions with ease. Our analytics dashboard provides clear, actionable insights that help you understand your users and optimize your digital presence without the complexity of integrating multiple tools.',
    businessValue: 'We believe that data should empower, not overwhelm. Our analytics are designed to surface the metrics that matter most, helping you focus on growth while we handle the technical complexity.',
    icon: Gauge,
  },
  {
    title: 'AI Integration',
    description:
      'Leverage cutting-edge AI tools embedded directly into your web experience for enhanced functionality.',
    userBenefit: 'Transform your digital presence with AI that works for you. From personalized user experiences to automated content optimization, our AI tools help you stay ahead of the competition without requiring technical expertise.',
    businessValue: 'Our mission is to democratize AI technology. We continuously evolve our AI capabilities to ensure you have access to the latest innovations that drive business growth.',
    icon: Brain,
  },
  {
    title: 'Seamless Integration',
    description:
      'Connect with your existing tools and workflows effortlessly. No complex setup required.',
    userBenefit: 'Save time and resources by connecting IntelliSync with your existing tools instantly. Our platform adapts to your workflow, not the other way around, ensuring a smooth transition and immediate productivity gains.',
    businessValue: 'We understand the importance of flexibility in modern business operations. Our integration capabilities are designed to grow with your needs, ensuring long-term scalability.',
    icon: Puzzle,
  },
  {
    title: 'Lightning Fast',
    description:
      'Optimized performance ensures your applications run at peak efficiency, every time.',
    userBenefit: 'Deliver exceptional user experiences with blazing-fast performance. Quick load times and responsive interfaces keep your users engaged and improve conversion rates across all devices.',
    businessValue: 'Performance is not just a feature—it\'s a fundamental aspect of our platform. We continuously optimize our infrastructure to ensure your success in an increasingly speed-conscious digital landscape.',
    icon: Zap,
  },
  {
    title: 'Customizable',
    description:
      'Tailor every aspect of your digital presence to match your brand and requirements perfectly.',
    userBenefit: 'Create a unique digital presence that perfectly reflects your brand. Our customization options give you complete control over your platform\'s look, feel, and functionality without requiring technical expertise.',
    businessValue: 'We believe in empowering your uniqueness. Our platform provides the flexibility you need while maintaining the stability and security you expect from an enterprise solution.',
    icon: Settings,
  },
  {
    title: 'Scalable Solutions',
    description:
      'Grow without limits. Our infrastructure scales seamlessly with your business needs.',
    userBenefit: 'Focus on growing your business while we handle the technical scalability. Our platform grows with you, ensuring consistent performance and reliability regardless of your user base or traffic volume.',
    businessValue: 'Scalability is in our DNA. We build and maintain the infrastructure that powers your growth, so you can focus on what matters most—your business objectives.',
    icon: Rocket,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section id="features" className="py-24 bg-muted/50 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient-primary">
              Features That Empower Your Growth
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover how our comprehensive suite of features can transform your
              digital presence and accelerate your success.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 items-stretch mt-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="h-full"
              >
                <Card 
                  className="relative flex flex-col h-full transform transition-all duration-200 hover:scale-[1.02] border-white/20"
                >
                  <CardHeader className="relative space-y-2">
                    <div className="flex items-center space-x-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base text-left">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground text-left">Key Benefits:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Rocket className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-left">{feature.userBenefit}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-left">{feature.businessValue}</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-auto"
                      onClick={() => setSelectedFeature(feature)}
                    >
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {selectedFeature && (
          <FeatureModal
            isOpen={!!selectedFeature}
            onClose={() => setSelectedFeature(null)}
            feature={selectedFeature}
          />
        )}
      </div>
    </section>
  );
}