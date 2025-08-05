// Mock Twilio SMS API client for local development
import { TwilioSmsPayload } from './twilio';

/**
 * Mock function to simulate sending an SMS message
 * This is used in development mode when Twilio credentials aren't available
 */
export async function mockSendSms(payload: TwilioSmsPayload): Promise<{ success: boolean; error?: string }> {
  console.log('MOCK SMS SENT', payload);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Always return success in mock mode
  return { success: true };
}