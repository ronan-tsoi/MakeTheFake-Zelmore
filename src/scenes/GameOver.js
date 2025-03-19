class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }
    create() {
        this.bgtrees = this.add.sprite(42, height+100, 'trees').setOrigin(0,1).setScale(4)

        cursors = this.input.keyboard.addKeys(
            {
            SPACE:Phaser.Input.Keyboard.KeyCodes.SPACE,
            LEFT:Phaser.Input.Keyboard.KeyCodes.LEFT,
            RIGHT:Phaser.Input.Keyboard.KeyCodes.RIGHT,
        })
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.toggleContinue = false

        this.line0 = this.add.bitmapText(width/2, 50, 'upheaval', 'GAME OVER', 96, 1).setOrigin(0.5)
        this.line4 = this.add.bitmapText(width/2, 288, 'upheaval', '', 96, 1).setOrigin(0.5)
        this.line5 = this.add.bitmapText(width/2, height-25, 'gem', 'SPACE to skip', 24, 1).setOrigin(0.5)

        this.scoreTween = this.tweens.add({
            targets: this.line4,
            ease: 'Sine.easeInOut',
            duration: 1000,
            repeat: -1,
            yoyo: true,
            hold: 50,
            y: 293
        })

        this.time.delayedCall(900, () => {
            if (!this.toggleContinue) {
                this.sound.play('ui-play')
            }
            this.line1 = this.add.bitmapText(width/2, 120, 'gem', 'WITH TIME ' + time + ' LEFT', 32, 1).setOrigin(0.5)
        })
        this.time.delayedCall(1800, () => {
            if (!this.toggleContinue) {
                this.sound.play('ui-play')
            }
            this.line2 = this.add.bitmapText(width/2, 170, 'gem', 'HEALTH BONUS x' + healthbonus, 32, 1).setOrigin(0.5)
        })
        this.time.delayedCall(2700, () => {
            if (!this.toggleContinue) {
                this.sound.play('ui-play')
            }
            this.line3 = this.add.bitmapText(width/2, 220, 'upheaval', player + " WINS WITH A SCORE OF", 32, 1).setOrigin(0.5)
        })
        this.time.delayedCall(4250, () => {
            if (!this.toggleContinue) {
                if (time * healthbonus * 10 > 1500) {
                    this.bigNumber = true
                    this.roll = 1
                } else {
                    this.sound.play('score-reveal')
                    this.roll = 0
                }
            }
            this.toggleContinue = true

            this.line5.text = '<- to TITLE   SPACE to REPLAY   -> to CREDITS'
        })

        this.once = false


    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (this.toggleContinue) {
                this.sound.play('ui-play')
                this.scene.start('playScene')
            } else {
                this.line1 = this.add.bitmapText(width/2, 120, 'gem', 'WITH TIME ' + time + ' LEFT', 32, 1).setOrigin(0.5)
                this.line2 = this.add.bitmapText(width/2, 170, 'gem', 'HEALTH BONUS x' + healthbonus, 32, 1).setOrigin(0.5)
                this.line3 = this.add.bitmapText(width/2, 220, 'upheaval', player + " WINS WITH A SCORE OF", 32, 1).setOrigin(0.5)
                this.roll = time * healthbonus * 10
                this.line4.text = this.roll
                this.toggleContinue = true
                this.line5.text = '<- to TITLE   SPACE to REPLAY   -> to CREDITS'
            }
        }
        if (this.toggleContinue) {
            if (this.roll <=  time * healthbonus * 10) {
                if (this.bigNumber) {
                    this.roll *= 2
                } else {
                    this.roll += 10
                }
                this.line4.text = this.roll
            } else {
                if (!this.once) {
                    this.sound.play('score-reveal')
                    this.once = true
                }
                this.line4.text = time * healthbonus * 10
            }
            if (cursors.LEFT.isDown) {
                this.sound.play('ui-click')
                this.scene.start('titleScene')
            } else if (cursors.RIGHT.isDown) {
                this.sound.play('ui-click')
                this.scene.start('creditsScene')
            }
        }
    }
}