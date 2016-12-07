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
        _manager: null,

        layerObjects: cc.Node,

        _Objeto1: cc.Node,
        _Objeto2: cc.Node,
        _Objeto3: cc.Node,
        _Objeto4: cc.Node,
        _Objeto5: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {

        this.scheduleOnce(function () {
            this.layerObjects.getComponent(cc.Animation).play('BonusEntradaObjetos');
        }, 1.5);

        this._Objeto1 = this.layerObjects.getChildByName('Objeto_1');
        this._Objeto2 = this.layerObjects.getChildByName('Objeto_2');
        this._Objeto3 = this.layerObjects.getChildByName('Objeto_3');
        this._Objeto4 = this.layerObjects.getChildByName('Objeto_4');
        this._Objeto5 = this.layerObjects.getChildByName('Objeto_5');

        var self = this;

        /*this._Objeto1.on(cc.Node.EventType.TOUCH_END, function ( event ) {
            self.doTouch( 1 );
            });
        this._Objeto2.on(cc.Node.EventType.TOUCH_END, function ( event ) {
            self.doTouch( 2 );
            });
        this._Objeto3.on(cc.Node.EventType.TOUCH_END, function ( event ) {
            self.doTouch( 3 );
            });
        this._Objeto4.on(cc.Node.EventType.TOUCH_END, function ( event ) {
            self.doTouch( 4 );
            });
        this._Objeto5.on(cc.Node.EventType.TOUCH_END, function ( event ) {
            self.doTouch( 5 );
            });
        */
    },

    init: function init(game) {
        this._manager = game;

        this._Objeto1.getComponent('BonusObject').init(game, 1);
        this._Objeto2.getComponent('BonusObject').init(game, 2);
        this._Objeto3.getComponent('BonusObject').init(game, 3);
        this._Objeto4.getComponent('BonusObject').init(game, 4);
        this._Objeto5.getComponent('BonusObject').init(game, 5);
    },

    doTouch: function doTouch(id) {

        //sacamos el glow...
        //this._glow.active = false;

        //animamos...
        /*if ( h == 'L' ) {
            this._hLeft.getComponent(cc.Animation).play('HandleDown_Left');
        } else {
            this._hRight.getComponent(cc.Animation).play('HandleDown_Right');
        }
        
        //avisamos al manager
        this.scheduleOnce(function() { this._manager.doHandleTouch( h ); } , 0.8);
        */
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();