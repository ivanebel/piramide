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

        //this.scheduleOnce(function() { this.layerObjects.getComponent(cc.Animation).play('BonusEntradaObjetos'); } , 1.5);

        //this.bonusScreen.showScreen();
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