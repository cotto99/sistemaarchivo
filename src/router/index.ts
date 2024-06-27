import { createRouter, createWebHistory } from 'vue-router';
import ArchivoForm from '../components/ArchivoForm.vue';
import ReporteList from '../components/ReporteList.vue';
import Dashboard from '../components/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Gestión',
    component: ArchivoForm,
  },
  { path: '/dashboard', component: Dashboard },
  {
    path: '/reportes',
    name: 'Reportes',
    component: ReporteList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
