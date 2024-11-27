<template>
  <div id="FillColumn">
    <apexchart  :height="height" ref="chart" type="bar" :options="options" :series="series" class="chart-wrapper">
    </apexchart>
  </div>
</template>

<script>
import {tooltip_porcentaje} from '../../functions/chartFunctions.js';

export default {

  name: 'FillColumnChart',
  props: ['height','data_chart'],
  data () {
    return {
      series:[{
        data:[]
      },
      {
        data:[]
      }],
      options:{
        chart:{
          toolbar:{
            show:false
          },
          stacked:true
        },
        plotOptions:{
          bar:{
            dataLabels: {
              position: 'top',
              borderRadius: 1
            },
            columnWidth: '85%',
            endingShape: 'rounded'
          }
        },
        xaxis:{
          type:'categories',
          categories:[],
          style: {
            colors: '#fff',
            fontSize: '15px'
          }
        },
        yaxis:{
          show:false
        },
        legend: {
          show:false
        },
        grid:{
          show:true
        },
        data_type:null,
        name_data:null,
        colors:["#00796B","#CCCCCC"]
      }
    }
  },
  mounted(){
   
      this.updateChart();
    

  },
  computed:{
    updateData(){
      return this.data_chart;
    }
  },
  watch:{
    updateData(){
      this.updateChart();
    }
  },
  methods:{

    updateChart(){
      if( this.data_chart.categories != undefined ){
        this.$refs.chart.updateOptions({
          series:[
            {
              data:this.data_chart.serie1
            },
            {
              data:this.data_chart.serie2
            }
          ],
          xaxis:{
            categories: this.data_chart.categories
          },
          title:{
            text:this.data_chart.title,
            align:'center',
            floating: true,
            offsetX: 0,
            offsetY: -5,
            margin:10,
            style: {
              fontSize:  '15px',
              fontWeight:  'medium',
              fontFamily:  undefined,
              color:  '#263238'
            },
          },
          data_type:this.data_chart.name2,
          name_data:this.data_chart.name1,
          dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            offsetY:-25,
            offsetX:0,
            textAnchor: 'middle',
            formatter: function(val,w){
              var index = w['dataPointIndex'];
              var data = w['w'].globals.series
              var totalData = data[0][index] + data[1][index]
              var porcentaje = parseFloat(((val / totalData)*100).toFixed(0));
              if(porcentaje != 0.00){
                return porcentaje+'%';
              }else{
                return '0%';
              }
            },
            style: {
              fontSize: '11x',
              colors: ['#000']
            },  
          },
          tooltip:{
            theme:'dark',
            custom: function({series,seriesIndex,dataPointIndex,w}){
              
              let value = series[0][dataPointIndex];
              let category = w.globals.labels[dataPointIndex];
              let data_type = w.config.data_type;
              let data_name = w.config.name_data;

              if (data_type === '%'){
                return tooltip_porcentaje(category,value,data_name)
              }

            
            }
          }
        });
      }  
    }
  }
}
</script>

<style scoped>
div.chart-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -50px;
}
</style>