<template>
	<div id="DetallesView">
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
										<h4 class="font-weight-medium">
											{{ item.label }}
										</h4>
									</div>
								</v-row>
							</v-card>
						</v-slide-item>
					</v-slide-group>
				</div>
				<v-spacer />
			</v-app-bar>
		</div>

		<v-container fluid>
			<v-row>
				<!-- PRIMERA CUADRANTE -->
				<v-col cols="6">
					<v-row>
						<!-- Priemra Fila Ubicacion y Productos -->
						<!-- Ubicacion -->
						<v-col cols="3"
							><v-card :height="195">
								<v-card-title>
									<span class="headline">Ubicación</span>
								</v-card-title>
								<v-card-text>
									{{ generalData.productor.ubicacion_predio }}
								</v-card-text>
							</v-card> </v-col
						>git
						<!-- Productos -->
						<v-col cols="9">
							<v-card>
								<v-card-title>
									<span class="headline">Productos</span>
								</v-card-title>
								<v-card-text>
									<TreeMap :height="100" :data="maptreeData" />
								</v-card-text> </v-card
						></v-col>
					</v-row>
					<v-row>
						<v-card class="mt-2">
							<!-- Sección de Capital Humano -->
							<div class="d-flex justify-between">
								<div id="capital-humano">
									<span class="headline">Capital Humano</span>
									<p>
										Total Trabajadores: <span>(cantidad)</span
										>{{ generalData.trabajadores.total }}
									</p>
								</div>
								<!-- Sección de Formación -->
								<div id="formacion-wrapper">
									<h4 class="gray-font-subtitle">Formación</h4>
									<div class="chips-container">
										<div class="chips-container-inner">
											<span
												:class="
													generalData.trabajadores.postgrado > 0
														? 'blue-chip'
														: 'gray-chip'
												"
												label
												>Postgrado</span
											>
											<span
												:class="
													generalData.trabajadores.postgrado > 0
														? 'blue-font-text'
														: 'gray-font-text'
												"
												>{{ generalData.trabajadores.postgrado }}</span
											>
										</div>

										<div class="chips-container-inner">
											<span
												:class="
													generalData.trabajadores.pregrado > 0
														? 'blue-chip'
														: 'gray-chip'
												"
												label
												>Pregrado</span
											>
											<span
												:class="
													generalData.trabajadores.pregrado > 0
														? 'blue-font-text'
														: 'gray-font-text'
												"
												>{{ generalData.trabajadores.pregrado }}</span
											>
										</div>

										<div class="chips-container-inner">
											<span
												:class="
													generalData.trabajadores.media > 0
														? 'blue-chip'
														: 'gray-chip'
												"
												label
												>E. Media</span
											>
											<span
												:class="
													generalData.trabajadores.media > 0
														? 'blue-font-text'
														: 'gray-font-text'
												"
												>{{ generalData.trabajadores.media }}</span
											>
										</div>

										<div class="chips-container-inner">
											<span
												:class="
													generalData.trabajadores.basica > 0
														? 'blue-chip'
														: 'gray-chip'
												"
												label
												>E. Básica</span
											>
											<span
												:class="
													generalData.trabajadores.basica > 0
														? 'blue-font-text'
														: 'gray-font-text'
												"
												>{{ generalData.trabajadores.basica }}</span
											>
										</div>
									</div>
								</div>
								<!-- Sección de Capacitación -->
								<div id="capacitacion-wrapper">
									<h4>Capacitación</h4>
									<!-- Aquí puedes agregar información sobre capacitación -->
									<p>
										Frecuencia Cap. BPA:
										{{
											generalData.trabajadores.frecuencia_capacitacion[0]
												.frecuencia_capacitacion_bpa || "N/A"
										}}
									</p>
									<p>
										Frecuencia Cap. Seguridad:
										{{
											generalData.trabajadores
												.frecuencia_capacitacion_seguridad[0]
												.frecuencia_capacitacion_seguridad || "N/A"
										}}
									</p>
								</div>
							</div>
						</v-card>
					</v-row>
				</v-col>

				<!-- SEGUNDO CUADRANTE -->
				<v-col cols="6">
					<v-row>
						<!-- RATING -->
						<v-col cols="9">
							<v-card>
								<v-card-text>
									<p class="gray-font-title1 ma-0">Rating</p>
									<p class="gray-font-subtitle ma-0 mt-1">Productores</p>
									<p class="gray-font-text ma-0 mt-1">
										Buenas Prácticas Sostenibilidad Agrícola (BPSA)
									</p>
									<div>
										<v-img
											:src="
												generalData.productor &&
												generalData.productor.ranking_bpsa
													? require(`../media/rating_${generalData.productor.ranking_bpsa}.svg`)
													: require('../media/rating_F.svg')
											"
											alt="Ranking BPSA"
											max-width="500"
											max-height="300"
											style="transform: scale(2.1)"
											contain
										></v-img>
									</div>
								</v-card-text>
							</v-card>
						</v-col>
						<!-- PERCEPCION -->
						<v-col cols="3">
							<v-card>
								<v-card-title>Percepción</v-card-title>
								<v-card-text>
									<!-- Contenido del gráfico de percepción -->
									<StackColumnVertical
										:height_chart="290"
										:data_chart="chartSeries"
									/>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-row>

			<v-row>
				<!-- TERCER CUADRANTE -->
				<v-col cols="6">
					<v-row>
						<!-- COMERCIALIZACION -->
						<v-col cols="8">
							<v-card height="100%">
								<p class="gray-font-title1 ml-6">Comercialización</p>
								<PieChart :data_chart="PieChartData" :height_chart="200" />
							</v-card>
						</v-col>
						<!-- PRODUCCION Y EVALUACION -->
						<v-col cols="4">
							<!-- PRIMERA FILA: PRODUCCION -->
							<v-row>
								<!-- CARD PRODUCCION -->
								<v-col class="pa-1">
									<v-card height="155" class="text-center">
										<p class="gray-font-subtitle">Producción</p>
										<p>Total anual (TON)</p>
										<p class="blue_number">
											{{
												generalData.cultivos.total_produccion_anual.replace(
													".",
													","
												)
											}}
										</p>
									</v-card>
								</v-col>
								<!-- CARD EVALUACION -->
								<v-row class="ma-0 pa-0">
									<v-col class="pa-1 text-center">
										<v-card height="175">
											<p class="gray-font-subtitle">Evolución Producción</p>
											<!-- Aquí puedes agregar información sobre la evolución -->
											<!-- Ejemplo simple con chips para mostrar evolución -->
											<div class="chips-container">
												<span
													:class="
														generalData.cultivos.evolucion_produccion === 3
															? 'blue-chip'
															: 'gray-chip'
													"
													>Aumento</span
												>
												<span
													:class="
														generalData.cultivos.evolucion_produccion === 2
															? 'blue-chip'
															: 'gray-chip'
													"
													>Igual</span
												>
												<span
													:class="
														generalData.cultivos.evolucion_produccion === 1
															? 'blue-chip'
															: 'gray-chip'
													"
													>Disminución</span
												>
											</div>
										</v-card>
									</v-col>
								</v-row>
							</v-row>
						</v-col>
					</v-row>
				</v-col>

				<!-- CUARTO CUADRANTE -->
				<v-col cols="6">
					<v-row>
						<v-col cols="9">
							<!-- GESTION RESIDUOS -->
							<v-card>
								<h2 class="gray-font-title1 ma-0 ml-3">Gestión de Residuos</h2>
								<div>
									<p class="gray-font-text ml-4">
										Realiza Gestión Residuos Orgánicos
									</p>

									<div class="chips-container">
										<span
											:class="
												generalData.residuos.gestion_organicos === 3
													? 'green-chip-r'
													: 'gray-chip-r'
											"
										>
											Siempre
										</span>
										<span
											:class="
												generalData.residuos.gestion_organicos === 2
													? 'green-chip-r'
													: 'gray-chip-r'
											"
										>
											A veces
										</span>
										<span
											:class="
												generalData.residuos.gestion_organicos === 1
													? 'green-chip-r'
													: 'gray-chip-r'
											"
										>
											Nunca
										</span>
									</div>

									<div>
										<p class="gray-font-text ml-3">
											Realiza Gestión Residuos No Orgánicos
										</p>
									</div>
									<div>
										<div class="chips-container">
											<span
												:class="
													generalData.residuos.gestion_no_organicos === 3
														? 'green-chip-r'
														: 'gray-chip-r'
												"
											>
												Siempre
											</span>
											<span
												:class="
													generalData.residuos.gestion_no_organicos === 2
														? 'green-chip-r'
														: 'gray-chip-r'
												"
											>
												A veces
											</span>
											<span
												:class="
													generalData.residuos.gestion_no_organicos === 1
														? 'green-chip-r'
														: 'gray-chip-r'
												"
											>
												Nunca
											</span>
										</div>
									</div>
								</div>
							</v-card>
						</v-col>
						<v-col cols="3">
							<!-- CONSUMO DE AGUA  -->
							<v-card height="200">
								<p class="gray-font-title1">Consumo Agua</p>
								<!-- Contenido del consumo de agua aquí -->
								Total anual (m³):
								{{ generalData.cultivos.consumo_anual_agua.replace(".", ",") }}
							</v-card>
						</v-col>
					</v-row>

					<v-row>
						<!-- Tarjeta Certificaciones -->
						<v-col cols="3">
							<v-card>
								<p class="gray-font-subtitle">Certificaciones</p>
								<!-- Contenido sobre certificaciones aquí -->
							</v-card>
						</v-col>
						<!-- Tarjeta Trazabilidad -->
						<v-col cols="3">
							<v-card>
								<p class="gray-font-subtitle">Trazabilidad</p>
								<!-- Contenido sobre trazabilidad aquí -->
							</v-card>
						</v-col>
						<!-- Tarjeta Registro -->
						<v-col cols="3">
							<v-card>
								<p class="gray-font-subtitle">Registro</p>
								<!-- Contenido sobre registro aquí -->
							</v-card>
						</v-col>

						<!-- Tarjeta Frecuencia Registro -->
						<v-col cols="3">
							<v-card>
								<p class="gray-font-subtitle">Frecuencia Registro</p>
								<!-- Contenido sobre frecuencia registro aquí -->
							</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import axios from "axios";
import StackColumnVertical from "../components/charts/stackColumnVertical.vue";
import PieChart from "../components/charts/PieChart.vue";
import TreeMap from "../components/charts/TreeMap.vue";
import { mapActions, mapState } from "vuex";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
	"token"
)}`;

export default {
	name: "DetallesView",
	components: {
		TreeMap,
		StackColumnVertical,
		PieChart,
	},
	data() {
		return {
			activeTab: -1,
			user_id: localStorage.getItem("user_id"),
			tabs: [
				{ label: "Caracterización", path: "/caracterizacion/" },
				{ label: "Rating", path: "/rating/" },
				{ label: "Materia Prima", path: "/materiaprima/" },
			],
			producers: [
				{ id: 1, nombre: "Prod 1" },
				{ id: 2, nombre: "Prod 2" },
				{ id: 3, nombre: "Prod 3" },
				{ id: 4, nombre: "Prod 4" },
				{ id: 5, nombre: "Prod 5" },
				{ id: 6, nombre: "Prod 6" },
				{ id: 7, nombre: "Prod 7" },
			],
			PieChartData: {
				title: "",
				serie: [],
				categories: ["Internacional", "Regional", "Nacional"],
				colors: ["#79A6E8", "#5390EA", "#103E8E"],
			},
			maptreeData: {},
			chartSeries: [],
		};
	},
	computed: {
		...mapState(["generalData"]),
		selectedProducer() {
			return this.$route.params.producerId;
		},
	},
	methods: {
		...mapActions(["fetchGeneralData"]),
		navigateTo(index) {
			this.activeTab = index;
			this.$router.push({ path: this.tabs[index].path });
		},
		assignColorsToCultivos(cultivos, colorMapping) {
			return cultivos.map(
				(cultivo) => colorMapping[cultivo.producto] || "#CCCCCC"
			);
		},
		updateMaptreeData() {
			if (this.generalData?.cultivos?.lista_cultivos) {
				const cultivos = this.generalData.cultivos.lista_cultivos;

				// Objeto de colores por producto
				const colorMapping = {
					Pimiento: "#62B238",
					Ají: "#F4731B",
					Dátil: "#C35B1B",
					Tomate: "#DC1933",
					Aceituna: "#488A29",
					"Tomate Cherry": "#F31C17",
					Maíz: "#FAD829",
					Albahaca: "#3ABB5C",
					Maracuyá: "#E1BF26",
					Guayaba: "#EB8180",
					Limón: "#E6ED6F",
					Ajo: "#E7A6E1",
					Berenjena: "#2A7629",
					Orégano: "#44B443",
					Pepino: "#9DE080",
				};

				// Asigna colores a cada cultivo
				const colors = this.assignColorsToCultivos(cultivos, colorMapping);

				// Transformar el array en un objeto adecuado para TreeMap
				this.maptreeData = {
					serie: cultivos.map((cultivo) => ({
						x: cultivo.producto || "Sin Producto",
						y: parseFloat(cultivo.produccion_anual) || 0,
						producto: cultivo.producto || "Sin Producto",
						pertinencia: cultivo.grado_pertinencia_cultivo || "Sin Pertinencia",
						practica: cultivo.practica_agricola || "Sin Práctica",
						sellos: cultivo.sello || "No tiene",
						produccion: `${cultivo.produccion_anual || 0} Ton`,
					})),
					colors, // Paleta de colores
				};
			}
		},
		updatePieChartData() {
			if (this.generalData?.cultivos) {
				const cultivos = this.generalData.cultivos;
				this.PieChartData = {
					title: cultivos.producto_mayor_produccion || "Sin Título",
					serie: [
						cultivos.porcentaje_internacional || 0,
						parseInt(cultivos.porcentaje_regional) || 0,
						parseInt(cultivos.porcentaje_nacional) || 0,
					],
					categories: ["Internacional", "Regional", "Nacional"],
					colors: ["#79A6E8", "#5390EA", "#103E8E"],
				};
			}
		},
		updateStackColumnVerticalData() {
			if (this.generalData?.productor) {
				const valorPercepcion = this.generalData.productor.percepcion || 0;
				const diff = 100 - valorPercepcion;
				const productor = this.producers.find(
					(p) => p.id === this.generalData.productor.id
				);
				const nombreProductor = productor
					? productor.nombre
					: `P${this.selectedProducer}`;

				this.chartSeries = {
					series: [
						{ name: nombreProductor, data: [valorPercepcion] },
						{ name: " ", data: [diff] },
					],
					categorias: ["Percepción"],
				};
			}
		},
	},
	watch: {
		selectedProducer: {
			handler(newProducerId) {
				if (newProducerId) {
					this.fetchGeneralData(newProducerId);
				}
			},
			immediate: true,
		},
		generalData: {
			handler() {
				this.updatePieChartData();
				this.updateMaptreeData();
				this.updateStackColumnVerticalData();
			},
			immediate: true,
			deep: true,
		},
	},
};
</script>

<style>
#DetallesView {
	height: 100%;
	overflow: hidden;
	border: 1px solid red;
}

#capacitacion-wrapper {
	/* width: 100%;
	border: 1px solid red; */
}
#formacion-wrapper {
	/* width: 100%;
	border: 1px solid red; */
}

#capital-humano-wrapper {
	/* width: 100%;
	border: 1px solid red;
	display: flex;
	flex-direction: column;
	text-align: center; */
}
.body-detalles-view {
	border: 2px solid violet;
	overflow: hidden;
	max-width: 100%;
	max-height: 100vh;
}
.v-card {
	/* flex: 1;
	min-width: 0;
	overflow: hidden;
	max-height: 100%;
	max-width: 100%; */
}
.d-flex {
	display: flex;
}
.TreeMap,
.PieChart {
	max-width: 100%; /* Asegura que no excedan el ancho del contenedor */
	height: auto; /* Mantiene la relación de aspecto correcta */
}
.gray-font-title1 {
	padding: 0;
	margin: 0;
	color: #7f7f7f;
	font-size: 1.5vw;
	text-align: center;
	font-weight: Bold;
}
.gray-font-subtitle {
	padding: 0;
	margin: 0;
	color: #7f7f7f;
	font-size: 1.2vw;
	font-weight: bold;
}
.gray-font-text {
	padding: 0;
	margin: 0;
	color: #7f7f7f;
	font-size: 18px;
	font-weight: normal;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.gray-font-text-ligth {
	font-size: 14px;
	color: #7f7f7f;
	font-weight: normal;
	margin-left: 10px;
}

.blue_number {
	font-size: 30px; /* Tamaño de fuente más grande */
	color: #2f48a3; /* Color azul */
	font-weight: bold;
}

.gray-font-text-italic {
	padding: 0;
	margin: 0;
	color: #7f7f7f;
	font-size: 20px;
	font-style: italic;
	font-weight: normal;
}
.gray-chip {
	margin: 2px;
	height: 34px;
	width: 120px;
	background-color: #b6b7b7; /* Gris */
	color: #ffffff;
	font-weight: normal;
	border-radius: 20px;
	padding: 8px 15px;
	font-size: 14px;
}

.blue-chip {
	margin: 2px;
	height: 36px;
	width: 120px;
	background-color: #2f48a3; /* Azul */
	color: #ffffff;
	font-weight: normal;
	border-radius: 20px;
	padding: 8px 15px;
	font-size: 14px;
}
.gray-chip-r {
	height: 34px;
	width: 100px;
	background-color: #b6b7b7; /* Gris */
	color: #ffffff;
	font-weight: normal;
	border-radius: 20px;
	padding: 5px 15px;
	font-size: 14px;
	margin: 3px;
}

p {
	margin: 0;
	padding: 0;
}
.chips-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
}
.chips-container-inner {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
}
.green-chip-r {
	margin: 2px;
	height: 34px;
	width: 100px;
	background-color: #60b239; /* Azul */
	color: #ffffff;
	font-weight: normal;
	border-radius: 20px;
	padding: 5px 15px;
	font-size: 14px;
}
.blue-font-text {
	color: #2f48a3; /* Azul */
	font-weight: bold;
	padding: 2px;
	font-size: 20px;
}

/*  */
.circle-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px; /* Espacio entre los círculos */
}

.rounded-gray,
.rounded-green {
	width: 40px; /* Ancho del círculo */
	height: 40px; /* Alto del círculo */
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 17px;
	font-weight: normal;
	border-radius: 50%; /* Hace que el elemento sea circular */
}

.rounded-gray {
	background-color: #b6b7b7;
	color: #ffffff;
}

.rounded-green {
	background-color: #60b239;
	color: #ffffff;
}
/*  */
.square-container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 10px; /* Espacio entre los cuadrados */
}

.square-gray,
.square-green {
	width: 50px; /* Ancho del cuadrado */
	height: 50px; /* Alto del cuadrado */
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	font-weight: normal;
	border-radius: 0px; /* Borde ligeramente redondeado */
}

.square-gray {
	background-color: #b6b7b7;
	color: #ffffff;
}

.square-green {
	background-color: #60b239;
	color: #ffffff;
}
.big-gray-chip-r,
.big-green-chip-r {
	width: 150px; /* Ancho más grande */
	padding: 5px 0; /* Ajusta el padding vertical para mayor altura */
	display: flex;
	margin: 3px;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	font-weight: normal;
	border-radius: 30px; /* Bordes redondeados */
}

.big-gray-chip-r {
	background-color: #b6b7b7;
	color: #ffffff;
}

.big-green-chip-r {
	background-color: #60b239;
	color: #ffffff;
}
</style>
