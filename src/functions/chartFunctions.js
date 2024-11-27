const get_rest_100_percent = (value) => {
	return 100.00-value
}

const tooltip_porcentaje = (category,value,data_name) => {
	return '<div style="margin: 0 auto;width: 250px; height: 110px;opacity:0.97;" >' +
    '<h2 class="font-weight-light text-left text-white" style="margin-top:10px; margin-left:15px"><small><B>'+category+'</B></small></h2>'+
    '<h3 class="font-weight-light text-left"  style="margin-top:10px;margin-left:15px">'+data_name+'</h3>'+
    '<h2 class="font-weight-light text-left" style="margin-top:5px;margin-left:15px"><b>'+value+'%</b></h2>'+
    '</div>';
}

function  get_data_chart_two_series(data,properties){
  let serie1 = [];
  let serie2 = [];
  let categories = [];
  let name1, name2;
  let title; 
  let colors = ['#054868','#02B998'];
  let element;

  for (element of data){

    if(properties.hasAnio){
      categories.push(element.anio)
    }

    if(properties.hasPermisos){
      serie1.push(element.numero_permisos);
      serie2.push(element.total_unidades);
      title = 'Permisos de Edificación';
      name1 = 'Permisos';
      name2 = "Unidades";
    }

    if(properties.hasPorcentajePobreza){
    	serie1.push(element.porcentaje_pobreza);
    	serie2.push(get_rest_100_percent(element.porcentaje_pobreza));
    	title = 'Personas en situación de pobreza';
    	name1 = 'Pobreza Multidimensional';
    	name2='%'

    }
  }

  return {
    'serie1': serie1,
    'serie2':serie2,
    'categories':categories,
    'colors':colors,
    'title':title,
    'name1':name1,
    'name2':name2
  }
}


const get_data_chart_one_serie = (data,properties) => {
	const serie = [];
	const categories = [];
	const colors = [];
	let title, name,data_type;

	let element;

	for (element of data){
		if (properties.hasAnio){
			categories.push(element.anio);
		}

		if (properties.hasComuna){
			categories.push(element.comuna)
		}

		if (properties.hasCantidadPersonasPobreza){
			serie.push(element.cantidad_personas);
			name = 'Personas en situación de pobreza';
			data_type = 'personas';
			title = 'Personas en situación de pobreza';
		}

		if (properties.hasDataSerie){
			serie.push(element.data);
			name = ''
			data_type = ''
			title= ''
		}

		if(properties.hasCant){
			serie.push(element.cant)
			name = ''
			data_type = ''
			title= ''
		}


	}

	return {
		serie: serie,
		categories: categories,
		colors: colors,
		name: name,
		title: title,
		data_type: data_type
	}

}



function get_data_linechart2(data){
      
  let data_result;

  if (data !== undefined){
  	 let first_element = data[0]

	  const use_anio = first_element.hasOwnProperty('anio');
	  const use_permisos = first_element.hasOwnProperty('numero_permisos');
	  
	  if(use_anio && use_permisos){
	    data_result = get_data_chart_two_series(data,{'hasAnio':use_anio, 'hasPermisos':use_permisos})
	  }
  }

  else{
  	data_result = []
  }

  return data_result
}

function get_data_columnchart(data){
	let data_result;


	if (data !== undefined){
		let first_element = data[0];
		// console.log(first_element)

		const use_anio = first_element.hasOwnProperty('anio');
		const use_cantidad_personas_pobreza = first_element.hasOwnProperty('cantidad_personas');
		// const use_porcentaje_pobreza = first_element.hasOwnProperty('porcentaje_pobreza');

		const use_comuna = first_element.hasOwnProperty('comuna');
		const use_cant = first_element.hasOwnProperty('cant');
		const use_data = first_element.hasOwnProperty('data');

		if(use_anio && use_cantidad_personas_pobreza){
			data_result = get_data_chart_one_serie(data,{'hasAnio': use_anio, 'hasCantidadPersonasPobreza': use_cantidad_personas_pobreza})
		}
		else if(use_comuna && use_data){
			data_result =get_data_chart_one_serie(data,{'hasComuna':use_comuna,'hasDataSerie':use_data})
		}

		else if(use_comuna && use_cant){
			data_result = get_data_chart_one_serie(data,{'hasComuna':use_comuna, 'hasCant': use_cant})
		}

		else{
			data_result =[];
		}

		return data_result
	}
	else{
		return -1;
	}
}

function get_data_fillcolumnchart(data){
	let data_result;

	if (data !== undefined){
		let first_element = data[0];
		const use_anio = first_element.hasOwnProperty('anio');
		const use_porcentaje_pobreza = first_element.hasOwnProperty('porcentaje_pobreza');

		if (use_anio && use_porcentaje_pobreza){
			data_result = get_data_chart_two_series(data,{'hasAnio':use_anio,'hasPorcentajePobreza':use_porcentaje_pobreza})
		}
		else{
			data_result = [];
		}

		return data_result
	}
	else {
		return -1
	}
	
}

export { 
	get_data_linechart2, 
	get_data_columnchart,
	get_data_fillcolumnchart,
	tooltip_porcentaje
}