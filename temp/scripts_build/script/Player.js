"use strict";
cc._RFpush(module, 'e407aiK6PNOooH9+p7H6RON', 'Player');
// script\Player.js

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
        deltaStepX: 141,
        deltaStepY: 122,
        col: 0,
        lin: -1,

        initialPos: cc.v2(0, 0),

        dieNode: cc.Node,
        inside: false,

        audio_Jump: cc.AudioClip,
        audio_Run: cc.AudioClip,
        audio_Die: cc.AudioClip,
        audio_JumpOver: cc.AudioClip,

        _manager: null
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    init: function init(gManager) {
        this._manager = gManager;
    },

    setAnimation: function setAnimation(aAnimName) {
        this.node.getComponent(cc.Animation).play(aAnimName);
    },

    //reset: va a la posicion inicial del juego
    reset: function reset() {
        this.node.stopAllActions();

        if (this.inside) {
            this.node.x = this.initialPos.x;
            this.node.y = this.initialPos.y;
            this.setAnimation('ExpIn_Stand');
            this.col = 2;
            this.lin = 4;
        } else {
            this.node.x = this.initialPos.x - 78;
            this.node.y = this.initialPos.y - 13;

            //el primer saltito...
            var aSalto = cc.sequence(
            //cc.moveBy(0, cc.p( fixAnimJumpX, fixAnimJumpY)),
            cc.callFunc(function () {
                this.setAnimation('ExpOut_Begin');
            }, this), cc.delayTime(1.6), //pausa para que termine animacion...
            cc.hide(), cc.moveTo(0, cc.p(this.initialPos.x, this.initialPos.y)), cc.callFunc(function () {
                this.setAnimation('ExpOut_StandR');
            }, this), cc.show());

            this.node.runAction(aSalto);
            //this.node.x = this.initialPos.x;
            //this.node.y = this.initialPos.y;
            //this.setAnimation('ExpOut_StandR');
            this.col = 5;
            this.lin = -1;
        }

        //this.node.x = this.initialPos.x;
        //this.node.y = this.initialPos.y;

        //lo pongo en el mismo espacio al nodo de la animacion de la muerte...
        this.dieNode.parent = this.node.parent;
        this.dieNode.zIndex = 100; ///Bien arriba!!!

        //this.node.runAction( cc.fadeIn(1) );
    },

    //jumpToOutsideBox: Anima el player saltando hasta el box ingresado
    jumpToOutsideBox: function jumpToOutsideBox(aBox) {

        //aBox = aBox.getComponent('Box');

        //el player salta hasta 'subirse' al box
        var dCol = aBox.col - this.col; //Delta Col
        //var s = (dCol / Math.abs(dCol)); //Signo del movimiento...
        var s = dCol < 0 ? -1 : 1; //Signo del movimiento...
        //cc.log('signo: ' + s);
        //cuando el paso es cero nos tenemos que quedar y solo saltar hacia la derecha...
        var strDirection = s < 0 ? 'L' : 'R';
        var idSalto = s < 0 ? Math.abs(dCol + 1) : Math.abs(dCol);
        var strAnim = 'ExpOut_Step' + strDirection + '_D' + idSalto;

        //las animaciones no tienen el mismo tamaño por lo tanto corrijo la posición antes del play
        //   0,   1,   2,   3,   4,   5,   6,   7,   8
        var arrFixAnimJumpX = [30, 109, 178, 248, 322, 393, 463, 529, 600];
        var arrFixAnimJumpY = [-2, 1, 0, 0, -6, -11, -10, -3, -26];

        var fixAnimJumpX = s * arrFixAnimJumpX[idSalto];
        var fixAnimJumpY = arrFixAnimJumpY[idSalto];

        //le pongo una accion vacia para que no de error luego...
        //var paso = cc.delayTime(0); //dummy action
        var dieAct = cc.delayTime(0); //dummy action

        //si tiene que morir...
        if (aBox.content === 'X') {
            dieAct = cc.spawn(cc.fadeOut(0.2), cc.callFunc(function () {
                this.showDieAnim(aBox);
            }, this), cc.delayTime(1.2));
        }

        var aSalto = cc.sequence(
        //paso, //da los pasos...
        //Dejamos en posicion para el jump con correccion...
        cc.moveBy(0, cc.p(fixAnimJumpX, fixAnimJumpY)),

        //Informamos al box para que reaccione... la pausa la hace el showcontent
        cc.callFunc(function () {
            aBox.showContent();
        }, aBox), cc.callFunc(function () {
            cc.audioEngine.playEffect(this.audio_Jump);this.setAnimation(strAnim);
        }, this), cc.delayTime(0.8), //pausa para que termine animacion...

        //Si muere...sino viene en dummy
        dieAct,

        //dejamos en posicion normal de stand...
        //cc.moveBy(0, cc.p( -fixAnimJumpX + this.node.x - aBox.node.x , -fixAnimJumpY + this.deltaStepY) ),
        cc.moveTo(0, cc.p(aBox.node.x + 66, aBox.node.y + 125)),

        //luego del salto queda en normal parado... si no paso nada...
        cc.callFunc(function () {
            this.setAnimation('ExpOut_Stand' + strDirection);
        }, this),

        //Avisamos al manager que termino el show...
        //para que respete la secuencia, la llamada,  debe estar dentro de una funcion
        //y debo pasarle el target para que tome bien el this...
        cc.callFunc(function () {
            this._manager.jumpEnd(aBox);
        }, this));

        this.node.runAction(aSalto);

        //llegamos al box...
        this.lin = aBox.lin;
        this.col = aBox.col;
    },

    //jumpToIntsideBox: Anima el player saltando hasta el box ingresado
    jumpToInsideBox: function jumpToInsideBox(aBox) {
        //el player salta hasta 'caer' al box
        var dCol = aBox.col - this.col; //Delta Col
        //var s = (dCol / Math.abs(dCol)); //Signo del movimiento...
        var s = dCol < 0 ? -1 : 1; //Signo del movimiento...
        //cc.log('signo: ' + s);
        //cuando el paso es cero nos tenemos que quedar y solo saltar hacia la derecha...
        var strDirection = s < 0 ? 'L' : 'R';
        var idSalto = s < 0 ? Math.abs(dCol + 1) : Math.abs(dCol);
        var strAnim = 'ExpIn_Step' + strDirection + '_D' + idSalto;

        //las animaciones no tienen el mismo tamaño por lo tanto corrijo la posición antes del play
        //   0,   1,   2,   3,
        var arrFixAnimJumpX = [45, 111, 185, 254];
        var arrFixAnimJumpY = [-144, -140, -136, -134];

        var fixAnimJumpX = s * (arrFixAnimJumpX[idSalto] + 10);
        var fixAnimJumpY = arrFixAnimJumpY[idSalto] + 10;

        var firstJump = this.lin == 4 ? -360 : 0;
        var firstJumpDelay = this.lin == 4 ? 0.15 : 0;

        //le pongo una accion vacia para que no de error luego...
        var dieAct = cc.delayTime(0); //dummy action

        //si tiene que morir...
        if (aBox.content === 'X') {
            dieAct = cc.spawn(cc.fadeOut(0.2), cc.callFunc(function () {
                this.showDieAnim(aBox);
            }, this), cc.delayTime(1.2));
        }

        var aSalto = cc.sequence(
        //Dejamos en posicion para el jump con correccion...
        cc.hide(), cc.moveBy(0, cc.p(fixAnimJumpX, fixAnimJumpY)),

        //Informamos al box para que reaccione... la pausa la hace el showcontent
        cc.callFunc(function () {
            aBox.showContent();
        }, aBox), cc.spawn(cc.show(), cc.moveBy(0.4, cc.p(s * -18, 0)).easing(cc.easeIn(3.0)), //Corrijo posicion para que caiga en su lugar
        cc.callFunc(function () {
            cc.audioEngine.playEffect(this.audio_Jump);this.setAnimation(strAnim);
        }, this), cc.sequence(cc.delayTime(0.4), cc.moveBy(firstJumpDelay, cc.p(0, firstJump)).easing(cc.easeIn(3.0)))), cc.delayTime(0.4 + firstJumpDelay), //pausa para que termine animacion...

        //Si muere...sino viene en dummy
        dieAct,

        //dejamos en posicion normal de stand...
        //cc.moveTo(0, cc.p( aBox.node.x + 66, aBox.node.y + 125 ) ),
        cc.moveTo(0, cc.p(aBox.node.x + 66, aBox.node.y + 135)),

        //luego del salto queda en normal parado... si no paso nada...
        cc.callFunc(function () {
            this.setAnimation('ExpIn_Stand');
        }, this),

        //Avisamos al manager que termino el show...
        //para que respete la secuencia, la llamada,  debe estar dentro de una funcion
        //y debo pasarle el target para que tome bien el this...
        cc.callFunc(function () {
            this._manager.jumpEnd(aBox);
        }, this));

        this.node.runAction(aSalto);

        //llegamos al box...
        this.lin = aBox.lin;
        this.col = aBox.col;
    },

    //moveToBox: Anima el player hasta el box ingresado
    //se usa para la piramide outside
    moveToBox: function moveToBox(aBox) {

        //aBox = aBox.getComponent('Box');

        //el player tiene que correr hasta 'subirse' al box
        var dCol = aBox.col - this.col;
        var s = dCol / Math.abs(dCol);

        //cuando el paso es cero nos tenemos que quedar y solo saltar...
        var strAnim = s < 0 ? 'ExplorerStepL' : 'ExplorerStepR';
        //var strAnimJump = ( dCol <= 0 ) ? 'ExplorerStepL' : 'ExplorerStepR';

        //las animaciones no tienen el mismo tamaño por lo tanto corrijo la
        //posición antes del play
        var fixAnimPasoX = 0;
        if (dCol > 0) {
            fixAnimPasoX = 71;
        } else if (dCol < 0) {
            fixAnimPasoX = -71;
        }

        //le pongo una accion vacia para que no de error luego...
        var paso = cc.delayTime(0); //dummy action
        var dieAct = cc.delayTime(0); //dummy action

        //console.log('Contenido del Box hacia el que corre: ' + aBox.content);

        //si tiene que morir...
        if (aBox.content === 'X') {
            dieAct = cc.spawn(cc.fadeOut(0.2),
            //cc.hide(),
            cc.callFunc(function () {
                this.showDieAnim(aBox);
            }, this), cc.delayTime(1.2)
            //cc.callFunc( this.showDieAnim, aBox )
            );
        }

        //Si movemos...
        if (dCol !== 0) {
            paso = cc.sequence(
            //corregimos la posicion por la animacion del paso...
            //cc.moveBy(0, cc.p( fixAnimPasoX, fixAnimPasoY )),
            cc.moveBy(0, cc.p(fixAnimPasoX, 0)), cc.sequence(cc.callFunc(function () {
                this.setAnimation(strAnim);
            }, this), cc.delayTime(0.3), //Pausa para que se complete animación...
            //y luego movemos el nodo inmediatamente...
            cc.moveBy(0, cc.p(s * this.deltaStepX, 0))).repeat(Math.abs(dCol)), //se repite la cantidad de pasos que tiene que dar...
            cc.moveBy(0, cc.p(-fixAnimPasoX, 0)));
        }

        var fixAnimJumpX = 47;

        var aSalto = cc.sequence(paso, //da los pasos...
        //Dejamos en posicion para el jump con correccion...
        cc.moveBy(0, cc.p(fixAnimJumpX, 0)),

        //Informamos al box para que reaccione...
        cc.callFunc(function () {
            aBox.showContent();
        }, aBox),

        //animamos el salto...
        cc.spawn(
        //ajustamos para que caiga en el lugar correcto
        cc.moveBy(0.2, cc.p(-4, 16)).easing(cc.easeIn(3.0)), cc.callFunc(function () {
            cc.audioEngine.playEffect(this.audio_Jump);this.setAnimation('ExplorerJumpUp');
        }, this)), cc.delayTime(0.42), //pausa para que termine animacion...

        //Si muere...sino viene en dummy
        dieAct,

        //dejamos en posicion normal de stand...
        cc.moveBy(0, cc.p(-fixAnimJumpX + 4, -16)),
        //lo hacemos subir, y siempre (por ahora) mueve a la derecha, o sea salta desde la izquierda...
        cc.moveBy(0, cc.p(this.deltaStepX / 2, this.deltaStepY)),

        //luego del salto queda en normal parado... si no paso nada...
        cc.callFunc(function () {
            this.setAnimation('ExplorerStand');
        }, this),

        //Avisamos al manager que termino el show...
        //para que respete la secuencia, la llamada,  debe estar dentro de una funcion
        //y debo pasarle el target para que tome bien el this...
        cc.callFunc(function () {
            this._manager.jumpEnd(aBox);
        }, this));

        this.node.runAction(aSalto);

        //llegamos al box...
        this.lin = aBox.lin;
        this.col = aBox.col;
    },

    moveToInsideBox: function moveToInsideBox(aBox) {

        aBox = aBox.getComponent('Box');

        //el player tiene que correr hasta 'BAJAR' al box
        var dCol = aBox.col - this.col; //delta Col
        var s = dCol / Math.abs(dCol); //signo

        //Cuando el paso es mayor a cero saltamos a la Derecha...
        //Cuando el paso es menor o igual  cero saltamos a la Izquierda...
        var strAnim = s < 0 ? 'ExplorerInsideStepL' : 'ExplorerInsideStepR';
        var strAnimJump = 'ExplorerInsideStepDown';
        //var strAnimJump = ( dCol < 0 ) ? 'ExplorerInsideStepDownLeft' : 'ExplorerInsideStepDown';

        //le pongo una accion vacia para que no de error luego...
        var paso = cc.delayTime(0); //dummy action
        var dieAct = cc.delayTime(0); //dummy action

        //si tiene que morir...
        if (aBox.content === 'X') {
            dieAct = cc.spawn(cc.fadeOut(0.1), cc.callFunc(function () {
                this.showDieAnim(aBox);
            }, this), cc.delayTime(1.2));
        }

        //las animaciones no tienen el mismo tamaño por lo tanto corrijo la
        //posición antes del play
        var fixAnimPasoX = 0;
        if (dCol > 0) {
            fixAnimPasoX = -39;
        } else if (dCol < 0) {
            fixAnimPasoX = -229;
        }
        var fixAnimPasoY = -50;

        //Si movemos...
        if (dCol !== 0) {
            paso = cc.sequence(
            //corregimos la posicion por la animacion del paso...
            cc.moveBy(0, cc.p(fixAnimPasoX, fixAnimPasoY)), cc.sequence(
            //hacemos animacion del salto/paso lateral
            cc.callFunc(function () {
                this.setAnimation(strAnim);
            }, this), cc.delayTime(0.3), //Pausa para que se complete animación...
            //y luego movemos el nodo inmediatamente...
            cc.moveBy(0, cc.p(s * this.deltaStepX, 0))).repeat(Math.abs(dCol)), //se repite la cantidad de pasos que tiene que dar...
            cc.moveBy(0, cc.p(-fixAnimPasoX, -fixAnimPasoY)));
        }

        var fixAnimJumpX = -9;
        //if ( dCol > 0 ) { fixAnimJumpX = -9; } else { fixAnimJumpX = -95; }
        var fixAnimJumpY = -145;

        var firstJump = this.lin == 4 ? -360 : 0;
        var firstJumpDelay = this.lin == 4 ? 0.12 : 0;

        var aSalto = cc.sequence(paso, //da los pasos... si hay
        //Dejamos en posicion para el jump con correccion...
        cc.moveBy(0, cc.p(fixAnimJumpX, fixAnimJumpY)),

        //Informamos al box para que reaccione... Hay que programar el timing
        cc.callFunc(function () {
            aBox.showContent();
        }, aBox),

        //animamos el salto...
        cc.spawn(cc.moveBy(0.2 + firstJumpDelay, cc.p(-9, 15 + firstJump)).easing(cc.easeIn(3.0)), cc.callFunc(function () {
            cc.audioEngine.playEffect(this.audio_Jump);this.setAnimation(strAnimJump);
        }, this)), cc.delayTime(0.22 + firstJumpDelay), //pausa para que termine animacion...

        //Si muere...sino viene en dummy
        dieAct,

        //dejamos en posicion normal de stand...
        cc.moveBy(0, cc.p(-fixAnimJumpX + 9, -fixAnimJumpY - 15)),

        //lo hacemos bajar, y siempre (por ahora) mueve a la derecha, o sea salta desde la izquierda...
        cc.moveBy(0, cc.p(this.deltaStepX / 2, this.deltaStepY)),

        //luego del salto queda en normal parado... si no paso nada...
        cc.callFunc(function () {
            this.setAnimation('ExplorerInsideStand');
        }, this),

        //Avisamos al manager que termino el show...
        //para que respete la secuencia, la llamada,  debe estar dentro de una funcion
        //y debo pasarle el target para que tome bien el this...
        cc.callFunc(function () {
            this._manager.jumpEnd(aBox);
        }, this));

        this.node.runAction(aSalto);

        //llegamos al box...
        this.lin = aBox.lin;
        this.col = aBox.col;
    },

    jumpToChamber: function jumpToChamber() {
        //que salte al cilindro...
        var strDirection = this.col == 0 ? 'R' : 'L';
        var xFix = this.col == 0 ? 38 : -38;

        var aSalto = cc.sequence(cc.moveBy(0, cc.p(xFix, -700)), cc.callFunc(function () {
            this.setAnimation('ExpIn_EndJump' + strDirection);
        }, this), cc.moveBy(0, cc.p(0, -50)));

        this.node.runAction(aSalto);
    },

    jumpToMouth: function jumpToMouth() {
        //que salte a la boca de la piramide...
        //lo hacemos correr hasta el medio... o sea la columna 2
        //el player tiene que correr hasta 'subirse' al box
        var dCol = 2 - this.col;
        var s = dCol / Math.abs(dCol);
        //cuando el paso es cero nos tenemos que quedar y solo saltar...
        var strAnim = s < 0 ? 'ExplorerStepL' : 'ExplorerStepR';
        //las animaciones no tienen el mismo tamaño por lo tanto corrijo la
        //posición antes del play
        var fixAnimPasoX = 0;
        if (dCol > 0) {
            fixAnimPasoX = 71;
        } else if (dCol < 0) {
            fixAnimPasoX = -71;
        }

        var paso = cc.delayTime(0); //dummy action

        if (dCol !== 0) {
            paso = cc.sequence(
            //corregimos la posicion por la animacion del paso...
            cc.moveBy(0, cc.p(fixAnimPasoX, 0)), cc.sequence(
            //hacemos animacion del salto/paso lateral
            cc.callFunc(function () {
                this.setAnimation(strAnim);
            }, this), cc.delayTime(0.3), //Pausa para que se complete animación...
            //y luego movemos el nodo inmediatamente...
            cc.moveBy(0, cc.p(s * this.deltaStepX, 0))).repeat(Math.abs(dCol)), //se repite la cantidad de pasos que tiene que dar...
            cc.moveBy(0, cc.p(-fixAnimPasoX, 0)));
        }

        var aSalto = cc.sequence(paso, cc.moveBy(0, cc.p(40, -4)), cc.callFunc(function () {
            this.setAnimation('ExpOut_JumpHole');
        }, this), cc.moveBy(0.5, cc.p(8, -5)), cc.delayTime(0.6), cc.fadeOut(0.2));

        this.node.runAction(aSalto);
    },

    //showDieAnim: Ejecuta animacion del angel sobre el box ingresado
    showDieAnim: function showDieAnim(aBox) {

        var dtime = this.inside === true ? 0.2 : 0;

        var dieAct = cc.sequence(
        //pausa...
        cc.delayTime(dtime),
        //lo movemos hasta el lugar donde debe aparecer
        cc.moveTo(0, cc.p(aBox.node.x, aBox.node.y + 100)),
        //cc.moveTo(0, cc.p(wPos.x, wPos.y) ),
        //lo mostramos
        cc.fadeIn(0),
        //animamos
        cc.callFunc(function () {
            cc.audioEngine.playEffect(this.audio_Die);
        }, this), cc.callFunc(function (node) {
            node.getComponent(cc.Animation).play('Die');
        }, this.dieNode),
        //ocultamos
        cc.delayTime(1.8), cc.fadeOut(0.05)
        //cc.hide()
        );

        this.dieNode.runAction(dieAct);
    }

});

cc._RFpop();