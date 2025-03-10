class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }
    create() {
        this.add.text(width/2, height/2, 'GAME OVER\nspace to restart', textConfig)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('bossScene')
        }
    }
}