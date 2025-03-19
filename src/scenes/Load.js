class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }
    preload() {
        this.load.image('title-0', './assets/img/title-bg0.png')
        this.load.image('title-1', './assets/img/title-bg1.png')
        this.load.image('title-2', './assets/img/title-bg2.png')
        this.load.image('title-3', './assets/img/title-bg3.png')

        this.load.image('zelmore-title', './assets/img/title.png')
        this.load.spritesheet('start-cue', './assets/img/start-cue.png', {
            frameWidth: 63,
            frameHeight: 19
        })

        this.load.spritesheet('hero-tut', './assets/img/hero-tut.png', {
            frameWidth: 50,
            frameHeight: 74
        })
        this.load.spritesheet('boss-tut', './assets/img/boss-tut.png', {
            frameWidth: 79,
            frameHeight: 79
        })

        this.load.image('sky', './assets/img/bg-sky.png')
        this.load.image('trees', './assets/img/bg-sky-treesonly.png')
        this.load.image('walls', './assets/img/bg-walls.png')
        this.load.image('ground', './assets/img/ground.png')
        this.load.spritesheet('hero', './assets/img/hero.png', {
            frameWidth: 21,
            frameHeight: 21
        })
        this.load.spritesheet('boss', './assets/img/boss.png', {
            frameWidth: 88,
            frameHeight: 77
        })
        this.load.spritesheet('fireball', './assets/img/fireball.png', {
            frameWidth: 20,
            frameHeight: 10,
        })

        this.load.image('hearts-0', './assets/img/hearts-0.png')
        this.load.image('hearts-1', './assets/img/hearts-1.png')
        this.load.image('hearts-2', './assets/img/hearts-2.png')
        this.load.image('hearts-3', './assets/img/hearts-3.png')
        this.load.image('hearts-4', './assets/img/hearts-4.png')
        this.load.image('hearts-5', './assets/img/hearts-5.png')
        this.load.image('hearts-6', './assets/img/hearts-6.png')

        this.load.image('heart-2', './assets/img/heart-2.png')
        this.load.image('heart-1', './assets/img/heart-1.png')
        this.load.image('heart-0', './assets/img/heart-0.png')

        this.load.audio('attack', './assets/audio/attack.wav')
        this.load.audio('stomp', './assets/audio/stomp.wav')
        this.load.audio('hit', './assets/audio/hit.wav')
        this.load.audio('defeat', './assets/audio/defeat.wav')
        this.load.audio('fireball', './assets/audio/fireball.wav')
        this.load.audio('bgm-title', './assets/audio/bgm-title.wav')
        this.load.audio('bgm-battle-main', './assets/audio/bgm-battle-main.wav')
        this.load.audio('bgm-sudden-death', './assets/audio/bgm-sudden-death.wav')
        this.load.audio('ui-click', './assets/audio/ui-click.wav')
        this.load.audio('ui-play', './assets/audio/ui-play.wav')
        this.load.audio('score-reveal', './assets/audio/score-reveal.wav')


        this.load.bitmapFont('upheaval', './assets/font/Upheaval.png', './assets/font/Upheaval.xml')
        this.load.bitmapFont('gem', './assets/font/gem.png', './assets/font/gem.xml')

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
            key: 'boss-walk',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('boss', {
                frames: [2,3]
            })
        })
        this.anims.create({
            key: 'boss-idle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('boss', {
                frames: [0,4]
            })
        })
        this.anims.create({
            key: 'fireball',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fireball', {
                frames: [0,1,2,3]
            })
        })
        this.anims.create({
            key: 'hero-attack',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', {
                frames: [0,1,2]
            })
        })
        this.anims.create({
            key: 'hero-squashed',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', {
                frames: [3]
            })
        })
        this.anims.create({
            key: 'hero-idle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', {
                frames: [0,7]
            })
        })
        this.anims.create({
            key: 'hero-walk',
            frameRate: 12,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', {
                frames: [4,4,5,6,6,0]
            })
        })

        this.anims.create({
            key: 'cue-blink',
            frameRate: 10,
            repeat: 2,
            frames: this.anims.generateFrameNumbers('start-cue', {
                frames: [0,1]
            })
        })
        this.anims.create({
            key: 'hero-tut',
            frameRate: 2,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero-tut', {
                frames: [0,0,1,1,2,2]
            })
        })
        this.anims.create({
            key: 'boss-tut',
            frameRate: 2,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('boss-tut', {
                frames: [0,0,1,1,2,2]
            })
        })

        this.scene.start('titleScene')
    }
}