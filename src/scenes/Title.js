class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }
    create() {
        //this.add.text(width/2, height/2, 'SPACE to start', textConfig)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.bg0 = this.add.tileSprite(0,height, 864, 384, 'title-0').setOrigin(0,1)
        this.bg1 = this.add.tileSprite(0,height, 864, 296, 'title-1').setOrigin(0,1)
        this.bg2 = this.add.tileSprite(0,height, 864, 164, 'title-2').setOrigin(0,1)
        this.bg3 = this.add.tileSprite(0,height, 864, 84, 'title-3').setOrigin(0,1)

        this.title = this.add.sprite(width/2, 135, 'zelmore-title').setScale(4)
        this.cue = this.add.sprite(width/2, 325, 'start-cue', 0).setScale(4)

        this.titleTween = this.tweens.add({
            targets: this.title,
            ease: 'Sine.easeInOut',
            duration: 1000,
            repeat: -1,
            yoyo: true,
            hold: 750,
            y: 140
        })

    }
    update() {
        this.bg0.tilePositionX += 1
        this.bg1.tilePositionX += 1.5
        this.bg2.tilePositionX += 2
        this.bg3.tilePositionX += 2.5
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.cue.anims.play('cue-blink')
            this.cue.once('animationcomplete', () => {
                this.scene.start('playScene')
            })
        }

    }
}