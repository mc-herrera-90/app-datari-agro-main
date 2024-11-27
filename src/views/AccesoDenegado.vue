  <template>
  <div class="text-center">
    <h1>Acceso Denegado</h1>
    <p>No tiene permiso para acceder a esta vista.</p>
    <v-btn color="primary" @click="$router.push('/')">Volver al Inicio</v-btn>
  </div>
</template>

<script>
export default {
name:'AccesoDenegado'
}
</script>

<style>

</style>