<template>
  <div class="container mt-4 p-4 border rounded shadow-lg bg-light">
    <h2 class="text-center mb-4 text-primary">Reportes</h2>

  
    <div class="mb-3">
      <label for="buscarNumeroOrden" class="form-label">Buscar por Número de Orden</label>
      <input type="text" v-model="busquedaNumeroOrden" class="form-control" id="buscarNumeroOrden" />
      <button @click="buscarPorNumeroOrden" class="btn btn-primary mt-2">Buscar</button>
    </div>

   
    <div class="mb-3">
      <label for="filtroDepartamento" class="form-label">Filtrar por Departamento</label>
      <select v-model="filtroDepartamento" class="form-control">
        <option value="">Todos los Departamentos</option>
        <option v-for="depto in departamentos" :key="depto">{{ depto }}</option>
      </select>
      <button @click="filtrarPorDepartamento" class="btn btn-primary mt-2">Filtrar</button>
    </div>

  
    <div class="mb-3 text-center">
      <button @click="toggleTableVisibility" class="btn btn-secondary">
        {{ mostrarTabla ? 'Ocultar Reportes' : 'Mostrar Reportes' }}
      </button>
    </div>

    <div class="table-responsive" v-if="mostrarTabla">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Número de Orden</th>
            <th>Departamento</th>
            <th>Caja</th>
            <th>Fecha de Subida</th>
            <th>Bodega</th>
            <th>Tipo de documento</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(archivo, index) in archivosFiltrados" :key="index">
            <td>{{ archivo.numeroOrden }}</td>
            <td>{{ archivo.departamento }}</td>
            <td>{{ archivo.caja }}</td>
            <td>{{ archivo.fecha }}</td>
            <td>{{ archivo.bodega }}</td>
            <td>{{ archivo.tipodedocumento }}</td>
            <td><a :href="'http://localhost/backend/uploads/' + archivo.archivo" target="_blank">Ver</a></td>
            <td>
              <button @click="editarArchivo(archivo)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="eliminarArchivo(archivo.id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      archivosGuardados: [], // Archivos cargados desde localStorage (simulado)
      archivosFiltrados: [], // Archivos filtrados que se muestran en la tabla
      filtroDepartamento: '', // Departamento seleccionado para filtrar
      busquedaNumeroOrden: '', // Número de orden para búsqueda
      mostrarTabla: true, // Estado para controlar la visibilidad de la tabla
      departamentos: [
        'Atención al cliente', 'Recupero de cartera', 'Financiero', 'Direccion ejecutiva',
        'Direccion operativa', 'Servicio técnico', 'Recursos humanos', 'Call center', 'Compras',
        'Digitación', 'asesoria juridica', 'auditoria interna', 'unidad especializada',
        'seguridad industrial', 'contabilidad', 'tesorería', 'receptoría', 'presupuesto',
        'inventario', 'dirección administrativa', 'Informatica', 'Regulación', 'Archivo',
        'Almacen', 'Acceso a la información Pública', 'Vehiculos y combustible',
        'Mantenimiento de red', 'Mantenimiento correctivo y preventivo', 'Alumbrado público',
        'Lectores', 'Cortes y reconecciones', 'Calidad y suministro de energía',
        'Dirección de relaciones públicas', 'Redacción', 'Producción y diseño', 'Comunicación social'
      ], // Lista de departamentos para el filtro
    };
  },
  mounted() {
    // Cargar archivos desde localStorage al montar el componente
    const archivos = localStorage.getItem('archivos');
    if (archivos) {
      this.archivosGuardados = JSON.parse(archivos);
      this.archivosFiltrados = this.archivosGuardados; // Inicialmente mostrar todos los archivos
    }
  },
  methods: {
    // Método para buscar archivos por número de orden
    buscarPorNumeroOrden() {
      if (this.busquedaNumeroOrden.trim() === '') {
        Swal.fire('Error!', 'Ingrese un número de orden para buscar.', 'error');
        return;
      }
      this.archivosFiltrados = this.archivosGuardados.filter(
        archivo => archivo.numeroOrden.toLowerCase().includes(this.busquedaNumeroOrden.toLowerCase())
      );
      if (this.archivosFiltrados.length === 0) {
        Swal.fire('Información', 'No se encontraron archivos con el número de orden buscado.', 'info');
      }
    },
    // Método para filtrar archivos por departamento seleccionado
    filtrarPorDepartamento() {
      if (this.filtroDepartamento === '') {
        this.archivosFiltrados = this.archivosGuardados; // Mostrar todos los archivos si no hay filtro seleccionado
      } else {
        this.archivosFiltrados = this.archivosGuardados.filter(
          archivo => archivo.departamento === this.filtroDepartamento
        );
      }
    },
    // Método para alternar la visibilidad de la tabla
    toggleTableVisibility() {
      this.mostrarTabla = !this.mostrarTabla;
    },
    // Método para eliminar un archivo
    async eliminarArchivo(id) {
      try {
        // Aquí iría la lógica para eliminar el archivo (simulado con mensaje)
        Swal.fire('Eliminado!', `El archivo con ID ${id} ha sido eliminado correctamente.`, 'success');
        // Luego podrías implementar la llamada a tu API para eliminar el archivo
      } catch (error) {
        console.error('Error al eliminar el archivo:', error);
        Swal.fire('Error!', 'Hubo un problema al eliminar el archivo.', 'error');
      }
    },
    // Método para editar un archivo
    editarArchivo(archivo) {
      // Aquí iría la lógica para editar el archivo según tus necesidades
      console.log('Editar archivo:', archivo);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-top: 20px;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-warning:hover {
  background-color: #e0a800;
  border-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.table {
  margin-top: 20px;
}

.table th,
.table td {
  text-align: center;
}

@media (max-width: 768px) {
  .container {
    margin-top: 10px;
  }
}
</style>
