class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }
    create() {
        this.add.text(width/2, height/2, 'SPACE to start', textConfig)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('bossScene')
        }
    }
}