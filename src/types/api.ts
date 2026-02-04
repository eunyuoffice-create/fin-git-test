/**
 * Standard API response format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Contact form request data
 * Used for both API validation and Slack notifications
 */
export interface ContactFormRequest {
  company: string;
  name: string;
  phone: string;
  email: string;
  needs?: string;
  lang: string;
}