interface FeatureSectionsProps {
  dict: {
    section1: { title: string; challenges: string[]; badge: string };
    section2: {
      title: string;
      manual: { label: string; time: string; note: string; description: string; additionalNote: string };
      ai: { label: string; time: string; description: string };
    };
    section3: { badge: string; title: string; description: string };
    section4: { badge: string; title: string; description: string };
    section5: { badge: string; title: string; description: string };
    section6: { badge: string; title: string; description: string };
  };
}

export default function FeatureSections({ dict }: FeatureSectionsProps) {
  return (
    <>
      {/* Section 1 - Why FinProfile */}
      <section id="why-finprofile" className="w-full px-4 py-20 md:px-8 lg:px-[220px] bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#363a5b] mb-12 leading-tight">
            {dict.section1.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {dict.section1.challenges.map((challenge, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-md">
                <p className="text-lg font-semibold text-[#363a5b]">{challenge}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 inline-block bg-gradient-to-r from-[#3b3f61] to-[#5a5e80] text-white px-8 py-4 rounded-full font-bold">
            {dict.section1.badge}
          </div>
        </div>
      </section>

      {/* Section 2 - Solutions */}
      <section id="solutions" className="w-full px-4 py-20 md:px-8 lg:px-[220px] bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />

        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#363a5b] mb-16">
            {dict.section2.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* Manual Process */}
            <div className="p-8 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-4">{dict.section2.manual.label}</p>
              <div className="text-6xl font-bold text-[#363a5b] mb-2">{dict.section2.manual.time}</div>
              <p className="text-2xl text-gray-500 mb-8">{dict.section2.manual.note}</p>
              <p className="text-base text-gray-700 mb-4">{dict.section2.manual.description}</p>
              <p className="text-base text-red-600">{dict.section2.manual.additionalNote}</p>
            </div>

            {/* AI Process */}
            <div className="p-8 bg-gradient-to-br from-[#3b3f61] to-[#5a5e80] text-white rounded-2xl">
              <p className="text-sm mb-4 opacity-90">{dict.section2.ai.label}</p>
              <div className="text-8xl font-bold mb-8">{dict.section2.ai.time}</div>
              <p className="text-base opacity-90">{dict.section2.ai.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections 3-6 - Feature Details */}
      {[dict.section3, dict.section4, dict.section5, dict.section6].map((section, index) => (
        <section
          key={index}
          className={`w-full px-4 py-20 md:px-8 lg:px-[220px] ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Placeholder */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="w-full h-[580px] bg-gradient-to-br from-[#b1cdff] via-[#d4e2ff] to-[#f0f4ff] rounded-3xl flex items-center justify-center">
                  <span className="text-2xl text-[#363a5b] font-bold">Feature {index + 3}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-block bg-[#3b3f61] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                  {section.badge}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#363a5b] mb-6 leading-tight">
                  {section.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
