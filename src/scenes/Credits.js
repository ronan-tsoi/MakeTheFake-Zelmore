class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }
    create() {
        //this.add.text(width/4, height/2, 'GAME OVER\n(statistics here)\nspace to restart\n<- title\n-> credits (not implemented)', textConfig)
        cursors = this.input.keyboard.addKeys(
            {
            //SPACE:Phaser.Input.Keyboard.KeyCodes.SPACE,
            LEFT:Phaser.Input.Keyboard.KeyCodes.LEFT,
            RIGHT:Phaser.Input.Keyboard.KeyCodes.RIGHT,
        })

        //this.add.text(width/4, height/3, time + ' ' + healthbonus)

        this.toggleContinue = false

        this.line0 = this.add.bitmapText(width/2, 50, 'upheaval', 'CREDITS', 96, 1).setOrigin(0.5)

        this.line1 = this.add.bitmapText(width/4, 120, 'gem', 'RONAN TSOI\nDesign, Programming,\nArt & Animations', 24, 1).setOrigin(0.5,0)
        this.line2 = this.add.bitmapText((width*3)/4, 120, 'gem', 'CODE REFERENCES\nScrolling States - Nathan Altice\nBig Bodies - Nathan Altice', 24, 1).setOrigin(0.5,0)
        this.line3 = this.add.bitmapText(width/4, 230, 'gem', 'AUDIO', 24, 1).setOrigin(0.5,0)
        this.line4 = this.add.bitmapText((width*3)/4, 230, 'gem', 'BASED ON\nThe Amazing World of Gumball:\n\"The Flakers\" & \"The Promise\"', 24, 1).setOrigin(0.5,0)


        this.line5 = this.add.bitmapText(width/2, height-25, 'gem', '<- to BACK   -> to TITLE', 24, 1).setOrigin(0.5)


    }
    update() {
        if (cursors.LEFT.isDown) {
            this.sound.play('ui-click')
            this.scene.start('gameOverScene')
        }
        if (cursors.RIGHT.isDown) {
            this.sound.play('ui-click')
            this.scene.start('titleScene')
        }
    }
}