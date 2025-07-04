// src/pages/contact.tsx
export default function Contact() {
    return (
      <div className="max-w-3xl mx-auto p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <p className="mb-2">Have questions or need support?</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Email: <a href="mailto:anupambhosle38@gmail.com" className="text-blue-400 underline">anupambhosle38@gmail.com</a></li>
          <li>Phone: <a href="tel:+91623120185" className="text-blue-400 underline">+91 623120185</a></li>
        </ul>
      </div>
    );
  }
  