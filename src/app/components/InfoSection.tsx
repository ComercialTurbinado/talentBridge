'use client';

interface InfoSectionProps {
  title: string;
  description: string;
  items: string[];
  icon: string;
}

export default function InfoSection({ title, description, items, icon }: InfoSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-shrink-0">
          {icon === 'book' && (
            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          )}
          {icon === 'lightning' && (
            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          {icon === 'building' && (
            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <p className="text-gray-600 mb-6">{description}</p>

      {items.length > 0 && (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-[#D4AF37] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 