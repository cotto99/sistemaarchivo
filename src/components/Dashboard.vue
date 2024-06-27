<!-- src/components/Dashboard.vue -->
<template>
  <div class="container mt-5">
    <h1 class="text-center text-primary">Control de ordenes ingresadas</h1>
    <canvas id="ordenesChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const chartRef = ref(null);
const data = ref({});

onMounted(() => {
  // Recuperar datos de localStorage
  const archivosGuardados = JSON.parse(localStorage.getItem('archivos')) || [];

  // Contar órdenes por departamento
  const conteoPorDepartamento = archivosGuardados.reduce((acc, archivo) => {
    if (!acc[archivo.departamento]) {
      acc[archivo.departamento] = 0;
    }
    acc[archivo.departamento]++;
    return acc;
  }, {});

  data.value = conteoPorDepartamento;

  // Preparar datos para la gráfica
  const labels = Object.keys(data.value);
  const dataValues = Object.values(data.value);

  // Crear la gráfica
  chartRef.value = new Chart(document.getElementById('ordenesChart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Órdenes por Departamento',
        data: dataValues,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
