class ControlLayers {
    constructor(options) {
        // Si no se proporciona un objeto de opciones, se establece como un objeto vacío con una propiedad "layers" inicializada como un array vacío.
        options = options || { layers: [] };
        // Se asigna el array de capas desde las opciones proporcionadas.
        this.layers = options.layers;
        // Se inicializa un objeto para almacenar la visibilidad de las capas.
        this.layerVisibility = {};
    }

    // Método para agregar el control al mapa.
    onAdd(map) {
        // Se guarda la referencia al mapa.
        this.map = map;
        // Se crea el contenedor principal del control.
        this.container = document.createElement('div');
        this.container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
        this.container.style.padding = '8px';
        this.container.style.fontSize = '14px';
        this.container.style.position = 'absolute';
        /* this.container.style.top = '10px';
        this.container.style.left = '15px'; */
        this.container.style.width = '210px';

        // Se obtienen las capas del estilo del mapa.
        this.mapLayers = this.map.getStyle().layers;
        // Se obtienen los identificadores de las capas del estilo del mapa.
        this.mapLayerIds = this.mapLayers.map(layer => layer.id);

        // Se itera sobre las capas proporcionadas al control.
        this.layers.forEach(layer => {
            // Si la capa está presente en el estilo del mapa.
            if (this.mapLayerIds.includes(layer)) {
                // Se establece la visibilidad de la capa como verdadera.
                this.layerVisibility[layer] = true;
                // Se crea el interruptor de capa y se agrega al contenedor.
                const input = this._createLayerInputToggle(layer, true);
                this.container.appendChild(input);
            }
        });

        // Se retorna el contenedor del control.
        return this.container;
    }

    // Método para eliminar el control del mapa.
    onRemove() {
        // Se elimina el contenedor del DOM.
        this.container.parentNode.removeChild(this.container);
        // Se limpia la referencia al mapa.
        this.map = undefined;
    }

    // Método privado para crear un interruptor de capa.
    _createLayerInputToggle(layer, checked) {
        const container = document.createElement('div');
        container.className = 'layer-toggle';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = checked;
        // Se añade un evento de cambio para manejar la visibilidad de la capa.
        input.addEventListener('change', () => {
            this._toggleLayerVisibility(layer, input.checked);
        });
        const label = document.createElement('label');
        label.textContent = layer;
        container.appendChild(input);
        container.appendChild(label);
        return container;
    }

    // Método privado para cambiar la visibilidad de una capa.
    _toggleLayerVisibility(layer, visible) {
        // Se verifica si el mapa está definido.
        if (!this.map) {
            console.error('El mapa no está definido.');
            return;
        }

        // Se obtiene el índice de la capa en el array de identificadores de capa del mapa.
        const layerIndex = this.mapLayerIds.indexOf(layer);

        // Si la capa está presente en el estilo del mapa.
        if (layerIndex !== -1) {
            // Se obtiene el identificador de la capa.
            const layerId = this.mapLayers[layerIndex].id;
            // Si la capa está en el objeto de visibilidad de la capa.
            if (this.layerVisibility.hasOwnProperty(layerId)) {
                // Si la visibilidad de la capa ha cambiado.
                if (this.layerVisibility[layerId] !== visible) {
                    // Se actualiza la visibilidad de la capa en el mapa.
                    const visibility = visible ? 'visible' : 'none';
                    this.map.setLayoutProperty(layerId, 'visibility', visibility);
                    // Se actualiza el estado de visibilidad en el objeto de visibilidad de la capa.
                    this.layerVisibility[layerId] = visible;
                }
            } else {
                console.error(`La capa "${layerId}" no está en el objeto layerVisibility.`);
            }
        } else {
            console.error(`La capa "${layer}" no se encuentra en el estilo del mapa.`);
        }
    }
}

export { ControlLayers };
