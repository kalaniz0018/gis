  function prueba(nodo) {
    let filter = map.getFilter("zonas_tecnicas_normalizadas-highlighted");
    filter[2] = nodo
    map.setFilter("zonas_tecnicas_normalizadas-highlighted", filter);
}

 function prueba2(nodo) {
    let filter = map.getFilter("zonas_tecnicas_normalizadas-highlighted");
    map.setFilter("zonas_tecnicas_normalizadas-highlighted", [filter[0], filter[1], '']);
}

export {prueba} 
export {prueba2} 
 /* import { prueba, prueba2 } from './funciones.js'; */

 /*     <script type="module" src="./funciones.js"></script>
    <script type="module" src="./controlLayers.js"></script> */