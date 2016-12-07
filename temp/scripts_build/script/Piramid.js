"use strict";
cc._RFpush(module, '2b203uiWLhBtKTr+NEvNcYq', 'Piramid');
// script\Piramid.js

var Ticket = require("Ticket");

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
        scrollDelta: 40,
        bottomStart: -323,
        boxDX: 141,
        boxDY: 122,
        delay: 0.5,
        boxLayer: cc.Node,
        baseBox: {
            'default': null,
            type: cc.Prefab
        },
        _manager: null,
        _ticket: null

    },

    // use this for initialization
    onLoad: function onLoad() {
        //console.log('Load Piramid...');
        //this.aTicket = Ticket;//.getComponent('Ticket');
        //this.aTicket = this.aTicket.getComponent('Ticket');
        //this.baseBox = this.baseBox.getComponent('Box');
        //this.reset();
        //this.buildOutSide();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    init: function init(gManager) {
        this._manager = gManager;
    },

    scroll: function scroll() {
        this.node.runAction(cc.moveBy(this.delay, 0, this.scrollDelta).easing(cc.easeInOut(3.0)));
    },

    scrollInside: function scrollInside() {
        this.node.runAction(cc.moveBy(this.delay, 0, this.scrollDelta).easing(cc.easeInOut(3.0)));
    },

    goInsideShow: function goInsideShow() {
        //esto es para hacer el show de entrar en la boca de la piramide

        //scroll hasta posicion en que se vea la mascara
        var mouthAnim = this.node.getChildByName('ouside_mouth').getComponent(cc.Animation);

        this.node.runAction(cc.sequence(
        //cc.delayTime(1), //pausa antes de mover...
        cc.moveBy(2, 0, -180).easing(cc.easeOut(1)),
        //abrir los dientes...
        cc.callFunc(function () {
            mouthAnim.play('mouthOpen');
        }, this)));
    },

    fallingInsideShow: function fallingInsideShow() {
        //Cae el personaje al primer risco

        this.scheduleOnce(function () {
            this.node.runAction(cc.moveBy(1.5, 0, 320).easing(cc.easeInOut(3.0)));
        }, 1);
    },

    getIntoChamberShow: function getIntoChamberShow() {
        //Entra al cilindro...
        //Scrolleamos para que se vea el cilindro
        this.node.runAction(cc.moveBy(2, 0, 380).easing(cc.easeInOut(3.0)));

        //aca programar que se abra el cilindro
        this.scheduleOnce(function () {
            this.node.getChildByName('cilindroTapa').getComponent(cc.Animation).play('CilindroTapaAbajo');
        }, 2.5);
    },

    reset: function reset() {
        //aca faltan cosas...
        this.node.y = this.bottomStart;

        //console.log('BottomStart: ' + this.bottomStart)
    },

    //Le pone el brillo a la linea que le pasamos
    activateLine: function activateLine(aLine) {
        //recorro los boxes y a los que son de la linea los animo...
        for (var vCol = 0; vCol < 10 - aLine; vCol++) {
            this.boxLayer.getChildByName('Box-' + aLine + '-' + vCol).getComponent('Box').glow();
        }
    },

    deactivateLines: function deactivateLines() {
        //var boxes = this.boxLayer.children;
        //cc.log('childrenCount: '+ this.boxLayer.childrenCount );
        for (var i = 0; i < this.boxLayer.childrenCount; i++) {
            //cc.log(this.boxLayer.children[i].name);
            this.boxLayer.children[i].getComponent('Box').unGlow();
        }
    },

    //Para dibujar los bloques de la piramide de Afuera
    //Solo se dibujan... el contenido se obtiene en tiempo real
    drawOutsideBlocks: function drawOutsideBlocks() {
        //limpio los boxes si habia...
        this.boxLayer.removeAllChildren();

        var bW = this.boxDX;
        var bH = this.boxDY;

        for (var vLinea = 0; vLinea < 5; vLinea++) {
            for (var vCol = 0; vCol < 10 - vLinea; vCol++) {

                var aBox = cc.instantiate(this.baseBox);
                aBox = aBox.getComponent('Box');
                aBox.node.parent = this.boxLayer; //.node;
                aBox.node.zIndex = -10 * vLinea; //se ordena los de abajo mas arriba que los otros...

                aBox.node.name = 'Box-' + vLinea + '-' + vCol;
                aBox.lin = vLinea;
                aBox.col = vCol;
                aBox.content = null; //se asigna luego
                aBox.isInsideBox = false;
                //el contenido.... no va mas... es en tiempo real
                //aBox.content = aTicket.getOutSideContent(vLinea, vCol);
                //dibujar...
                aBox.node.setPosition(vCol * bW + vLinea * bW * 0.5, vLinea * bH);

                //le damos el GameManager
                aBox.init(this._manager);
            }
        }
    },

    drawInsideBlocks: function drawInsideBlocks() {
        //limpio los boxes si habia...
        this.boxLayer.removeAllChildren();

        var bW = this.boxDX;
        var bH = this.boxDY;

        for (var vLinea = 5; vLinea < 9; vLinea++) {
            for (var vCol = 0; vCol < 10 - vLinea; vCol++) {

                var aBox = cc.instantiate(this.baseBox);
                aBox = aBox.getComponent('Box');
                aBox.node.parent = this.boxLayer; //.node;
                aBox.node.zIndex = 10 * vLinea; //se ordena los de abajo mas arriba que los otros...

                aBox.node.name = 'Box-' + vLinea + '-' + vCol;
                aBox.lin = vLinea;
                aBox.col = vCol;
                aBox.content = null; //se asigna luego
                aBox.isInsideBox = true;

                //dibujar...
                aBox.node.setPosition(vCol * bW + (vLinea - 5) * bW * 0.5, (vLinea - 8) * bH);

                //le damos el GameManager
                aBox.init(this._manager);
            }
        }
    }

});

cc._RFpop();