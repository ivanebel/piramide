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