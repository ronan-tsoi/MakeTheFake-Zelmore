class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }
    preload() {
        this.load.image('sky', './assets/bg-sky.png')
        this.load.image('walls', './assets/bg-walls.png')
        this.load.image('ground', './assets/ground.png')
        this.load.image('player', './assets/player.png')
    }
    create() {
        this.scene.start('titleScene')
    }
}