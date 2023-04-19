import TileLayer from 'ol/layer/Tile';

class Basemap {
    static getLabel() {
        throw new Error('You have to implement the method getLabel()');
    }

    static getSource() {
        throw new Error('You have to implement the method getSource()');
    }

    static getTileLayer() {
        return new TileLayer({
            source: this.getSource(),
            preload: Infinity,
        });
    }
}

export default Basemap;
