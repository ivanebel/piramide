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