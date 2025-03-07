class Heart extends Phaser.GameObjects.Sprite {
    constructor(scene, x) {
        super(scene, x, 32, 'heart')

        this.parentScene = scene
        this.parentScene.add.existing(this).setOrigin(0,1).setScale(4)

        this.value = 2
    }
    update() {
        
    }

}