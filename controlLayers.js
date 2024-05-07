class controlLayers {
    constructor(options) {
        //parámetro de entrada: es el nombre del parámetro que se espera recibir cuando se crea una instancia de controlLayer
        options = options || { layers: [] };
        //atributo interno.: _layers es el nombre del atributo interno donde se almacenan las capas dentro de la instancia de controlLayer
        this._layers = options.layers;
        this._layerVisibility = {};
    }

    onAdd(map) {
        this._map = map;
        this._div = document.createElement('div');
        this._div.className = 'maplibregl-ctrl maplibregl-ctrl-group';
        this._div.style.padding = '8px';
        this._div.style.fontSize = '14px';
        this._div.style.position = 'absolute';
        this._div.style.top = '10px';
        this._div.style.left = '10px';

        this._mapLayers = this._map.getStyle().layers;
        this._mapLayerIds = this._mapLayers.map(layer => layer.id);

        this._layers.forEach(layer => {
            if (this._mapLayerIds.includes(layer)) {
                const checked = true;
                this._layerVisibility[layer] = true;
                const input = this._createLayerInputToggle(layer, checked);
                this._div.appendChild(input);
            }
        });

        return this._div;
    }

    onRemove() {
        this._div.parentNode.removeChild(this._div);
        this._map = undefined;
    }

    _createLayerInputToggle(layer, checked) {
        const container = document.createElement('div');
        container.className = 'layer-toggle';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = checked;
        input.addEventListener('change', () => {
            this._toggleLayerVisibility(layer, input.checked);
        });
        const label = document.createElement('label');
        label.textContent = layer;
        container.appendChild(input);
        container.appendChild(label);
        return container;
    }


    _toggleLayerVisibility(layer, visible) {
        if (!this._map) {
            console.error('El mapa no está definido.');
            return;
        }

        const layerIndex = this._mapLayerIds.indexOf(layer);

        if (layerIndex !== -1) {
            const layerId = this._mapLayers[layerIndex].id;
            if (this._layerVisibility.hasOwnProperty(layerId)) {
                if (this._layerVisibility[layerId] !== visible) {
                    const visibility = visible ? 'visible' : 'none';
                    this._map.setLayoutProperty(layerId, 'visibility', visibility);
                    this._layerVisibility[layerId] = visible;
                }
            } else {
                console.error(`La capa "${layerId}" no está en el objeto _layerVisibility.`);
            }
        } else {
            console.error(`La capa "${layer}" no se encuentra en el estilo del mapa.`);
        }
    }
}

export { controlLayers };
