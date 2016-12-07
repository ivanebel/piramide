"use strict";
cc._RFpush(module, '6a854D/jWRCKYtbUk7JPsCl', 'TransScene');
// script\TransScene.js

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
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(game) {
        this.game = game;
        this.subScene = this.node.getComponent('SubScene');
        this.subScene.init(game);
        //this.hide();
    },

    showScreen: function showScreen() {

        this.subScene.showScreen();
        //console.log('clip...')
        this.node.getChildByName('clip').getComponent(cc.Animation).play('transInside');
    },

    hideScreen: function hideScreen() {
        this.subScene.hideScreen();
        this.node.getChildByName('clip').getComponent(cc.Animation).stop('transInside');
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();