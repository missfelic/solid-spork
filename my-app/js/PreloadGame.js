class PreloadGame extends Phaser.Scene {
    constructor(){
        super('PreloadGame');
    }
    preload(){
        // Load All Game Assets
        //Sky
        this.load.image('sky', 'assets/background/layers/sky.png');
        // Sides
        this.load.image('sides', 'assets/background/layers/sides.png');
        // Trees
        this.load.image('trees', 'assets/background/layers/trees.png');
        // Cloud
        this.load.image('clouds', 'assets/background/layers/clouds.png');
        // Starting Ground
        this.load.image('start', 'assets/background/layers/start.png');
        // Plateforms
        this.load.image('platforms', 'assets/ground/platform.png');
        // pinkMonster Sprite Sheet
        this.load.spritesheet('pinkMonster', 'assets/pinkMonster/pinkMonsterSprite.png', {
        frameWidth: 32,
        frameHeight: 32
        });
        // Title Screen
        this.load.image('titlescreen', 'assets/titlescreen/titlescreen.png');

    }
    create(){
        this.scene.start('PlayGame');
    }
}