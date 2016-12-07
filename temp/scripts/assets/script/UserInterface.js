"use strict";
cc._RFpush(module, '3bfdbNf0T1Kw5iPYapaUJ2U', 'UserInterface');
// script\UserInterface.js

var GameManager = require("GameManager");

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        piramide: cc.Node,
        _manager: null
    },

    init: function init(game) {
        this._manager = game;
    },

    botonHandlerPrueba: function botonHandlerPrueba() {
        console.log('boton de Reset....');

        this._manager.play();

        //this.piramide.node.y = -350;
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.piramide = this.piramide.getComponent('Piramid');

        var tmp = this;

        var listener = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                //cc.log('keyDown: ' + keyCode);

                if (keyCode == 66) {
                    tmp._manager.hideAll();tmp._manager.playBonus();
                } //B
                if (keyCode == 68) {
                    tmp._manager.hideAll();tmp._manager.playDouble();
                } //D
                if (keyCode == 73) {
                    tmp._manager.hideAll();tmp._manager.playInside();
                } //I
                if (keyCode == 82) {
                    tmp._manager.restart();
                } //R
            }
        };

        cc.eventManager.addListener(listener, this.node);

        //this.node.on(cc.Node.EventType.TOUCH_END, function ( event ) {
        //console.log('Mouse Down ... Movemos piramide...' + this);
        //    tmp.piramide.scroll();
        //});
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();