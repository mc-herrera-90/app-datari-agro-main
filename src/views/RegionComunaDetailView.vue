<template>
  <div id="detailViewRegionComuna"> 
     <div id="header">
      <v-app-bar color="blue darken-2" class="rounded" flat dark>
        <h2 class="font-weight-light ">{{titulo}}</h2>
        <v-col lg=3 xl=2 >
          <v-autocomplete
            dense
            v-model="region_selected"
            :items="regiones_disponibles"
            class="mx-2"
            flat
            hide-no-data
            hide-details
            label="Región:"
            solo-inverted
            item-text="nombre"
            item-value="id"
            v-on:change="cambiarRegion"
          ></v-autocomplete>
        </v-col>
        <v-col style="margin-left:-30px;"  lg=3 xl=2 >
          <v-autocomplete
            dense
            v-model="comuna_selected"
            :items="comunas_region_selected"
            class="mx-1"
            flat
            hide-no-data
            hide-details
            label="Comunas"
            solo-inverted
            item-text="nombre"
            item-value="id"
            v-on:change="cambiarComuna"
          ></v-autocomplete>
        </v-col>
      </v-app-bar>
    </div>
    <div id="body" class="mt-3">
       <v-row>
      <v-col xl=2>
        <infoCardSimpleV2 
          :title="var_6.text"
          :icon="'mdi-information'" 
          :subtitle="check_string(var_6.categories[0]['variable'])"
          :data="data_file_comuna[var_6.categories[0]['variable']]"            
        />

        <infoCardSimpleChipV2 
          :icon="'mdi-desktop-classic'"
          :title="check_string(var_4.categories[2]['variable']).title"
          :subtitle="check_string(var_4.categories[2]['variable']).subtitle"
          :data="data_file_comuna[var_4.categories[2]['variable']]"
          class="mt-2"
          :height_card="145"
        />

        <infoCardListChipsSelectV2
          :height_card="350"
          class="mt-2"
          :data_list="create_list(data_file_comuna[var_4.categories[0]['variable']])"
          :options="['WebPay','Transferencia','TGR','Otro','No posee']"
          :title="check_string(var_4.categories[0]['variable']).title"
          :subtitle="check_string(var_4.categories[0]['variable']).subtitle"
          :icon="'mdi-desktop-classic'"
          :color="'teal darken-2'"
        />

        <infoCardSimpleChipsSelectV2
          class="mt-2" 
          :options="['Si','No']"
          :title="check_string(var_4.categories[1]['variable']).title"
          :subtitle="check_string(var_4.categories[1]['variable']).subtitle"
          :color="'primary'"
          :icon="'mdi-desktop-classic'"
          :data="create_list(data_file_comuna[var_4.categories[1]['variable']])"
        />
      </v-col>
      <v-col xl=3>
        <infoCardRating
          :height="490"
          :title="var_2.text" 
          :icon="'mdi-office-building'"
          :data_rating="data_file_comuna[var_2.categories[0]['variable']]"
          :data_comentario="data_file_comuna[var_2.categories[1]['variable']]"
        />

        <v-row>
          <v-col>
            <infoCardSimpleV2 
              :title="var_3.text"
              :icon="'mdi-information'" 
              :subtitle="check_string(var_3.categories[0]['variable'])"
              :data="data_file_comuna[var_3.categories[0]['variable']]"  
              class="mt-2"
            />
          </v-col>  
          <v-col>
            <infoCardSimpleV2 
              :title="var_3.text"
              :icon="'mdi-information'" 
              :subtitle="check_string(var_3.categories[1]['variable'])"
              :data="data_file_comuna[var_3.categories[1]['variable']]"  
              class="mt-2"
            />
          </v-col>
        </v-row>

        <infoCardSimpleChipsSelectV2
          class="mt-2" 
          :options="['Presencial','Mixto','Teletrabajo']"
          :title="check_string(var_4.text)"
          :subtitle="check_string(var_4.categories[3]['variable'])"
          :color="'red darken-2'"
          :icon="'mdi-information'"
          :data="create_list(check_string(data_file_comuna[var_4.categories[3]['variable']]))"
        />
 
        <chartPermisos :data_permisos="data_permisos" class="mt-2" />

      </v-col>
      <v-col xl=3>
        <v-row>
          <v-col cols=6>
            <infoCardSimpleChipV2 
              :icon="'mdi-desktop-classic'"
              :title="check_string(var_5.categories[3]['variable']).title"
              :subtitle="check_string(var_5.categories[3]['variable']).subtitle"
              :data="check_string(data_file_comuna[var_5.categories[3]['variable']])"
            />

            <infoCardSimpleV2 
              :icon="'mdi-desktop-classic'"
              :title="check_string(var_5.categories[0]['variable']).title"
              :subtitle="check_string(var_5.categories[0]['variable']).subtitle"
              :data="data_file_comuna[var_5.categories[0]['variable']]"
              class="mt-2"
            />
            
            <infoCardSimpleChipsSelectV2
              class="mt-2" 
              :options="['Si','No']"
              :title="check_string(var_5.categories[1]['variable']).title"
              :subtitle="check_string(var_5.categories[1]['variable']).subtitle"
              :color="'primary'"
              :icon="'mdi-desktop-classic'"
              :data="create_list(data_file_comuna[var_5.categories[1]['variable']])"
            />
          </v-col>
          <v-col cols=6>
            <infoCardListChipsSelectV2
              :data_list="create_list(data_file_comuna[var_5.categories[2]['variable']])"
              :options="['Ofimática','Lector de PDF','CAD','GIS']"
              :title="check_string(var_5.categories[2]['variable']).title"
              :subtitle="check_string(var_5.categories[2]['variable']).subtitle"
              :icon="'mdi-desktop-classic'"
              :color="'teal darken-2'"
            />

             <infoCardSimpleChipV2 
              :icon="'mdi-school'"
              :title="check_string(var_1.categories[1]['variable'])"
              :subtitle="var_1.text"
              :data="check_string(data_file_comuna[var_1.categories[1]['variable']])"
              class="mt-2"
            />

          </v-col>
        </v-row>
        <infoCardTreeMapV2 
          class="mt-2"
          :icon="'mdi-school'"
          :title="check_string(var_1.categories[0]['variable'])"
          :data="create_list(data_file_comuna[var_1.categories[0]['variable']])"
          :height_chart=296
        />
      
      </v-col>
      <v-col xl=4>
        
        <Map_region_comunas 
          :data="data_detail_mapa_region" 
          :nombre_comuna="comuna_selected"  
        />
        <v-row class="mt-0">
          <v-col cols=5>
            <infoCardSimpleV2 
              :title="'Población'" 
              :icon="'mdi-human-male-female'" 
              :data="habitantes" 
              :subtitle="'Habitantes'" 
            />

            <infoCardSimpleV2 
              class="mt-2"
              :title="'Vivienda'" 
              :icon="'mdi-home-city'" 
              :data="viviendas" 
              :subtitle="'Cant. viviendas'" 
            />

            <infoCardSimpleV2 
              class="mt-2"
              :title="'Densidad'" 
              :icon="'mdi-account-supervisor-circle'" 
              :data="densidad_pob" 
              :subtitle="'Habs. por km2'" 
            />

          </v-col>
          <v-col cols=7>
            <chartPobreza :data="data_pobreza"  />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    </div>
  </div>
</template>

<script>
import chartPermisos from '../components/dashboardComponents/chartPermisos.vue';
import chartPobreza from '../components/dashboardComponents/chartPobreza.vue';

import infoCardSimpleV2 from '../components/cards/infoCardSimple.vue';
import infoCardSimpleChipV2 from '../components/cards/infoCardSimpleChip.vue';
import infoCardListChipsV2 from '../components/cards/infoCardListChips.vue';
import infoCardListChipsSelectV2 from '../components/cards/infoCardListChipsSelect.vue';
import infoCardSimpleChipsSelectV2 from '../components/cards/infoCardSimpleChipsSelect.vue';
import infoCardTreeMapV2 from '../components/cards/infoCardTreeMap.vue';









import infoCardSimple from '../components/dashboardComponents/infoCardSimple.vue';
import infoCard from '../components/dashboardComponents/infoCard.vue';
import infoCardChip from '../components/dashboardComponents/infoCardChip.vue';

import infoCardListChips from '../components/dashboardComponents/infoCardListChips.vue';


import infoCardGroupChip from '../components/dashboardComponents/infoCardGroupChip.vue';

import infoCardSelect from '../components/dashboardComponents/infoCardSelect.vue';

import infoCardDoble from '../components/dashboardComponents/infoCardDoble.vue';
import infoCardIcon from '../components/dashboardComponents/infoCardIcon.vue';

import infoCardListGroup from '../components/dashboardComponents/infoCardList.vue';
import infoCardList2 from '../components/dashboardComponents/infoCardList2.vue';
import infoCardGroup from '../components/dashboardComponents/infoCardGroup.vue';
import infoCardRating from '../components/dashboardComponents/infoCardRating.vue';

import Map_region_comunas from '../components/maps/map_region_comunas.vue';

import {formatCL} from '../functions/functions.js';
import {resume_texts} from '../functions/functions.js';


export default {

  name: 'DetailViewRegionComuna',
  props: [
    'data_detail_file','data_detail_mapa',
    'comunas','regiones','variables_file',
    'num_variables_file','titulo'
    ],
  components: {
    chartPermisos,
    chartPobreza,
    infoCardSimple,
    infoCardListGroup,
    infoCardGroupChip,
    infoCardListChips,
    infoCardList2,
    infoCard,
    infoCardChip,
    infoCardSelect,
    infoCardGroup,
    infoCardRating,
    infoCardDoble,
    Map_region_comunas,
    infoCardIcon,

    infoCardSimpleV2,
    infoCardSimpleChipV2,
    infoCardListChipsV2,
    infoCardListChipsSelectV2,
    infoCardSimpleChipsSelectV2,
    infoCardTreeMapV2
  },

  data () {
    return {
      // region_selected:null,
      // comuna_selected:null,
      // comunas_region_selected:null,
      // regiones_disponibles:null,
      // data_detail_mapa_region: null,
      // data_detail_comuna:null,
      // data_file_comuna:null,
      // data_permisos:{},
      // data_pobreza: {},
      // habitantes:null,
      // viviendas:null,
      // densidad_pob:null,
      rating_1:{
        1:'Muy Deficiente',
        2:'Deficiente',
        3:'Mejorable',
        4:'Buena',
        5:'Muy Buena'
      },
      var_1:{
        'text':'',
        'categories':[]
      },
      var_2:{
        text:'',
        categories:[]
      },
      var_3:{
        text:'',
        categories:[]
      },
      var_4:{
        text:'',
        categories:[]
      },
      var_5:{
        text:'',
        subtext:'',
        categories:[]
      },
      var_6:{
        text:'',
        categories:[]
      },


    }
  },
  created() {
    if( this.regiones != null ){
      this.regiones_disponibles = this.regiones;
      this.region_selected = this.regiones[0];
      this.comunas_region_selected = this.comunas[this.region_selected];
      this.comuna_selected = this.comunas_region_selected[0];


      this.get_variables(this.variables_file,this.num_variables_file)
      this.data_detail_mapa_region = this.get_data_mapa_region(this.data_detail_mapa,this.region_selected)

      this.data_detail_comuna = this.get_data_detail_comuna(this.data_detail_file,this.comuna_selected)

      this.get_data_comuna(this.data_detail_comuna)
    }
    
  },

  computed:{
    updateData(){
      return this.data_detail_file;
    },

    updateRegiones(){
      return this.regiones;
    }

  
  },
  watch:{
    updateData(){
      // 
      // this.region_selected = this.regiones[0];
      // this.comunas_region_selected = this.comunas[this.region_selected];
      // this.comuna_selected = this.comunas_region_selected[0];

      this.get_variables(this.variables_file,this.num_variables_file)
      this.data_detail_mapa_region = this.get_data_mapa_region(this.data_detail_mapa,this.region_selected)

      this.data_detail_comuna = this.get_data_detail_comuna(this.data_detail_file,this.comuna_selected)

       this.get_data_comuna(this.data_detail_comuna)
    },

    updateRegiones(){
      
      this.regiones_disponibles = this.regiones;
      // this.regiones_disponibles = this.regiones;
      // console.log(this.regiones_disponibles)
      // this.region_selected = this.region;
      // this.comunas_region_selected = this.comunas[this.region_selected];
      // this.comuna_selected = this.comunas_region_selected[0];
    }

   
  },
  methods: {

    get_data_mapa_region(mapa,region){
      let data_mapa_region;
      if (region !== null){
        data_mapa_region = mapa[region];
      }
      //data total
      else{
        data_mapa_region={};
        //add a map for all regions availables in data
        console.log('no region yet')
      }
      return data_mapa_region
    },

     get_data_detail_comuna(data,comuna_select){
      let data_detail = data.find(o => o.data_comuna.nombre === comuna_select);
      return data_detail
    },

    cambiarRegion(region){
      this.region_selected = region;
      this.comunas_region_selected = this.comunas[region];
      this.comuna_selected = this.comunas_region_selected[0];
     
      this.data_detail_mapa_region = this.get_data_mapa_region(
        this.data_detail_mapa,region
      );

      this.data_detail_comuna = this.get_data_detail_comuna(this.data_detail_file,this.comuna_selected)

      this.get_data_comuna(this.data_detail_comuna)
      
    },

    cambiarComuna(comuna){
      this.comuna_selected = comuna;
      this.data_detail_comuna = this.get_data_detail_comuna(
        this.data_detail_file,this.comuna_selected
      )
      this.get_data_comuna(this.data_detail_comuna)
    },


    check_string(string){
      return resume_texts(string)
    },

    get_data_comuna(data){

      let comuna = data.data_comuna;
      let pobreza_comuna = data.data_comuna.data_pobreza;
      let permisos_edificacion_comuna = data.data_comuna.data_permisos;
      let data_file = data.data_libro;

      this.data_permisos = permisos_edificacion_comuna;
      this.data_pobreza = pobreza_comuna;
      this.habitantes = formatCL(comuna.data_censo.cantidad_habitantes);
      this.viviendas = formatCL(comuna.data_censo.cantidad_viviendas);
      this.densidad_pob = comuna.data_censo.densidad_poblacion;
      this.data_file_comuna = data_file;
    },

    get_variables(vars,num_var){
      if(num_var > 0){
        let infraestructura = vars.INFRAESTRUCTURA;
        let prc = vars['PLAN REGULADOR COMUNAL'];
        let infraestructura_digital = vars['INFRAESTRUCTURA DIGITAL'];


        let tramites_funcionamiento = vars['TRAMITES Y FUNCIONAMIENTO']
        console.log(tramites_funcionamiento)
        let capacitacion = vars['CAPACITACION']
        let capital_humano = vars['CAPITAL HUMANO']

        this.var_1.text = 'Capacitación';
        this.var_1.categories = capacitacion

        this.var_2.text = 'Infraestructura';
        this.var_2.categories = infraestructura;

        this.var_3.text = "PRC";
        this.var_3.categories = prc;

        this.var_4.text = "Tramites y Funcionamiento";
        this.var_4.categories = tramites_funcionamiento

        this.var_5.text = "Infraestructura";
        this.var_5.subtext = 'Digital';
        this.var_5.categories = infraestructura_digital;

        this.var_6.text = "DOM"
        this.var_6.categories = capital_humano


      }    
    },

    get_data_variables(categories){
      let element;
      let data_result = [];

      if(categories.length > 0){
        for (element of categories){
          let text = element.variable;
        
          let value = this.data_file_comuna[text];

          let data_temp = {
            'text': text,
            'value': value
          }

          data_result.push(data_temp);
        }
      }
    
      return data_result;
    },

    create_list(data){
      let elements = [];
      let temp,dato;

      if(data.includes(',')) {
        temp = data.split(',')
        temp = temp.map(x => this.check_string(x));
        for (dato of temp){
          elements.push({option: dato})
        }
      }
      else{
        elements.push({option: this.check_string(data)})
      }

      return elements;

    },

    
  }
}
</script>

<style lang="css" scoped>
</style>