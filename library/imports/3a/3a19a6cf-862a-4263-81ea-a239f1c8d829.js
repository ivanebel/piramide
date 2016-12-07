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