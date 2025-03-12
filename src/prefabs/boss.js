//temporary
class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)           
        scene.physics.add.existing(this)

        //compound bodies: head, body, melee attack


    }
    update() {

    }
}