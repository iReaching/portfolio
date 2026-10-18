// Shared website/résumé facts. Confirm graduation status before adding a completion claim.
export const site = {
  name: 'Andrei Rosca',
  role: 'Junior Web Developer · IT Support',
  tagline: 'Practical software. Thoughtful support.',
  description:
    'Andrei Rosca builds responsive web applications with React, TypeScript, PHP and MySQL, with hands-on IT support experience in a university environment.',
  email: '09roscaandrei@gmail.com',
  phone: '+63 955 815 4060',
  location: 'Valenzuela City, Philippines',
  github: 'https://github.com/iReaching',
  linkedin: 'https://www.linkedin.com/in/andrei-devenecia-rosca/',
  portfolio: 'https://ireaching.github.io/portfolio/',
  availability: 'Open to junior developer & IT support roles',
};
export const education = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'Pamantasan ng Lungsod ng Valenzuela',
  start: '2022',
  end: '2026',
  description:
    'Coursework and projects in web development, networking, and technical support.',
};
export const experience = [
  {
    title: 'Full-Stack Developer & Project Lead',
    organization: 'CondoLink · Capstone project',
    start: '2024-12',
    end: '2026-04',
    date: 'Dec 2024 – Apr 2026',
    summary:
      'A condominium management system connecting residents, staff, guards, and administrators.',
    bullets: [
      'Built responsive dashboards with React, TypeScript, and Tailwind CSS for announcements, bookings, reports, and entry logs.',
      'Developed PHP workflows and connected MySQL tables for role-based, user-specific features.',
      'Led planning, feature development, testing, debugging, and delivery.',
    ],
    tags: ['React', 'TypeScript', 'PHP', 'MySQL'],
    project: 'condolink',
  },
  {
    title: 'IT Support Trainee · On-the-job training',
    organization: 'Our Lady of Fatima University',
    start: '2025-06',
    end: '2025-10',
    date: 'Jun – Oct 2025',
    summary:
      '486 hours of hands-on technical support in a university IT environment.',
    bullets: [
      'Assisted staff and users with desktop, laptop, Windows, printer, driver, and connectivity issues.',
      'Supported device configuration, software installation, system maintenance, and troubleshooting.',
    ],
    tags: [
      'Windows',
      'Hardware diagnostics',
      'Printers & drivers',
      'Connectivity',
    ],
    project: undefined,
  },
];
export const skillGroups = [
  {
    title: 'Web applications',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'],
    evidence: 'Responsive dashboards and user-specific workflows in CondoLink.',
    project: 'condolink',
  },
  {
    title: 'Backend & data',
    skills: ['PHP', 'SQL / MySQL', 'MySQL Workbench'],
    evidence: 'PHP application logic and database-backed management features.',
    project: 'condolink',
  },
  {
    title: 'IT support',
    skills: [
      'Windows support',
      'Hardware diagnostics',
      'Printer & driver setup',
      'Basic LAN troubleshooting',
    ],
    evidence: '486 hours of university IT support training.',
    project: undefined,
  },
  {
    title: 'Tools & interactive work',
    skills: ['Git & GitHub', 'VS Code', 'Figma', 'Jira', 'Unity', 'C#'],
    evidence:
      'A Unity maze game and independently deployed portfolio projects.',
    project: 'slimeout',
  },
];
export const professionalDevelopment = [
  {
    date: '2026-03',
    label: 'March 2026',
    title: 'Development, AI & project management seminars',
  },
  {
    date: '2026-04',
    label: 'April 2026',
    title: 'Emerging technology, AI/ML, IoT & 3D multimedia seminars',
  },
];
