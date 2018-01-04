var highScore;
var sprite = [];
var isClicked = [];
var i=0, j=0;
var size2 = [];
var speed =0.5, scheduleTime=1.4;
var scope, score=0;
var count;
var HelloWorldLayer2 = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var k=0;
        score=0;
        var size = cc.winSize;
        speed =0.5;
        scheduleTime=1.4;
        count=0;
        isClicked = [false,false,false,false,false,false,false,false];
        
        var colorLayer = new cc.LayerColor(cc.color(128, 128, 128, 128), size.width, size.height);
        colorLayer.ignoreAnchorPointForPosition(false);
        colorLayer.x = size.width / 2;
        colorLayer.y = size.height / 2;
        this.addChild(colorLayer);
        scope = this;
        
        highScore = cc.sys.localStorage.getItem("Score");
        //cc.log("dsfsergrs");
        if(highScore==null)
            highScore=0;
        
        var spritebg = new cc.Sprite.create(res.Background_png);
        spritebg.setAnchorPoint(cc.p(0.5,0.5));
        spritebg.setPosition(cc.p(size.width/2,size.height/2));
        this.addChild(spritebg,0);

        for(k=0;k<7;k++){
            cc.log("inside for");
            sprite[k] = new cc.Sprite.create(res.Block_png);
            sprite[k].setAnchorPoint(cc.p(0,1));
            sprite[k].setPosition(cc.p(size.width/2,size.height/4+size.height));
            this.addChild(sprite[k],0);
        }

        cc.audioEngine.playEffect(res.Background_sound, true);
        cc.audioEngine.setEffectsVolume(musicVolume);

        var ScoreLabel = new cc.LabelTTF("SCORE: "+ score, "Arial");
        ScoreLabel.setFontSize(40);
        ScoreLabel.setPosition(cc.p(150, size.height/2));
        ScoreLabel.setColor(cc.color(255,178,102));
        this.addChild(ScoreLabel);

        var HighScoreLabel = new cc.LabelTTF("HIGHSCORE: "+ highScore, "Arial");
        HighScoreLabel.setFontSize(50);
        HighScoreLabel.setPosition(cc.p(200, size.height/2+200));
        HighScoreLabel.setColor(cc.color(255,178,102));
        this.addChild(HighScoreLabel);

        var volume1 = new cc.LabelTTF("Adjust Volume by", "Arial");
        volume1.setFontSize(30);
        volume1.setAnchorPoint(1,1);
        volume1.setPosition(cc.p(size.width, size.height/2+size.height/18));
        volume1.setColor(cc.color(255,178,102));
        this.addChild(volume1);
        var volume2 = new cc.LabelTTF("Up and Down Keys", "Arial");
        volume2.setFontSize(30);
        volume2.setAnchorPoint(1,1);
        volume2.setPosition(cc.p(size.width, size.height/2));
        volume2.setColor(cc.color(255,178,102));
        this.addChild(volume2);

                
        if(cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,

                onKeyPressed: function(key, event){

                    if(key.toString()== "32"){
                        //INITILIZED2 = false
                        if(!cc.director.isPaused()) {
                            cc.director.pause(); 
                            var ContinueLabel = new cc.LabelTTF("Press Space to Continue", "Arial");
                            ContinueLabel.setFontSize(30);
                            ContinueLabel.setPosition(cc.p(size.width/2, size.height/2));
                            ContinueLabel.setColor(cc.color(25,25,112));
                            ContinueLabel.setTag(2);
                            scope.addChild(ContinueLabel);
                            cc.audioEngine.pauseAllEffects();
                        } 
                        else{
                            scope.removeChildByTag(2,true);
                            cc.director.resume();
                            cc.audioEngine.resumeAllEffects();
                        }
                    }
                    else if(key.toString()== "38"){
                        musicVolume = musicVolume+0.1;
                        if(musicVolume>1) musicVolume=1;
                        cc.audioEngine.setEffectsVolume(musicVolume);
                    }
                    else if(key.toString()== "40"){
                        musicVolume = musicVolume-0.1;
                        if(musicVolume<0) musicVolume=0;
                        cc.audioEngine.setEffectsVolume(musicVolume);
                    }
                }
            },this);
        }

        if(cc.sys.capabilities.hasOwnProperty('mouse')){
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,

                onMouseDown: function(event){
                    clickOnTile = false;
                    if(!cc.director.isPaused()){
                        for(k=0;k<7;k++){
                            if(event.getLocationX()>sprite[k].getPositionX() && event.getLocationX()<sprite[k].getPositionX()+100 && 
                                event.getLocationY()<sprite[k].getPositionY() && event.getLocationY()>sprite[k].getPositionY()-size.height/4){
                                //cc.log("mousepressed: " + event.getLocationX()+"   " +event.getLocationY() +" " + sprite[k].getPositionX() + " "+ sprite[k].getPositionY());
                                 if(!isClicked[k]){
                                    score++;
                                    var plusScore = new cc.Sprite.create(res.plusOne_png);
                                    plusScore.setAnchorPoint(cc.p(0.5,0.5));
                                    plusScore.setPosition(cc.p(sprite[k].getPositionX(),sprite[k].getPositionY()));
                                    scope.addChild(plusScore,0);
                                    plusScore.runAction(cc.MoveTo.create(0.2, cc.p(150, size.height/2)));
                                    plusScore.runAction(cc.FadeOut.create(0.2));
                                    console.log(score);
                                    sprite[k].setOpacity(128);
                                    cc.audioEngine.playEffect(res.Piano_sound);
                                    isClicked[k]=true;
                                    
                                }
                                clickOnTile=true;
                            }
                        }
                        if(clickOnTile==false){
                            //res.finalScore=score;
                            if(highScore==null || score>highScore){
                                cc.sys.localStorage.setItem("Score", score);
                                highScore = score;
                            }
                            cc.audioEngine.stopAllEffects();
                            cc.director.runScene(new cc.TransitionFade(2,(new EndScene())));
                        }
                    }
                    ScoreLabel.setString("SCORE: " + score);
                }
            },this);
        }
        
        this.schedule(this.createSprite, scheduleTime);
        this.schedule(this.checkClicked, 0.05);       
        return true;
    },

    checkClicked: function(dt){
        for(k=0;k<j;k++){
            //console.log(isClicked[k] + " " + sprite[k].getPositionY());
            if(!isClicked[k] && sprite[k].getPositionY()<10 && sprite[k].getPositionY()>0){
                cc.audioEngine.stopAllEffects();
                if(score>highScore){
                    cc.sys.localStorage.setItem("Score", score);
                    highScore = score;
                }
                cc.director.runScene(new cc.TransitionFade(2,(new EndScene())));
            }
        }
    },

    createSprite: function(dt){
        console.log(dt);
        num = Math.random();
        size = cc.winSize;
        sprite[i].setOpacity(255);
        //sprite[i] = new cc.Sprite.create(res.Block_png);
        //sprite[i].setAnchorPoint(cc.p(0,1));
        isClicked[i]=false;
        if(num<0.3){
            //sprite[i].setPosition(cc.p(size.width/2,size.height/4+size.height));
            sprite[i].runAction(cc.Place.create(cc.p(size.width/2,size.height/4+size.height)));
        }
        else if(num>=0.3 && num<0.5){
           // sprite[i].setPosition(cc.p(size.width/2+100,size.height/4+size.height));
           sprite[i].runAction(cc.Place.create(cc.p(size.width/2+100,size.height/4+size.height)));
        }
        else if(num>=0.5 && num<.65){
            //sprite[i].setPosition(cc.p(size.width/2-100,size.height/4+size.height));
            sprite[i].runAction(cc.Place.create(cc.p(size.width/2-200,size.height/4+size.height)));
        }
        else {
            ////sprite[i].setPosition(cc.p(size.width/2-200,size.height/4+size.heights));
            sprite[i].runAction(cc.Place.create(cc.p(size.width/2-100,size.height/4+size.height)));
        }
        //scope.addChild(sprite[i],0);
        sprite[i].runAction(cc.Repeat.create(cc.MoveBy.create(speed, cc.p(0, -size.height/12)), 16));
        i++; j++;
        //count++;
        //console.log(i + " " + j);
        if(i==7){ i=0; }
        if(j>=7) j=7;//speed = speed-0.1; scheduleTime=scheduleTime-0.1;}
        /*if(count==10){
            speed = speed - 0.05;
            scheduleTime = scheduleTime-0.5;
            count=0;

        }*/
    },
});


var HelloWorldScene2 = cc.Scene.extend({
    onEnter:function () {
        this._super();

        
        var layer = new HelloWorldLayer2();
            this.addChild(layer);
        
    }
});

