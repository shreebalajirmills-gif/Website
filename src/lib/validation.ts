import { z } from 'zod';

export const inquirySchema = z.object({
  segment: z.enum(['distributor', 'contractor', 'project', 'investor'], {
    message: 'Please select a buyer segment',
  }),
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(255, 'Company name is too long'),
  contactName: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(255, 'Contact name is too long'),
  email: z.string().email('Please enter a valid business email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number format'),
  message: z
    .string()
    .min(10, 'Message should be at least 10 characters detailing your requirement')
    .max(2000, 'Message cannot exceed 2000 characters'),
  specInterest: z.enum(['structural_steel', 'tmt_bar', 'both'], {
    message: 'Please select a product of interest',
  }),
  
  // Segment optional inputs
  currentSuppliers: z.string().optional(),
  annualVolumeMT: z.string().optional(),
  growthAspiration: z.string().optional(),
  projectScope: z.string().optional(),
  requiredVolumeMT: z.string().optional(),
  deliveryTimeline: z.string().optional(),
  investmentScale: z.string().optional(),
});

export type InquirySchemaType = z.infer<typeof inquirySchema>;
