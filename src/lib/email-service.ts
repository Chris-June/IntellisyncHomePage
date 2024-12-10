import { addOns } from './pricing-data';

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  selectedAddOns: string[];
  selectedTier?: {
    name: string;
    price: number;
  } | null;
  subject?: string;
  type?: string;
}

export async function sendContactEmail(data: EmailData) {
  const selectedAddOnNames = data.selectedAddOns.map(
    id => addOns.find(addon => addon.id === id)?.name || id
  );

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        selectedAddOns: selectedAddOnNames,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
