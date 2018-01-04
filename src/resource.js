var folder = "";

if (!cc.sys.isNative)
{
    folder = "res/mediumRes/";
}

var res = {
    HelloWorld_png : folder + "HelloWorld.png",
    CloseNormal_png : folder + "CloseNormal.png",
    CloseSelected_png : folder+ "CloseSelected.png",
    Block_png : folder+ "block.png",
    Background_png : folder + "bg.png",
    Piano_jpg : folder + "piano.jpg",
    Piano_sound : "res/piano.wav",
    Background_sound : "res/By_the_Pool.mp3",
    Lose_sound : "res/lose.wav",
    Entry_sound : "res/entry.wav",
    PlayAgain_jpg: folder + "playAgain.jpg",
    playAgainSelected_png: folder + "playAgainSelected.png",
    plusOne_png : folder + "plusOne.png",
    File_txt : "res/file.txt"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}