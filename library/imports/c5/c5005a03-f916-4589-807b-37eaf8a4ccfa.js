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