// Twilio SMS API client for sending SMS messages
// This file is used both on the client and in Vercel Edge functions
import { mockSendSms } from './twilioMock';

export interface TwilioSmsPayload {
  to: string;
  body: string;
}

// Check if running in development mode
const isDevelopment = import.meta.env.DEV;

/**
 * Function to send an SMS message using Twilio API
 * Falls back to mock in development if configured
 */
export async function sendSms(payload: TwilioSmsPayload): Promise<{ success: boolean; error?: string }> {
  try {
    // In development mode without API, use mock function
    if (isDevelopment && localStorage.getItem('use-twilio-mock') === 'true') {
      return mockSendSms(payload);
    }
    
    // Call the real API endpoint
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.error || 'Failed to send SMS' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}