//temporary
class Fireball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'fireball')

        scene.add.existing(this).setScale(5)           
        scene.physics.add.existing(this).setScale(5)

        
        scene.time.delayedCall(1000, () => {
            this.destroy()
        }, null, this)

        this.direction = boss.flipX

        if (this.direction) {
            this.setFlipX(true)
            this.x += 352
        }

        this.parentScene = scene
    }
    update() {
        if (this.direction) {
            this.x += 8
        } else {
            this.x -= 8
        }

        this.parentScene.physics.world.overlap(hero, this, this.hit, null, this)
    }

    hit() {
        this.x = -100
        this.parentScene.landing()
    }
}