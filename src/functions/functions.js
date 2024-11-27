const formatCL = (val) => {
  if (val === null){
    return val
  }else{
    var valor = val.toLocaleString();
    var largo_string = valor.length
    var i;
    var stringFormat = ''; 
    for(i of valor){
      if( i === '.' ){
        i = ',';
        stringFormat+=i;
      }
      else if(i ===','){
        i = '.';
        stringFormat+=i;
      }
      else{
        stringFormat+=i;
      }
    }
    return stringFormat;
  }
}

function resume_texts(variable){
    

  let variable_string = variable.trim() 
  let result_text;
  
  if('Indique si el PRC está actualmente en proceso de modificación' === variable_string){
    result_text = '¿En modificación?'
  }

  else if('Posee SIG para su catastro digital' == variable_string){
    result_text = {
      title: 'SIG',
      subtitle: 'Catastro Digital'
    }
  }

  else if('Indique el año del PRC vigente' === variable_string){
    result_text = 'Año PRC vigente'
  }

  else if('Cantidad funcionarios DOM' === variable_string){
    result_text = 'Funcionarios DOM'
  }

  else if('Medio para capacitación' === variable_string){
    result_text = 'Medio'
  }

  else if('Temáticas de capacitación' === variable_string){
    result_text ='Temáticas'
  }

  else if('Reuniones por Zoom o Teams' === variable_string){
    result_text = 'Reuniones en linea'
  }

  else if('Planificación urbana y territorial' === variable_string){
    result_text = 'Plan. Urbana y Territorial'
  }

  else if('Ley de Aportes al Espacio Público' === variable_string){
    result_text = 'Ley AEP'
  }
  else if('Innovación y transformación digital de las ciudades' === variable_string){
    result_text = 'Innovación digital ciudades'
  }

  else if('Tramites y Funcionamiento' === variable_string){
    result_text = 'Tramites'
  }

  else if('Modalidad de atención de público durante pandemia' === variable_string){
    result_text = 'Modalidad de atención'
  }

  else if ('Sistemas de pago digital de la DOM' === variable_string){
    result_text = {
      title: 'DOM',
      subtitle: 'Sistema de pago digital'
    }
  }

  else if ('Plataforma de gestión digital'  ===  variable_string){
    result_text = {
      title: 'Plataforma',
      subtitle:'Gestión Digital'
    }
  }

  else if('Adquisición nuevos computadores en los últimos cinco años' === variable_string){
    result_text = {
      title: 'Adquisición',
      subtitle: 'Computadores'
    }
  }

  else if('Principal tipo de conexión a Internet' === variable_string){
    result_text = {
      title:"Conexión",
      subtitle:"Internet"

    }
  }

  else if('Cantidad de computadores' === variable_string){
   result_text = {
      title: 'Cantidad',
      subtitle: 'Computadores'
    }
  }

  else if('Tipo de software que utiliza' === variable_string){
    result_text = {
      title:'Software',
      subtitle: 'Utilizados'
    }
  }

  else if('Ofimática (Office)' === variable_string){
    result_text = 'Ofimática'
  }

  else if('Diseño asistido por computador (CAD)' === variable_string){
    result_text = 'CAD'
  }

  else if('Lector de PDF' === variable_string){
    result_text = 'Lector PDF'
  }

  else if('Sistema de Información Georeferenciada (SIG)' === variable_string){
    result_text = 'GIS'
  }

  else if('Ethernet (Internet por cable)' === variable_string){
    result_text = 'Ethernet'
  }

  else if('Mixto con turnos (presencial y teletrabajo)' === variable_string){
    result_text = 'Mixto'
  }

  else if('Solo presencial' === variable_string){
    result_text = 'Presencial'
  }

  else if('Solo teletrabajo' === variable_string){
    result_text = 'Teletrabajo'
  }

  else if('Web Pay/Transbank' === variable_string){
    result_text = 'WebPay'
  }

  else if('Boton de pago TGR (SUBDERE)' === variable_string){
    result_text = 'TGR'
  }

  else if('Transferencia bancaria' === variable_string){
    result_text = 'Transferencia'
  }

  else if('No posee sistema de pago digital' === variable_string){
    result_text = 'No posee'
  }

  else if('Otro' === variable_string){
    result_text = 'Otro'
  }


  
  // else if( 'Cantidad de computadores' === variable_string){
  //   result_text = 'Cant de  computadores'
  // }
  else{
    result_text = variable_string
  }

  return result_text
}




export {
  formatCL, 
  resume_texts
}