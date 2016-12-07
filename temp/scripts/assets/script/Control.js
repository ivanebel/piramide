"use strict";
cc._RFpush(module, 'f1acbbbx2hDopbiF5gYgGiz', 'Control');
// script\Control.js

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
        audio_Music_Intro: cc.AudioClip
    },

    // use this for initialization
    onLoad: function onLoad() {

        cc.director.preloadScene('outside');
        cc.director.preloadScene('transInside');
        cc.director.preloadScene('end');
        cc.director.preloadScene('inside');
        cc.director.preloadScene('bonus');
        cc.director.preloadScene('double');

        cc.audioEngine.playMusic(this.audio_Music_Intro);

        //this.scheduleOnce( function() {
        //this.node.getChildByName('Titulo_Pantalla_Inicio').getComponent(cc.Animation).play('Titulo_Inicio'); } , 2);

        this.scheduleOnce(function () {
            cc.director.loadScene('idle');
        }, 3);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();