//temporary
class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, 'boss', 0)
        scene.add.existing(this)           
        scene.physics.add.existing(this)

        //compound bodies: head, body, melee attack


    }
    update() {

    }
}