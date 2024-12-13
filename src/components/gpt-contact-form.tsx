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
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface GptContactFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  useCase: string;
  expectedUsers: string;
  features: string[];
  timeline: string;
  budget: string;
  additionalInfo: string;
}

interface GptContactFormProps {
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

const timelines = [
  "Immediately",
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "6+ months"
];

const budgets = [
  "Under $1,000/month",
  "$1,000 - $5,000/month",
  "$5,000 - $10,000/month",
  "$10,000+/month",
  "Not sure yet"
];

const featureDetails = [
  {
    name: "Multi-modal Integration",
    description: "Enable your AI assistant to process and respond to various types of input including images, audio, and video. Perfect for visual product identification, audio transcription, or analyzing visual content for more comprehensive AI interactions."
  },
  {
    name: "Custom Knowledge Base",
    description: "Upload your own documents, manuals, and data to create a personalized knowledge foundation for your AI assistant. Supports various file formats including PDFs, text files, and web content."
  },
  {
    name: "Multi-language Support",
    description: "Enable your AI assistant to communicate in multiple languages, with automatic language detection and translation capabilities. Perfect for global businesses and diverse user bases."
  },
  {
    name: "Analytics Dashboard",
    description: "Access comprehensive insights about user interactions, popular queries, response times, and user satisfaction metrics. Make data-driven decisions to improve your AI assistant's performance."
  },
  {
    name: "API Integration",
    description: "Connect your AI assistant with existing systems and third-party applications through our robust API. Enable seamless data exchange and workflow automation."
  },
  {
    name: "Custom UI/Branding",
    description: "Tailor the appearance of your AI assistant to match your brand identity. Customize colors, fonts, logos, and chat interface elements for a cohesive user experience."
  },
  {
    name: "Advanced Security",
    description: "Enterprise-grade security features including end-to-end encryption, role-based access control, data retention policies, and compliance with industry standards."
  },
  {
    name: "Data Export",
    description: "Export conversation logs, analytics data, and user insights in various formats for further analysis or integration with your business intelligence tools."
  }
];

export function GptContactForm({ isOpen, onClose }: GptContactFormProps) {
  const [formData, setFormData] = useState<GptContactFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
    useCase: '',
    expectedUsers: '',
    features: [],
    timeline: '',
    budget: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: EmailJS Configuration
    // 1. Get SERVICE_ID from Email Services tab
    // 2. Get TEMPLATE_ID from Email Templates tab
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'chris.june@intellisync.ca',
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          role: formData.role,
          industry: formData.industry,
          use_case: formData.useCase,
          expected_users: formData.expectedUsers,
          desired_features: formData.features.join(', '),
          timeline: formData.timeline,
          budget: formData.budget,
          additional_info: formData.additionalInfo,
        }
      );

      toast.success('Form submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        industry: '',
        useCase: '',
        expectedUsers: '',
        features: [],
        timeline: '',
        budget: '',
        additionalInfo: ''
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tell Us About Your AI Assistant Needs</DialogTitle>
          <DialogDescription>
            Help us understand your requirements better so we can provide the most suitable solution for your business.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Your role/title"
                  required
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => handleSelectChange('industry', value)}
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
                <Label htmlFor="expectedUsers">Expected Monthly Users *</Label>
                <Input
                  id="expectedUsers"
                  name="expectedUsers"
                  value={formData.expectedUsers}
                  onChange={handleInputChange}
                  placeholder="e.g., 1000"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="useCase">Primary Use Case *</Label>
              <Textarea
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleInputChange}
                placeholder="Examples:
• Customer Service: 24/7 support agent answering product questions and handling common issues
• Sales: AI sales assistant helping customers find the right products and completing purchases
• HR: Internal assistant helping with employee onboarding and answering HR policy questions
• Education: Teaching assistant providing personalized tutoring and homework help
• Healthcare: Medical information assistant helping patients with appointment scheduling and basic health queries
• Legal: Legal document analyzer and contract review assistant
• Real Estate: Property listing assistant helping clients find suitable properties"
                className="min-h-[200px]"
                required
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Desired Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featureDetails.map((feature) => (
                <div key={feature.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.name}
                    checked={formData.features.includes(feature.name)}
                    onCheckedChange={() => handleFeatureToggle(feature.name)}
                  />
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={feature.name}>{feature.name}</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px] p-4">
                          <p className="text-sm">{feature.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline and Budget */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Timeline & Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Implementation Timeline *</Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => handleSelectChange('timeline', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline} value={timeline.toLowerCase()}>
                        {timeline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Monthly Budget Range *</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleSelectChange('budget', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgets.map((budget) => (
                      <SelectItem key={budget} value={budget.toLowerCase()}>
                        {budget}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Any other details you'd like to share..."
              className="h-24"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>Submit Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
