"use strict";
cc._RFpush(module, '5080b6HhwJAe7y9zpciJmUG', 'SubScene');
// script\SubScene.js

cc.Class({
    "extends": cc.Component,

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
    },

    //Asociar al nodo padre de toda la SubScene...

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(game) {
        this.game = game;
        this.hideScreen();
    },

    showScreen: function showScreen() {

        this.node.x = 0;
        this.node.y = 0;
        this.node.runAction(cc.fadeIn(0.5));
    },

    hideScreen: function hideScreen() {
        //this.node.runAction(cc.sequence(cc.fadeOut(0.5), cc.moveBy(0, -3000, 0)));
        this.node.runAction(cc.fadeOut(0.5));
        this.node.x = -3000;
    }
});

cc._RFpop();