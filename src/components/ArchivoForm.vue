<template>
  <div class="container mt-4 p-4 border rounded shadow-lg bg-light">
    <h2 class="text-center mb-4 text-primary">Ingresar Archivo</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="numeroOrden" class="form-label">Número de Orden / oficio / factura</label>
        <input type="text" v-model="numeroOrden" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="departamento" class="form-label">Departamento</label>
        <select v-model="departamento" class="form-control" required>
          <option>Atención al cliente</option>
          <option>Recupero de cartera</option>
          <option>Financiero</option>
          <option>Direccion ejecutiva</option>
          <option>Direccion operativa</option>
          <option>Servicio técnico</option>
          <option>Recursos humanos</option>
          <option>Call center</option>
          <option>Compras</option>
          <option>Digitación</option>
          <option>asesoria juridica</option>
          <option>auditoria interna</option>
          <option>unidad especializada</option>
          <option>seguridad industrial</option>
          <option>contabilidad</option>
          <option>tesorería</option>
          <option>receptoría</option>
          <option>presupuesto</option>
          <option>inventario</option>
          <option>dirección administrativa</option>
          <option>Informatica</option>
          <option>Regulación</option>
          <option>Archivo</option>
          <option>Almacen</option>
          <option>Acceso a la información Pública</option>
          <option>Vehiculos y combustible</option>
          <option>Mantenimiento de red</option>
          <option>Mantenimiento correctivo y preventivo</option>
          <option>Alumbrado público</option>
          <option>Lectores</option>
          <option>Cortes y reconecciones</option>
          <option>Calidad y suministro de energía</option>
          <option>Dirección de relaciones públicas</option>
          <option>Redacción</option>
          <option>Producción y diseño</option>
          <option>Comunicación social</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="tipodedocumento" class="form-label">Tipo de documento</label>
        <select v-model="tipodedocumento" class="form-control" required>
          <option>OT</option>
          <option>TALONARIO PMN</option>
          <option>DICTAMEN</option>
          <option>CONTRATO</option>
          <option>OFICIO</option>
          <option>POLIZA</option>
          <option>OTROS</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="fecha" class="form-label">Fecha de documento</label>
        <input type="date" v-model="fecha" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="caja" class="form-label">Caja</label>
        <input type="text" v-model="caja" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="bodega" class="form-label">Bodega</label>
        <input type="text" v-model="bodega" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="archivo" class="form-label">Archivo</label>
        <input type="file" @change="handleFileUpload" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      numeroOrden: '',
      departamento: '',
      caja: '',
      bodega: '',
      archivo: null,
      fecha: '',
      tipodedocumento: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      this.archivo = event.target.files[0];
    },
    submitForm() {
      // Verificar si el número de orden ya existe en reportes
      const existeNumeroOrden = this.verificarNumeroOrden(this.numeroOrden);

      if (existeNumeroOrden) {
        // Mostrar alerta con SweetAlert si el número de orden ya existe en reportes
        Swal.fire({
          title: 'Número de Orden Existente',
          text: 'El número de orden ya ha sido registrado en los reportes. Debe editar la entrada existente para agregar más archivos.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Si el número de orden no existe, proceder con el guardado
      const nuevoArchivo = {
        numeroOrden: this.numeroOrden,
        departamento: this.departamento,
        caja: this.caja,
        bodega: this.bodega,
        tipodedocumento: this.tipodedocumento,
        fecha: this.fecha,
        archivo: this.archivo.name, // Simplemente guardamos el nombre del archivo
      };

      // Obtener archivos guardados o inicializar si no hay ninguno
      let archivosGuardados = JSON.parse(localStorage.getItem('archivos')) || [];

      // Agregar el nuevo archivo a la lista
      archivosGuardados.push(nuevoArchivo);

      // Guardar la lista actualizada en localStorage
      localStorage.setItem('archivos', JSON.stringify(archivosGuardados));

      // Limpiar el formulario después de guardar
      this.numeroOrden = '';
      this.departamento = '';
      this.caja = '';
      this.bodega = '';
      this.fecha = '';
      this.tipodedocumento = '';
      this.archivo = null;

      Swal.fire({
        title: 'Éxito!',
        text: 'Archivo guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
    verificarNumeroOrden(numeroOrden) {
      // Aquí deberías implementar la lógica real para verificar si el número de orden existe en reportes
      // Por ahora, simulo que el número de orden existe si es igual a "123456"
      const archivosGuardados = JSON.parse(localStorage.getItem('archivos')) || [];
      return archivosGuardados.some(archivo => archivo.numeroOrden === numeroOrden);
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
</style>
