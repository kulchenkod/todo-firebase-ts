const routes = {
  home: '/',
  signin: '/signin',
  join: '/join',
  forgotPassword: '/forgot-password',
  projects: '/projects',
  projectsReport: '/report',
  projectDetails: (id?: string) => `/projects/${id || ':id'}`,
} as const;

export default routes;
