require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"BonusObject":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3a19abPhipCY4HqojnxyNgp', 'BonusObject');
// script\BonusObject.js

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
        id: -1,
        audio_touch: cc.AudioClip

    },

    // use this for initialization
    onLoad: function onLoad() {

        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.doTouch();
            console.log('touch objeto bonus: ' + self.id);
        });
    },

    init: function init(gManager, aId) {
        this._manager = gManager;
        this.id = aId;
    },

    doTouch: function doTouch() {

        if (this._manager._waitUserInput === true) {
            cc.audioEngine.playEffect(this.audio_touch);
            this._manager.userBonusChoice(this.id);
        }
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"Bonus":[function(require,module,exports){
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
},{}],"Box":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c5005oD+RZFiYB7N+r4pMz6', 'Box');
// script\Box.js

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
        active: true,
        lin: 0,
        col: 0,
        content: 'o',
        isInsideBox: false,

        audio_touch: cc.AudioClip,
        audio_coins: cc.AudioClip,
        audio_rock: cc.AudioClip,
        audio_arrow: cc.AudioClip,

        _manager: null,
        _coins: cc.Node,
        _rock: cc.Node
        // _arrows: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {

        this._coins = this.node.getChildByName('coins');
        this._rock = this.node.getChildByName('piedra');

        var tmp = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            tmp.doTouch();
            //console.log('touch bloque: ' + tmp.lin + ', ' + tmp.lin + '  content: '+ tmp.content);
        });
    },

    init: function init(gManager) {
        this._manager = gManager;
    },

    doTouch: function doTouch() {
        //console.log('touch bloque: ' + this.lin + ', ' + this.col + '  content: '+ this.content);
        //depende del estado del bloque es lo que hacemos...
        //pero quiza solo pasamos el mensaje al GameManager para que resuelva...
        if (this._manager._waitUserInput === true) {
            cc.audioEngine.playEffect(this.audio_touch);
            this._manager.userChoice(this);
        }
    },

    showContent: function showContent() {
        //console.log('Show content....');
        //var anim = this.getComponent(cc.Animation);
        //        switch (this.content){
        //        case 'o': this._coins.getComponent(cc.Animation).play('BoxCoins'); break;
        //        case 'X': anim.play('BlockArrow'); break;
        //        case 'B': anim.play('BlockBonus');
        //        }
        var firstJumpDelay = this.lin === 5 ? 0.25 : 0;

        switch (this.content) {
            case 'o':
                this.scheduleOnce(this.safe, 0.2);break;
            case 'X':
                this.scheduleOnce(this.trap, 0.01 + firstJumpDelay);break;
            //case 'X': this.scheduleOnce( this.trap , (this.isInsideBox===true)? 0.25 + firstJumpDelay : 0.01 ); break;
            case 'B':
                this.scheduleOnce(this.bonus, 0.5);
        }
    },

    glow: function glow() {
        var anim = this.getComponent(cc.Animation);
        anim.play('BlockGlow');
        this.node.getChildByName('glow').active = true;
    },

    unGlow: function unGlow() {
        var anim = this.getComponent(cc.Animation);
        anim.stop('BlockGlow');
        this.node.getChildByName('glow').active = false;
    },

    tilt: function tilt() {
        var anim = this.getComponent(cc.Animation);
        anim.play('BlockTilt');
    },

    trap: function trap() {
        if (this.isInsideBox === true) {
            cc.audioEngine.playEffect(this.audio_rock);
            this._rock.getComponent(cc.Animation).play('BlockPiedra');
        } else {
            var anim = this.getComponent(cc.Animation);
            cc.audioEngine.playEffect(this.audio_arrow);
            anim.play('BlockArrow');
        }
    },

    safe: function safe() {
        cc.audioEngine.playEffect(this.audio_coins);

        this._coins.getComponent(cc.Animation).play('BoxCoins');
        //var anim = this.getComponent(cc.Animation);
        //anim.play('BlockSafe');      
    },

    //    dropRock () {
    //        this._rock.getComponent(cc.Animation).play('BoxCoins');
    //    },

    bonus: function bonus() {
        var anim = this.getComponent(cc.Animation);
        anim.play('BlockSafe');
    }
});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"Control":[function(require,module,exports){
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
},{}],"Double":[function(require,module,exports){
"use strict";
cc._RFpush(module, '72f0a5wbVJLEZ9QsmM/FMmX', 'Double');
// script\Double.js

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

        _glow: cc.Node,
        _head: cc.Node,
        _hLeft: cc.Node,
        _hRight: cc.Node,

        handleLeft: cc.Node,
        handleRight: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {

        //this._handleLeft  = cc.find('Canvas/double/handles/glow/Glow_Manijas_L');
        //this._handleRight = cc.find('Canvas/double/handles/glow/Glow_Manijas_R');

        this._glow = cc.find('Canvas/double/handles/glow');
        this._head = cc.find('Canvas/double/head');
        this._hLeft = cc.find('Canvas/double/handles/left');
        this._hRight = cc.find('Canvas/double/handles/right');

        var self = this;

        this.handleLeft.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.doTouch('L');
        });
        this.handleRight.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.doTouch('R');
        });
    },

    init: function init(game) {
        this._manager = game;

        cc.log('init Double....');
    },

    doTouch: function doTouch(h) {

        //sacamos el glow...
        this._glow.active = false;

        //animamos...
        if (h == 'L') {
            this._hLeft.getComponent(cc.Animation).play('HandleDown_Left');
        } else {
            this._hRight.getComponent(cc.Animation).play('HandleDown_Right');
        }

        //avisamos al manager
        this.scheduleOnce(function () {
            this._manager.doHandleTouch(h);
        }, 0.8);
    },

    doWin: function doWin() {

        this._head.getComponent(cc.Animation).play('Double_Win');
    },

    doLose: function doLose() {

        this._head.getComponent(cc.Animation).play('Double_Lose');
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"GameManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '482a2PrtdBNMIVQj4AGt+kR', 'GameManager');
// script\GameManager.js

var GS_PLAY_DOUBLE = 'playDouble';
var GS_PLAY_OUT = 'playOut';
var GS_PLAY_IN = 'playIn';
var GS_TRANS_IN = 'transInside';
var GS_TRANS_END = 'transEnd';
var GS_PLAY_BONUS = 'playBonus';
var GS_PAUSE = 'pause';
var GS_IDLE = 'idle';
var GS_OVER = 'over';

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

        //General references...
        playingScene: GS_IDLE,

        _activeLine: 0,
        _waitUserInput: false,

        _gameLastState: GS_IDLE,
        _gameState: GS_IDLE,

        _gameServer: null,

        //Outside references...
        _piramid: cc.Node,
        _player: cc.Node,

        _double: cc.Node,

        _bonus: cc.Node,

        //Inside references...
        _insidePiramid: cc.Node,
        _insidePlayer: cc.Node,

        //UI references...
        //ticket: cc.Node,
        uiLayerPrefab: {
            'default': null,
            type: cc.Prefab
        },
        _uiLayer: cc.Node,

        audio_Music: cc.AudioClip

    },

    //audio_Music_Outside: cc.AudioClip,
    //audio_Music_Trans: cc.AudioClip,
    //audio_Music_Inside: cc.AudioClip,

    // use this for initialization
    onLoad: function onLoad() {
        this._gameState = GS_IDLE;

        var tmp = this;

        var listener = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                cc.log('keyDown: ' + keyCode);
                if (keyCode == 66) {
                    cc.director.loadScene('bonus');
                } //B
                if (keyCode == 68) {
                    cc.director.loadScene('double');
                } //D
                if (keyCode == 73) {
                    cc.director.loadScene('inside');
                } //I
                if (keyCode == 82) {
                    cc.director.loadScene('outside');
                } //R
                /*                if (keyCode == 66) { tmp.playBonus(); } //B
                                if (keyCode == 68) { tmp.playDouble(); } //D
                                if (keyCode == 73) { tmp.playInside(); } //I
                                if (keyCode == 82) { tmp.restart() } //R
                */
            }
        };

        cc.eventManager.addListener(listener, this.node);

        //si tiene la ui la ponemos
        if (this.uiLayerPrefab != null) {
            //cc.log('Cargar UI...');
            var tmpLayer = cc.find('Canvas');
            this._uiLayer = cc.instantiate(this.uiLayerPrefab);
            this._uiLayer.parent = tmpLayer; // this.node.parent;
            this._uiLayer.zIndex = 100;
            this._uiLayer.setPosition(-960, -540);
        }

        //para simulaciones
        this._gameServer = this.node.getComponent('VirtualServer');

        cc.log('Load GameManager...' + this.playingScene);

        switch (this.playingScene) {
            case GS_IDLE:
                this.idle();break;

            case GS_PLAY_OUT:
                this.play();break;

            case GS_PLAY_IN:
                this.playInside();break;

            case GS_TRANS_IN:
                this.transInside();break;

            case GS_TRANS_END:
                this.transEnd();break;

            case GS_PLAY_BONUS:
                this.playBonus();break;

            case GS_PLAY_DOUBLE:
                this.playDouble();break;

        }
    },

    setState: function setState(newState) {
        this._gameLastState = this._gameState;
        this._gameState = newState;
    },

    //Pantalla inicial que no hace nada...
    idle: function idle() {

        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.audio_Music, true);

        this.setState(GS_IDLE);

        //obtengo las referencias desde la escena cargada
        var tmpLayer = cc.find('Canvas/outside/piramidLayer');

        tmpLayer.runAction(cc.repeatForever(cc.sequence(cc.moveBy(10, 0, -1050).easing(cc.easeInOut(2)), cc.delayTime(0.5), cc.moveBy(10, 0, 1050).easing(cc.easeInOut(2)))));

        this.scheduleOnce(function () {
            cc.director.loadScene('outside');
        }, 10);
        //        this._waitUserInput = true;
    },

    play: function play() {
        //Aqui arranca el juego real...
        //Determinar la jugada de ticket
        //Hacer reset de los componentes
        this._activeLine = 0;

        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.audio_Music, true);

        //obtengo las referencias desde la escena cargada
        this._piramid = cc.find('Canvas/outside/piramidLayer'); //.getComponent('Piramid');
        this._player = cc.find('Canvas/outside/piramidLayer/explorer'); //.getComponent('Player');

        this._piramid = this._piramid.getComponent('Piramid');
        this._player = this._player.getComponent('Player');

        this._piramid.init(this);
        this._player.init(this);

        this._piramid.reset();
        this._piramid.drawOutsideBlocks();

        this._player.reset();

        this.setState(GS_PLAY_OUT);

        this._waitUserInput = true;

        this.glowActiveLine();
    },

    //Escena de Animación de transicion al interior
    transInside: function transInside() {

        this.setState(GS_TRANS_IN);

        this._waitUserInput = false;

        cc.audioEngine.playMusic(this.audio_Music, false);

        this.scheduleOnce(function () {
            cc.director.loadScene('inside');
        }, 2);
    },

    //Escena de Animación del final
    transEnd: function transEnd() {

        this.setState(GS_TRANS_END);

        this._waitUserInput = false;

        cc.audioEngine.playMusic(this.audio_Music, false);

        this.scheduleOnce(function () {
            cc.director.loadScene('double');
        }, 8);
    },

    //Escena de Juego en Interior de la pirámide, bajada
    playInside: function playInside() {

        //Aqui pasamos al juego interno...
        this.setState(GS_PLAY_IN);

        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.audio_Music, true);

        //El _activeLine sigue en 5.. porque se mantiene la numeración de las líneas
        this._activeLine = 5;

        //obtengo las referencias desde la escena cargada
        this._insidePiramid = cc.find('Canvas/inside/insidePiramidLayer'); //.getComponent('Piramid');
        this._insidePlayer = cc.find('Canvas/inside/insidePiramidLayer/insideExplorer'); //.getComponent('Player');

        this._insidePiramid = this._insidePiramid.getComponent('Piramid');
        this._insidePlayer = this._insidePlayer.getComponent('Player');

        this._insidePiramid.init(this);
        this._insidePlayer.init(this);

        this._insidePiramid.reset();
        this._insidePiramid.drawInsideBlocks();

        this._insidePlayer.reset();

        this._insidePiramid.fallingInsideShow();

        this.glowActiveLine();

        /* this.insidePiramid.reset();
        this.insidePiramid.drawInsideBlocks();       
        
        this.insidePlayer.reset();
        
        this.glowActiveLine();
        
        //mostramos la pantalla..
        this.insideScreen.showScreen();
          //hacemos el show de entrada...
        this.insidePiramid.fallingInsideShow();
        */
        this._waitUserInput = true;
    },

    playBonus: function playBonus() {

        this.setState(GS_PLAY_BONUS);

        //obtengo las referencias desde la escena cargada
        this._bonus = cc.find('Canvas/bonus').getComponent('Bonus');

        this._bonus.init(this);
    },

    playDouble: function playDouble() {

        this.setState(GS_PLAY_DOUBLE);

        //obtengo las referencias desde la escena cargada
        this._double = cc.find('Canvas/double').getComponent('Double');

        //cc.log(this._double.uuid);

        //this._double = this._double.getComponent('Double');

        this._double.init(this);

        //this.doubleScreen.showScreen();
    },

    //DOUBLE: responder a la palanca...   
    doHandleTouch: function doHandleTouch(h) {

        cc.log('Handle touch ' + h);
        //Obtenemos el valor del doble o nada en el server y respondemos...

        //llamamos de acuerdo al valor...
        if (h == 'L') {
            this._double.doWin();
        } else {
            this._double.doLose();
        }
    },

    glowActiveLine: function glowActiveLine() {
        if (this._gameState === GS_PLAY_OUT) {
            this._piramid.activateLine(this._activeLine);
        } else if (this._gameState === GS_PLAY_IN) {
            this._insidePiramid.activateLine(this._activeLine);
        }
    },

    unglowActiveLine: function unglowActiveLine() {
        if (this._gameState === GS_PLAY_OUT) {
            this._piramid.deactivateLines();
        } else if (this._gameState === GS_PLAY_IN) {
            this._insidePiramid.deactivateLines();
        }
    },

    //es usado desde Player para informar que la animacion del moveToBox ha terminado
    jumpEnd: function jumpEnd(aBox) {
        //console.log('GM: JumpEnd: ' + aBox.lin + ', ' + aBox.col + '  content: '+ aBox.content);
        if (aBox.content !== 'X') {
            if (this._gameState === GS_PLAY_OUT) {
                this._piramid.scroll();
            } else if (this._gameState === GS_PLAY_IN) {
                this._insidePiramid.scrollInside();
            }
        } else if (aBox.content === 'X') {
            this.setState(GS_OVER);
        }

        this.nextGameStep();
    },

    //Usuario ha seleccionado un box
    userChoice: function userChoice(aBox) {

        if (aBox.lin === this._activeLine) {

            //Debemos desactivar el ingreso...
            this._waitUserInput = false;
            this.unglowActiveLine();

            //Debemos pedir el contenido del Box
            //aBox.content = 'o';
            aBox.content = this._gameServer.getBoxContent(aBox.lin, aBox.col);

            //Llamamos a animar el Jugador hasta el box seleccionado
            if (this._gameState === GS_PLAY_OUT) {
                this._player.jumpToOutsideBox(aBox);
            } else if (this._gameState === GS_PLAY_IN) {
                this._insidePlayer.jumpToInsideBox(aBox);
            }

            //Aqui se ejecuta inmediatamente aunque no haya terminado la
            //animacion del movimiento hacia el box
            //Lo que deseemos que se haga al fin de la animacion va en jumpEnd
        } else {
                aBox.tilt();
            }
    },

    userBonusChoice: function userBonusChoice(id) {
        //El jugador ha seleccionado un objeto activo del Bonus...

    },

    nextGameStep: function nextGameStep() {
        //Aqui analizamos y preparamos el proximo paso del juego a la espera del user...
        switch (this._gameState) {
            case GS_PLAY_OUT:
                //si estamos afuera...
                //Sumamos la linea activa...
                this._activeLine++;

                //Mostramos el resultado de la linea que pasamos...???

                //Si terminamos la piramide exterior exitosamente pasamos a la escena del interior
                if (this._activeLine === 5) {

                    this._piramid.deactivateLines();

                    //hacemos el show del ingreso...
                    this._piramid.goInsideShow();

                    this.scheduleOnce(function () {
                        this._player.jumpToMouth();
                    }, 3);

                    //Pautamos que en X tiempo se pase al interior
                    //ocultamos la del outside...
                    //ponemos la animacion intermedia
                    //pasamos al nuevo estado de juego
                    this.scheduleOnce(function () {
                        //this.outsideScreen.hideScreen();
                        //cc.audioEngine.stopMusic();
                        //cc.audioEngine.playMusic(this.audio_Music_Trans);
                        cc.director.loadScene('transInside');
                    }, 5);
                    //this.transScreen.showScreen(); } , 5);

                    //this.scheduleOnce(function() { this.transScreen.hideScreen(); this.playInside(); } , 7);
                } else {
                        //si aun seguimos jugando outside...
                        //Iluminamos la nueva linea...
                        this.glowActiveLine();
                        this._waitUserInput = true;
                    }

                //Si muere vamos a escena final
                break;

            case GS_PLAY_IN:
                //Sumamos la linea activa...
                this._activeLine++;

                //Mostramos el resultado de la linea que pasamos...???

                //Si terminamos la piramide exterior exitosamente pasamos a la escena del interior
                if (this._activeLine == 9) {

                    this._insidePiramid.deactivateLines();

                    //hacemos el show del salto al doble o nada...
                    this._insidePiramid.getIntoChamberShow();

                    this.scheduleOnce(function () {
                        this._insidePlayer.jumpToChamber();
                    }, 4);

                    this.scheduleOnce(function () {
                        cc.director.loadScene('end');
                    }, 7);
                } else {
                    //si aun seguimos jugando outside...
                    //Iluminamos la nueva linea...
                    this.glowActiveLine();
                    this._waitUserInput = true;
                }
                //Si muere vamos a escena final
                break;

            case GS_PLAY_BONUS:

                break;

            case GS_OVER:
                //Se acabo el juego....   
                this._waitUserInput = false;

                //vemos en que estado estaba antes...
                switch (this._gameLastState) {
                    case GS_PLAY_OUT:
                        //si estabamos afuera...
                        this._piramid.deactivateLines();
                        break;

                    case GS_PLAY_IN:
                        //si estabamos dentro...
                        this._insidePiramid.deactivateLines();
                        break;
                }

                this.scheduleOnce(function () {
                    cc.director.loadScene('outside');
                }, 5);

        }
    }

});
//called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"Piramid":[function(require,module,exports){
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
},{"Ticket":"Ticket"}],"Player":[function(require,module,exports){
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
},{}],"SubScene":[function(require,module,exports){
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
},{}],"Ticket":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'cf762vzK2ZHf7mJTQZKe3ZF', 'Ticket');
// script\Ticket.js

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
        baseBox: {
            'default': null,
            type: cc.Prefab
        },

        iconTrap: {
            'default': null,
            type: cc.SpriteFrame
        },

        iconBonus: {
            'default': null,
            type: cc.SpriteFrame
        },

        _manager: null,
        _Map: 'generate!'

    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(gManager) {
        this._manager = gManager;
    },

    //generar un ticket aleatoriamente
    generate: function generate() {
        this._outsideMap = [];

        var vBonusLine = Math.floor(Math.random() * 4) + 1;
        var vBonusCol = Math.floor(Math.random() * (9 - vBonusLine));

        //Generar el outsideMap...
        for (var vLine = 0; vLine < 9; vLine++) {

            var vLose = 1; //((10 - vLine) / 5) + 1;
            var vContentLine = '';
            var vContent = 'o';

            if (vLine == vBonusLine) {
                vLose++;
            }

            for (var vCol = 0; vCol < 10 - vLine; vCol++) {

                vContent = 'o';

                if (vCol == vBonusCol && vLine == vBonusLine) {
                    vContent = 'B';
                } else if (vLose > 0 && (Math.random() < 0.3 || vCol === 9 - vLine)) {
                    vContent = 'X';vLose--;
                }

                //corregir puede quedar sin asignar loosers
                vContentLine = vContentLine + vContent;

                //Dibujamos en layer...
                this._drawBoxOnTicket(vLine, vCol, vContent);
            }
            console.log('linea ' + vLine + ' Contenido: ' + vContentLine);

            this._outsideMap.push(vContentLine);
        }
    },

    _drawBoxOnTicket: function _drawBoxOnTicket(line, col, content) {

        var abox = cc.instantiate(this.baseBox);
        abox = abox.getComponent(cc.Sprite);
        abox.node.parent = this.node;

        //abox.node.zindex = -10 * vlinea; //se ordena los de abajo mas arriba que los otros...

        switch (content) {
            case 'o':
                break;
            case 'B':
                abox.spriteFrame = this.iconBonus;break;
            case 'X':
                abox.spriteFrame = this.iconTrap;break;
        }
        //dibujar...
        abox.node.setPosition(col * 24 + line * 24 * 0.5 + 40, line * 24 + 40);
    },

    getOutSideContent: function getOutSideContent(aLine, aCol) {
        var tmpLine = this._outsideMap[aLine];
        return tmpLine.charAt(aCol);
    }

});

cc._RFpop();
},{}],"TransScene":[function(require,module,exports){
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
},{}],"UserInterface":[function(require,module,exports){
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
},{"GameManager":"GameManager"}],"VirtualServer":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd8d69psLQhMW6zGMe/5mPZI', 'VirtualServer');
// script\VirtualServer.js

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

        _fakeTicket: ''

    },

    // use this for initialization
    onLoad: function onLoad() {

        this.generate();
    },

    getBoxContent: function getBoxContent(aLine, aColumn) {
        var tmpLine = this._fakeTicket[aLine];
        var c = tmpLine.charAt(aColumn);
        //console.log('Devolviendo Box.lin: ' + aLine + ' Box.col: ' + aColumn + ' Contenido: ' + c);
        return c;
    },

    //generar un ticket aleatoriamente
    generate: function generate() {
        this._fakeTicket = [];

        var vBonusLine = Math.floor(Math.random() * 4) + 1;
        var vBonusCol = Math.floor(Math.random() * (9 - vBonusLine));

        //Generar el outsideMap...
        for (var vLine = 0; vLine < 9; vLine++) {

            var vLose = 1; //((10 - vLine) / 5) + 1;
            var vContentLine = '';
            var vContent = 'o';

            if (vLine == vBonusLine) {
                vLose++;
            }

            for (var vCol = 0; vCol < 10 - vLine; vCol++) {

                vContent = 'o';

                if (vCol == vBonusCol && vLine == vBonusLine) {
                    vContent = 'B';
                } else if (vLose > 0 && (Math.random() < 0.3 || vCol === 9 - vLine)) {
                    vContent = 'X';vLose--;
                }

                //corregir puede quedar sin asignar loosers
                vContentLine = vContentLine + vContent;

                //Dibujamos en layer...
                //this._drawBoxOnTicket(vLine, vCol, vContent);
            }
            console.log('linea ' + vLine + ' Contenido: ' + vContentLine);

            this._fakeTicket.push(vContentLine);
        }
    }

});

cc._RFpop();
},{}]},{},["Piramid","BonusObject","UserInterface","GameManager","SubScene","TransScene","Double","Box","Ticket","VirtualServer","Bonus","Player","Control"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHQvQm9udXNPYmplY3QuanMiLCJhc3NldHMvc2NyaXB0L0JvbnVzLmpzIiwiYXNzZXRzL3NjcmlwdC9Cb3guanMiLCJhc3NldHMvc2NyaXB0L0NvbnRyb2wuanMiLCJhc3NldHMvc2NyaXB0L0RvdWJsZS5qcyIsImFzc2V0cy9zY3JpcHQvR2FtZU1hbmFnZXIuanMiLCJhc3NldHMvc2NyaXB0L1BpcmFtaWQuanMiLCJhc3NldHMvc2NyaXB0L1BsYXllci5qcyIsImFzc2V0cy9zY3JpcHQvU3ViU2NlbmUuanMiLCJhc3NldHMvc2NyaXB0L1RpY2tldC5qcyIsImFzc2V0cy9zY3JpcHQvVHJhbnNTY2VuZS5qcyIsImFzc2V0cy9zY3JpcHQvVXNlckludGVyZmFjZS5qcyIsImFzc2V0cy9zY3JpcHQvVmlydHVhbFNlcnZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnM2ExOWFiUGhpcENZNEhxb2pueHlOZ3AnLCAnQm9udXNPYmplY3QnKTtcbi8vIHNjcmlwdFxcQm9udXNPYmplY3QuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBfbWFuYWdlcjogbnVsbCxcbiAgICAgICAgaWQ6IC0xLFxuICAgICAgICBhdWRpb190b3VjaDogY2MuQXVkaW9DbGlwXG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYuZG9Ub3VjaCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNoIG9iamV0byBib251czogJyArIHNlbGYuaWQpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChnTWFuYWdlciwgYUlkKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIgPSBnTWFuYWdlcjtcbiAgICAgICAgdGhpcy5pZCA9IGFJZDtcbiAgICB9LFxuXG4gICAgZG9Ub3VjaDogZnVuY3Rpb24gZG9Ub3VjaCgpIHtcblxuICAgICAgICBpZiAodGhpcy5fbWFuYWdlci5fd2FpdFVzZXJJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmF1ZGlvX3RvdWNoKTtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIudXNlckJvbnVzQ2hvaWNlKHRoaXMuaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZTJkN2RkZmhsSk96SnVJWjFlVjNtR2snLCAnQm9udXMnKTtcbi8vIHNjcmlwdFxcQm9udXMuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBfbWFuYWdlcjogbnVsbCxcblxuICAgICAgICBsYXllck9iamVjdHM6IGNjLk5vZGUsXG5cbiAgICAgICAgX09iamV0bzE6IGNjLk5vZGUsXG4gICAgICAgIF9PYmpldG8yOiBjYy5Ob2RlLFxuICAgICAgICBfT2JqZXRvMzogY2MuTm9kZSxcbiAgICAgICAgX09iamV0bzQ6IGNjLk5vZGUsXG4gICAgICAgIF9PYmpldG81OiBjYy5Ob2RlXG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5sYXllck9iamVjdHMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnQm9udXNFbnRyYWRhT2JqZXRvcycpO1xuICAgICAgICB9LCAxLjUpO1xuXG4gICAgICAgIHRoaXMuX09iamV0bzEgPSB0aGlzLmxheWVyT2JqZWN0cy5nZXRDaGlsZEJ5TmFtZSgnT2JqZXRvXzEnKTtcbiAgICAgICAgdGhpcy5fT2JqZXRvMiA9IHRoaXMubGF5ZXJPYmplY3RzLmdldENoaWxkQnlOYW1lKCdPYmpldG9fMicpO1xuICAgICAgICB0aGlzLl9PYmpldG8zID0gdGhpcy5sYXllck9iamVjdHMuZ2V0Q2hpbGRCeU5hbWUoJ09iamV0b18zJyk7XG4gICAgICAgIHRoaXMuX09iamV0bzQgPSB0aGlzLmxheWVyT2JqZWN0cy5nZXRDaGlsZEJ5TmFtZSgnT2JqZXRvXzQnKTtcbiAgICAgICAgdGhpcy5fT2JqZXRvNSA9IHRoaXMubGF5ZXJPYmplY3RzLmdldENoaWxkQnlOYW1lKCdPYmpldG9fNScpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvKnRoaXMuX09iamV0bzEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoIGV2ZW50ICkge1xyXG4gICAgICAgICAgICBzZWxmLmRvVG91Y2goIDEgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fT2JqZXRvMi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZG9Ub3VjaCggMiApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9PYmpldG8zLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKCBldmVudCApIHtcclxuICAgICAgICAgICAgc2VsZi5kb1RvdWNoKCAzICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX09iamV0bzQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoIGV2ZW50ICkge1xyXG4gICAgICAgICAgICBzZWxmLmRvVG91Y2goIDQgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fT2JqZXRvNS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZG9Ub3VjaCggNSApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAqL1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGdhbWUpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlciA9IGdhbWU7XG5cbiAgICAgICAgdGhpcy5fT2JqZXRvMS5nZXRDb21wb25lbnQoJ0JvbnVzT2JqZWN0JykuaW5pdChnYW1lLCAxKTtcbiAgICAgICAgdGhpcy5fT2JqZXRvMi5nZXRDb21wb25lbnQoJ0JvbnVzT2JqZWN0JykuaW5pdChnYW1lLCAyKTtcbiAgICAgICAgdGhpcy5fT2JqZXRvMy5nZXRDb21wb25lbnQoJ0JvbnVzT2JqZWN0JykuaW5pdChnYW1lLCAzKTtcbiAgICAgICAgdGhpcy5fT2JqZXRvNC5nZXRDb21wb25lbnQoJ0JvbnVzT2JqZWN0JykuaW5pdChnYW1lLCA0KTtcbiAgICAgICAgdGhpcy5fT2JqZXRvNS5nZXRDb21wb25lbnQoJ0JvbnVzT2JqZWN0JykuaW5pdChnYW1lLCA1KTtcbiAgICB9LFxuXG4gICAgZG9Ub3VjaDogZnVuY3Rpb24gZG9Ub3VjaChpZCkge1xuXG4gICAgICAgIC8vc2FjYW1vcyBlbCBnbG93Li4uXG4gICAgICAgIC8vdGhpcy5fZ2xvdy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAvL2FuaW1hbW9zLi4uXG4gICAgICAgIC8qaWYgKCBoID09ICdMJyApIHtcclxuICAgICAgICAgICAgdGhpcy5faExlZnQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnSGFuZGxlRG93bl9MZWZ0Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faFJpZ2h0LmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ0hhbmRsZURvd25fUmlnaHQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9hdmlzYW1vcyBhbCBtYW5hZ2VyXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKSB7IHRoaXMuX21hbmFnZXIuZG9IYW5kbGVUb3VjaCggaCApOyB9ICwgMC44KTtcclxuICAgICAgICAqL1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2M1MDA1b0QrUlpGaVlCN04rcjRwTXo2JywgJ0JveCcpO1xuLy8gc2NyaXB0XFxCb3guanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICBsaW46IDAsXG4gICAgICAgIGNvbDogMCxcbiAgICAgICAgY29udGVudDogJ28nLFxuICAgICAgICBpc0luc2lkZUJveDogZmFsc2UsXG5cbiAgICAgICAgYXVkaW9fdG91Y2g6IGNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgYXVkaW9fY29pbnM6IGNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgYXVkaW9fcm9jazogY2MuQXVkaW9DbGlwLFxuICAgICAgICBhdWRpb19hcnJvdzogY2MuQXVkaW9DbGlwLFxuXG4gICAgICAgIF9tYW5hZ2VyOiBudWxsLFxuICAgICAgICBfY29pbnM6IGNjLk5vZGUsXG4gICAgICAgIF9yb2NrOiBjYy5Ob2RlXG4gICAgICAgIC8vIF9hcnJvd3M6IGNjLk5vZGVcblxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcblxuICAgICAgICB0aGlzLl9jb2lucyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29pbnMnKTtcbiAgICAgICAgdGhpcy5fcm9jayA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncGllZHJhJyk7XG5cbiAgICAgICAgdmFyIHRtcCA9IHRoaXM7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdG1wLmRvVG91Y2goKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RvdWNoIGJsb3F1ZTogJyArIHRtcC5saW4gKyAnLCAnICsgdG1wLmxpbiArICcgIGNvbnRlbnQ6ICcrIHRtcC5jb250ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoZ01hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlciA9IGdNYW5hZ2VyO1xuICAgIH0sXG5cbiAgICBkb1RvdWNoOiBmdW5jdGlvbiBkb1RvdWNoKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd0b3VjaCBibG9xdWU6ICcgKyB0aGlzLmxpbiArICcsICcgKyB0aGlzLmNvbCArICcgIGNvbnRlbnQ6ICcrIHRoaXMuY29udGVudCk7XG4gICAgICAgIC8vZGVwZW5kZSBkZWwgZXN0YWRvIGRlbCBibG9xdWUgZXMgbG8gcXVlIGhhY2Vtb3MuLi5cbiAgICAgICAgLy9wZXJvIHF1aXphIHNvbG8gcGFzYW1vcyBlbCBtZW5zYWplIGFsIEdhbWVNYW5hZ2VyIHBhcmEgcXVlIHJlc3VlbHZhLi4uXG4gICAgICAgIGlmICh0aGlzLl9tYW5hZ2VyLl93YWl0VXNlcklucHV0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuYXVkaW9fdG91Y2gpO1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci51c2VyQ2hvaWNlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNob3dDb250ZW50OiBmdW5jdGlvbiBzaG93Q29udGVudCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnU2hvdyBjb250ZW50Li4uLicpO1xuICAgICAgICAvL3ZhciBhbmltID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgLy8gICAgICAgIHN3aXRjaCAodGhpcy5jb250ZW50KXtcbiAgICAgICAgLy8gICAgICAgIGNhc2UgJ28nOiB0aGlzLl9jb2lucy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCdCb3hDb2lucycpOyBicmVhaztcbiAgICAgICAgLy8gICAgICAgIGNhc2UgJ1gnOiBhbmltLnBsYXkoJ0Jsb2NrQXJyb3cnKTsgYnJlYWs7XG4gICAgICAgIC8vICAgICAgICBjYXNlICdCJzogYW5pbS5wbGF5KCdCbG9ja0JvbnVzJyk7XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIHZhciBmaXJzdEp1bXBEZWxheSA9IHRoaXMubGluID09PSA1ID8gMC4yNSA6IDA7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuc2FmZSwgMC4yKTticmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1gnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMudHJhcCwgMC4wMSArIGZpcnN0SnVtcERlbGF5KTticmVhaztcbiAgICAgICAgICAgIC8vY2FzZSAnWCc6IHRoaXMuc2NoZWR1bGVPbmNlKCB0aGlzLnRyYXAgLCAodGhpcy5pc0luc2lkZUJveD09PXRydWUpPyAwLjI1ICsgZmlyc3RKdW1wRGVsYXkgOiAwLjAxICk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQic6XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5ib251cywgMC41KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnbG93OiBmdW5jdGlvbiBnbG93KCkge1xuICAgICAgICB2YXIgYW5pbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIGFuaW0ucGxheSgnQmxvY2tHbG93Jyk7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ2xvdycpLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHVuR2xvdzogZnVuY3Rpb24gdW5HbG93KCkge1xuICAgICAgICB2YXIgYW5pbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIGFuaW0uc3RvcCgnQmxvY2tHbG93Jyk7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ2xvdycpLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICB0aWx0OiBmdW5jdGlvbiB0aWx0KCkge1xuICAgICAgICB2YXIgYW5pbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIGFuaW0ucGxheSgnQmxvY2tUaWx0Jyk7XG4gICAgfSxcblxuICAgIHRyYXA6IGZ1bmN0aW9uIHRyYXAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5zaWRlQm94ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuYXVkaW9fcm9jayk7XG4gICAgICAgICAgICB0aGlzLl9yb2NrLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ0Jsb2NrUGllZHJhJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYW5pbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuYXVkaW9fYXJyb3cpO1xuICAgICAgICAgICAgYW5pbS5wbGF5KCdCbG9ja0Fycm93Jyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2FmZTogZnVuY3Rpb24gc2FmZSgpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmF1ZGlvX2NvaW5zKTtcblxuICAgICAgICB0aGlzLl9jb2lucy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCdCb3hDb2lucycpO1xuICAgICAgICAvL3ZhciBhbmltID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgLy9hbmltLnBsYXkoJ0Jsb2NrU2FmZScpOyAgICAgIFxuICAgIH0sXG5cbiAgICAvLyAgICBkcm9wUm9jayAoKSB7XG4gICAgLy8gICAgICAgIHRoaXMuX3JvY2suZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnQm94Q29pbnMnKTtcbiAgICAvLyAgICB9LFxuXG4gICAgYm9udXM6IGZ1bmN0aW9uIGJvbnVzKCkge1xuICAgICAgICB2YXIgYW5pbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIGFuaW0ucGxheSgnQmxvY2tTYWZlJyk7XG4gICAgfVxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2YxYWNiYmJ4MmhEb3BiaUY1Z1lnR2l6JywgJ0NvbnRyb2wnKTtcbi8vIHNjcmlwdFxcQ29udHJvbC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBhdWRpb19NdXNpY19JbnRybzogY2MuQXVkaW9DbGlwXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnb3V0c2lkZScpO1xuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ3RyYW5zSW5zaWRlJyk7XG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnZW5kJyk7XG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnaW5zaWRlJyk7XG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnYm9udXMnKTtcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKCdkb3VibGUnKTtcblxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5hdWRpb19NdXNpY19JbnRybyk7XG5cbiAgICAgICAgLy90aGlzLnNjaGVkdWxlT25jZSggZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdUaXR1bG9fUGFudGFsbGFfSW5pY2lvJykuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnVGl0dWxvX0luaWNpbycpOyB9ICwgMik7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdpZGxlJyk7XG4gICAgICAgIH0sIDMpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzcyZjBhNXdiVkpMRVo5UXNtTS9GTW1YJywgJ0RvdWJsZScpO1xuLy8gc2NyaXB0XFxEb3VibGUuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBfbWFuYWdlcjogbnVsbCxcblxuICAgICAgICBfZ2xvdzogY2MuTm9kZSxcbiAgICAgICAgX2hlYWQ6IGNjLk5vZGUsXG4gICAgICAgIF9oTGVmdDogY2MuTm9kZSxcbiAgICAgICAgX2hSaWdodDogY2MuTm9kZSxcblxuICAgICAgICBoYW5kbGVMZWZ0OiBjYy5Ob2RlLFxuICAgICAgICBoYW5kbGVSaWdodDogY2MuTm9kZVxuXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuXG4gICAgICAgIC8vdGhpcy5faGFuZGxlTGVmdCAgPSBjYy5maW5kKCdDYW52YXMvZG91YmxlL2hhbmRsZXMvZ2xvdy9HbG93X01hbmlqYXNfTCcpO1xuICAgICAgICAvL3RoaXMuX2hhbmRsZVJpZ2h0ID0gY2MuZmluZCgnQ2FudmFzL2RvdWJsZS9oYW5kbGVzL2dsb3cvR2xvd19NYW5pamFzX1InKTtcblxuICAgICAgICB0aGlzLl9nbG93ID0gY2MuZmluZCgnQ2FudmFzL2RvdWJsZS9oYW5kbGVzL2dsb3cnKTtcbiAgICAgICAgdGhpcy5faGVhZCA9IGNjLmZpbmQoJ0NhbnZhcy9kb3VibGUvaGVhZCcpO1xuICAgICAgICB0aGlzLl9oTGVmdCA9IGNjLmZpbmQoJ0NhbnZhcy9kb3VibGUvaGFuZGxlcy9sZWZ0Jyk7XG4gICAgICAgIHRoaXMuX2hSaWdodCA9IGNjLmZpbmQoJ0NhbnZhcy9kb3VibGUvaGFuZGxlcy9yaWdodCcpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmhhbmRsZUxlZnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYuZG9Ub3VjaCgnTCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oYW5kbGVSaWdodC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5kb1RvdWNoKCdSJyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGdhbWUpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlciA9IGdhbWU7XG5cbiAgICAgICAgY2MubG9nKCdpbml0IERvdWJsZS4uLi4nKTtcbiAgICB9LFxuXG4gICAgZG9Ub3VjaDogZnVuY3Rpb24gZG9Ub3VjaChoKSB7XG5cbiAgICAgICAgLy9zYWNhbW9zIGVsIGdsb3cuLi5cbiAgICAgICAgdGhpcy5fZ2xvdy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAvL2FuaW1hbW9zLi4uXG4gICAgICAgIGlmIChoID09ICdMJykge1xuICAgICAgICAgICAgdGhpcy5faExlZnQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnSGFuZGxlRG93bl9MZWZ0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9oUmlnaHQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnSGFuZGxlRG93bl9SaWdodCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9hdmlzYW1vcyBhbCBtYW5hZ2VyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuZG9IYW5kbGVUb3VjaChoKTtcbiAgICAgICAgfSwgMC44KTtcbiAgICB9LFxuXG4gICAgZG9XaW46IGZ1bmN0aW9uIGRvV2luKCkge1xuXG4gICAgICAgIHRoaXMuX2hlYWQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnRG91YmxlX1dpbicpO1xuICAgIH0sXG5cbiAgICBkb0xvc2U6IGZ1bmN0aW9uIGRvTG9zZSgpIHtcblxuICAgICAgICB0aGlzLl9oZWFkLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ0RvdWJsZV9Mb3NlJyk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNDgyYTJQcnRkQk5NSVZRajRBR3Qra1InLCAnR2FtZU1hbmFnZXInKTtcbi8vIHNjcmlwdFxcR2FtZU1hbmFnZXIuanNcblxudmFyIEdTX1BMQVlfRE9VQkxFID0gJ3BsYXlEb3VibGUnO1xudmFyIEdTX1BMQVlfT1VUID0gJ3BsYXlPdXQnO1xudmFyIEdTX1BMQVlfSU4gPSAncGxheUluJztcbnZhciBHU19UUkFOU19JTiA9ICd0cmFuc0luc2lkZSc7XG52YXIgR1NfVFJBTlNfRU5EID0gJ3RyYW5zRW5kJztcbnZhciBHU19QTEFZX0JPTlVTID0gJ3BsYXlCb251cyc7XG52YXIgR1NfUEFVU0UgPSAncGF1c2UnO1xudmFyIEdTX0lETEUgPSAnaWRsZSc7XG52YXIgR1NfT1ZFUiA9ICdvdmVyJztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cblxuICAgICAgICAvL0dlbmVyYWwgcmVmZXJlbmNlcy4uLlxuICAgICAgICBwbGF5aW5nU2NlbmU6IEdTX0lETEUsXG5cbiAgICAgICAgX2FjdGl2ZUxpbmU6IDAsXG4gICAgICAgIF93YWl0VXNlcklucHV0OiBmYWxzZSxcblxuICAgICAgICBfZ2FtZUxhc3RTdGF0ZTogR1NfSURMRSxcbiAgICAgICAgX2dhbWVTdGF0ZTogR1NfSURMRSxcblxuICAgICAgICBfZ2FtZVNlcnZlcjogbnVsbCxcblxuICAgICAgICAvL091dHNpZGUgcmVmZXJlbmNlcy4uLlxuICAgICAgICBfcGlyYW1pZDogY2MuTm9kZSxcbiAgICAgICAgX3BsYXllcjogY2MuTm9kZSxcblxuICAgICAgICBfZG91YmxlOiBjYy5Ob2RlLFxuXG4gICAgICAgIF9ib251czogY2MuTm9kZSxcblxuICAgICAgICAvL0luc2lkZSByZWZlcmVuY2VzLi4uXG4gICAgICAgIF9pbnNpZGVQaXJhbWlkOiBjYy5Ob2RlLFxuICAgICAgICBfaW5zaWRlUGxheWVyOiBjYy5Ob2RlLFxuXG4gICAgICAgIC8vVUkgcmVmZXJlbmNlcy4uLlxuICAgICAgICAvL3RpY2tldDogY2MuTm9kZSxcbiAgICAgICAgdWlMYXllclByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIF91aUxheWVyOiBjYy5Ob2RlLFxuXG4gICAgICAgIGF1ZGlvX011c2ljOiBjYy5BdWRpb0NsaXBcblxuICAgIH0sXG5cbiAgICAvL2F1ZGlvX011c2ljX091dHNpZGU6IGNjLkF1ZGlvQ2xpcCxcbiAgICAvL2F1ZGlvX011c2ljX1RyYW5zOiBjYy5BdWRpb0NsaXAsXG4gICAgLy9hdWRpb19NdXNpY19JbnNpZGU6IGNjLkF1ZGlvQ2xpcCxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl9nYW1lU3RhdGUgPSBHU19JRExFO1xuXG4gICAgICAgIHZhciB0bXAgPSB0aGlzO1xuXG4gICAgICAgIHZhciBsaXN0ZW5lciA9IHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coJ2tleURvd246ICcgKyBrZXlDb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSA2Nikge1xuICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2JvbnVzJyk7XG4gICAgICAgICAgICAgICAgfSAvL0JcbiAgICAgICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSA2OCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2RvdWJsZScpO1xuICAgICAgICAgICAgICAgIH0gLy9EXG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gNzMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdpbnNpZGUnKTtcbiAgICAgICAgICAgICAgICB9IC8vSVxuICAgICAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDgyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnb3V0c2lkZScpO1xuICAgICAgICAgICAgICAgIH0gLy9SXG4gICAgICAgICAgICAgICAgLyogICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gNjYpIHsgdG1wLnBsYXlCb251cygpOyB9IC8vQlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDY4KSB7IHRtcC5wbGF5RG91YmxlKCk7IH0gLy9EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gNzMpIHsgdG1wLnBsYXlJbnNpZGUoKTsgfSAvL0lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSA4MikgeyB0bXAucmVzdGFydCgpIH0gLy9SXHJcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcihsaXN0ZW5lciwgdGhpcy5ub2RlKTtcblxuICAgICAgICAvL3NpIHRpZW5lIGxhIHVpIGxhIHBvbmVtb3NcbiAgICAgICAgaWYgKHRoaXMudWlMYXllclByZWZhYiAhPSBudWxsKSB7XG4gICAgICAgICAgICAvL2NjLmxvZygnQ2FyZ2FyIFVJLi4uJyk7XG4gICAgICAgICAgICB2YXIgdG1wTGF5ZXIgPSBjYy5maW5kKCdDYW52YXMnKTtcbiAgICAgICAgICAgIHRoaXMuX3VpTGF5ZXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnVpTGF5ZXJQcmVmYWIpO1xuICAgICAgICAgICAgdGhpcy5fdWlMYXllci5wYXJlbnQgPSB0bXBMYXllcjsgLy8gdGhpcy5ub2RlLnBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuX3VpTGF5ZXIuekluZGV4ID0gMTAwO1xuICAgICAgICAgICAgdGhpcy5fdWlMYXllci5zZXRQb3NpdGlvbigtOTYwLCAtNTQwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcGFyYSBzaW11bGFjaW9uZXNcbiAgICAgICAgdGhpcy5fZ2FtZVNlcnZlciA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1ZpcnR1YWxTZXJ2ZXInKTtcblxuICAgICAgICBjYy5sb2coJ0xvYWQgR2FtZU1hbmFnZXIuLi4nICsgdGhpcy5wbGF5aW5nU2NlbmUpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5wbGF5aW5nU2NlbmUpIHtcbiAgICAgICAgICAgIGNhc2UgR1NfSURMRTpcbiAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTticmVhaztcblxuICAgICAgICAgICAgY2FzZSBHU19QTEFZX09VVDpcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTticmVhaztcblxuICAgICAgICAgICAgY2FzZSBHU19QTEFZX0lOOlxuICAgICAgICAgICAgICAgIHRoaXMucGxheUluc2lkZSgpO2JyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEdTX1RSQU5TX0lOOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNJbnNpZGUoKTticmVhaztcblxuICAgICAgICAgICAgY2FzZSBHU19UUkFOU19FTkQ6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc0VuZCgpO2JyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEdTX1BMQVlfQk9OVVM6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm9udXMoKTticmVhaztcblxuICAgICAgICAgICAgY2FzZSBHU19QTEFZX0RPVUJMRTpcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlEb3VibGUoKTticmVhaztcblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFN0YXRlOiBmdW5jdGlvbiBzZXRTdGF0ZShuZXdTdGF0ZSkge1xuICAgICAgICB0aGlzLl9nYW1lTGFzdFN0YXRlID0gdGhpcy5fZ2FtZVN0YXRlO1xuICAgICAgICB0aGlzLl9nYW1lU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICB9LFxuXG4gICAgLy9QYW50YWxsYSBpbmljaWFsIHF1ZSBubyBoYWNlIG5hZGEuLi5cbiAgICBpZGxlOiBmdW5jdGlvbiBpZGxlKCkge1xuXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5hdWRpb19NdXNpYywgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShHU19JRExFKTtcblxuICAgICAgICAvL29idGVuZ28gbGFzIHJlZmVyZW5jaWFzIGRlc2RlIGxhIGVzY2VuYSBjYXJnYWRhXG4gICAgICAgIHZhciB0bXBMYXllciA9IGNjLmZpbmQoJ0NhbnZhcy9vdXRzaWRlL3BpcmFtaWRMYXllcicpO1xuXG4gICAgICAgIHRtcExheWVyLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxMCwgMCwgLTEwNTApLmVhc2luZyhjYy5lYXNlSW5PdXQoMikpLCBjYy5kZWxheVRpbWUoMC41KSwgY2MubW92ZUJ5KDEwLCAwLCAxMDUwKS5lYXNpbmcoY2MuZWFzZUluT3V0KDIpKSkpKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ291dHNpZGUnKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgICAvLyAgICAgICAgdGhpcy5fd2FpdFVzZXJJbnB1dCA9IHRydWU7XG4gICAgfSxcblxuICAgIHBsYXk6IGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIC8vQXF1aSBhcnJhbmNhIGVsIGp1ZWdvIHJlYWwuLi5cbiAgICAgICAgLy9EZXRlcm1pbmFyIGxhIGp1Z2FkYSBkZSB0aWNrZXRcbiAgICAgICAgLy9IYWNlciByZXNldCBkZSBsb3MgY29tcG9uZW50ZXNcbiAgICAgICAgdGhpcy5fYWN0aXZlTGluZSA9IDA7XG5cbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmF1ZGlvX011c2ljLCB0cnVlKTtcblxuICAgICAgICAvL29idGVuZ28gbGFzIHJlZmVyZW5jaWFzIGRlc2RlIGxhIGVzY2VuYSBjYXJnYWRhXG4gICAgICAgIHRoaXMuX3BpcmFtaWQgPSBjYy5maW5kKCdDYW52YXMvb3V0c2lkZS9waXJhbWlkTGF5ZXInKTsgLy8uZ2V0Q29tcG9uZW50KCdQaXJhbWlkJyk7XG4gICAgICAgIHRoaXMuX3BsYXllciA9IGNjLmZpbmQoJ0NhbnZhcy9vdXRzaWRlL3BpcmFtaWRMYXllci9leHBsb3JlcicpOyAvLy5nZXRDb21wb25lbnQoJ1BsYXllcicpO1xuXG4gICAgICAgIHRoaXMuX3BpcmFtaWQgPSB0aGlzLl9waXJhbWlkLmdldENvbXBvbmVudCgnUGlyYW1pZCcpO1xuICAgICAgICB0aGlzLl9wbGF5ZXIgPSB0aGlzLl9wbGF5ZXIuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKTtcblxuICAgICAgICB0aGlzLl9waXJhbWlkLmluaXQodGhpcyk7XG4gICAgICAgIHRoaXMuX3BsYXllci5pbml0KHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX3BpcmFtaWQucmVzZXQoKTtcbiAgICAgICAgdGhpcy5fcGlyYW1pZC5kcmF3T3V0c2lkZUJsb2NrcygpO1xuXG4gICAgICAgIHRoaXMuX3BsYXllci5yZXNldCgpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoR1NfUExBWV9PVVQpO1xuXG4gICAgICAgIHRoaXMuX3dhaXRVc2VySW5wdXQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZ2xvd0FjdGl2ZUxpbmUoKTtcbiAgICB9LFxuXG4gICAgLy9Fc2NlbmEgZGUgQW5pbWFjacOzbiBkZSB0cmFuc2ljaW9uIGFsIGludGVyaW9yXG4gICAgdHJhbnNJbnNpZGU6IGZ1bmN0aW9uIHRyYW5zSW5zaWRlKCkge1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoR1NfVFJBTlNfSU4pO1xuXG4gICAgICAgIHRoaXMuX3dhaXRVc2VySW5wdXQgPSBmYWxzZTtcblxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5hdWRpb19NdXNpYywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnaW5zaWRlJyk7XG4gICAgICAgIH0sIDIpO1xuICAgIH0sXG5cbiAgICAvL0VzY2VuYSBkZSBBbmltYWNpw7NuIGRlbCBmaW5hbFxuICAgIHRyYW5zRW5kOiBmdW5jdGlvbiB0cmFuc0VuZCgpIHtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKEdTX1RSQU5TX0VORCk7XG5cbiAgICAgICAgdGhpcy5fd2FpdFVzZXJJbnB1dCA9IGZhbHNlO1xuXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmF1ZGlvX011c2ljLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdkb3VibGUnKTtcbiAgICAgICAgfSwgOCk7XG4gICAgfSxcblxuICAgIC8vRXNjZW5hIGRlIEp1ZWdvIGVuIEludGVyaW9yIGRlIGxhIHBpcsOhbWlkZSwgYmFqYWRhXG4gICAgcGxheUluc2lkZTogZnVuY3Rpb24gcGxheUluc2lkZSgpIHtcblxuICAgICAgICAvL0FxdWkgcGFzYW1vcyBhbCBqdWVnbyBpbnRlcm5vLi4uXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoR1NfUExBWV9JTik7XG5cbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmF1ZGlvX011c2ljLCB0cnVlKTtcblxuICAgICAgICAvL0VsIF9hY3RpdmVMaW5lIHNpZ3VlIGVuIDUuLiBwb3JxdWUgc2UgbWFudGllbmUgbGEgbnVtZXJhY2nDs24gZGUgbGFzIGzDrW5lYXNcbiAgICAgICAgdGhpcy5fYWN0aXZlTGluZSA9IDU7XG5cbiAgICAgICAgLy9vYnRlbmdvIGxhcyByZWZlcmVuY2lhcyBkZXNkZSBsYSBlc2NlbmEgY2FyZ2FkYVxuICAgICAgICB0aGlzLl9pbnNpZGVQaXJhbWlkID0gY2MuZmluZCgnQ2FudmFzL2luc2lkZS9pbnNpZGVQaXJhbWlkTGF5ZXInKTsgLy8uZ2V0Q29tcG9uZW50KCdQaXJhbWlkJyk7XG4gICAgICAgIHRoaXMuX2luc2lkZVBsYXllciA9IGNjLmZpbmQoJ0NhbnZhcy9pbnNpZGUvaW5zaWRlUGlyYW1pZExheWVyL2luc2lkZUV4cGxvcmVyJyk7IC8vLmdldENvbXBvbmVudCgnUGxheWVyJyk7XG5cbiAgICAgICAgdGhpcy5faW5zaWRlUGlyYW1pZCA9IHRoaXMuX2luc2lkZVBpcmFtaWQuZ2V0Q29tcG9uZW50KCdQaXJhbWlkJyk7XG4gICAgICAgIHRoaXMuX2luc2lkZVBsYXllciA9IHRoaXMuX2luc2lkZVBsYXllci5nZXRDb21wb25lbnQoJ1BsYXllcicpO1xuXG4gICAgICAgIHRoaXMuX2luc2lkZVBpcmFtaWQuaW5pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5faW5zaWRlUGxheWVyLmluaXQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5faW5zaWRlUGlyYW1pZC5yZXNldCgpO1xuICAgICAgICB0aGlzLl9pbnNpZGVQaXJhbWlkLmRyYXdJbnNpZGVCbG9ja3MoKTtcblxuICAgICAgICB0aGlzLl9pbnNpZGVQbGF5ZXIucmVzZXQoKTtcblxuICAgICAgICB0aGlzLl9pbnNpZGVQaXJhbWlkLmZhbGxpbmdJbnNpZGVTaG93KCk7XG5cbiAgICAgICAgdGhpcy5nbG93QWN0aXZlTGluZSgpO1xuXG4gICAgICAgIC8qIHRoaXMuaW5zaWRlUGlyYW1pZC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuaW5zaWRlUGlyYW1pZC5kcmF3SW5zaWRlQmxvY2tzKCk7ICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5zaWRlUGxheWVyLnJlc2V0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5nbG93QWN0aXZlTGluZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vbW9zdHJhbW9zIGxhIHBhbnRhbGxhLi5cclxuICAgICAgICB0aGlzLmluc2lkZVNjcmVlbi5zaG93U2NyZWVuKCk7XHJcbiAgICAgICAgICAvL2hhY2Vtb3MgZWwgc2hvdyBkZSBlbnRyYWRhLi4uXHJcbiAgICAgICAgdGhpcy5pbnNpZGVQaXJhbWlkLmZhbGxpbmdJbnNpZGVTaG93KCk7XHJcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fd2FpdFVzZXJJbnB1dCA9IHRydWU7XG4gICAgfSxcblxuICAgIHBsYXlCb251czogZnVuY3Rpb24gcGxheUJvbnVzKCkge1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoR1NfUExBWV9CT05VUyk7XG5cbiAgICAgICAgLy9vYnRlbmdvIGxhcyByZWZlcmVuY2lhcyBkZXNkZSBsYSBlc2NlbmEgY2FyZ2FkYVxuICAgICAgICB0aGlzLl9ib251cyA9IGNjLmZpbmQoJ0NhbnZhcy9ib251cycpLmdldENvbXBvbmVudCgnQm9udXMnKTtcblxuICAgICAgICB0aGlzLl9ib251cy5pbml0KHRoaXMpO1xuICAgIH0sXG5cbiAgICBwbGF5RG91YmxlOiBmdW5jdGlvbiBwbGF5RG91YmxlKCkge1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoR1NfUExBWV9ET1VCTEUpO1xuXG4gICAgICAgIC8vb2J0ZW5nbyBsYXMgcmVmZXJlbmNpYXMgZGVzZGUgbGEgZXNjZW5hIGNhcmdhZGFcbiAgICAgICAgdGhpcy5fZG91YmxlID0gY2MuZmluZCgnQ2FudmFzL2RvdWJsZScpLmdldENvbXBvbmVudCgnRG91YmxlJyk7XG5cbiAgICAgICAgLy9jYy5sb2codGhpcy5fZG91YmxlLnV1aWQpO1xuXG4gICAgICAgIC8vdGhpcy5fZG91YmxlID0gdGhpcy5fZG91YmxlLmdldENvbXBvbmVudCgnRG91YmxlJyk7XG5cbiAgICAgICAgdGhpcy5fZG91YmxlLmluaXQodGhpcyk7XG5cbiAgICAgICAgLy90aGlzLmRvdWJsZVNjcmVlbi5zaG93U2NyZWVuKCk7XG4gICAgfSxcblxuICAgIC8vRE9VQkxFOiByZXNwb25kZXIgYSBsYSBwYWxhbmNhLi4uICAgXG4gICAgZG9IYW5kbGVUb3VjaDogZnVuY3Rpb24gZG9IYW5kbGVUb3VjaChoKSB7XG5cbiAgICAgICAgY2MubG9nKCdIYW5kbGUgdG91Y2ggJyArIGgpO1xuICAgICAgICAvL09idGVuZW1vcyBlbCB2YWxvciBkZWwgZG9ibGUgbyBuYWRhIGVuIGVsIHNlcnZlciB5IHJlc3BvbmRlbW9zLi4uXG5cbiAgICAgICAgLy9sbGFtYW1vcyBkZSBhY3VlcmRvIGFsIHZhbG9yLi4uXG4gICAgICAgIGlmIChoID09ICdMJykge1xuICAgICAgICAgICAgdGhpcy5fZG91YmxlLmRvV2luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kb3VibGUuZG9Mb3NlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2xvd0FjdGl2ZUxpbmU6IGZ1bmN0aW9uIGdsb3dBY3RpdmVMaW5lKCkge1xuICAgICAgICBpZiAodGhpcy5fZ2FtZVN0YXRlID09PSBHU19QTEFZX09VVCkge1xuICAgICAgICAgICAgdGhpcy5fcGlyYW1pZC5hY3RpdmF0ZUxpbmUodGhpcy5fYWN0aXZlTGluZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZ2FtZVN0YXRlID09PSBHU19QTEFZX0lOKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnNpZGVQaXJhbWlkLmFjdGl2YXRlTGluZSh0aGlzLl9hY3RpdmVMaW5lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmdsb3dBY3RpdmVMaW5lOiBmdW5jdGlvbiB1bmdsb3dBY3RpdmVMaW5lKCkge1xuICAgICAgICBpZiAodGhpcy5fZ2FtZVN0YXRlID09PSBHU19QTEFZX09VVCkge1xuICAgICAgICAgICAgdGhpcy5fcGlyYW1pZC5kZWFjdGl2YXRlTGluZXMoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9nYW1lU3RhdGUgPT09IEdTX1BMQVlfSU4pIHtcbiAgICAgICAgICAgIHRoaXMuX2luc2lkZVBpcmFtaWQuZGVhY3RpdmF0ZUxpbmVzKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy9lcyB1c2FkbyBkZXNkZSBQbGF5ZXIgcGFyYSBpbmZvcm1hciBxdWUgbGEgYW5pbWFjaW9uIGRlbCBtb3ZlVG9Cb3ggaGEgdGVybWluYWRvXG4gICAganVtcEVuZDogZnVuY3Rpb24ganVtcEVuZChhQm94KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0dNOiBKdW1wRW5kOiAnICsgYUJveC5saW4gKyAnLCAnICsgYUJveC5jb2wgKyAnICBjb250ZW50OiAnKyBhQm94LmNvbnRlbnQpO1xuICAgICAgICBpZiAoYUJveC5jb250ZW50ICE9PSAnWCcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9nYW1lU3RhdGUgPT09IEdTX1BMQVlfT1VUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGlyYW1pZC5zY3JvbGwoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZ2FtZVN0YXRlID09PSBHU19QTEFZX0lOKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zaWRlUGlyYW1pZC5zY3JvbGxJbnNpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhQm94LmNvbnRlbnQgPT09ICdYJykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShHU19PVkVSKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmV4dEdhbWVTdGVwKCk7XG4gICAgfSxcblxuICAgIC8vVXN1YXJpbyBoYSBzZWxlY2Npb25hZG8gdW4gYm94XG4gICAgdXNlckNob2ljZTogZnVuY3Rpb24gdXNlckNob2ljZShhQm94KSB7XG5cbiAgICAgICAgaWYgKGFCb3gubGluID09PSB0aGlzLl9hY3RpdmVMaW5lKSB7XG5cbiAgICAgICAgICAgIC8vRGViZW1vcyBkZXNhY3RpdmFyIGVsIGluZ3Jlc28uLi5cbiAgICAgICAgICAgIHRoaXMuX3dhaXRVc2VySW5wdXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudW5nbG93QWN0aXZlTGluZSgpO1xuXG4gICAgICAgICAgICAvL0RlYmVtb3MgcGVkaXIgZWwgY29udGVuaWRvIGRlbCBCb3hcbiAgICAgICAgICAgIC8vYUJveC5jb250ZW50ID0gJ28nO1xuICAgICAgICAgICAgYUJveC5jb250ZW50ID0gdGhpcy5fZ2FtZVNlcnZlci5nZXRCb3hDb250ZW50KGFCb3gubGluLCBhQm94LmNvbCk7XG5cbiAgICAgICAgICAgIC8vTGxhbWFtb3MgYSBhbmltYXIgZWwgSnVnYWRvciBoYXN0YSBlbCBib3ggc2VsZWNjaW9uYWRvXG4gICAgICAgICAgICBpZiAodGhpcy5fZ2FtZVN0YXRlID09PSBHU19QTEFZX09VVCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllci5qdW1wVG9PdXRzaWRlQm94KGFCb3gpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9nYW1lU3RhdGUgPT09IEdTX1BMQVlfSU4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnNpZGVQbGF5ZXIuanVtcFRvSW5zaWRlQm94KGFCb3gpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0FxdWkgc2UgZWplY3V0YSBpbm1lZGlhdGFtZW50ZSBhdW5xdWUgbm8gaGF5YSB0ZXJtaW5hZG8gbGFcbiAgICAgICAgICAgIC8vYW5pbWFjaW9uIGRlbCBtb3ZpbWllbnRvIGhhY2lhIGVsIGJveFxuICAgICAgICAgICAgLy9MbyBxdWUgZGVzZWVtb3MgcXVlIHNlIGhhZ2EgYWwgZmluIGRlIGxhIGFuaW1hY2lvbiB2YSBlbiBqdW1wRW5kXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYUJveC50aWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgfSxcblxuICAgIHVzZXJCb251c0Nob2ljZTogZnVuY3Rpb24gdXNlckJvbnVzQ2hvaWNlKGlkKSB7XG4gICAgICAgIC8vRWwganVnYWRvciBoYSBzZWxlY2Npb25hZG8gdW4gb2JqZXRvIGFjdGl2byBkZWwgQm9udXMuLi5cblxuICAgIH0sXG5cbiAgICBuZXh0R2FtZVN0ZXA6IGZ1bmN0aW9uIG5leHRHYW1lU3RlcCgpIHtcbiAgICAgICAgLy9BcXVpIGFuYWxpemFtb3MgeSBwcmVwYXJhbW9zIGVsIHByb3hpbW8gcGFzbyBkZWwganVlZ28gYSBsYSBlc3BlcmEgZGVsIHVzZXIuLi5cbiAgICAgICAgc3dpdGNoICh0aGlzLl9nYW1lU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgR1NfUExBWV9PVVQ6XG4gICAgICAgICAgICAgICAgLy9zaSBlc3RhbW9zIGFmdWVyYS4uLlxuICAgICAgICAgICAgICAgIC8vU3VtYW1vcyBsYSBsaW5lYSBhY3RpdmEuLi5cbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVMaW5lKys7XG5cbiAgICAgICAgICAgICAgICAvL01vc3RyYW1vcyBlbCByZXN1bHRhZG8gZGUgbGEgbGluZWEgcXVlIHBhc2Ftb3MuLi4/Pz9cblxuICAgICAgICAgICAgICAgIC8vU2kgdGVybWluYW1vcyBsYSBwaXJhbWlkZSBleHRlcmlvciBleGl0b3NhbWVudGUgcGFzYW1vcyBhIGxhIGVzY2VuYSBkZWwgaW50ZXJpb3JcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlTGluZSA9PT0gNSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BpcmFtaWQuZGVhY3RpdmF0ZUxpbmVzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9oYWNlbW9zIGVsIHNob3cgZGVsIGluZ3Jlc28uLi5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGlyYW1pZC5nb0luc2lkZVNob3coKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXIuanVtcFRvTW91dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9QYXV0YW1vcyBxdWUgZW4gWCB0aWVtcG8gc2UgcGFzZSBhbCBpbnRlcmlvclxuICAgICAgICAgICAgICAgICAgICAvL29jdWx0YW1vcyBsYSBkZWwgb3V0c2lkZS4uLlxuICAgICAgICAgICAgICAgICAgICAvL3BvbmVtb3MgbGEgYW5pbWFjaW9uIGludGVybWVkaWFcbiAgICAgICAgICAgICAgICAgICAgLy9wYXNhbW9zIGFsIG51ZXZvIGVzdGFkbyBkZSBqdWVnb1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMub3V0c2lkZVNjcmVlbi5oaWRlU2NyZWVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5hdWRpb19NdXNpY19UcmFucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ3RyYW5zSW5zaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMudHJhbnNTY3JlZW4uc2hvd1NjcmVlbigpOyB9ICwgNSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpIHsgdGhpcy50cmFuc1NjcmVlbi5oaWRlU2NyZWVuKCk7IHRoaXMucGxheUluc2lkZSgpOyB9ICwgNyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2kgYXVuIHNlZ3VpbW9zIGp1Z2FuZG8gb3V0c2lkZS4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy9JbHVtaW5hbW9zIGxhIG51ZXZhIGxpbmVhLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb3dBY3RpdmVMaW5lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWl0VXNlcklucHV0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9TaSBtdWVyZSB2YW1vcyBhIGVzY2VuYSBmaW5hbFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEdTX1BMQVlfSU46XG4gICAgICAgICAgICAgICAgLy9TdW1hbW9zIGxhIGxpbmVhIGFjdGl2YS4uLlxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUxpbmUrKztcblxuICAgICAgICAgICAgICAgIC8vTW9zdHJhbW9zIGVsIHJlc3VsdGFkbyBkZSBsYSBsaW5lYSBxdWUgcGFzYW1vcy4uLj8/P1xuXG4gICAgICAgICAgICAgICAgLy9TaSB0ZXJtaW5hbW9zIGxhIHBpcmFtaWRlIGV4dGVyaW9yIGV4aXRvc2FtZW50ZSBwYXNhbW9zIGEgbGEgZXNjZW5hIGRlbCBpbnRlcmlvclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVMaW5lID09IDkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNpZGVQaXJhbWlkLmRlYWN0aXZhdGVMaW5lcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaGFjZW1vcyBlbCBzaG93IGRlbCBzYWx0byBhbCBkb2JsZSBvIG5hZGEuLi5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zaWRlUGlyYW1pZC5nZXRJbnRvQ2hhbWJlclNob3coKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnNpZGVQbGF5ZXIuanVtcFRvQ2hhbWJlcigpO1xuICAgICAgICAgICAgICAgICAgICB9LCA0KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICB9LCA3KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL3NpIGF1biBzZWd1aW1vcyBqdWdhbmRvIG91dHNpZGUuLi5cbiAgICAgICAgICAgICAgICAgICAgLy9JbHVtaW5hbW9zIGxhIG51ZXZhIGxpbmVhLi4uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvd0FjdGl2ZUxpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FpdFVzZXJJbnB1dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2kgbXVlcmUgdmFtb3MgYSBlc2NlbmEgZmluYWxcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBHU19QTEFZX0JPTlVTOlxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgR1NfT1ZFUjpcbiAgICAgICAgICAgICAgICAvL1NlIGFjYWJvIGVsIGp1ZWdvLi4uLiAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRVc2VySW5wdXQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vdmVtb3MgZW4gcXVlIGVzdGFkbyBlc3RhYmEgYW50ZXMuLi5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2dhbWVMYXN0U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHU19QTEFZX09VVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2kgZXN0YWJhbW9zIGFmdWVyYS4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGlyYW1pZC5kZWFjdGl2YXRlTGluZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR1NfUExBWV9JTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2kgZXN0YWJhbW9zIGRlbnRyby4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zaWRlUGlyYW1pZC5kZWFjdGl2YXRlTGluZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdvdXRzaWRlJyk7XG4gICAgICAgICAgICAgICAgfSwgNSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxufSk7XG4vL2NhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMmIyMDN1aVdMaEJ0S1RyK05Fdk5jWXEnLCAnUGlyYW1pZCcpO1xuLy8gc2NyaXB0XFxQaXJhbWlkLmpzXG5cbnZhciBUaWNrZXQgPSByZXF1aXJlKFwiVGlja2V0XCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBzY3JvbGxEZWx0YTogNDAsXG4gICAgICAgIGJvdHRvbVN0YXJ0OiAtMzIzLFxuICAgICAgICBib3hEWDogMTQxLFxuICAgICAgICBib3hEWTogMTIyLFxuICAgICAgICBkZWxheTogMC41LFxuICAgICAgICBib3hMYXllcjogY2MuTm9kZSxcbiAgICAgICAgYmFzZUJveDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIF9tYW5hZ2VyOiBudWxsLFxuICAgICAgICBfdGlja2V0OiBudWxsXG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0xvYWQgUGlyYW1pZC4uLicpO1xuICAgICAgICAvL3RoaXMuYVRpY2tldCA9IFRpY2tldDsvLy5nZXRDb21wb25lbnQoJ1RpY2tldCcpO1xuICAgICAgICAvL3RoaXMuYVRpY2tldCA9IHRoaXMuYVRpY2tldC5nZXRDb21wb25lbnQoJ1RpY2tldCcpO1xuICAgICAgICAvL3RoaXMuYmFzZUJveCA9IHRoaXMuYmFzZUJveC5nZXRDb21wb25lbnQoJ0JveCcpO1xuICAgICAgICAvL3RoaXMucmVzZXQoKTtcbiAgICAgICAgLy90aGlzLmJ1aWxkT3V0U2lkZSgpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChnTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9tYW5hZ2VyID0gZ01hbmFnZXI7XG4gICAgfSxcblxuICAgIHNjcm9sbDogZnVuY3Rpb24gc2Nyb2xsKCkge1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLm1vdmVCeSh0aGlzLmRlbGF5LCAwLCB0aGlzLnNjcm9sbERlbHRhKS5lYXNpbmcoY2MuZWFzZUluT3V0KDMuMCkpKTtcbiAgICB9LFxuXG4gICAgc2Nyb2xsSW5zaWRlOiBmdW5jdGlvbiBzY3JvbGxJbnNpZGUoKSB7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MubW92ZUJ5KHRoaXMuZGVsYXksIDAsIHRoaXMuc2Nyb2xsRGVsdGEpLmVhc2luZyhjYy5lYXNlSW5PdXQoMy4wKSkpO1xuICAgIH0sXG5cbiAgICBnb0luc2lkZVNob3c6IGZ1bmN0aW9uIGdvSW5zaWRlU2hvdygpIHtcbiAgICAgICAgLy9lc3RvIGVzIHBhcmEgaGFjZXIgZWwgc2hvdyBkZSBlbnRyYXIgZW4gbGEgYm9jYSBkZSBsYSBwaXJhbWlkZVxuXG4gICAgICAgIC8vc2Nyb2xsIGhhc3RhIHBvc2ljaW9uIGVuIHF1ZSBzZSB2ZWEgbGEgbWFzY2FyYVxuICAgICAgICB2YXIgbW91dGhBbmltID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdvdXNpZGVfbW91dGgnKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcblxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxuICAgICAgICAvL2NjLmRlbGF5VGltZSgxKSwgLy9wYXVzYSBhbnRlcyBkZSBtb3Zlci4uLlxuICAgICAgICBjYy5tb3ZlQnkoMiwgMCwgLTE4MCkuZWFzaW5nKGNjLmVhc2VPdXQoMSkpLFxuICAgICAgICAvL2FicmlyIGxvcyBkaWVudGVzLi4uXG4gICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vdXRoQW5pbS5wbGF5KCdtb3V0aE9wZW4nKTtcbiAgICAgICAgfSwgdGhpcykpKTtcbiAgICB9LFxuXG4gICAgZmFsbGluZ0luc2lkZVNob3c6IGZ1bmN0aW9uIGZhbGxpbmdJbnNpZGVTaG93KCkge1xuICAgICAgICAvL0NhZSBlbCBwZXJzb25hamUgYWwgcHJpbWVyIHJpc2NvXG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlQnkoMS41LCAwLCAzMjApLmVhc2luZyhjYy5lYXNlSW5PdXQoMy4wKSkpO1xuICAgICAgICB9LCAxKTtcbiAgICB9LFxuXG4gICAgZ2V0SW50b0NoYW1iZXJTaG93OiBmdW5jdGlvbiBnZXRJbnRvQ2hhbWJlclNob3coKSB7XG4gICAgICAgIC8vRW50cmEgYWwgY2lsaW5kcm8uLi5cbiAgICAgICAgLy9TY3JvbGxlYW1vcyBwYXJhIHF1ZSBzZSB2ZWEgZWwgY2lsaW5kcm9cbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlQnkoMiwgMCwgMzgwKS5lYXNpbmcoY2MuZWFzZUluT3V0KDMuMCkpKTtcblxuICAgICAgICAvL2FjYSBwcm9ncmFtYXIgcXVlIHNlIGFicmEgZWwgY2lsaW5kcm9cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjaWxpbmRyb1RhcGEnKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCdDaWxpbmRyb1RhcGFBYmFqbycpO1xuICAgICAgICB9LCAyLjUpO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIC8vYWNhIGZhbHRhbiBjb3Nhcy4uLlxuICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMuYm90dG9tU3RhcnQ7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnQm90dG9tU3RhcnQ6ICcgKyB0aGlzLmJvdHRvbVN0YXJ0KVxuICAgIH0sXG5cbiAgICAvL0xlIHBvbmUgZWwgYnJpbGxvIGEgbGEgbGluZWEgcXVlIGxlIHBhc2Ftb3NcbiAgICBhY3RpdmF0ZUxpbmU6IGZ1bmN0aW9uIGFjdGl2YXRlTGluZShhTGluZSkge1xuICAgICAgICAvL3JlY29ycm8gbG9zIGJveGVzIHkgYSBsb3MgcXVlIHNvbiBkZSBsYSBsaW5lYSBsb3MgYW5pbW8uLi5cbiAgICAgICAgZm9yICh2YXIgdkNvbCA9IDA7IHZDb2wgPCAxMCAtIGFMaW5lOyB2Q29sKyspIHtcbiAgICAgICAgICAgIHRoaXMuYm94TGF5ZXIuZ2V0Q2hpbGRCeU5hbWUoJ0JveC0nICsgYUxpbmUgKyAnLScgKyB2Q29sKS5nZXRDb21wb25lbnQoJ0JveCcpLmdsb3coKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZWFjdGl2YXRlTGluZXM6IGZ1bmN0aW9uIGRlYWN0aXZhdGVMaW5lcygpIHtcbiAgICAgICAgLy92YXIgYm94ZXMgPSB0aGlzLmJveExheWVyLmNoaWxkcmVuO1xuICAgICAgICAvL2NjLmxvZygnY2hpbGRyZW5Db3VudDogJysgdGhpcy5ib3hMYXllci5jaGlsZHJlbkNvdW50ICk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ib3hMYXllci5jaGlsZHJlbkNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIC8vY2MubG9nKHRoaXMuYm94TGF5ZXIuY2hpbGRyZW5baV0ubmFtZSk7XG4gICAgICAgICAgICB0aGlzLmJveExheWVyLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudCgnQm94JykudW5HbG93KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy9QYXJhIGRpYnVqYXIgbG9zIGJsb3F1ZXMgZGUgbGEgcGlyYW1pZGUgZGUgQWZ1ZXJhXG4gICAgLy9Tb2xvIHNlIGRpYnVqYW4uLi4gZWwgY29udGVuaWRvIHNlIG9idGllbmUgZW4gdGllbXBvIHJlYWxcbiAgICBkcmF3T3V0c2lkZUJsb2NrczogZnVuY3Rpb24gZHJhd091dHNpZGVCbG9ja3MoKSB7XG4gICAgICAgIC8vbGltcGlvIGxvcyBib3hlcyBzaSBoYWJpYS4uLlxuICAgICAgICB0aGlzLmJveExheWVyLnJlbW92ZUFsbENoaWxkcmVuKCk7XG5cbiAgICAgICAgdmFyIGJXID0gdGhpcy5ib3hEWDtcbiAgICAgICAgdmFyIGJIID0gdGhpcy5ib3hEWTtcblxuICAgICAgICBmb3IgKHZhciB2TGluZWEgPSAwOyB2TGluZWEgPCA1OyB2TGluZWErKykge1xuICAgICAgICAgICAgZm9yICh2YXIgdkNvbCA9IDA7IHZDb2wgPCAxMCAtIHZMaW5lYTsgdkNvbCsrKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYUJveCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmFzZUJveCk7XG4gICAgICAgICAgICAgICAgYUJveCA9IGFCb3guZ2V0Q29tcG9uZW50KCdCb3gnKTtcbiAgICAgICAgICAgICAgICBhQm94Lm5vZGUucGFyZW50ID0gdGhpcy5ib3hMYXllcjsgLy8ubm9kZTtcbiAgICAgICAgICAgICAgICBhQm94Lm5vZGUuekluZGV4ID0gLTEwICogdkxpbmVhOyAvL3NlIG9yZGVuYSBsb3MgZGUgYWJham8gbWFzIGFycmliYSBxdWUgbG9zIG90cm9zLi4uXG5cbiAgICAgICAgICAgICAgICBhQm94Lm5vZGUubmFtZSA9ICdCb3gtJyArIHZMaW5lYSArICctJyArIHZDb2w7XG4gICAgICAgICAgICAgICAgYUJveC5saW4gPSB2TGluZWE7XG4gICAgICAgICAgICAgICAgYUJveC5jb2wgPSB2Q29sO1xuICAgICAgICAgICAgICAgIGFCb3guY29udGVudCA9IG51bGw7IC8vc2UgYXNpZ25hIGx1ZWdvXG4gICAgICAgICAgICAgICAgYUJveC5pc0luc2lkZUJveCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vZWwgY29udGVuaWRvLi4uLiBubyB2YSBtYXMuLi4gZXMgZW4gdGllbXBvIHJlYWxcbiAgICAgICAgICAgICAgICAvL2FCb3guY29udGVudCA9IGFUaWNrZXQuZ2V0T3V0U2lkZUNvbnRlbnQodkxpbmVhLCB2Q29sKTtcbiAgICAgICAgICAgICAgICAvL2RpYnVqYXIuLi5cbiAgICAgICAgICAgICAgICBhQm94Lm5vZGUuc2V0UG9zaXRpb24odkNvbCAqIGJXICsgdkxpbmVhICogYlcgKiAwLjUsIHZMaW5lYSAqIGJIKTtcblxuICAgICAgICAgICAgICAgIC8vbGUgZGFtb3MgZWwgR2FtZU1hbmFnZXJcbiAgICAgICAgICAgICAgICBhQm94LmluaXQodGhpcy5fbWFuYWdlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZHJhd0luc2lkZUJsb2NrczogZnVuY3Rpb24gZHJhd0luc2lkZUJsb2NrcygpIHtcbiAgICAgICAgLy9saW1waW8gbG9zIGJveGVzIHNpIGhhYmlhLi4uXG4gICAgICAgIHRoaXMuYm94TGF5ZXIucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcblxuICAgICAgICB2YXIgYlcgPSB0aGlzLmJveERYO1xuICAgICAgICB2YXIgYkggPSB0aGlzLmJveERZO1xuXG4gICAgICAgIGZvciAodmFyIHZMaW5lYSA9IDU7IHZMaW5lYSA8IDk7IHZMaW5lYSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB2Q29sID0gMDsgdkNvbCA8IDEwIC0gdkxpbmVhOyB2Q29sKyspIHtcblxuICAgICAgICAgICAgICAgIHZhciBhQm94ID0gY2MuaW5zdGFudGlhdGUodGhpcy5iYXNlQm94KTtcbiAgICAgICAgICAgICAgICBhQm94ID0gYUJveC5nZXRDb21wb25lbnQoJ0JveCcpO1xuICAgICAgICAgICAgICAgIGFCb3gubm9kZS5wYXJlbnQgPSB0aGlzLmJveExheWVyOyAvLy5ub2RlO1xuICAgICAgICAgICAgICAgIGFCb3gubm9kZS56SW5kZXggPSAxMCAqIHZMaW5lYTsgLy9zZSBvcmRlbmEgbG9zIGRlIGFiYWpvIG1hcyBhcnJpYmEgcXVlIGxvcyBvdHJvcy4uLlxuXG4gICAgICAgICAgICAgICAgYUJveC5ub2RlLm5hbWUgPSAnQm94LScgKyB2TGluZWEgKyAnLScgKyB2Q29sO1xuICAgICAgICAgICAgICAgIGFCb3gubGluID0gdkxpbmVhO1xuICAgICAgICAgICAgICAgIGFCb3guY29sID0gdkNvbDtcbiAgICAgICAgICAgICAgICBhQm94LmNvbnRlbnQgPSBudWxsOyAvL3NlIGFzaWduYSBsdWVnb1xuICAgICAgICAgICAgICAgIGFCb3guaXNJbnNpZGVCb3ggPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy9kaWJ1amFyLi4uXG4gICAgICAgICAgICAgICAgYUJveC5ub2RlLnNldFBvc2l0aW9uKHZDb2wgKiBiVyArICh2TGluZWEgLSA1KSAqIGJXICogMC41LCAodkxpbmVhIC0gOCkgKiBiSCk7XG5cbiAgICAgICAgICAgICAgICAvL2xlIGRhbW9zIGVsIEdhbWVNYW5hZ2VyXG4gICAgICAgICAgICAgICAgYUJveC5pbml0KHRoaXMuX21hbmFnZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2U0MDdhaUs2UE5Pb29IOStwN0g2Uk9OJywgJ1BsYXllcicpO1xuLy8gc2NyaXB0XFxQbGF5ZXIuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgZGVsdGFTdGVwWDogMTQxLFxuICAgICAgICBkZWx0YVN0ZXBZOiAxMjIsXG4gICAgICAgIGNvbDogMCxcbiAgICAgICAgbGluOiAtMSxcblxuICAgICAgICBpbml0aWFsUG9zOiBjYy52MigwLCAwKSxcblxuICAgICAgICBkaWVOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBpbnNpZGU6IGZhbHNlLFxuXG4gICAgICAgIGF1ZGlvX0p1bXA6IGNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgYXVkaW9fUnVuOiBjYy5BdWRpb0NsaXAsXG4gICAgICAgIGF1ZGlvX0RpZTogY2MuQXVkaW9DbGlwLFxuICAgICAgICBhdWRpb19KdW1wT3ZlcjogY2MuQXVkaW9DbGlwLFxuXG4gICAgICAgIF9tYW5hZ2VyOiBudWxsXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChnTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9tYW5hZ2VyID0gZ01hbmFnZXI7XG4gICAgfSxcblxuICAgIHNldEFuaW1hdGlvbjogZnVuY3Rpb24gc2V0QW5pbWF0aW9uKGFBbmltTmFtZSkge1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShhQW5pbU5hbWUpO1xuICAgIH0sXG5cbiAgICAvL3Jlc2V0OiB2YSBhIGxhIHBvc2ljaW9uIGluaWNpYWwgZGVsIGp1ZWdvXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcblxuICAgICAgICBpZiAodGhpcy5pbnNpZGUpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gdGhpcy5pbml0aWFsUG9zLng7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMuaW5pdGlhbFBvcy55O1xuICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oJ0V4cEluX1N0YW5kJyk7XG4gICAgICAgICAgICB0aGlzLmNvbCA9IDI7XG4gICAgICAgICAgICB0aGlzLmxpbiA9IDQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHRoaXMuaW5pdGlhbFBvcy54IC0gNzg7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMuaW5pdGlhbFBvcy55IC0gMTM7XG5cbiAgICAgICAgICAgIC8vZWwgcHJpbWVyIHNhbHRpdG8uLi5cbiAgICAgICAgICAgIHZhciBhU2FsdG8gPSBjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIC8vY2MubW92ZUJ5KDAsIGNjLnAoIGZpeEFuaW1KdW1wWCwgZml4QW5pbUp1bXBZKSksXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oJ0V4cE91dF9CZWdpbicpO1xuICAgICAgICAgICAgfSwgdGhpcyksIGNjLmRlbGF5VGltZSgxLjYpLCAvL3BhdXNhIHBhcmEgcXVlIHRlcm1pbmUgYW5pbWFjaW9uLi4uXG4gICAgICAgICAgICBjYy5oaWRlKCksIGNjLm1vdmVUbygwLCBjYy5wKHRoaXMuaW5pdGlhbFBvcy54LCB0aGlzLmluaXRpYWxQb3MueSkpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oJ0V4cE91dF9TdGFuZFInKTtcbiAgICAgICAgICAgIH0sIHRoaXMpLCBjYy5zaG93KCkpO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFTYWx0byk7XG4gICAgICAgICAgICAvL3RoaXMubm9kZS54ID0gdGhpcy5pbml0aWFsUG9zLng7XG4gICAgICAgICAgICAvL3RoaXMubm9kZS55ID0gdGhpcy5pbml0aWFsUG9zLnk7XG4gICAgICAgICAgICAvL3RoaXMuc2V0QW5pbWF0aW9uKCdFeHBPdXRfU3RhbmRSJyk7XG4gICAgICAgICAgICB0aGlzLmNvbCA9IDU7XG4gICAgICAgICAgICB0aGlzLmxpbiA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgLy90aGlzLm5vZGUueCA9IHRoaXMuaW5pdGlhbFBvcy54O1xuICAgICAgICAvL3RoaXMubm9kZS55ID0gdGhpcy5pbml0aWFsUG9zLnk7XG5cbiAgICAgICAgLy9sbyBwb25nbyBlbiBlbCBtaXNtbyBlc3BhY2lvIGFsIG5vZG8gZGUgbGEgYW5pbWFjaW9uIGRlIGxhIG11ZXJ0ZS4uLlxuICAgICAgICB0aGlzLmRpZU5vZGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcbiAgICAgICAgdGhpcy5kaWVOb2RlLnpJbmRleCA9IDEwMDsgLy8vQmllbiBhcnJpYmEhISFcblxuICAgICAgICAvL3RoaXMubm9kZS5ydW5BY3Rpb24oIGNjLmZhZGVJbigxKSApO1xuICAgIH0sXG5cbiAgICAvL2p1bXBUb091dHNpZGVCb3g6IEFuaW1hIGVsIHBsYXllciBzYWx0YW5kbyBoYXN0YSBlbCBib3ggaW5ncmVzYWRvXG4gICAganVtcFRvT3V0c2lkZUJveDogZnVuY3Rpb24ganVtcFRvT3V0c2lkZUJveChhQm94KSB7XG5cbiAgICAgICAgLy9hQm94ID0gYUJveC5nZXRDb21wb25lbnQoJ0JveCcpO1xuXG4gICAgICAgIC8vZWwgcGxheWVyIHNhbHRhIGhhc3RhICdzdWJpcnNlJyBhbCBib3hcbiAgICAgICAgdmFyIGRDb2wgPSBhQm94LmNvbCAtIHRoaXMuY29sOyAvL0RlbHRhIENvbFxuICAgICAgICAvL3ZhciBzID0gKGRDb2wgLyBNYXRoLmFicyhkQ29sKSk7IC8vU2lnbm8gZGVsIG1vdmltaWVudG8uLi5cbiAgICAgICAgdmFyIHMgPSBkQ29sIDwgMCA/IC0xIDogMTsgLy9TaWdubyBkZWwgbW92aW1pZW50by4uLlxuICAgICAgICAvL2NjLmxvZygnc2lnbm86ICcgKyBzKTtcbiAgICAgICAgLy9jdWFuZG8gZWwgcGFzbyBlcyBjZXJvIG5vcyB0ZW5lbW9zIHF1ZSBxdWVkYXIgeSBzb2xvIHNhbHRhciBoYWNpYSBsYSBkZXJlY2hhLi4uXG4gICAgICAgIHZhciBzdHJEaXJlY3Rpb24gPSBzIDwgMCA/ICdMJyA6ICdSJztcbiAgICAgICAgdmFyIGlkU2FsdG8gPSBzIDwgMCA/IE1hdGguYWJzKGRDb2wgKyAxKSA6IE1hdGguYWJzKGRDb2wpO1xuICAgICAgICB2YXIgc3RyQW5pbSA9ICdFeHBPdXRfU3RlcCcgKyBzdHJEaXJlY3Rpb24gKyAnX0QnICsgaWRTYWx0bztcblxuICAgICAgICAvL2xhcyBhbmltYWNpb25lcyBubyB0aWVuZW4gZWwgbWlzbW8gdGFtYcOxbyBwb3IgbG8gdGFudG8gY29ycmlqbyBsYSBwb3NpY2nDs24gYW50ZXMgZGVsIHBsYXlcbiAgICAgICAgLy8gICAwLCAgIDEsICAgMiwgICAzLCAgIDQsICAgNSwgICA2LCAgIDcsICAgOFxuICAgICAgICB2YXIgYXJyRml4QW5pbUp1bXBYID0gWzMwLCAxMDksIDE3OCwgMjQ4LCAzMjIsIDM5MywgNDYzLCA1MjksIDYwMF07XG4gICAgICAgIHZhciBhcnJGaXhBbmltSnVtcFkgPSBbLTIsIDEsIDAsIDAsIC02LCAtMTEsIC0xMCwgLTMsIC0yNl07XG5cbiAgICAgICAgdmFyIGZpeEFuaW1KdW1wWCA9IHMgKiBhcnJGaXhBbmltSnVtcFhbaWRTYWx0b107XG4gICAgICAgIHZhciBmaXhBbmltSnVtcFkgPSBhcnJGaXhBbmltSnVtcFlbaWRTYWx0b107XG5cbiAgICAgICAgLy9sZSBwb25nbyB1bmEgYWNjaW9uIHZhY2lhIHBhcmEgcXVlIG5vIGRlIGVycm9yIGx1ZWdvLi4uXG4gICAgICAgIC8vdmFyIHBhc28gPSBjYy5kZWxheVRpbWUoMCk7IC8vZHVtbXkgYWN0aW9uXG4gICAgICAgIHZhciBkaWVBY3QgPSBjYy5kZWxheVRpbWUoMCk7IC8vZHVtbXkgYWN0aW9uXG5cbiAgICAgICAgLy9zaSB0aWVuZSBxdWUgbW9yaXIuLi5cbiAgICAgICAgaWYgKGFCb3guY29udGVudCA9PT0gJ1gnKSB7XG4gICAgICAgICAgICBkaWVBY3QgPSBjYy5zcGF3bihjYy5mYWRlT3V0KDAuMiksIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEaWVBbmltKGFCb3gpO1xuICAgICAgICAgICAgfSwgdGhpcyksIGNjLmRlbGF5VGltZSgxLjIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhU2FsdG8gPSBjYy5zZXF1ZW5jZShcbiAgICAgICAgLy9wYXNvLCAvL2RhIGxvcyBwYXNvcy4uLlxuICAgICAgICAvL0RlamFtb3MgZW4gcG9zaWNpb24gcGFyYSBlbCBqdW1wIGNvbiBjb3JyZWNjaW9uLi4uXG4gICAgICAgIGNjLm1vdmVCeSgwLCBjYy5wKGZpeEFuaW1KdW1wWCwgZml4QW5pbUp1bXBZKSksXG5cbiAgICAgICAgLy9JbmZvcm1hbW9zIGFsIGJveCBwYXJhIHF1ZSByZWFjY2lvbmUuLi4gbGEgcGF1c2EgbGEgaGFjZSBlbCBzaG93Y29udGVudFxuICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhQm94LnNob3dDb250ZW50KCk7XG4gICAgICAgIH0sIGFCb3gpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuYXVkaW9fSnVtcCk7dGhpcy5zZXRBbmltYXRpb24oc3RyQW5pbSk7XG4gICAgICAgIH0sIHRoaXMpLCBjYy5kZWxheVRpbWUoMC44KSwgLy9wYXVzYSBwYXJhIHF1ZSB0ZXJtaW5lIGFuaW1hY2lvbi4uLlxuXG4gICAgICAgIC8vU2kgbXVlcmUuLi5zaW5vIHZpZW5lIGVuIGR1bW15XG4gICAgICAgIGRpZUFjdCxcblxuICAgICAgICAvL2RlamFtb3MgZW4gcG9zaWNpb24gbm9ybWFsIGRlIHN0YW5kLi4uXG4gICAgICAgIC8vY2MubW92ZUJ5KDAsIGNjLnAoIC1maXhBbmltSnVtcFggKyB0aGlzLm5vZGUueCAtIGFCb3gubm9kZS54ICwgLWZpeEFuaW1KdW1wWSArIHRoaXMuZGVsdGFTdGVwWSkgKSxcbiAgICAgICAgY2MubW92ZVRvKDAsIGNjLnAoYUJveC5ub2RlLnggKyA2NiwgYUJveC5ub2RlLnkgKyAxMjUpKSxcblxuICAgICAgICAvL2x1ZWdvIGRlbCBzYWx0byBxdWVkYSBlbiBub3JtYWwgcGFyYWRvLi4uIHNpIG5vIHBhc28gbmFkYS4uLlxuICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEFuaW1hdGlvbignRXhwT3V0X1N0YW5kJyArIHN0ckRpcmVjdGlvbik7XG4gICAgICAgIH0sIHRoaXMpLFxuXG4gICAgICAgIC8vQXZpc2Ftb3MgYWwgbWFuYWdlciBxdWUgdGVybWlubyBlbCBzaG93Li4uXG4gICAgICAgIC8vcGFyYSBxdWUgcmVzcGV0ZSBsYSBzZWN1ZW5jaWEsIGxhIGxsYW1hZGEsICBkZWJlIGVzdGFyIGRlbnRybyBkZSB1bmEgZnVuY2lvblxuICAgICAgICAvL3kgZGVibyBwYXNhcmxlIGVsIHRhcmdldCBwYXJhIHF1ZSB0b21lIGJpZW4gZWwgdGhpcy4uLlxuICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLmp1bXBFbmQoYUJveCk7XG4gICAgICAgIH0sIHRoaXMpKTtcblxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFTYWx0byk7XG5cbiAgICAgICAgLy9sbGVnYW1vcyBhbCBib3guLi5cbiAgICAgICAgdGhpcy5saW4gPSBhQm94LmxpbjtcbiAgICAgICAgdGhpcy5jb2wgPSBhQm94LmNvbDtcbiAgICB9LFxuXG4gICAgLy9qdW1wVG9JbnRzaWRlQm94OiBBbmltYSBlbCBwbGF5ZXIgc2FsdGFuZG8gaGFzdGEgZWwgYm94IGluZ3Jlc2Fkb1xuICAgIGp1bXBUb0luc2lkZUJveDogZnVuY3Rpb24ganVtcFRvSW5zaWRlQm94KGFCb3gpIHtcbiAgICAgICAgLy9lbCBwbGF5ZXIgc2FsdGEgaGFzdGEgJ2NhZXInIGFsIGJveFxuICAgICAgICB2YXIgZENvbCA9IGFCb3guY29sIC0gdGhpcy5jb2w7IC8vRGVsdGEgQ29sXG4gICAgICAgIC8vdmFyIHMgPSAoZENvbCAvIE1hdGguYWJzKGRDb2wpKTsgLy9TaWdubyBkZWwgbW92aW1pZW50by4uLlxuICAgICAgICB2YXIgcyA9IGRDb2wgPCAwID8gLTEgOiAxOyAvL1NpZ25vIGRlbCBtb3ZpbWllbnRvLi4uXG4gICAgICAgIC8vY2MubG9nKCdzaWdubzogJyArIHMpO1xuICAgICAgICAvL2N1YW5kbyBlbCBwYXNvIGVzIGNlcm8gbm9zIHRlbmVtb3MgcXVlIHF1ZWRhciB5IHNvbG8gc2FsdGFyIGhhY2lhIGxhIGRlcmVjaGEuLi5cbiAgICAgICAgdmFyIHN0ckRpcmVjdGlvbiA9IHMgPCAwID8gJ0wnIDogJ1InO1xuICAgICAgICB2YXIgaWRTYWx0byA9IHMgPCAwID8gTWF0aC5hYnMoZENvbCArIDEpIDogTWF0aC5hYnMoZENvbCk7XG4gICAgICAgIHZhciBzdHJBbmltID0gJ0V4cEluX1N0ZXAnICsgc3RyRGlyZWN0aW9uICsgJ19EJyArIGlkU2FsdG87XG5cbiAgICAgICAgLy9sYXMgYW5pbWFjaW9uZXMgbm8gdGllbmVuIGVsIG1pc21vIHRhbWHDsW8gcG9yIGxvIHRhbnRvIGNvcnJpam8gbGEgcG9zaWNpw7NuIGFudGVzIGRlbCBwbGF5XG4gICAgICAgIC8vICAgMCwgICAxLCAgIDIsICAgMyxcbiAgICAgICAgdmFyIGFyckZpeEFuaW1KdW1wWCA9IFs0NSwgMTExLCAxODUsIDI1NF07XG4gICAgICAgIHZhciBhcnJGaXhBbmltSnVtcFkgPSBbLTE0NCwgLTE0MCwgLTEzNiwgLTEzNF07XG5cbiAgICAgICAgdmFyIGZpeEFuaW1KdW1wWCA9IHMgKiAoYXJyRml4QW5pbUp1bXBYW2lkU2FsdG9dICsgMTApO1xuICAgICAgICB2YXIgZml4QW5pbUp1bXBZID0gYXJyRml4QW5pbUp1bXBZW2lkU2FsdG9dICsgMTA7XG5cbiAgICAgICAgdmFyIGZpcnN0SnVtcCA9IHRoaXMubGluID09IDQgPyAtMzYwIDogMDtcbiAgICAgICAgdmFyIGZpcnN0SnVtcERlbGF5ID0gdGhpcy5saW4gPT0gNCA/IDAuMTUgOiAwO1xuXG4gICAgICAgIC8vbGUgcG9uZ28gdW5hIGFjY2lvbiB2YWNpYSBwYXJhIHF1ZSBubyBkZSBlcnJvciBsdWVnby4uLlxuICAgICAgICB2YXIgZGllQWN0ID0gY2MuZGVsYXlUaW1lKDApOyAvL2R1bW15IGFjdGlvblxuXG4gICAgICAgIC8vc2kgdGllbmUgcXVlIG1vcmlyLi4uXG4gICAgICAgIGlmIChhQm94LmNvbnRlbnQgPT09ICdYJykge1xuICAgICAgICAgICAgZGllQWN0ID0gY2Muc3Bhd24oY2MuZmFkZU91dCgwLjIpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RGllQW5pbShhQm94KTtcbiAgICAgICAgICAgIH0sIHRoaXMpLCBjYy5kZWxheVRpbWUoMS4yKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYVNhbHRvID0gY2Muc2VxdWVuY2UoXG4gICAgICAgIC8vRGVqYW1vcyBlbiBwb3NpY2lvbiBwYXJhIGVsIGp1bXAgY29uIGNvcnJlY2Npb24uLi5cbiAgICAgICAgY2MuaGlkZSgpLCBjYy5tb3ZlQnkoMCwgY2MucChmaXhBbmltSnVtcFgsIGZpeEFuaW1KdW1wWSkpLFxuXG4gICAgICAgIC8vSW5mb3JtYW1vcyBhbCBib3ggcGFyYSBxdWUgcmVhY2Npb25lLi4uIGxhIHBhdXNhIGxhIGhhY2UgZWwgc2hvd2NvbnRlbnRcbiAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYUJveC5zaG93Q29udGVudCgpO1xuICAgICAgICB9LCBhQm94KSwgY2Muc3Bhd24oY2Muc2hvdygpLCBjYy5tb3ZlQnkoMC40LCBjYy5wKHMgKiAtMTgsIDApKS5lYXNpbmcoY2MuZWFzZUluKDMuMCkpLCAvL0NvcnJpam8gcG9zaWNpb24gcGFyYSBxdWUgY2FpZ2EgZW4gc3UgbHVnYXJcbiAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmF1ZGlvX0p1bXApO3RoaXMuc2V0QW5pbWF0aW9uKHN0ckFuaW0pO1xuICAgICAgICB9LCB0aGlzKSwgY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuNCksIGNjLm1vdmVCeShmaXJzdEp1bXBEZWxheSwgY2MucCgwLCBmaXJzdEp1bXApKS5lYXNpbmcoY2MuZWFzZUluKDMuMCkpKSksIGNjLmRlbGF5VGltZSgwLjQgKyBmaXJzdEp1bXBEZWxheSksIC8vcGF1c2EgcGFyYSBxdWUgdGVybWluZSBhbmltYWNpb24uLi5cblxuICAgICAgICAvL1NpIG11ZXJlLi4uc2lubyB2aWVuZSBlbiBkdW1teVxuICAgICAgICBkaWVBY3QsXG5cbiAgICAgICAgLy9kZWphbW9zIGVuIHBvc2ljaW9uIG5vcm1hbCBkZSBzdGFuZC4uLlxuICAgICAgICAvL2NjLm1vdmVUbygwLCBjYy5wKCBhQm94Lm5vZGUueCArIDY2LCBhQm94Lm5vZGUueSArIDEyNSApICksXG4gICAgICAgIGNjLm1vdmVUbygwLCBjYy5wKGFCb3gubm9kZS54ICsgNjYsIGFCb3gubm9kZS55ICsgMTM1KSksXG5cbiAgICAgICAgLy9sdWVnbyBkZWwgc2FsdG8gcXVlZGEgZW4gbm9ybWFsIHBhcmFkby4uLiBzaSBubyBwYXNvIG5hZGEuLi5cbiAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oJ0V4cEluX1N0YW5kJyk7XG4gICAgICAgIH0sIHRoaXMpLFxuXG4gICAgICAgIC8vQXZpc2Ftb3MgYWwgbWFuYWdlciBxdWUgdGVybWlubyBlbCBzaG93Li4uXG4gICAgICAgIC8vcGFyYSBxdWUgcmVzcGV0ZSBsYSBzZWN1ZW5jaWEsIGxhIGxsYW1hZGEsICBkZWJlIGVzdGFyIGRlbnRybyBkZSB1bmEgZnVuY2lvblxuICAgICAgICAvL3kgZGVibyBwYXNhcmxlIGVsIHRhcmdldCBwYXJhIHF1ZSB0b21lIGJpZW4gZWwgdGhpcy4uLlxuICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLmp1bXBFbmQoYUJveCk7XG4gICAgICAgIH0sIHRoaXMpKTtcblxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFTYWx0byk7XG5cbiAgICAgICAgLy9sbGVnYW1vcyBhbCBib3guLi5cbiAgICAgICAgdGhpcy5saW4gPSBhQm94LmxpbjtcbiAgICAgICAgdGhpcy5jb2wgPSBhQm94LmNvbDtcbiAgICB9LFxuXG4gICAgLy9tb3ZlVG9Cb3g6IEFuaW1hIGVsIHBsYXllciBoYXN0YSBlbCBib3ggaW5ncmVzYWRvXG4gICAgLy9zZSB1c2EgcGFyYSBsYSBwaXJhbWlkZSBvdXRzaWRlXG4gICAgbW92ZVRvQm94OiBmdW5jdGlvbiBtb3ZlVG9Cb3goYUJveCkge1xuXG4gICAgICAgIC8vYUJveCA9IGFCb3guZ2V0Q29tcG9uZW50KCdCb3gnKTtcblxuICAgICAgICAvL2VsIHBsYXllciB0aWVuZSBxdWUgY29ycmVyIGhhc3RhICdzdWJpcnNlJyBhbCBib3hcbiAgICAgICAgdmFyIGRDb2wgPSBhQm94LmNvbCAtIHRoaXMuY29sO1xuICAgICAgICB2YXIgcyA9IGRDb2wgLyBNYXRoLmFicyhkQ29sKTtcblxuICAgICAgICAvL2N1YW5kbyBlbCBwYXNvIGVzIGNlcm8gbm9zIHRlbmVtb3MgcXVlIHF1ZWRhciB5IHNvbG8gc2FsdGFyLi4uXG4gICAgICAgIHZhciBzdHJBbmltID0gcyA8IDAgPyAnRXhwbG9yZXJTdGVwTCcgOiAnRXhwbG9yZXJTdGVwUic7XG4gICAgICAgIC8vdmFyIHN0ckFuaW1KdW1wID0gKCBkQ29sIDw9IDAgKSA/ICdFeHBsb3JlclN0ZXBMJyA6ICdFeHBsb3JlclN0ZXBSJztcblxuICAgICAgICAvL2xhcyBhbmltYWNpb25lcyBubyB0aWVuZW4gZWwgbWlzbW8gdGFtYcOxbyBwb3IgbG8gdGFudG8gY29ycmlqbyBsYVxuICAgICAgICAvL3Bvc2ljacOzbiBhbnRlcyBkZWwgcGxheVxuICAgICAgICB2YXIgZml4QW5pbVBhc29YID0gMDtcbiAgICAgICAgaWYgKGRDb2wgPiAwKSB7XG4gICAgICAgICAgICBmaXhBbmltUGFzb1ggPSA3MTtcbiAgICAgICAgfSBlbHNlIGlmIChkQ29sIDwgMCkge1xuICAgICAgICAgICAgZml4QW5pbVBhc29YID0gLTcxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sZSBwb25nbyB1bmEgYWNjaW9uIHZhY2lhIHBhcmEgcXVlIG5vIGRlIGVycm9yIGx1ZWdvLi4uXG4gICAgICAgIHZhciBwYXNvID0gY2MuZGVsYXlUaW1lKDApOyAvL2R1bW15IGFjdGlvblxuICAgICAgICB2YXIgZGllQWN0ID0gY2MuZGVsYXlUaW1lKDApOyAvL2R1bW15IGFjdGlvblxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0NvbnRlbmlkbyBkZWwgQm94IGhhY2lhIGVsIHF1ZSBjb3JyZTogJyArIGFCb3guY29udGVudCk7XG5cbiAgICAgICAgLy9zaSB0aWVuZSBxdWUgbW9yaXIuLi5cbiAgICAgICAgaWYgKGFCb3guY29udGVudCA9PT0gJ1gnKSB7XG4gICAgICAgICAgICBkaWVBY3QgPSBjYy5zcGF3bihjYy5mYWRlT3V0KDAuMiksXG4gICAgICAgICAgICAvL2NjLmhpZGUoKSxcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEaWVBbmltKGFCb3gpO1xuICAgICAgICAgICAgfSwgdGhpcyksIGNjLmRlbGF5VGltZSgxLjIpXG4gICAgICAgICAgICAvL2NjLmNhbGxGdW5jKCB0aGlzLnNob3dEaWVBbmltLCBhQm94IClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1NpIG1vdmVtb3MuLi5cbiAgICAgICAgaWYgKGRDb2wgIT09IDApIHtcbiAgICAgICAgICAgIHBhc28gPSBjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIC8vY29ycmVnaW1vcyBsYSBwb3NpY2lvbiBwb3IgbGEgYW5pbWFjaW9uIGRlbCBwYXNvLi4uXG4gICAgICAgICAgICAvL2NjLm1vdmVCeSgwLCBjYy5wKCBmaXhBbmltUGFzb1gsIGZpeEFuaW1QYXNvWSApKSxcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLCBjYy5wKGZpeEFuaW1QYXNvWCwgMCkpLCBjYy5zZXF1ZW5jZShjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oc3RyQW5pbSk7XG4gICAgICAgICAgICB9LCB0aGlzKSwgY2MuZGVsYXlUaW1lKDAuMyksIC8vUGF1c2EgcGFyYSBxdWUgc2UgY29tcGxldGUgYW5pbWFjacOzbi4uLlxuICAgICAgICAgICAgLy95IGx1ZWdvIG1vdmVtb3MgZWwgbm9kbyBpbm1lZGlhdGFtZW50ZS4uLlxuICAgICAgICAgICAgY2MubW92ZUJ5KDAsIGNjLnAocyAqIHRoaXMuZGVsdGFTdGVwWCwgMCkpKS5yZXBlYXQoTWF0aC5hYnMoZENvbCkpLCAvL3NlIHJlcGl0ZSBsYSBjYW50aWRhZCBkZSBwYXNvcyBxdWUgdGllbmUgcXVlIGRhci4uLlxuICAgICAgICAgICAgY2MubW92ZUJ5KDAsIGNjLnAoLWZpeEFuaW1QYXNvWCwgMCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaXhBbmltSnVtcFggPSA0NztcblxuICAgICAgICB2YXIgYVNhbHRvID0gY2Muc2VxdWVuY2UocGFzbywgLy9kYSBsb3MgcGFzb3MuLi5cbiAgICAgICAgLy9EZWphbW9zIGVuIHBvc2ljaW9uIHBhcmEgZWwganVtcCBjb24gY29ycmVjY2lvbi4uLlxuICAgICAgICBjYy5tb3ZlQnkoMCwgY2MucChmaXhBbmltSnVtcFgsIDApKSxcblxuICAgICAgICAvL0luZm9ybWFtb3MgYWwgYm94IHBhcmEgcXVlIHJlYWNjaW9uZS4uLlxuICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhQm94LnNob3dDb250ZW50KCk7XG4gICAgICAgIH0sIGFCb3gpLFxuXG4gICAgICAgIC8vYW5pbWFtb3MgZWwgc2FsdG8uLi5cbiAgICAgICAgY2Muc3Bhd24oXG4gICAgICAgIC8vYWp1c3RhbW9zIHBhcmEgcXVlIGNhaWdhIGVuIGVsIGx1Z2FyIGNvcnJlY3RvXG4gICAgICAgIGNjLm1vdmVCeSgwLjIsIGNjLnAoLTQsIDE2KSkuZWFzaW5nKGNjLmVhc2VJbigzLjApKSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmF1ZGlvX0p1bXApO3RoaXMuc2V0QW5pbWF0aW9uKCdFeHBsb3Jlckp1bXBVcCcpO1xuICAgICAgICB9LCB0aGlzKSksIGNjLmRlbGF5VGltZSgwLjQyKSwgLy9wYXVzYSBwYXJhIHF1ZSB0ZXJtaW5lIGFuaW1hY2lvbi4uLlxuXG4gICAgICAgIC8vU2kgbXVlcmUuLi5zaW5vIHZpZW5lIGVuIGR1bW15XG4gICAgICAgIGRpZUFjdCxcblxuICAgICAgICAvL2RlamFtb3MgZW4gcG9zaWNpb24gbm9ybWFsIGRlIHN0YW5kLi4uXG4gICAgICAgIGNjLm1vdmVCeSgwLCBjYy5wKC1maXhBbmltSnVtcFggKyA0LCAtMTYpKSxcbiAgICAgICAgLy9sbyBoYWNlbW9zIHN1YmlyLCB5IHNpZW1wcmUgKHBvciBhaG9yYSkgbXVldmUgYSBsYSBkZXJlY2hhLCBvIHNlYSBzYWx0YSBkZXNkZSBsYSBpenF1aWVyZGEuLi5cbiAgICAgICAgY2MubW92ZUJ5KDAsIGNjLnAodGhpcy5kZWx0YVN0ZXBYIC8gMiwgdGhpcy5kZWx0YVN0ZXBZKSksXG5cbiAgICAgICAgLy9sdWVnbyBkZWwgc2FsdG8gcXVlZGEgZW4gbm9ybWFsIHBhcmFkby4uLiBzaSBubyBwYXNvIG5hZGEuLi5cbiAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oJ0V4cGxvcmVyU3RhbmQnKTtcbiAgICAgICAgfSwgdGhpcyksXG5cbiAgICAgICAgLy9BdmlzYW1vcyBhbCBtYW5hZ2VyIHF1ZSB0ZXJtaW5vIGVsIHNob3cuLi5cbiAgICAgICAgLy9wYXJhIHF1ZSByZXNwZXRlIGxhIHNlY3VlbmNpYSwgbGEgbGxhbWFkYSwgIGRlYmUgZXN0YXIgZGVudHJvIGRlIHVuYSBmdW5jaW9uXG4gICAgICAgIC8veSBkZWJvIHBhc2FybGUgZWwgdGFyZ2V0IHBhcmEgcXVlIHRvbWUgYmllbiBlbCB0aGlzLi4uXG4gICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuanVtcEVuZChhQm94KTtcbiAgICAgICAgfSwgdGhpcykpO1xuXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYVNhbHRvKTtcblxuICAgICAgICAvL2xsZWdhbW9zIGFsIGJveC4uLlxuICAgICAgICB0aGlzLmxpbiA9IGFCb3gubGluO1xuICAgICAgICB0aGlzLmNvbCA9IGFCb3guY29sO1xuICAgIH0sXG5cbiAgICBtb3ZlVG9JbnNpZGVCb3g6IGZ1bmN0aW9uIG1vdmVUb0luc2lkZUJveChhQm94KSB7XG5cbiAgICAgICAgYUJveCA9IGFCb3guZ2V0Q29tcG9uZW50KCdCb3gnKTtcblxuICAgICAgICAvL2VsIHBsYXllciB0aWVuZSBxdWUgY29ycmVyIGhhc3RhICdCQUpBUicgYWwgYm94XG4gICAgICAgIHZhciBkQ29sID0gYUJveC5jb2wgLSB0aGlzLmNvbDsgLy9kZWx0YSBDb2xcbiAgICAgICAgdmFyIHMgPSBkQ29sIC8gTWF0aC5hYnMoZENvbCk7IC8vc2lnbm9cblxuICAgICAgICAvL0N1YW5kbyBlbCBwYXNvIGVzIG1heW9yIGEgY2VybyBzYWx0YW1vcyBhIGxhIERlcmVjaGEuLi5cbiAgICAgICAgLy9DdWFuZG8gZWwgcGFzbyBlcyBtZW5vciBvIGlndWFsICBjZXJvIHNhbHRhbW9zIGEgbGEgSXpxdWllcmRhLi4uXG4gICAgICAgIHZhciBzdHJBbmltID0gcyA8IDAgPyAnRXhwbG9yZXJJbnNpZGVTdGVwTCcgOiAnRXhwbG9yZXJJbnNpZGVTdGVwUic7XG4gICAgICAgIHZhciBzdHJBbmltSnVtcCA9ICdFeHBsb3Jlckluc2lkZVN0ZXBEb3duJztcbiAgICAgICAgLy92YXIgc3RyQW5pbUp1bXAgPSAoIGRDb2wgPCAwICkgPyAnRXhwbG9yZXJJbnNpZGVTdGVwRG93bkxlZnQnIDogJ0V4cGxvcmVySW5zaWRlU3RlcERvd24nO1xuXG4gICAgICAgIC8vbGUgcG9uZ28gdW5hIGFjY2lvbiB2YWNpYSBwYXJhIHF1ZSBubyBkZSBlcnJvciBsdWVnby4uLlxuICAgICAgICB2YXIgcGFzbyA9IGNjLmRlbGF5VGltZSgwKTsgLy9kdW1teSBhY3Rpb25cbiAgICAgICAgdmFyIGRpZUFjdCA9IGNjLmRlbGF5VGltZSgwKTsgLy9kdW1teSBhY3Rpb25cblxuICAgICAgICAvL3NpIHRpZW5lIHF1ZSBtb3Jpci4uLlxuICAgICAgICBpZiAoYUJveC5jb250ZW50ID09PSAnWCcpIHtcbiAgICAgICAgICAgIGRpZUFjdCA9IGNjLnNwYXduKGNjLmZhZGVPdXQoMC4xKSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0RpZUFuaW0oYUJveCk7XG4gICAgICAgICAgICB9LCB0aGlzKSwgY2MuZGVsYXlUaW1lKDEuMikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sYXMgYW5pbWFjaW9uZXMgbm8gdGllbmVuIGVsIG1pc21vIHRhbWHDsW8gcG9yIGxvIHRhbnRvIGNvcnJpam8gbGFcbiAgICAgICAgLy9wb3NpY2nDs24gYW50ZXMgZGVsIHBsYXlcbiAgICAgICAgdmFyIGZpeEFuaW1QYXNvWCA9IDA7XG4gICAgICAgIGlmIChkQ29sID4gMCkge1xuICAgICAgICAgICAgZml4QW5pbVBhc29YID0gLTM5O1xuICAgICAgICB9IGVsc2UgaWYgKGRDb2wgPCAwKSB7XG4gICAgICAgICAgICBmaXhBbmltUGFzb1ggPSAtMjI5O1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaXhBbmltUGFzb1kgPSAtNTA7XG5cbiAgICAgICAgLy9TaSBtb3ZlbW9zLi4uXG4gICAgICAgIGlmIChkQ29sICE9PSAwKSB7XG4gICAgICAgICAgICBwYXNvID0gY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAvL2NvcnJlZ2ltb3MgbGEgcG9zaWNpb24gcG9yIGxhIGFuaW1hY2lvbiBkZWwgcGFzby4uLlxuICAgICAgICAgICAgY2MubW92ZUJ5KDAsIGNjLnAoZml4QW5pbVBhc29YLCBmaXhBbmltUGFzb1kpKSwgY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAvL2hhY2Vtb3MgYW5pbWFjaW9uIGRlbCBzYWx0by9wYXNvIGxhdGVyYWxcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFuaW1hdGlvbihzdHJBbmltKTtcbiAgICAgICAgICAgIH0sIHRoaXMpLCBjYy5kZWxheVRpbWUoMC4zKSwgLy9QYXVzYSBwYXJhIHF1ZSBzZSBjb21wbGV0ZSBhbmltYWNpw7NuLi4uXG4gICAgICAgICAgICAvL3kgbHVlZ28gbW92ZW1vcyBlbCBub2RvIGlubWVkaWF0YW1lbnRlLi4uXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMCwgY2MucChzICogdGhpcy5kZWx0YVN0ZXBYLCAwKSkpLnJlcGVhdChNYXRoLmFicyhkQ29sKSksIC8vc2UgcmVwaXRlIGxhIGNhbnRpZGFkIGRlIHBhc29zIHF1ZSB0aWVuZSBxdWUgZGFyLi4uXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMCwgY2MucCgtZml4QW5pbVBhc29YLCAtZml4QW5pbVBhc29ZKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpeEFuaW1KdW1wWCA9IC05O1xuICAgICAgICAvL2lmICggZENvbCA+IDAgKSB7IGZpeEFuaW1KdW1wWCA9IC05OyB9IGVsc2UgeyBmaXhBbmltSnVtcFggPSAtOTU7IH1cbiAgICAgICAgdmFyIGZpeEFuaW1KdW1wWSA9IC0xNDU7XG5cbiAgICAgICAgdmFyIGZpcnN0SnVtcCA9IHRoaXMubGluID09IDQgPyAtMzYwIDogMDtcbiAgICAgICAgdmFyIGZpcnN0SnVtcERlbGF5ID0gdGhpcy5saW4gPT0gNCA/IDAuMTIgOiAwO1xuXG4gICAgICAgIHZhciBhU2FsdG8gPSBjYy5zZXF1ZW5jZShwYXNvLCAvL2RhIGxvcyBwYXNvcy4uLiBzaSBoYXlcbiAgICAgICAgLy9EZWphbW9zIGVuIHBvc2ljaW9uIHBhcmEgZWwganVtcCBjb24gY29ycmVjY2lvbi4uLlxuICAgICAgICBjYy5tb3ZlQnkoMCwgY2MucChmaXhBbmltSnVtcFgsIGZpeEFuaW1KdW1wWSkpLFxuXG4gICAgICAgIC8vSW5mb3JtYW1vcyBhbCBib3ggcGFyYSBxdWUgcmVhY2Npb25lLi4uIEhheSBxdWUgcHJvZ3JhbWFyIGVsIHRpbWluZ1xuICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhQm94LnNob3dDb250ZW50KCk7XG4gICAgICAgIH0sIGFCb3gpLFxuXG4gICAgICAgIC8vYW5pbWFtb3MgZWwgc2FsdG8uLi5cbiAgICAgICAgY2Muc3Bhd24oY2MubW92ZUJ5KDAuMiArIGZpcnN0SnVtcERlbGF5LCBjYy5wKC05LCAxNSArIGZpcnN0SnVtcCkpLmVhc2luZyhjYy5lYXNlSW4oMy4wKSksIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5hdWRpb19KdW1wKTt0aGlzLnNldEFuaW1hdGlvbihzdHJBbmltSnVtcCk7XG4gICAgICAgIH0sIHRoaXMpKSwgY2MuZGVsYXlUaW1lKDAuMjIgKyBmaXJzdEp1bXBEZWxheSksIC8vcGF1c2EgcGFyYSBxdWUgdGVybWluZSBhbmltYWNpb24uLi5cblxuICAgICAgICAvL1NpIG11ZXJlLi4uc2lubyB2aWVuZSBlbiBkdW1teVxuICAgICAgICBkaWVBY3QsXG5cbiAgICAgICAgLy9kZWphbW9zIGVuIHBvc2ljaW9uIG5vcm1hbCBkZSBzdGFuZC4uLlxuICAgICAgICBjYy5tb3ZlQnkoMCwgY2MucCgtZml4QW5pbUp1bXBYICsgOSwgLWZpeEFuaW1KdW1wWSAtIDE1KSksXG5cbiAgICAgICAgLy9sbyBoYWNlbW9zIGJhamFyLCB5IHNpZW1wcmUgKHBvciBhaG9yYSkgbXVldmUgYSBsYSBkZXJlY2hhLCBvIHNlYSBzYWx0YSBkZXNkZSBsYSBpenF1aWVyZGEuLi5cbiAgICAgICAgY2MubW92ZUJ5KDAsIGNjLnAodGhpcy5kZWx0YVN0ZXBYIC8gMiwgdGhpcy5kZWx0YVN0ZXBZKSksXG5cbiAgICAgICAgLy9sdWVnbyBkZWwgc2FsdG8gcXVlZGEgZW4gbm9ybWFsIHBhcmFkby4uLiBzaSBubyBwYXNvIG5hZGEuLi5cbiAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oJ0V4cGxvcmVySW5zaWRlU3RhbmQnKTtcbiAgICAgICAgfSwgdGhpcyksXG5cbiAgICAgICAgLy9BdmlzYW1vcyBhbCBtYW5hZ2VyIHF1ZSB0ZXJtaW5vIGVsIHNob3cuLi5cbiAgICAgICAgLy9wYXJhIHF1ZSByZXNwZXRlIGxhIHNlY3VlbmNpYSwgbGEgbGxhbWFkYSwgIGRlYmUgZXN0YXIgZGVudHJvIGRlIHVuYSBmdW5jaW9uXG4gICAgICAgIC8veSBkZWJvIHBhc2FybGUgZWwgdGFyZ2V0IHBhcmEgcXVlIHRvbWUgYmllbiBlbCB0aGlzLi4uXG4gICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuanVtcEVuZChhQm94KTtcbiAgICAgICAgfSwgdGhpcykpO1xuXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYVNhbHRvKTtcblxuICAgICAgICAvL2xsZWdhbW9zIGFsIGJveC4uLlxuICAgICAgICB0aGlzLmxpbiA9IGFCb3gubGluO1xuICAgICAgICB0aGlzLmNvbCA9IGFCb3guY29sO1xuICAgIH0sXG5cbiAgICBqdW1wVG9DaGFtYmVyOiBmdW5jdGlvbiBqdW1wVG9DaGFtYmVyKCkge1xuICAgICAgICAvL3F1ZSBzYWx0ZSBhbCBjaWxpbmRyby4uLlxuICAgICAgICB2YXIgc3RyRGlyZWN0aW9uID0gdGhpcy5jb2wgPT0gMCA/ICdSJyA6ICdMJztcbiAgICAgICAgdmFyIHhGaXggPSB0aGlzLmNvbCA9PSAwID8gMzggOiAtMzg7XG5cbiAgICAgICAgdmFyIGFTYWx0byA9IGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLCBjYy5wKHhGaXgsIC03MDApKSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oJ0V4cEluX0VuZEp1bXAnICsgc3RyRGlyZWN0aW9uKTtcbiAgICAgICAgfSwgdGhpcyksIGNjLm1vdmVCeSgwLCBjYy5wKDAsIC01MCkpKTtcblxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFTYWx0byk7XG4gICAgfSxcblxuICAgIGp1bXBUb01vdXRoOiBmdW5jdGlvbiBqdW1wVG9Nb3V0aCgpIHtcbiAgICAgICAgLy9xdWUgc2FsdGUgYSBsYSBib2NhIGRlIGxhIHBpcmFtaWRlLi4uXG4gICAgICAgIC8vbG8gaGFjZW1vcyBjb3JyZXIgaGFzdGEgZWwgbWVkaW8uLi4gbyBzZWEgbGEgY29sdW1uYSAyXG4gICAgICAgIC8vZWwgcGxheWVyIHRpZW5lIHF1ZSBjb3JyZXIgaGFzdGEgJ3N1Ymlyc2UnIGFsIGJveFxuICAgICAgICB2YXIgZENvbCA9IDIgLSB0aGlzLmNvbDtcbiAgICAgICAgdmFyIHMgPSBkQ29sIC8gTWF0aC5hYnMoZENvbCk7XG4gICAgICAgIC8vY3VhbmRvIGVsIHBhc28gZXMgY2VybyBub3MgdGVuZW1vcyBxdWUgcXVlZGFyIHkgc29sbyBzYWx0YXIuLi5cbiAgICAgICAgdmFyIHN0ckFuaW0gPSBzIDwgMCA/ICdFeHBsb3JlclN0ZXBMJyA6ICdFeHBsb3JlclN0ZXBSJztcbiAgICAgICAgLy9sYXMgYW5pbWFjaW9uZXMgbm8gdGllbmVuIGVsIG1pc21vIHRhbWHDsW8gcG9yIGxvIHRhbnRvIGNvcnJpam8gbGFcbiAgICAgICAgLy9wb3NpY2nDs24gYW50ZXMgZGVsIHBsYXlcbiAgICAgICAgdmFyIGZpeEFuaW1QYXNvWCA9IDA7XG4gICAgICAgIGlmIChkQ29sID4gMCkge1xuICAgICAgICAgICAgZml4QW5pbVBhc29YID0gNzE7XG4gICAgICAgIH0gZWxzZSBpZiAoZENvbCA8IDApIHtcbiAgICAgICAgICAgIGZpeEFuaW1QYXNvWCA9IC03MTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXNvID0gY2MuZGVsYXlUaW1lKDApOyAvL2R1bW15IGFjdGlvblxuXG4gICAgICAgIGlmIChkQ29sICE9PSAwKSB7XG4gICAgICAgICAgICBwYXNvID0gY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAvL2NvcnJlZ2ltb3MgbGEgcG9zaWNpb24gcG9yIGxhIGFuaW1hY2lvbiBkZWwgcGFzby4uLlxuICAgICAgICAgICAgY2MubW92ZUJ5KDAsIGNjLnAoZml4QW5pbVBhc29YLCAwKSksIGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgLy9oYWNlbW9zIGFuaW1hY2lvbiBkZWwgc2FsdG8vcGFzbyBsYXRlcmFsXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oc3RyQW5pbSk7XG4gICAgICAgICAgICB9LCB0aGlzKSwgY2MuZGVsYXlUaW1lKDAuMyksIC8vUGF1c2EgcGFyYSBxdWUgc2UgY29tcGxldGUgYW5pbWFjacOzbi4uLlxuICAgICAgICAgICAgLy95IGx1ZWdvIG1vdmVtb3MgZWwgbm9kbyBpbm1lZGlhdGFtZW50ZS4uLlxuICAgICAgICAgICAgY2MubW92ZUJ5KDAsIGNjLnAocyAqIHRoaXMuZGVsdGFTdGVwWCwgMCkpKS5yZXBlYXQoTWF0aC5hYnMoZENvbCkpLCAvL3NlIHJlcGl0ZSBsYSBjYW50aWRhZCBkZSBwYXNvcyBxdWUgdGllbmUgcXVlIGRhci4uLlxuICAgICAgICAgICAgY2MubW92ZUJ5KDAsIGNjLnAoLWZpeEFuaW1QYXNvWCwgMCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhU2FsdG8gPSBjYy5zZXF1ZW5jZShwYXNvLCBjYy5tb3ZlQnkoMCwgY2MucCg0MCwgLTQpKSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oJ0V4cE91dF9KdW1wSG9sZScpO1xuICAgICAgICB9LCB0aGlzKSwgY2MubW92ZUJ5KDAuNSwgY2MucCg4LCAtNSkpLCBjYy5kZWxheVRpbWUoMC42KSwgY2MuZmFkZU91dCgwLjIpKTtcblxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFTYWx0byk7XG4gICAgfSxcblxuICAgIC8vc2hvd0RpZUFuaW06IEVqZWN1dGEgYW5pbWFjaW9uIGRlbCBhbmdlbCBzb2JyZSBlbCBib3ggaW5ncmVzYWRvXG4gICAgc2hvd0RpZUFuaW06IGZ1bmN0aW9uIHNob3dEaWVBbmltKGFCb3gpIHtcblxuICAgICAgICB2YXIgZHRpbWUgPSB0aGlzLmluc2lkZSA9PT0gdHJ1ZSA/IDAuMiA6IDA7XG5cbiAgICAgICAgdmFyIGRpZUFjdCA9IGNjLnNlcXVlbmNlKFxuICAgICAgICAvL3BhdXNhLi4uXG4gICAgICAgIGNjLmRlbGF5VGltZShkdGltZSksXG4gICAgICAgIC8vbG8gbW92ZW1vcyBoYXN0YSBlbCBsdWdhciBkb25kZSBkZWJlIGFwYXJlY2VyXG4gICAgICAgIGNjLm1vdmVUbygwLCBjYy5wKGFCb3gubm9kZS54LCBhQm94Lm5vZGUueSArIDEwMCkpLFxuICAgICAgICAvL2NjLm1vdmVUbygwLCBjYy5wKHdQb3MueCwgd1Bvcy55KSApLFxuICAgICAgICAvL2xvIG1vc3RyYW1vc1xuICAgICAgICBjYy5mYWRlSW4oMCksXG4gICAgICAgIC8vYW5pbWFtb3NcbiAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmF1ZGlvX0RpZSk7XG4gICAgICAgIH0sIHRoaXMpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCdEaWUnKTtcbiAgICAgICAgfSwgdGhpcy5kaWVOb2RlKSxcbiAgICAgICAgLy9vY3VsdGFtb3NcbiAgICAgICAgY2MuZGVsYXlUaW1lKDEuOCksIGNjLmZhZGVPdXQoMC4wNSlcbiAgICAgICAgLy9jYy5oaWRlKClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmRpZU5vZGUucnVuQWN0aW9uKGRpZUFjdCk7XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzUwODBiNkhod0pBZTd5OXpwY2lKbVVHJywgJ1N1YlNjZW5lJyk7XG4vLyBzY3JpcHRcXFN1YlNjZW5lLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvL0Fzb2NpYXIgYWwgbm9kbyBwYWRyZSBkZSB0b2RhIGxhIFN1YlNjZW5lLi4uXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuaGlkZVNjcmVlbigpO1xuICAgIH0sXG5cbiAgICBzaG93U2NyZWVuOiBmdW5jdGlvbiBzaG93U2NyZWVuKCkge1xuXG4gICAgICAgIHRoaXMubm9kZS54ID0gMDtcbiAgICAgICAgdGhpcy5ub2RlLnkgPSAwO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbigwLjUpKTtcbiAgICB9LFxuXG4gICAgaGlkZVNjcmVlbjogZnVuY3Rpb24gaGlkZVNjcmVlbigpIHtcbiAgICAgICAgLy90aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC41KSwgY2MubW92ZUJ5KDAsIC0zMDAwLCAwKSkpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVPdXQoMC41KSk7XG4gICAgICAgIHRoaXMubm9kZS54ID0gLTMwMDA7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdjZjc2MnZ6SzJaSGY3bUpUUVpLZTNaRicsICdUaWNrZXQnKTtcbi8vIHNjcmlwdFxcVGlja2V0LmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIGJhc2VCb3g6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuXG4gICAgICAgIGljb25UcmFwOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgICAgICB9LFxuXG4gICAgICAgIGljb25Cb251czoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcblxuICAgICAgICBfbWFuYWdlcjogbnVsbCxcbiAgICAgICAgX01hcDogJ2dlbmVyYXRlISdcblxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChnTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9tYW5hZ2VyID0gZ01hbmFnZXI7XG4gICAgfSxcblxuICAgIC8vZ2VuZXJhciB1biB0aWNrZXQgYWxlYXRvcmlhbWVudGVcbiAgICBnZW5lcmF0ZTogZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG4gICAgICAgIHRoaXMuX291dHNpZGVNYXAgPSBbXTtcblxuICAgICAgICB2YXIgdkJvbnVzTGluZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICsgMTtcbiAgICAgICAgdmFyIHZCb251c0NvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5IC0gdkJvbnVzTGluZSkpO1xuXG4gICAgICAgIC8vR2VuZXJhciBlbCBvdXRzaWRlTWFwLi4uXG4gICAgICAgIGZvciAodmFyIHZMaW5lID0gMDsgdkxpbmUgPCA5OyB2TGluZSsrKSB7XG5cbiAgICAgICAgICAgIHZhciB2TG9zZSA9IDE7IC8vKCgxMCAtIHZMaW5lKSAvIDUpICsgMTtcbiAgICAgICAgICAgIHZhciB2Q29udGVudExpbmUgPSAnJztcbiAgICAgICAgICAgIHZhciB2Q29udGVudCA9ICdvJztcblxuICAgICAgICAgICAgaWYgKHZMaW5lID09IHZCb251c0xpbmUpIHtcbiAgICAgICAgICAgICAgICB2TG9zZSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciB2Q29sID0gMDsgdkNvbCA8IDEwIC0gdkxpbmU7IHZDb2wrKykge1xuXG4gICAgICAgICAgICAgICAgdkNvbnRlbnQgPSAnbyc7XG5cbiAgICAgICAgICAgICAgICBpZiAodkNvbCA9PSB2Qm9udXNDb2wgJiYgdkxpbmUgPT0gdkJvbnVzTGluZSkge1xuICAgICAgICAgICAgICAgICAgICB2Q29udGVudCA9ICdCJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZMb3NlID4gMCAmJiAoTWF0aC5yYW5kb20oKSA8IDAuMyB8fCB2Q29sID09PSA5IC0gdkxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZDb250ZW50ID0gJ1gnO3ZMb3NlLS07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9jb3JyZWdpciBwdWVkZSBxdWVkYXIgc2luIGFzaWduYXIgbG9vc2Vyc1xuICAgICAgICAgICAgICAgIHZDb250ZW50TGluZSA9IHZDb250ZW50TGluZSArIHZDb250ZW50O1xuXG4gICAgICAgICAgICAgICAgLy9EaWJ1amFtb3MgZW4gbGF5ZXIuLi5cbiAgICAgICAgICAgICAgICB0aGlzLl9kcmF3Qm94T25UaWNrZXQodkxpbmUsIHZDb2wsIHZDb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaW5lYSAnICsgdkxpbmUgKyAnIENvbnRlbmlkbzogJyArIHZDb250ZW50TGluZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX291dHNpZGVNYXAucHVzaCh2Q29udGVudExpbmUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9kcmF3Qm94T25UaWNrZXQ6IGZ1bmN0aW9uIF9kcmF3Qm94T25UaWNrZXQobGluZSwgY29sLCBjb250ZW50KSB7XG5cbiAgICAgICAgdmFyIGFib3ggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJhc2VCb3gpO1xuICAgICAgICBhYm94ID0gYWJveC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgYWJveC5ub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcblxuICAgICAgICAvL2Fib3gubm9kZS56aW5kZXggPSAtMTAgKiB2bGluZWE7IC8vc2Ugb3JkZW5hIGxvcyBkZSBhYmFqbyBtYXMgYXJyaWJhIHF1ZSBsb3Mgb3Ryb3MuLi5cblxuICAgICAgICBzd2l0Y2ggKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQic6XG4gICAgICAgICAgICAgICAgYWJveC5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbkJvbnVzO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSAnWCc6XG4gICAgICAgICAgICAgICAgYWJveC5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvblRyYXA7YnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy9kaWJ1amFyLi4uXG4gICAgICAgIGFib3gubm9kZS5zZXRQb3NpdGlvbihjb2wgKiAyNCArIGxpbmUgKiAyNCAqIDAuNSArIDQwLCBsaW5lICogMjQgKyA0MCk7XG4gICAgfSxcblxuICAgIGdldE91dFNpZGVDb250ZW50OiBmdW5jdGlvbiBnZXRPdXRTaWRlQ29udGVudChhTGluZSwgYUNvbCkge1xuICAgICAgICB2YXIgdG1wTGluZSA9IHRoaXMuX291dHNpZGVNYXBbYUxpbmVdO1xuICAgICAgICByZXR1cm4gdG1wTGluZS5jaGFyQXQoYUNvbCk7XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzZhODU0RC9qV1JDS1l0YlVrN0pQc0NsJywgJ1RyYW5zU2NlbmUnKTtcbi8vIHNjcmlwdFxcVHJhbnNTY2VuZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5zdWJTY2VuZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1N1YlNjZW5lJyk7XG4gICAgICAgIHRoaXMuc3ViU2NlbmUuaW5pdChnYW1lKTtcbiAgICAgICAgLy90aGlzLmhpZGUoKTtcbiAgICB9LFxuXG4gICAgc2hvd1NjcmVlbjogZnVuY3Rpb24gc2hvd1NjcmVlbigpIHtcblxuICAgICAgICB0aGlzLnN1YlNjZW5lLnNob3dTY3JlZW4oKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnY2xpcC4uLicpXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2xpcCcpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ3RyYW5zSW5zaWRlJyk7XG4gICAgfSxcblxuICAgIGhpZGVTY3JlZW46IGZ1bmN0aW9uIGhpZGVTY3JlZW4oKSB7XG4gICAgICAgIHRoaXMuc3ViU2NlbmUuaGlkZVNjcmVlbigpO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NsaXAnKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5zdG9wKCd0cmFuc0luc2lkZScpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzNiZmRiTmYwVDFLdzVpUFlhcGFVSjJVJywgJ1VzZXJJbnRlcmZhY2UnKTtcbi8vIHNjcmlwdFxcVXNlckludGVyZmFjZS5qc1xuXG52YXIgR2FtZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZU1hbmFnZXJcIik7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIHBpcmFtaWRlOiBjYy5Ob2RlLFxuICAgICAgICBfbWFuYWdlcjogbnVsbFxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGdhbWUpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlciA9IGdhbWU7XG4gICAgfSxcblxuICAgIGJvdG9uSGFuZGxlclBydWViYTogZnVuY3Rpb24gYm90b25IYW5kbGVyUHJ1ZWJhKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnYm90b24gZGUgUmVzZXQuLi4uJyk7XG5cbiAgICAgICAgdGhpcy5fbWFuYWdlci5wbGF5KCk7XG5cbiAgICAgICAgLy90aGlzLnBpcmFtaWRlLm5vZGUueSA9IC0zNTA7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnBpcmFtaWRlID0gdGhpcy5waXJhbWlkZS5nZXRDb21wb25lbnQoJ1BpcmFtaWQnKTtcblxuICAgICAgICB2YXIgdG1wID0gdGhpcztcblxuICAgICAgICB2YXIgbGlzdGVuZXIgPSB7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCxcbiAgICAgICAgICAgIG9uS2V5UHJlc3NlZDogZnVuY3Rpb24gb25LZXlQcmVzc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgLy9jYy5sb2coJ2tleURvd246ICcgKyBrZXlDb2RlKTtcblxuICAgICAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDY2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcC5fbWFuYWdlci5oaWRlQWxsKCk7dG1wLl9tYW5hZ2VyLnBsYXlCb251cygpO1xuICAgICAgICAgICAgICAgIH0gLy9CXG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gNjgpIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wLl9tYW5hZ2VyLmhpZGVBbGwoKTt0bXAuX21hbmFnZXIucGxheURvdWJsZSgpO1xuICAgICAgICAgICAgICAgIH0gLy9EXG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gNzMpIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wLl9tYW5hZ2VyLmhpZGVBbGwoKTt0bXAuX21hbmFnZXIucGxheUluc2lkZSgpO1xuICAgICAgICAgICAgICAgIH0gLy9JXG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gODIpIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wLl9tYW5hZ2VyLnJlc3RhcnQoKTtcbiAgICAgICAgICAgICAgICB9IC8vUlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcihsaXN0ZW5lciwgdGhpcy5ub2RlKTtcblxuICAgICAgICAvL3RoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ01vdXNlIERvd24gLi4uIE1vdmVtb3MgcGlyYW1pZGUuLi4nICsgdGhpcyk7XG4gICAgICAgIC8vICAgIHRtcC5waXJhbWlkZS5zY3JvbGwoKTtcbiAgICAgICAgLy99KTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdkOGQ2OXBzTFFoTVc2ekdNZS81bVBaSScsICdWaXJ0dWFsU2VydmVyJyk7XG4vLyBzY3JpcHRcXFZpcnR1YWxTZXJ2ZXIuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuXG4gICAgICAgIF9mYWtlVGlja2V0OiAnJ1xuXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICB9LFxuXG4gICAgZ2V0Qm94Q29udGVudDogZnVuY3Rpb24gZ2V0Qm94Q29udGVudChhTGluZSwgYUNvbHVtbikge1xuICAgICAgICB2YXIgdG1wTGluZSA9IHRoaXMuX2Zha2VUaWNrZXRbYUxpbmVdO1xuICAgICAgICB2YXIgYyA9IHRtcExpbmUuY2hhckF0KGFDb2x1bW4pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdEZXZvbHZpZW5kbyBCb3gubGluOiAnICsgYUxpbmUgKyAnIEJveC5jb2w6ICcgKyBhQ29sdW1uICsgJyBDb250ZW5pZG86ICcgKyBjKTtcbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfSxcblxuICAgIC8vZ2VuZXJhciB1biB0aWNrZXQgYWxlYXRvcmlhbWVudGVcbiAgICBnZW5lcmF0ZTogZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG4gICAgICAgIHRoaXMuX2Zha2VUaWNrZXQgPSBbXTtcblxuICAgICAgICB2YXIgdkJvbnVzTGluZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICsgMTtcbiAgICAgICAgdmFyIHZCb251c0NvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5IC0gdkJvbnVzTGluZSkpO1xuXG4gICAgICAgIC8vR2VuZXJhciBlbCBvdXRzaWRlTWFwLi4uXG4gICAgICAgIGZvciAodmFyIHZMaW5lID0gMDsgdkxpbmUgPCA5OyB2TGluZSsrKSB7XG5cbiAgICAgICAgICAgIHZhciB2TG9zZSA9IDE7IC8vKCgxMCAtIHZMaW5lKSAvIDUpICsgMTtcbiAgICAgICAgICAgIHZhciB2Q29udGVudExpbmUgPSAnJztcbiAgICAgICAgICAgIHZhciB2Q29udGVudCA9ICdvJztcblxuICAgICAgICAgICAgaWYgKHZMaW5lID09IHZCb251c0xpbmUpIHtcbiAgICAgICAgICAgICAgICB2TG9zZSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciB2Q29sID0gMDsgdkNvbCA8IDEwIC0gdkxpbmU7IHZDb2wrKykge1xuXG4gICAgICAgICAgICAgICAgdkNvbnRlbnQgPSAnbyc7XG5cbiAgICAgICAgICAgICAgICBpZiAodkNvbCA9PSB2Qm9udXNDb2wgJiYgdkxpbmUgPT0gdkJvbnVzTGluZSkge1xuICAgICAgICAgICAgICAgICAgICB2Q29udGVudCA9ICdCJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZMb3NlID4gMCAmJiAoTWF0aC5yYW5kb20oKSA8IDAuMyB8fCB2Q29sID09PSA5IC0gdkxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZDb250ZW50ID0gJ1gnO3ZMb3NlLS07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9jb3JyZWdpciBwdWVkZSBxdWVkYXIgc2luIGFzaWduYXIgbG9vc2Vyc1xuICAgICAgICAgICAgICAgIHZDb250ZW50TGluZSA9IHZDb250ZW50TGluZSArIHZDb250ZW50O1xuXG4gICAgICAgICAgICAgICAgLy9EaWJ1amFtb3MgZW4gbGF5ZXIuLi5cbiAgICAgICAgICAgICAgICAvL3RoaXMuX2RyYXdCb3hPblRpY2tldCh2TGluZSwgdkNvbCwgdkNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xpbmVhICcgKyB2TGluZSArICcgQ29udGVuaWRvOiAnICsgdkNvbnRlbnRMaW5lKTtcblxuICAgICAgICAgICAgdGhpcy5fZmFrZVRpY2tldC5wdXNoKHZDb250ZW50TGluZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiXX0=
