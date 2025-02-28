class Boss extends Phaser.Scene {
    constructor() {
        super('bossScene')
    }
    init() {
        this.PLAYER_VELOCITY = 450
    }
    create() {

        cursors = this.input.keyboard.createCursorKeys()

        //bg
        this.bgsky = this.add.sprite(0,height, 'sky').setOrigin(0,1).setScale(4)
        this.bgwalls = this.add.sprite(0, height, 'walls').setOrigin(0,1).setScale(4)

        this.ground = this.physics.add.sprite(0, height, 'ground').setOrigin(0,1).setScale(4)
        this.ground.body.setImmovable(true)
        

        //player
        player = this.physics.add.sprite(120, height-38, 'player').setOrigin(0,1).setScale(4)
        player.body.setCollideWorldBounds(true)
        this.inAir = false
        this.maxJumpVelocity = false

        this.playerX = 0
        this.playerY = 0


        this.add.text(10, 10, 'boss scene', textConfig)
        this.debug = this.add.text(10, 50, '', textConfig)

    }
    update() {
        if (cursors.left.isDown) {
            this.playerX = -1
            player.setFlipX(true)
        } else if (cursors.right.isDown) {
            this.playerX = 1
            player.setFlipX(false)
        } else {
            this.playerX = 0
        }
        if (cursors.space.isDown) {
            if (!this.maxJumpVelocity) {
                this.playerY -= 0.4
            }
            this.inAir = true

            if (this.playerY <= -1.8) {
                this.maxJumpVelocity = true
            }
        }
        if (this.inAir) {
            this.playerY += 0.1
        }

        this.physics.world.collide(player, this.ground, this.onGround, null, this)

        player.setVelocity(this.PLAYER_VELOCITY * this.playerX, this.PLAYER_VELOCITY * this.playerY)
        
        this.debug.text = this.inAir + ' ' + this.maxJumpVelocity
    }

    onGround() {
        this.inAir = false
        this.maxJumpVelocity = false
        this.playerY = 0
    }
}