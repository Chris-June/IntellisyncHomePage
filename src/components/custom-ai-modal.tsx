import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';

interface CustomAIFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  teamSize: string;
  budget: string;
  useCase: string;
  requirements: string;
  features: string[];
  timeline: string;
}

interface CustomAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Other"
];

const teamSizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-1000",
  "1000+"
];

const budgetRanges = [
  "Under $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+"
];

const timelines = [
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "6+ months"
];

const aiFeatures = [
  { id: "customKnowledge", label: "Custom Knowledge Base" },
  { id: "multiModal", label: "Multi-Modal Capabilities" },
  { id: "apiIntegration", label: "API Integration" },
  { id: "analytics", label: "Advanced Analytics" },
  { id: "multiLingual", label: "Multi-Lingual Support" },
  { id: "customUi", label: "Custom UI/UX" },
  { id: "security", label: "Enterprise Security" },
  { id: "compliance", label: "Compliance Features" }
];

export function CustomAIModal({ isOpen, onClose }: CustomAIModalProps) {
  const [formData, setFormData] = useState<CustomAIFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
    teamSize: '',
    budget: '',
    useCase: '',
    requirements: '',
    features: [],
    timeline: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create email content
      const selectedFeatures = aiFeatures
        .filter(feature => formData.features.includes(feature.id))
        .map(feature => feature.label)
        .join('\n- ');

      const emailBody = `
New Custom AI Solution Inquiry

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company}
- Role: ${formData.role}

Business Details:
- Industry: ${formData.industry}
- Team Size: ${formData.teamSize}
- Budget Range: ${formData.budget}
- Timeline: ${formData.timeline}

Project Details:
Primary Use Case:
${formData.useCase}

Selected Features:
- ${selectedFeatures}

Additional Requirements:
${formData.requirements}
`.trim();

      // Encode the email content for mailto URL
      const mailtoLink = `mailto:chris.june@intellisync.ca?subject=${encodeURIComponent('Custom AI Solution Inquiry')}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      toast.success('Opening your email client to send the inquiry');
      onClose();
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Custom AI Solution Inquiry</DialogTitle>
          <DialogDescription>
            Tell us about your custom AI requirements, and our team will create a tailored solution for your business.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData({ ...formData, industry: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size *</Label>
              <Select
                value={formData.teamSize}
                onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  {teamSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="useCase">Primary Use Case *</Label>
            <Textarea
              id="useCase"
              value={formData.useCase}
              onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
              placeholder="Describe the main purpose and goals of your custom AI solution"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Desired Features</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {aiFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.id}
                    checked={formData.features.includes(feature.id)}
                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                  />
                  <label
                    htmlFor={feature.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {feature.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range *</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Desired Timeline *</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Additional Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Any specific requirements, integrations, or compliance needs?"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Inquiry</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
