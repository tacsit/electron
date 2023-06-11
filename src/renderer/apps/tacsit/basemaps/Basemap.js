import TileLayer from 'ol/layer/Tile';

class Basemap {

    /**
     * Indicates if the basemap is a stacked basemap.
     * In other words, if the basemap is a combination of multiple basemaps.
     * 
     * @returns {boolean} true if the basemap is a stacked basemap, false otherwise.
     */
    static isStacked() {
        return false;
    }

    static getLabel() {
        throw new Error('You have to implement the method getLabel()');
    }

    static getPreview() {
        return null;
    }

    static getSource() {
        throw new Error('You have to implement the method getSource()');
    }

    static getTileLayer() {

        // if (this.isStacked()) {
        //     return new StackedTileLayer({
        //         source: this.getSource(),
        //         preload: Infinity,
        //     });
        // }

        return new TileLayer({
            source: this.getSource(),
            preload: Infinity,
        });
    }
}

export default Basemap;
