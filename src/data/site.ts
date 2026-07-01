export const site = {
  name: 'Andrei Rosca',
  role: 'IT Support Specialist | Junior Web Developer',
  tagline: 'BSIT candidate focused on IT support, web development, and practical troubleshooting',
  description:
    'Portfolio of Andrei Rosca, a BSIT candidate with hands-on IT support experience and full-stack web development projects using React, TypeScript, PHP, MySQL, and Tailwind CSS.',
  email: '09roscaandrei@gmail.com',
  phone: '(+63) 955 815 4060',
  location: 'Valenzuela City, Philippines',
  github: 'https://github.com/iReaching',
  githubLabel: 'github.com/iReaching',
  linkedin: 'https://linkedin.com/in/andrei-devenecia-rosca/',
  linkedinLabel: 'linkedin.com/in/andrei-devenecia-rosca',
  portfolio: 'https://ireaching.github.io/grad-portfolio/',
  portfolioLabel: 'ireaching.github.io/grad-portfolio',
  facebook: 'https://www.facebook.com/Rosca.Andrei.D/',
  facebookLabel: 'facebook.com/Rosca.Andrei.D',
};

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const assetUrl = (path: string) => `${baseUrl}${path.replace(/^\/+/, '')}`;

export const resumeUrl = assetUrl('resume.pdf');

export const homeUrl = baseUrl;

export const sectionUrl = (id: string) => `${homeUrl}#${id}`;
