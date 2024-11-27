<template>
  <div id="container-graph-sankey">
    <div
      id="svg-sankey"
      ref="sankeyContainer"
      class="padre"
    ></div>
    <div id="tooltip" class="tooltip" ref="tooltip" style="opacity: 0;"></div>
    </div>
  </template>
  
  <script>
  import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
  import * as d3 from 'd3';
  
  export default {
    name: 'SankeyChart',
    mounted() {
      // Definir datos con 11 productos y flujos de izquierda a derecha
      const data = {
        nodes: [
          { id: 'Materia Prima', title: 'Materia Prima' },
          { id: 'Aceituna', title: 'Aceituna' },
          { id: 'Aji', title: 'Aji' },
          { id: 'Ajo', title: 'Ajo' },
          { id: 'Albahaca', title: 'Albahaca' },
          { id: 'Berenjena', title: 'Berenjena' },
          { id: 'Maracuyá', title: 'Maracuyá' },
          { id: 'Guayaba', title: 'Guayaba' },
          { id: 'Oregano', title: 'Oregano' },
          { id: 'Pepino', title: 'Pepino' },
          { id: 'Pimiento', title: 'Pimiento' },
          { id: 'Residuos Orgánicos', title: 'Residuos Orgánicos' },
          { id: 'Tomate Cherry', title: 'Tomate Cherry' },
        ],
        links: [
          { source: 'Materia Prima', target: 'Aceituna', value: 929.3 },
          { source: 'Materia Prima', target: 'Aji', value: 100.6 },
          { source: 'Materia Prima', target: 'Ajo', value: 165.9 },
          { source: 'Materia Prima', target: 'Albahaca', value: 219 },
          { source: 'Materia Prima', target: 'Berenjena', value: 153.6 },
          { source: 'Materia Prima', target: 'Maracuyá', value: 226.9 },
          { source: 'Materia Prima', target: 'Guayaba', value: 446.7 },
          { source: 'Materia Prima', target: 'Oregano', value: 1.7 },
          { source: 'Materia Prima', target: 'Pepino', value: 133.7 },
          { source: 'Materia Prima', target: 'Pimiento', value: 323.3 },
          { source: 'Materia Prima', target: 'Tomate Cherry', value: 169.3 },
          { source: 'Aceituna', target: 'Residuos Orgánicos', value: 185.8 },
          { source: 'Aji', target: 'Residuos Orgánicos', value: 13.6 },
          { source: 'Ajo', target: 'Residuos Orgánicos', value: 3.3 },
          { source: 'Albahaca', target: 'Residuos Orgánicos', value: 120.4 },
          { source: 'Berenjena', target: 'Residuos Orgánicos', value: 38.5 },
          { source: 'Maracuyá', target: 'Residuos Orgánicos', value: 90.7 },
          { source: 'Guayaba', target: 'Residuos Orgánicos', value: 53.6 },
          { source: 'Oregano', target: 'Residuos Orgánicos', value: 0.0 },
          { source: 'Pepino', target: 'Residuos Orgánicos', value: 7.2 },
          { source: 'Pimiento', target: 'Residuos Orgánicos', value: 106.6 },
          { source: 'Tomate Cherry', target: 'Residuos Orgánicos', value: 2.5},
          
        ],
      };
  
      // Definir colores para cada producto
      const colorMap = {
        'Materia Prima': '#B28AC0',
        'Aceituna': '#488A29',
        'Aji': '#F4731B',
        'Ajo': '#E7A6E1',
        'Albahaca': '#3ABB5C',
        'Berenjena': '#2A7629',
        'Maracuyá': '#E1BF26',
        'Guayaba': '#EB8180',
        'Oregano': '#44B443',
        'Pepino': '#9DE080',
        'Pimiento': '#62B238',
        'Tomate Cherry': '#F31C17',
        'Residuos Orgánicos': '#7f7f7f',
      };
  
      const container = this.$refs.sankeyContainer;
      const width = container.getBoundingClientRect().width;
      const height = container.getBoundingClientRect().height;
      (height);

      const sankeyGenerator = sankey()
        .nodeId(d => d.id)
        .nodeWidth(20)
        .nodePadding(10)
        .extent([[1, 1], [width - 100, height - 10]]);
      const { nodes, links } = sankeyGenerator(data);
  
    
      
      const svg = d3.select(this.$refs.sankeyContainer)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '75vh');

      const tooltip = d3.select(this.$refs.tooltip);
    // Dibujar los nodos con color asignado
      svg.append('g')
        .selectAll('rect')
        .data(nodes)
        .join('rect')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('height', d => d.y1 - d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('fill', d => colorMap[d.id] || '#007bff')
        .on('mouseover', (event, d) => {
        tooltip.style('opacity', 1).html(`Nodo: ${d.title}<br>Valor: ${d.value} Kg`);
        })
        .on('mousemove', (event) => {
            const [x, y] = d3.pointer(event);
            tooltip
              .style('left', `${x + 10}px`)
              .style('top', `${y + 10}px`);
        })
        .on('mouseout', () => tooltip.style('opacity', 0)); 

          // Asignar color basado en el ID
  
      // Agregar etiquetas de texto para cada nodo
      svg.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('x', d => d.x1 + 60) // Posiciona el texto a la izquierda del nodo
        .attr('y', d => (d.y0 + d.y1) / 2) // Centra verticalmente
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .text(d => d.title)
        .attr('font-family', 'Quicksand, sans-serif')
        .attr('font-size', '.8vw')
        .attr('fill', '#000');
  
      // Dibujar los enlaces
      svg.append('g')
        .attr('fill', 'none')
        .attr('stroke-opacity', 0.5)
        .selectAll('path')
        .data(links)
        .join('path')
        .attr('d', sankeyLinkHorizontal())
        .attr('stroke', d => colorMap[d.source.id] || '#007bff') // Color de enlace basado en el nodo de origen
        .attr('stroke-width', d => d.width)
        .on('mouseover', (event, d) => {
        tooltip.style('opacity', 1).html(`De: ${d.source.title} a ${d.target.title}<br>Valor: ${d.value} Kg`);
        })
        .on('mousemove', (event) => {
            const [x, y] = d3.pointer(event);
            tooltip
              .style('left', `${x + 10}px`)
              .style('top', `${y + 10}px`);
        })
        .on('mouseout', () => tooltip.style('opacity', 0));
    },
  };

  </script>
  
  <style scoped>
  #container-graph-sankey {
    width: 100%;
    height: 75vh;
    border: 1px solid red;
  }
  .padre {
    padding: 10px;
    height: 90%;
    width: 100%;
  }

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 3px;
  pointer-events: none;
  font-size: 12px;
}
  </style>
  