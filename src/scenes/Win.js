class Win extends Phaser.Scene {
    constructor() {
        super('winScene')
    }
    create() {
        this.add.text(width/2, height/2, 'you win!\nspace to title', textConfig)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('titleScene')
        }
    }
}