<template>
    <div class="mt-4">
      <h2>Archivos</h2>
      <table class="table">
        <thead>
          <tr>
      
            <th>Número de Orden</th>
            <th>Departamento</th>
            <th>Caja</th>
            <th>Bodega</th>
            <th>Tipo de documento</th>
            <th>Fecha de Subida</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="archivo in archivos" :key="archivo.id">
          
            <td>{{ archivo.numero_orden }}</td>
            <td>{{ archivo.departamento }}</td>
            <td>{{ archivo.caja }}</td>
            <td>{{ archivo.bodega }}</td>
            <td>{{ archivo.tipodedocumento }}</td>
            <td>{{ archivo.fecha_subida }}</td>
            <td><a :href="'http://localhost/backend/uploads/' + archivo.archivo" target="_blank">Ver</a></td>
            <td>
              <button @click="deleteArchivo(archivo.id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['archivos'],
    methods: {
      async deleteArchivo(id) {
        await axios.delete(`http://localhost/backend/index.php?id=${id}`);
        this.$emit('refresh');
      },
    },
  };
  </script>
  