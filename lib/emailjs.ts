import emailjs from '@emailjs/browser';

export interface EmailParams {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

/**
 * Dispatch contact form details to the administrator email using EmailJS.
 */
export async function sendContactEmail(params: EmailParams): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS credentials missing. Please define NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your .env.local file.'
    );
  }

  const templateParams = {
    from_name: params.name,
    from_email: params.email,
    from_phone: params.phone,
    project_type: params.projectType,
    budget_range: params.budget,
    message: params.message,
    reply_to: params.email || 'no-reply@jayinteriors.in',
  };

  await emailjs.send(serviceId, templateId, templateParams, publicKey);
}
