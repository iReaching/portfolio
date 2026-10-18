export { site } from './profile';
const base = import.meta.env.BASE_URL;
export const homeUrl = base.endsWith('/') ? base : `${base}/`;
export const assetUrl = (path: string) =>
  `${homeUrl}${path.replace(/^\/+/, '')}`;
export const sectionUrl = (id: string) => `${homeUrl}#${id}`;
export const resumeUrl = assetUrl('resume.pdf');
export const resumePageUrl = assetUrl('resume/');
