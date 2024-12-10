import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Promotion } from '@/lib/promotions-data';
import { Mail } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

export function PromotionsModal({ 
  isOpen, 
  onClose,
  selectedPromotion
}: { 
  isOpen: boolean; 
  onClose: () => void;
  selectedPromotion: Promotion | null;
}) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct email body
    const emailSubject = selectedPromotion 
      ? `Interest in Promotion: ${selectedPromotion.title}`
      : 'Interest in All Upcoming Promotions';
      
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}

Interested in: ${selectedPromotion ? selectedPromotion.title : 'All Upcoming Promotions'}
Message: ${formData.message}

Promotion Details:
${selectedPromotion ? `
Title: ${selectedPromotion.title}
Description: ${selectedPromotion.description}
Valid until: ${selectedPromotion.endDate}
` : 'Interest in all upcoming promotions'}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:chris.june@intellisync.ca?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    // Reset form and close modal
    setFormData(initialFormData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {selectedPromotion ? selectedPromotion.title : 'Express Interest in Promotions'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="john.smith@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Company Name LLC"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Let us know if you have any specific requirements or questions about the promotion..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full gradient-primary">
            <Mail className="mr-2 h-4 w-4" />
            Express Interest
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
