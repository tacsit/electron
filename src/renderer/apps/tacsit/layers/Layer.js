import Tile from 'ol/layer/Tile';

class Layer {
    static getLabel() {
        throw new Error('You have to implement the method getLabel()');
    }

    static getSource() {
        throw new Error('You have to implement the method getSource()');
    }

    static getTileLayer() {
        return new Tile({
            source: this.getSource(),
        });
    }
}

export default Layer;
