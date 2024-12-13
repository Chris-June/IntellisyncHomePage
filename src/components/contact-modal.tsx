import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { addOns } from '@/lib/pricing-data';
import { PricingTier } from '@/lib/gpt-pricing-data';
import { sendContactEmail, EmailData } from '@/lib/email-service';
import { toast } from 'sonner';
import { Info } from 'lucide-react';
import clsx from 'clsx';

// Helper function to get max add-ons based on tier
const getMaxAddOns = (tier: PricingTier | null | undefined) => {
  if (!tier) return Infinity;
  switch (tier.id) {
    case 'basic':
      return 2;
    case 'professional':
      return 4;
    case 'premium':
      return 4;
    default:
      return Infinity;
  }
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: PricingTier | null;
}

export function ContactModal({ isOpen, onClose, selectedTier }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    selectedAddOns: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailData: EmailData = {
        ...formData,
        selectedTier: selectedTier ? {
          name: selectedTier.name,
          price: selectedTier.price ?? 0
        } : null
      };
      
      await sendContactEmail(emailData);
      toast.success('Thank you for your interest! We will contact you soon.');
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddOnToggle = (addOnId: string) => {
    setFormData(prev => {
      const currentAddOns = prev.selectedAddOns;
      const maxAllowed = getMaxAddOns(selectedTier);
      
      if (currentAddOns.includes(addOnId)) {
        return {
          ...prev,
          selectedAddOns: currentAddOns.filter((id) => id !== addOnId)
        };
      }
      
      // Check if we've reached the maximum allowed add-ons
      if (currentAddOns.length >= maxAllowed) {
        toast.error(`You can only select up to ${maxAllowed} add-ons with the ${selectedTier?.name} plan`);
        return prev;
      }
      
      return {
        ...prev,
        selectedAddOns: [...currentAddOns, addOnId]
      };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[960px] max-h-[90vh] bg-background border-2 border-gray-700/50 focus-within:border-gray-600 rounded-2xl flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-6">
          <DialogTitle className="text-2xl">
            {selectedTier ? `Get Started with ${selectedTier.name} Plan` : 'Contact Us'}
          </DialogTitle>
          <DialogDescription className="text-base">
            Fill out the form below and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8">
                <div className="space-y-2 min-w-0">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2 min-w-0">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2 min-w-0">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Additional Features</Label>
                <div className="text-sm text-muted-foreground">
                  {selectedTier ? (
                    <>
                      Select up to {getMaxAddOns(selectedTier)} additional features 
                      ({formData.selectedAddOns.length}/{getMaxAddOns(selectedTier)} selected)
                    </>
                  ) : (
                    'Select any additional features you\'d like to discuss'
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {addOns.map((addon) => {
                    const isSelected = formData.selectedAddOns.includes(addon.id);
                    const maxReached = !isSelected && formData.selectedAddOns.length >= getMaxAddOns(selectedTier);
                    
                    return (
                      <div
                        key={addon.id}
                        className="relative flex items-center gap-3"
                      >
                        <Button
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          className={clsx(
                            "flex-1 justify-start text-sm py-2 px-3 min-w-0",
                            maxReached && "opacity-50 cursor-not-allowed"
                          )}
                          onClick={() => handleAddOnToggle(addon.id)}
                          disabled={maxReached}
                        >
                          <span className="truncate pr-2">{addon.name}</span>
                        </Button>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 shrink-0 p-0"
                              >
                                <Info className="h-4 w-4 stroke-gray-400" />
                                <span className="sr-only">More information</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end" className="max-w-[250px] bg-gray-900 text-gray-100">
                              {addon.description}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project requirements..."
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="h-32 w-full"
                />
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="flex-shrink-0 pt-6">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="bg-primary"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
