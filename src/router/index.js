import { createRouter, createWebHistory } from 'vue-router';

const pages = import.meta.glob('@/views/**/*.vue', { eager: true });

const routes = Object.keys(pages).map((path) => {
  const file = path.replace(/^.*\/views\//, '').replace('.vue', '');
  const segments = file.split('/');
  const last = segments[segments.length - 1];

  let routePath;
  if (last.toLowerCase() === 'index') {
    routePath = '/' + segments.slice(0, -1).join('/');
    if (routePath === '/') routePath = '/';
  } else {
    routePath = '/' + segments.join('/');
  }

  return {
    path: routePath,
    name: segments.join('-'),
    component: pages[path].default,
  };
});

export default createRouter({
  history: createWebHistory(),
  routes,
});
