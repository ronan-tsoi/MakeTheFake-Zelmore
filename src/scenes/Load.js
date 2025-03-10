class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }
    preload() {
        this.load.image('sky', './assets/img/bg-sky.png')
        this.load.image('walls', './assets/img/bg-walls.png')
        this.load.image('ground', './assets/img/ground.png')
        this.load.spritesheet('player', './assets/img/player.png', {
            frameWidth: 21,
            frameHeight: 20
        })
        this.load.spritesheet('boss', './assets/img/boss.png', {
            frameWidth: 88,
            frameHeight: 77
        })
        /*this.load.spritesheet('heart', './assets/img/heart.png', {
            frameWidth: 9,
            frameHeight: 8
        })*/
        this.load.image('hearts-1', './assets/img/hearts-1.png')
        this.load.image('hearts-2', './assets/img/hearts-2.png')
        this.load.image('hearts-3', './assets/img/hearts-3.png')
        this.load.image('hearts-4', './assets/img/hearts-4.png')
        this.load.image('hearts-5', './assets/img/hearts-5.png')
        this.load.image('hearts-6', './assets/img/hearts-6.png')

        this.load.audio('attack', './assets/audio/attack.wav')
        this.load.audio('stomp', './assets/audio/stomp.wav')
        this.load.audio('hit', './assets/audio/hit.wav')
    }
    create() {
        this.anims.create({
            key: 'boss-attack',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('boss', {
                frames: [1,1,1,0]
            })
        })
        this.anims.create({
            key: 'player-attack',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', {
                frames: [0,1,2]
            })
        })
        this.anims.create({
            key: 'player-squashed',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', {
                frames: [3]
            })
        })
        this.anims.create({
            key: 'player-idle',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', {
                frames: [0]
            })
        })

        this.scene.start('titleScene')
    }
}