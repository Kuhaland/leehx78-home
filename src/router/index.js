import { createRouter, createWebHistory } from 'vue-router';
const pages = import.meta.glob('../views/**/*.vue', { eager: true });

const routes = Object.keys(pages).map((path) => {
  const file = path.replace('../views/', '').replace('.vue', '');
  const routePath = file.toLowerCase();
  const name = file.replace(/\.vue$/, '');

  return {
    path: routePath === 'index' ? '/' : `/${routePath}`,
    name,
    component: pages[path].default,
  };
});

export default createRouter({
  history: createWebHistory(),
  routes,
});
