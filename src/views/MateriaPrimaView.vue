<template>
	<div id="MateriaprimaView">
		<div id="header">
			<v-app-bar color="blue darken-2" class="rounded" flat dark>
				<div>
					<h2 class="font-weight-light mr-4 mb-0">ENCUESTA AGRO 2024</h2>
				</div>
				<div class="ml-6">
					<v-slide-group v-model="activeTab">
						<v-slide-item
							v-for="(item, index) in tabs"
							:key="index"
							v-slot:default="{ active, toggle }"
						>
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
		<div class="mt-2">
			<v-row>
				<v-col cols="3">
					<v-card class="card-left">
						<v-card-subtitle>
							<p class="gray-font-title">
								Materias primas y residuos orgánicos:
							</p>
							<p class="gray-font-subtitle">Empresa: Akapacha</p>
						</v-card-subtitle>
						<v-card-text>
							<DonutChart2
								:data_chart="{
									chartSeries: chartSeries,
									chartOptions: chartOptions,
									colors: ['#103E8E', '#5390EA'],
								}"
							/>
							<p class="gray-font-text">Gestión de residuos orgánicos:</p>
							<div class="d-flex justify-center my-3">
								<v-btn
									class="rounded-pill unactive"
									color="grey lighten-2"
									depressed
								>
									Siempre
								</v-btn>
								<v-btn
									class="mx-2 rounded-pill active"
									color="primary"
									depressed
								>
									A veces
								</v-btn>
								<v-btn
									class="rounded-pill unactive"
									color="grey lighten-2"
									depressed
								>
									Nunca
								</v-btn>
							</div>
							<div>
								<h2 class="subtitle">
									Rango de residuos orgánicos reciclados o reutilizados:
								</h2>
								<h1 class="mat_pri_number">51-75%</h1>
								<h2 class="subtitle">
									Rango de residuos orgánicos para compostaje:
								</h2>
								<h1 class="mat_pri_number">51-75%</h1>

								<p class="gray-font-text"><b>Nota:</b></p>

								<p class="gray-font-text-small">
									Los productos: dátil, limón, maíz y tomate aún no son materias
									primas de uso anual en Akapacha, actualmente, están en proceso
									de exploración.
								</p>
							</div>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="9">
					<v-card id="card-graph">
						<SankeyChart class="" />
					</v-card>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
import SankeyChart from "../components/charts/SankeyChart.vue";
import DonutChart2 from "../components/charts/DonutChart2.vue";
export default {
	name: "MateriaPrimaView",
	data() {
		return {
			activeTab: 2,
			tabs: [
				{ label: "Caracterización", path: "/caracterizacion/" },
				{ label: "Rating", path: "/rating/" },
				{ label: "Materia prima", path: "/materiaprima/1" },
			],
			chartSeries: [2247.9, 622.2], /////
			chartOptions: {
				chart: {
					type: "donut",
				},
				labels: ["Materia Prima", "Residuos Orgánicos"],
				responsive: [
					{
						breakpoint: 480,
						options: {
							legend: {
								position: "right",
							},
						},
					},
				],
			},
		};
	},
	components: {
		SankeyChart,
		DonutChart2,
	},
	methods: {
		navigateTo(index) {
			this.activeTab = index;
			this.$router.push({ path: this.tabs[index].path });
		},
	},
	created() {},
};
</script>

<style scoped>
#MateriaprimaView {
	/* overflow: hidden; */
	height: 100%;
}

#card-graph,
.card-left {
	height: 100%;
	/* overflow: hidden; */
}

.gray-font-title {
	color: #7f7f7f;
	font-size: 1.5vw;
	font-weight: bold;
}
.gray-font-subtitle {
	padding: 0;
	margin: 0;
	color: #7f7f7f;
	font-size: 1.2vw;
	font-weight: normal;
}
.gray-font-text {
	padding: 0;
	margin: 0;
	color: #7f7f7f;
	font-size: 1vw;
	font-weight: normal;
}

.gray-font-text-small {
	padding: 0;
	margin: 0;
	color: #7f7f7f;
	font-size: 0.7vw;
	font-weight: normal;
	line-height: 0.7vw;
}

/* TAMAÑOS BOTONES  */
.v-btn {
	font-size: 0.61vw;
}

.active {
	background-color: #103e8e !important; /* Texto gris para los botones inactivos */
	color: white !important; /* Texto blanco para el botón activo */
}
.unactive {
	color: #7f7f7f;
	background-color: #103e8e !important; /* Texto gris para los botones inactivos */
}
.subtitle {
	font-size: 0.914vw; /* Tamaño de fuente más pequeño */
	color: #7f7f7f; /* Color gris */
	margin: 0; /* Ajuste de espaciado */
	font-weight: normal;
}

.mat_pri_number {
	font-size: 1.4vw; /* Tamaño de fuente más grande */
	color: #2f48a3; /* Color azul */
	font-weight: bold;
	margin: 0; /* Espaciado entre los elementos */
	margin-right: 60px;
	text-align: right;
}
</style>
