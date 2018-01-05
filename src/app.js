var musicVolume;
var version;
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        var sprite = new cc.Sprite.create(res.Piano_jpg);
        sprite.setAnchorPoint(cc.p(0.5,1));
        sprite.setPosition(cc.p(size.width/2, size.height-50));
        this.addChild(sprite,0);

        var title = new cc.LabelTTF("PIANO TILES", "Arial");
        title.setFontSize(80);
        title.setPosition(cc.p(size.width/2, size.height/2));
        title.setColor(cc.color(255,178,102));
        this.addChild(title);
        
        musicVolume=0.5;
        version = "Arcade";
        var menuItem1 = new cc.MenuItemFont("Start a New Arcade Game", play);
        var menuItem2 = new cc.MenuItemFont("Start a New Lightening Game", light);
        menuItem1.setPosition(cc.p(size.width/2, size.height/2-100));
        menuItem2.setPosition(cc.p(size.width/2, size.height/2-200));
        var menu = new cc.Menu(menuItem1,menuItem2);
        menu.alignItemsVertically();
        menu.setPosition(cc.p(size.width/2, size.height/2-100));
        this.addChild(menu);
        cc.audioEngine.playEffect(res.Entry_sound, true);
        cc.audioEngine.setEffectsVolume(musicVolume);

        var volume = new cc.LabelTTF("Adjust Volume by Up and Down Keys", "Arial");
        volume.setFontSize(30);
        volume.setPosition(cc.p(size.width/2, size.height/2-300));
        volume.setColor(cc.color(255,178,102));
        this.addChild(volume);

        if(cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,

                onKeyPressed: function(key, event){
                    cc.log(key.toString());
                    if(key.toString()== "38"){
                        cc.log(key.toString());
;                        musicVolume = musicVolume+0.1;
                        if(musicVolume>1) musicVolume=1;
                        cc.audioEngine.setEffectsVolume(musicVolume);
                    }
                    else if(key.toString()== "40"){
                        cc.log(key.toString());
                        musicVolume = musicVolume-0.1;
                        if(musicVolume<0) musicVolume=0;
                        cc.audioEngine.setEffectsVolume(musicVolume);
                    }
                }
            },this);
        }

        return true;
    }
});

var play = function(){
    cc.audioEngine.stopAllEffects();
    var scene = new HelloWorldScene2();
    cc.director.runScene(new cc.TransitionFade(2,(scene)));
};
var light = function(){
	version = "Light";
    cc.audioEngine.stopAllEffects();
    var scene = new HelloWorldScene2();
    cc.director.runScene(new cc.TransitionFade(2,(scene)));
};

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

