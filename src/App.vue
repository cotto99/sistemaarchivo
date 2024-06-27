<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">UNIDAD DE ARCHIVO</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link">Ingreso de Archivos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/reportes" class="nav-link">Reporte de Documetos</router-link>
            </li>
          </ul>
        </div>  
      </div>
    </nav>
    <router-view></router-view>
  </div>

  <!-- Footer -->
  <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <p class="mb-0">Copyrigth MACAWSA 2024, Todos los derechos reservados para el pajarito</p>
      </div>
    </footer>


</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  background-color: #f8f9fa;
}
</style>
