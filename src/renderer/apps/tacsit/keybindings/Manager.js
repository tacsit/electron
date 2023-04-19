import Map from 'ol/Map';
import hotkeys from 'hotkeys-js';

export class Manager {
    constructor(app, map) {
        /**
         * The main app object
         */
        this.app = app;

        /**
         * The map object
         * @type {Map}
         */
        this.map = map;
    }

    __boot() {
        this.app.emit('keybindings:booting');

        this.app.emit('keybindings:booted');
    }

    bind(keys, callback) {        
        this.app.emit('keybindings:binding', keys);
        
        hotkeys(keys, function(event, handler){
            callback(event, handler);
        });

        console.log('bound', keys);

        this.app.emit('keybindings:bound', keys);
    }

    /**
     * @return {void}
     */
    __init() {
        this.app.emit('keybindings:initializing');
        
        this.app.emit('keybindings:initialized');
    }
}

export default Manager;