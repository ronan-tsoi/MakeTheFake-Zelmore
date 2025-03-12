class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }
    create() {
        this.add.text(width/4, height/2, 'GAME OVER\n(statistics here)\nspace to restart\n<- title\n-> credits (not implemented)', textConfig)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyLEFT)) {
            this.scene.start('titleScene')
        }
    }
}