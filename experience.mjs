// Company descriptions are context only. Personal contributions require Retno's own account.
// Null fields remain explicit editorial placeholders in the private preview only.
export const experience = [
  {
    key: 'gameloft', name: 'Gameloft', source: 'https://www.gameloft.com/',
    context: {
      id: 'Gameloft membuat game untuk perangkat seluler, PC, dan konsol, dengan pengalaman bermain bagi beragam pemain.',
      en: 'Gameloft creates games for mobile devices, PC, and consoles, with playing experiences for a range of audiences.',
    },
    contribution: {
      id: 'Di Gameloft, saya bekerja sebagai project manager, mengelola tim dan berkomunikasi dengan klien di luar negeri. Saya mendengarkan kebutuhan mereka dengan saksama, termasuk hal-hal yang belum disampaikan secara langsung.',
      en: 'My project management work at Gameloft involved managing a team and working with overseas clients. I listened carefully to what clients said and paid attention to needs that were not always stated directly.',
    },
    connection: {
      id: 'Pengalaman ini membentuk kebiasaan saya untuk memahami apa yang orang butuhkan dan inginkan sebelum menentukan langkah bersama.',
      en: 'That experience informs how I work: understand what people need and want before deciding on the next step together.',
    },
  },
  {
    key: 'accelbyte', name: 'AccelByte', source: 'https://accelbyte.io/',
    context: {
      id: 'AccelByte menyediakan layanan backend dan perangkat pengembangan untuk membantu tim game membangun pengalaman bermain daring.',
      en: 'AccelByte provides backend services and development tools that help game teams build connected online experiences.',
    },
    contribution: {
      id: 'Dalam pekerjaan manajemen proyek bersama AccelByte, saya mengelola tim dan bekerja dengan klien di luar negeri. Saya terbiasa menyimak bukan hanya permintaan yang disampaikan, tetapi juga kebutuhan di baliknya.',
      en: 'My project management work with AccelByte included managing a team and working with overseas clients. I paid attention to both their requests and the needs behind them.',
    },
    connection: {
      id: 'Dari pengalaman ini, saya membawa perhatian pada konteks: memahami maksud seseorang sama pentingnya dengan mendengar kata-katanya.',
      en: 'It reinforced a habit I bring to my work: listen closely, read between the lines, and understand the context of what someone wants.',
    },
  },
  {
    key: 'golfer', name: 'Golfer', source: 'https://topgolfer.app/zh',
    label: { id: 'Karya portofolio pilihan', en: 'Selected portfolio work' },
    context: {
      id: 'Golfer adalah aplikasi untuk menemukan lapangan golf, memesan waktu bermain, serta melihat dan mengelola informasi pemesanan.',
      en: 'Golfer is an app for discovering golf courses, booking tee times, and viewing and managing booking information.',
    },
    contribution: {
      id: 'Untuk Golfer, salah satu karya portofolio pilihan saya, saya menangani manajemen proyek, mengelola tim, dan bekerja dengan klien di luar negeri. Mendengarkan dengan saksama membantu saya memahami kebutuhan maupun keinginan yang tidak selalu diungkapkan langsung.',
      en: 'Golfer is selected portfolio work in which I handled project management, managed a team, and worked with overseas clients. Listening carefully helped me understand needs and expectations that were not always expressed directly.',
    },
    connection: {
      id: 'Cara kerja ini menekankan pemahaman terhadap orang di balik permintaan, bukan hanya permintaannya.',
      en: 'It reflects how I approach a project: understand the people behind a request, as well as the request itself.',
    },
  },
  {
    key: 'independent',
    name: { id: 'Pengembang Produk Digital Independen', en: 'Independent Software Builder' },
    contribution: {
      id: 'Saya membangun perangkat lunak dan alat SaaS untuk menyederhanakan alur kerja sehari-hari. Dalam pekerjaan mandiri ini, saya berfokus pada memahami kebutuhan orang dan membuat langkah berikutnya lebih mudah dipahami.',
      en: 'I build software and SaaS tools that simplify everyday workflows. My independent work focuses on understanding what people need and making the next step easier to follow.',
    },
    connection: {
      id: 'Ini menjadi ruang lain bagi kebiasaan yang saya pegang dalam bekerja: mendengarkan dengan saksama, memperhatikan detail, dan menindaklanjuti langkah yang disepakati.',
      en: 'It is another setting for the same habits I value across my work: listening carefully, paying attention to detail, and following through.',
    },
  },
];

const labels = {
  id: {
    intro: 'Dari game hingga produk digital, pengalaman ini membentuk cara saya memahami kebutuhan dan bekerja bersama orang lain.',
    context: 'Konteks perusahaan / produk', source: 'Sumber konteks',
    pending: 'Draf · Kontribusi & cara kerja',
    missing: 'Menunggu cerita Retno tentang kontribusi pribadi dan kaitannya dengan cara bekerja. Keterangan di atas hanya menjelaskan perusahaan atau produk, bukan jabatan, tanggung jawab, maupun pencapaian Retno.',
  },
  en: {
    intro: 'Across games and digital products, these experiences shape how I understand needs and work with other people.',
    context: 'Company / product context', source: 'Context source',
    pending: 'Draft · Contribution & working habits',
    missing: 'Awaiting Retno’s account of her personal contribution and how it relates to her working habits. The description above explains the company or product only, not Retno’s title, responsibilities, or achievements.',
  },
};

export function renderExperience(lang, draft, title, sectionLabel) {
  const entries = experience.filter(entry => draft || (entry.contribution && entry.connection));
  if (!entries.length) return '';
  const c = labels[lang];
  return `<section id="experience" class="section experience" aria-labelledby="experience-heading">
    <div class="experience-grid">
      <div class="experience-introduction" data-reveal>
        <span class="eyebrow">03 / ${sectionLabel}</span>
        <h2 id="experience-heading">${title}</h2>
        <p>${c.intro}</p>
      </div>
      <div class="experience-entries">${entries.map(entry => `<article class="experience-entry" data-experience="${entry.key}" data-reveal>
        <div class="experience-entry-heading"><span class="experience-accent" aria-hidden="true"></span><h3>${typeof entry.name === 'string' ? entry.name : entry.name[lang]}</h3></div>
        ${entry.label ? `<span class="experience-label">${entry.label[lang]}</span>` : ''}
        ${entry.contribution ? `<p class="experience-contribution">${entry.contribution[lang]}</p><p class="experience-connection">${entry.connection[lang]}</p>` : `<p class="experience-context"><span class="tiny">${c.context}</span>${entry.context[lang]}</p><aside class="experience-editorial"><span class="tiny">${c.pending}</span><p>${c.missing}</p></aside>`}
        ${entry.source ? `<a class="experience-source text-link" href="${entry.source}" rel="noreferrer">${c.source}: ${entry.name} <span aria-hidden="true">↗</span></a>` : ''}
      </article>`).join('')}</div>
    </div>
  </section>`;
}
