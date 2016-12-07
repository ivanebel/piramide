"use strict";
cc._RFpush(module, 'e2d7ddfhlJOzJuIZ1eV3mGk', 'Bonus');
// script\Bonus.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        layerObjects: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {

        this.scheduleOnce(function () {
            this.layerObjects.getComponent(cc.Animation).play('BonusEntradaObjetos');
        }, 1.5);
    },

    init: function init(game) {
        this.game = game;
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();