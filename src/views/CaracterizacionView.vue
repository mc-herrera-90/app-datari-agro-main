<template>
	<div id="CaracterizacionView">
		<div id="header">
			<v-app-bar color="blue darken-2" class="rounded" flat dark>
				<div>
					<h2 class="font-weight-light mr-4 mb-0">ENCUESTA AGRO 2024</h2>
				</div>
				<div class="ml-6">
					<v-slide-group v-model="activeTab">
						<v-slide-item v-for="(item, index) in tabs" :key="index">
							<v-card
								:color="
									index === activeTab
										? 'blue lighten-5 black--text'
										: 'blue darken-1 white--text'
								"
								class="ma-2"
								height="40"
								width="200"
								dense
								solo-inverted
								@click="navigateTo(index)"
							>
								<v-row align="center" justify="center">
									<div class="mt-5">
										<h4 class="font-weight-medium">{{ item.label }}</h4>
									</div>
								</v-row>
							</v-card>
						</v-slide-item>
					</v-slide-group>
				</div>
				<v-spacer />
			</v-app-bar>
		</div>
		<div id="region1" class="mt-2">
			<div id="region1-row">
				<v-col
					cols="6"
					class="d-flex flex-column"
					style="padding: 0; gap: 6px; margin-right: 5px"
				>
					<div class="d-flex" id="top-panel">
						<v-card
							class="d-flex flex-column"
							style="
								justify-content: space-around;
								align-items: center;
								width: 100%;
							"
						>
							<h4 class="gray-font-title">Productores Participantes</h4>
							<DonutChart
								:width="'50%'"
								:data_chart="{
									serie: chartSeries,
									categories: chartOptions.labels,
									colors: ['#103E8E', '#5390EA'],
								}"
							/>
						</v-card>
						<v-card
							class="d-flex flex-column text-center"
							style="justify-content: space-between; width: 35%"
						>
							<p class="gray-font-title">Tipo Empresa</p>
							<p class="gray-font-subtitle">Persona Jurídica</p>
							<p class="number">1</p>
							<p class="gray-font-subtitle">Persona Natural</p>
							<p class="number">6</p>
						</v-card>
						<div
							class="d-flex flex-column"
							style="gap: 10px; justify-content: space-between; width: 100%"
						>
							<v-card class="text-center">
								<p class="gray-font-title">Microempresas</p>
								<p class="gray-font-subtitle">0 - 2400 UF</p>
								<p class="number">100%</p>
							</v-card>
							<v-card class="text-center">
								<h4 class="gray-font-title">Propiedad</h4>
								<StackColumn :data_chart="data_chart" />
							</v-card>
						</div>
					</div>
					<v-card>
						<InfoCardTreeMap :title="'Productos'" :data="maptreeData" />
					</v-card>
					<div class="d-flex" style="justify-content: space-between; gap: 10px">
						<v-card style="width: 100%">
							<InfoCardDoble
								class="pt-3"
								:title="'Producción Anual (TON)'"
								:name1="'Total'"
								:data1="'252,4'"
							/>
						</v-card>
						<v-card style="width: 100%">
							<InfoCardDoble
								class="pt-3"
								:title="'Consumo agua Anual (M3)'"
								:name1="'Total'"
								:data1="'48.084'"
							/>
						</v-card>
						<v-card style="width: 100%">
							<InfoCardTriple
								:title="'Rango superficie cultivada (Ha)'"
								:name1="'Menos de 1 Ha'"
								:data1="'60,00%'"
								:name2="'1 - 3,9 Ha:'"
								:data2="'33,33%'"
								:name3="'10 - 12,9 Ha:'"
								:data3="'6,67%'"
							/>
						</v-card>
					</div>
				</v-col>
				<v-col cols="6" style="padding: 0; margin: 0; z-index: ">
					<v-card id="card-mapa" class="py-5">
						<mapa_regiones
							:data_regiones="data_regiones"
							:data_comunas="data_comunas"
						/>
					</v-card>
				</v-col>
			</div>
		</div>
	</div>
</template>

<style type="text/css">
.boton_cerrar_mapa {
	justify-content: center;
	align-items: center;
	margin-left: 0%;
	margin-top: 20px;
}
</style>

<script>
import DonutChart from "../components/charts/DonutChart.vue";
import InfoCardList from "../components/dashboardComponents/infoCardList.vue";
import InfoCardDoble from "../components/dashboardComponents/infoCardDoble.vue";
import InfoCardTriple from "../components/dashboardComponents/infoCardTriple.vue";
import mapa_regiones from "../components/maps/mapa_regiones.vue";
import InfoCardTreeMap from "../components/dashboardComponents/infoCardTreeMap.vue";
import StackColumn from "../components/charts/stackColumn.vue";

export default {
	name: "CaracterizacionView",
	components: {
		DonutChart,
		InfoCardTreeMap,
		InfoCardList,
		InfoCardDoble,
		InfoCardTriple,
		mapa_regiones,
		StackColumn,
	},

	data() {
		return {
			activeTab: 0,
			tabs: [
				{ label: "Caracterización", path: "/caracterizacion/" },
				{ label: "Rating", path: "/rating/" },
				{ label: "Materia Prima", path: "/materiaprima/" },
			],
			// Datos para el Donut
			chartSeries: [4, 3],
			chartOptions: {
				chart: {
					type: "donut",
				},
				labels: ["Mujeres", "Hombres"],
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								width: 200,
							},
							legend: {
								position: "bottom",
							},
						},
					},
				],
			},

			//Datos para el Maptree
			maptreeData: [
				{
					option: "Pimiento",
					cant: 80,
					producto: "Pimiento",
					pertinencia: "Alta",
					practica: "Tecnificada",
					sellos: "No tiene",
					produccion: "80 Ton",
				},
				{
					option: "Ají",
					cant: 60,
					producto: "Ají",
					pertinencia: "Media",
					practica: "Tecnificada",
					sellos: "No tiene",
					produccion: "60 Ton",
				},
				{
					option: "Dátil",
					cant: 40,
					producto: "Dátil",
					pertinencia: "Baja",
					practica: "Tecnificada",
					sellos: "No tiene",
					produccion: "40 Ton",
				},
				{
					option: "Tomate",
					cant: 36,
					producto: "Tomate",
					pertinencia: "Alta",
					practica: "Tecnificada",
					sellos: "No tiene",
					produccion: "36 Ton",
				},
				{
					option: "Aceituna",
					cant: 10.01,
					producto: "Aceituna",
					pertinencia: "Alta",
					practica: "Tecnificada",
					sellos: "I. Geográfica",
					produccion: "10 Ton",
				},
				{
					option: "Tomate Cherry",
					cant: 10,
					producto: "Tomate Cherry",
					pertinencia: "Media",
					practica: "Tecnificada",
					sellos: "No tiene",
					produccion: "10 Ton",
				},
				{
					option: "Maíz",
					cant: 5,
					producto: "Maíz",
					pertinencia: "Alta",
					practica: "Campesina",
					sellos: "I. Geográfica",
					produccion: "5 Ton",
				},
				{
					option: "Albahaca",
					cant: 3,
					producto: "Albahaca",
					pertinencia: "Baja",
					practica: "Tecnificada",
					sellos: "No tiene",
					produccion: "3 Ton",
				},
				{
					option: "Maracuyá",
					cant: 1.8,
					producto: "Maracuyá",
					pertinencia: "Baja",
					practica: "Campesina",
					sellos: "No tiene",
					produccion: "1,8 Ton",
				},
				{
					option: "Guayaba",
					cant: 1.4,
					producto: "Guayaba",
					pertinencia: "Baja",
					practica: "Campesina",
					sellos: "No tiene",
					produccion: "1,4 Ton",
				},
				{
					option: "Limón",
					cant: 1.2,
					producto: "Limón",
					pertinencia: "Baja",
					practica: "Campesina",
					sellos: "No tiene",
					produccion: "1,2 Ton",
				},
				{
					option: "Pepino",
					cant: 1,
					producto: "Pepino",
					pertinencia: "Baja",
					practica: "Tecnificada",
					sellos: "No tiene",
					produccion: "1 Ton",
				},
				{
					option: "Orégano",
					cant: 1,
					producto: "Orégano",
					pertinencia: "Alta",
					practica: "Campesina",
					sellos: "I. Geográfica, M. Campesinas",
					produccion: "1 Ton",
				},
				{
					option: "Berenjena",
					cant: 1,
					producto: "Berenjena",
					pertinencia: "Baja",
					practica: "Tecnificada",
					sellos: "No tiene",
					produccion: "1 Ton",
				},
				{
					option: "Ajo",
					cant: 1,
					producto: "Ajo",
					pertinencia: "Alta",
					practica: "Campesina",
					sellos: "No tiene",
					produccion: "1 Ton",
				},
			],
			// Datos para el mapbox
			data_regiones: [
				{
					numero_region: 1,
					nombre: "Tarapacá",
					coordinates: [-69.4115587, -19.1895282],
					color_region: "#EB8180",
				},
				{
					numero_region: 15,
					nombre: "Arica y Parinacota",
					coordinates: [-69.4115587, -19.1895282], // Coordenadas centrales de la región
					color_region: "#F28C28", // Color para visualizar la región en el mapa
				},
				// Agregar más regiones con sus coordenadas y colores
			],
			data_comunas: [
				// Datos de ejemplo de comunas en formato GeoJSON
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [-70.209529, -18.507798],
					},
					properties: {
						data_file: JSON.stringify({
							nombre_productor: "Prod 1",
							region: "Arica y Parinacota",
							ubicacion: "Azapa",
							distancia_arica: "8,5 Km",
							productos: "Aceituna, Albahaca, Berenjena, Pepino",
						}),
					},
				},
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [-69.8886099, -18.582377],
					},
					properties: {
						data_file: JSON.stringify({
							nombre_productor: "Prod 2",
							region: "Arica y Parinacota",
							ubicacion: "Azapa",
							distancia_arica: "45 Km",
							productos: "Ají, Pimiento, Tomate, Tomate Cherry",
						}),
					},
				},
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [-69.4115587, -19.1895282],
					},
					properties: {
						data_file: JSON.stringify({
							nombre_productor: "Prod 3",
							region: "Tarapacá",
							ubicacion: "Nama",
							distancia_arica: "285 Km",
							productos: "Ajo",
						}),
					},
				},
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [-70.3075036, -18.4041655],
					},
					properties: {
						data_file: JSON.stringify({
							nombre_productor: "Prod 4",
							region: "Arica y Parinacota",
							ubicacion: "Villa Frontera",
							distancia_arica: "12 Km",
							productos: "Dátil",
						}),
					},
				},
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [-70.3031824, -18.3578823],
					},
					properties: {
						data_file: JSON.stringify({
							nombre_productor: "Prod 5",
							region: "Arica y Parinacota",
							ubicacion: "Pampa Concordia",
							distancia_arica: "16 Km",
							productos: "Guayaba, Limón, Maracuyá",
						}),
					},
				},
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [-69.9458826, -18.3819138],
					},
					properties: {
						data_file: JSON.stringify({
							nombre_productor: "Prod 6",
							region: "Arica y Parinacota",
							ubicacion: "Valle de Lluta",
							distancia_arica: "57 Km",
							productos: "Maíz",
						}),
					},
				},
				{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [-69.5977, -18.2639723],
					},
					properties: {
						data_file: JSON.stringify({
							nombre_productor: "Prod 7",
							region: "Arica y Parinacota",
							ubicacion: "Socoroma",
							distancia_arica: "124 Km",
							productos: "Orégano",
						}),
					},
				},
			],
		};
	},
	methods: {
		navigateTo(index) {
			this.activeTab = index;
			this.$router.push({ path: this.tabs[index].path });
		},
	},
	created() {},
	mounted() {},
	beforeDestroy() {},
};
</script>

<style scoped>
#CaracterizacionView {
	/* border: 2px solid red; */
	height: 100%;
	overflow: hidden;
	/* z-index: -1; */
}

#region1-row {
	overflow: hidden !important;
	height: 100%;
	/* background: #000; */
	display: flex;
}

#top-panel {
	justify-content: space-between;
	gap: 10px;
}

#card-participantes {
	min-height: 100%;
	height: 14.5vw;
	margin: 0;
	padding: 0;
}

.v-btn.white--text {
	background-color: white;
	color: black !important;
}

.number {
	padding: 0;
	margin: 0;
	font-size: 1.4vw;
	font-weight: bold;
	color: #2f48a3;
}
.gray-font-title {
	padding: 0;
	margin: 0;
	color: #7f7f7f;
	font-size: 1vw;
	text-align: center;
	font-weight: bold;
}
.gray-font-subtitle {
	padding: 0;
	margin: 0;
	color: #7f7f7f;
	font-size: 0.63vw;
	font-weight: normal;
}
/* MAPA */
#card-mapa {
	overflow: hidden;
	height: 100%;
}
</style>
