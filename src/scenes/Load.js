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
        this.load.spritesheet('heart', './assets/img/heart.png', {
            frameWidth: 9,
            frameHeight: 8
        })
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