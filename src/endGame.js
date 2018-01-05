
var EndLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        if(score>highScore){
            cc.sys.localStorage.setItem("Score", score);
        }

        var size = cc.winSize;
        cc.audioEngine.playEffect(res.Lose_sound);
        var label = new cc.LabelTTF("GAME OVER", "Arial");
        label.setFontSize(80);
        label.setPosition(cc.p(size.width/2, size.height/2+200));
        label.setColor(cc.color(255,178,102));
        this.addChild(label);

        var label2 = new cc.LabelTTF("YOUR SCORE: " + score, "Arial");
        label2.setFontSize(50);
        label2.setPosition(cc.p(size.width/2, size.height/2+100));
        label2.setColor(cc.color(255,255,102));
        this.addChild(label2);

        var HighScoreLabel = new cc.LabelTTF("HIGHSCORE: "+ highScore, "Arial");
        HighScoreLabel.setFontSize(50);
        HighScoreLabel.setPosition(cc.p(size.width/2, size.height/2));
        HighScoreLabel.setColor(cc.color(255,178,102));
        this.addChild(HighScoreLabel);

        var menuItem1 = new cc.MenuItemImage(res.PlayAgain_jpg, res.playAgainSelected_png, function(){
                                                cc.director.runScene(new cc.TransitionFade(2,new HelloWorldScene()));
        });
        var menu = new cc.Menu(menuItem1);
        menu.alignItemsVertically();
        menu.setAnchorPoint(cc.p(0.5,0.5));
        menu.setPosition(cc.p(size.width/2, size.height/4));
        this.addChild(menu);

        return true;
    }
});

var EndScene = cc.Scene.extend({
    onEnter:function () {
        this._super();        
        var layer = new EndLayer();
        this.addChild(layer);
    }
});

