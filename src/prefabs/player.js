class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 128, height-38, 'player')

        this.parentScene = scene

        this.parentScene.add.existing(this).setOrigin(0,1).setScale(4)
        this.parentScene.physics.add.existing(this).setScale(2)

        this.body.setCollideWorldBounds(true)
    }
}