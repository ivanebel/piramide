cc.Class({
    extends: cc.Component,

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
    onLoad: function () {

        //this._handleLeft  = cc.find('Canvas/double/handles/glow/Glow_Manijas_L');
        //this._handleRight = cc.find('Canvas/double/handles/glow/Glow_Manijas_R');
        
        this._glow = cc.find('Canvas/double/handles/glow');
        this._head = cc.find('Canvas/double/head');
        this._hLeft = cc.find('Canvas/double/handles/left');
        this._hRight = cc.find('Canvas/double/handles/right');

        var self = this;
        
        this.handleLeft.on(cc.Node.EventType.TOUCH_END, function ( event ) {
            self.doTouch('L');
            });
        this.handleRight.on(cc.Node.EventType.TOUCH_END, function ( event ) {
            self.doTouch('R');
            });
        
    },

    init ( game ) {
        this._manager = game;

        cc.log('init Double....');
        
        
    },
    

    doTouch( h ) {
        
        //sacamos el glow...
        this._glow.active = false;
        
        //animamos...
        if ( h == 'L' ) {
            this._hLeft.getComponent(cc.Animation).play('HandleDown_Left');
        } else {
            this._hRight.getComponent(cc.Animation).play('HandleDown_Right');
        }
        
        //avisamos al manager
        this.scheduleOnce(function() { this._manager.doHandleTouch( h ); } , 0.8);
            
    },
    
    
    doWin (){
        
        this._head.getComponent(cc.Animation).play('Double_Win');

    },
    
    doLose () {
        
        this._head.getComponent(cc.Animation).play('Double_Lose');
    },
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
