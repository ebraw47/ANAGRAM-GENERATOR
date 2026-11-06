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
  "w-full rounded-xl border border-white/15 bg-[#02060D] px-4 py-3 text-white placeholder:text-ink-mute focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-brand/30";

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
    <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6 shadow-soft md:p-8">
      <h2 className="mb-6 text-center font-display text-2xl font-bold text-white">Send Us a Message</h2>

      {formSubmitted ? (
        <div className="mb-6 rounded-xl border border-brand/35 bg-brand/15 p-4 text-center text-navy-200">
          Thanks! Your email client should open shortly. We typically reply within 24–48 hours.
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white">
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
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white">
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
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-white">
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
          className="w-full rounded-xl bg-brand py-3.5 font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-ring"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
