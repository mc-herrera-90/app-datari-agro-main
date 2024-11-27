<template>
	<div id="fileViewSelect">

    <div id="body" v-if="data !== undefined">
      <div v-if="url_dashboard === 'dash_1'">  
        <dashboardTotal 
          :data_total="data_total_file" 
          :data_mapa="data_mapa"
          :categorias="data.dashboards[0].categorias" 
          :titulo="data.proyecto_titulo"
        />
      </div>
      <div v-if="url_dashboard === 'dash_2'">
        <dashboardDetail
          :titulo="data.proyecto_titulo"
          :regiones="regiones"
          :comunas="comunas"
          :data_detail_file="data_detail_file"
          :data_detail_mapa="data_mapa"
          :variables_file="variables_file"
          :num_variables_file="num_variables_file"
        />        
      </div>
    </div>
  </div>
</template>

<script>
import dashboardDetail from './RegionComunaDetailView.vue';
import dashboardTotal from './RegionComunaTotalView.vue';


export default {

  name: 'selectView',
  props: [
    'data',
    'numero_proyecto',
    'url_dashboard',
    'propiedades'
  ],
  components:{
  	dashboardDetail,
  	dashboardTotal
  },
  data () {
    return {
      variables_file:null,
      num_variables_file:null,
      regiones_comunas: {},
      data_detail_file: null,
      data_total_file:null,
      data_detail_mapa:null,
      comunas:null,
      regiones:null
    }
  },
  created(){
    if (this.data !== undefined){
  	 this.get_data_file(this.data.data_libros);
    }
    else{
      this.$router.replace({path:'/'}) 
    }
  },
  computed:{
    updateProject(){
      return this.data;
    },
    updateProjectNumber(){
      return this.numero_proyecto;
    },
    updateDashboard(){
      return this.url_dashboard;
    }

  },
  watch:{
    updateProject(){
      // console.log('s1');
      this.get_data_file(this.data.data_libros);
    },
    updateProjectNumber(){
      // console.log('s2');
      this.get_data_file(this.data.data_libros);
    },
    updateDashboard(){
      // console.log('s3');
      this.get_data_file(this.data.data_libros);
    }
  },
  methods:{



  	get_data_book(book){
      let data_detail = book.data_detail;
      let data_total = book.data_total;
      let data_mapa = book.data_mapa;
      let data_regiones_comunas = book.regiones_comunas;

      // let list_keys_data_total = Object.keys(data_total);


      // console.log(data_total)
      if (data_detail.length > 0){
        this.data_detail_file = data_detail;
      }

      if(data_total.length > 0){
        this.data_total_file = data_total;
      }
      // if (list_keys_data_total.length > 0){
      //   this.data_total_file = data_total;
      // }
      if (data_mapa.cant_datos > 0){
        // console.log(data_mapa);
        this.data_mapa = data_mapa.data_mapa;
      }
      if(data_regiones_comunas.cant_regiones > 0){
        this.regiones = data_regiones_comunas.regiones;
        this.comunas = data_regiones_comunas.region_comunas;
        
      }
    },


  	get_data_file(data){
     
      let size_data = data.length;
      if(size_data > 1){
      //FOR book in data {
      //  get_data_book(book)
      //}
        let book = data[0];
        this.variables_file = book.variables_categorias.variables;
        this.num_variables_file = book.variables_categorias.num_categorias;
        this.get_data_book(book);
      }
    },
      
      
  

    get_titulo(tipo){
      let anios = tipo !== 'no_anios' ? this.propiedades.anios : {};
      let anio,titulo;
      if (tipo === 'fijo'){
       anio = this.propiedades.anios.anio;
        titulo = (this.propiedades.titulo + ' ' + anio); 
      }
      else if(tipo === 'intervalo'){
        anio = this.propiedades.anios.anio_i;
        let anio2;
        anio2 = this.propiedades.anios.anio_f;
        titulo = (this.propiedades.titulo + ' ' + anio +'-'+anio2 );
      }
      else{
        titulo = this.propiedades.titulo;
      }

      return titulo
    },

    
  }
}
</script>

<style lang="css" scoped>
</style>