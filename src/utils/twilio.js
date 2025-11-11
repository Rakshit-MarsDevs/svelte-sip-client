// Wrong import path - this file doesn't export what we need
import { Device } from 'twilio-client';

export function createDevice(token) {
  // Missing token validation
  return new Device(token);
}

// Missing export for other functions used elsewhere
