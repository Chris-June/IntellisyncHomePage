import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Hero from '@/components/sections/hero';
import Features from '@/components/sections/features';
import About from '@/components/sections/about';
import Work from '@/components/sections/work';

import GptBuilderPage from '@/pages/gpt-builder';
import Pricing from '@/components/sections/pricing';
import Promotions from '@/components/sections/promotions';
import PrivacyPolicy from '@/components/sections/policies/privacy-policy';
import TermsOfService from '@/components/sections/policies/terms-of-service';
import CookiePolicy from '@/components/sections/policies/cookie-policy';
import Documentation from '@/pages/documentation';
import Cta from '@/components/sections/cta';
import Footer from '@/components/sections/footer';
import { Toaster } from '@/components/ui/sonner';
import { useLocation } from 'react-router-dom';
import { DialogProvider } from '@/components/ui/dialog-provider';
import { VideoShowcase } from '@/components/sections/video-showcase';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

// TODO: EmailJS Setup
// 1. Create an account at https://www.emailjs.com/
// 2. Create a new Email Service (Gmail recommended)
// 3. Create an Email Template using the HTML template provided in the comments below
// 4. Get your Public Key from Account > API Keys
// 5. Update the EMAILJS_PUBLIC_KEY in your environment variables

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

function App() {
  const location = useLocation();
  const isStaticPage = ['/privacy-policy', '/terms-of-service', '/cookie-policy', '/documentation', '/gpt-builder'].includes(location.pathname);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <ThemeProvider>
      <DialogProvider>
        <div className="relative flex min-h-screen flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1 flex flex-col">
            {isStaticPage ? (
              {
                '/privacy-policy': <PrivacyPolicy />,
                '/terms-of-service': <TermsOfService />,
                '/cookie-policy': <CookiePolicy />,
                '/documentation': <Documentation />,
                '/gpt-builder': <GptBuilderPage />,
              }[location.pathname]
            ) : (
              <>
                <VideoShowcase />
                <Hero />
                <Features />
                <About />
                <Work />
                
                <Cta />
                <Promotions />
                <Pricing /> 
              </>
            )}
          </main>
          <Footer />
          <Toaster />
        </div>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;

/* EmailJS Template HTML:
<h2>New GPT Builder Contact Form Submission</h2>

<h3>Contact Information</h3>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Company:</strong> {{company}}</p>
<p><strong>Role:</strong> {{role}}</p>

<h3>Project Details</h3>
<p><strong>Industry:</strong> {{industry}}</p>
<p><strong>Expected Monthly Users:</strong> {{expected_users}}</p>
<p><strong>Implementation Timeline:</strong> {{timeline}}</p>
<p><strong>Monthly Budget Range:</strong> {{budget}}</p>

<h3>Requirements</h3>
<p><strong>Primary Use Case:</strong></p>
<p>{{use_case}}</p>

<p><strong>Desired Features:</strong></p>
<p>{{desired_features}}</p>

<h3>Additional Information</h3>
<p>{{additional_info}}</p>
*/
