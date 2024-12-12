import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { promotions, Promotion } from '@/lib/promotions-data';
import { CalendarDays, ChevronRight, Timer, Mail } from 'lucide-react';
import { useState } from 'react';
import { PromotionsModal } from '@/components/promotions-modal';

export default function Promotions() {
  const currentDate = new Date();
  const activePromotions = promotions.filter(
    promo => 
      new Date(promo.startDate) <= currentDate && 
      new Date(promo.endDate) >= currentDate
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  if (activePromotions.length === 0) return null;

  return (
    <section id="promotions" className="py-16 bg-gradient-to-b from-background to-background/50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient-primary">
            Special Offers
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Take advantage of our limited-time promotions and exclusive offers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {activePromotions.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                relative overflow-hidden rounded-xl p-6 
                ${promo.highlight 
                  ? 'bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-700/40 border border-gray-700/50' 
                  : 'bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-700/30 border border-border'
                }
              `}
            >
              {promo.badge && (
                <Badge className="absolute top-4 right-4 bg-gray-800/60">
                  {promo.badge}
                </Badge>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{promo.title}</h3>
                <p className="text-muted-foreground">{promo.description}</p>

                {promo.features && (
                  <ul className="space-y-2">
                    {promo.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>Until {new Date(promo.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    <span>
                      {Math.ceil((new Date(promo.endDate).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))} days left
                    </span>
                  </div>
                </div>

                {promo.terms && (
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">Terms & Conditions:</p>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      {promo.terms.map((term, i) => (
                        <li key={i}>{term}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex justify-between items-center">
                  <Button
                    onClick={() => {
                      setSelectedPromotion(promo);
                      setIsModalOpen(true);
                    }}
                    className="gradient-primary"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    I'm Interested
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Promotions Modal */}
      <PromotionsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPromotion(null);
        }}
        selectedPromotion={selectedPromotion}
      />
    </section>
  );
}
