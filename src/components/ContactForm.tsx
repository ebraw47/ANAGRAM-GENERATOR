'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BRAND } from '@/lib/siteConfig';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const fieldClass =
  "tool-glass-inset w-full px-4 py-3 text-ink placeholder:text-ink-mute focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`Contact from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
    reset();
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="tool-glass p-6 md:p-8">
      <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">Send Us a Message</h2>

      {formSubmitted ? (
        <div className="mb-6 border-2 border-navy-900 bg-brand-soft p-4 text-center text-ink">
          Thanks! Your email client should open shortly. We typically reply within 24–48 hours.
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={fieldClass}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email*
          </label>
          <input
            id="email"
            type="email"
            className={fieldClass}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
            Message*
          </label>
          <textarea
            id="message"
            rows={5}
            className={fieldClass}
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full border-2 border-navy-900 bg-brand py-3.5 font-bold uppercase tracking-wide text-white hard-shadow-ink transition hover:bg-brand-dark focus-ring"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
