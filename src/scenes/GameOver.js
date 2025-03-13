class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }
    create() {
        this.bgtrees = this.add.sprite(42, height+100, 'trees').setOrigin(0,1).setScale(4)

        //this.add.text(width/4, height/2, 'GAME OVER\n(statistics here)\nspace to restart\n<- title\n-> credits (not implemented)', textConfig)
        cursors = this.input.keyboard.addKeys(
            {
            SPACE:Phaser.Input.Keyboard.KeyCodes.SPACE,
            LEFT:Phaser.Input.Keyboard.KeyCodes.LEFT,
            RIGHT:Phaser.Input.Keyboard.KeyCodes.RIGHT,
        })

        //this.add.text(width/4, height/3, time + ' ' + healthbonus)

        this.toggleContinue = false

        this.line0 = this.add.bitmapText(width/2, 50, 'upheaval', 'GAME OVER', 96, 1).setOrigin(0.5)

        this.time.delayedCall(900, () => {
            this.line1 = this.add.bitmapText(width/2, 120, 'gem', 'WITH TIME ' + time + ' LEFT', 32, 1).setOrigin(0.5)
        })
        this.time.delayedCall(1800, () => {
            this.line2 = this.add.bitmapText(width/2, 170, 'gem', 'HEALTH BONUS x' + healthbonus, 32, 1).setOrigin(0.5)
        })
        this.time.delayedCall(2700, () => {
            this.line3 = this.add.bitmapText(width/2, 220, 'upheaval', player + " WINS WITH A SCORE OF", 32, 1).setOrigin(0.5)
        })
        this.time.delayedCall(4250, () => {
            this.line4 = this.add.bitmapText(width/2, 288, 'upheaval', time * healthbonus * 10, 96, 1).setOrigin(0.5)
            this.scoreTween = this.tweens.add({
                targets: this.line4,
                ease: 'Sine.easeInOut',
                duration: 1000,
                repeat: -1,
                yoyo: true,
                hold: 50,
                y: 293
            })
            this.toggleContinue = true

            this.line5 = this.add.bitmapText(width/2, height-25, 'gem', '<- to TITLE   SPACE to REPLAY   -> to CREDITS', 24, 1).setOrigin(0.5)
        })


    }
    update() {
        if (this.toggleContinue && cursors.SPACE.isDown) {
            this.scene.start('playScene')
        }
        if (this.toggleContinue && cursors.LEFT.isDown) {
            this.scene.start('titleScene')
        }
        if (this.toggleContinue && cursors.RIGHT.isDown) {
            this.scene.start('creditsScene')
        }
    }
}