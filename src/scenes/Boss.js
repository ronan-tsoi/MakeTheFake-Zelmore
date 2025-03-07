class Boss extends Phaser.Scene {
    constructor() {
        super('bossScene')
    }
    init() {
        this.PLAYER_VELOCITY = 450
    }
    create() {

        //cursors = this.input.keyboard.createCursorKeys()

        cursors = this.input.keyboard.addKeys(
            {
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            space:Phaser.Input.Keyboard.KeyCodes.SPACE,
            attack:Phaser.Input.Keyboard.KeyCodes.K
        })

        //bg
        this.bgsky = this.add.sprite(0,height, 'sky').setOrigin(0,1).setScale(4)
        this.bgwalls = this.add.sprite(0, height, 'walls').setOrigin(0,1).setScale(4)

        this.ground = this.physics.add.sprite(0, height, 'ground').setOrigin(0,1).setScale(4)
        this.ground.body.setImmovable(true)
        
        //boss
        this.boss = this.physics.add.sprite(280, height-38, 'boss', 0).setOrigin(0,1).setScale(4)
        this.boss.body.setCollideWorldBounds(true)
        this.bossHealth = 15
        this.bossVulnerable = false
        this.bossAttacking = false
        //boss.play('boss-stomp')
        this.inRangeCheck = false

        //player
        player = this.physics.add.sprite(120, height-38, 'player').setOrigin(0,1).setScale(4)
        player.body.setCollideWorldBounds(true)
        this.inAir = false
        this.maxJumpVelocity = false
        this.playerHealth = 6

        this.playerX = 0
        this.playerY = 0

        this.playerHealth = 6

        this.cooldown = false
        this.attacking = false
        this.input.on('pointerdown', () => {
            if (!this.cooldown) {
                this.cooldown = true
                this.attacking = true
                player.anims.play(`player-attack`)
                player.once('animationcomplete', () => {
                    this.cooldown = false
                    this.attacking = false
                    player.anims.play(`player-attack`)
                    player.anims.stop()
                })
        }
        })


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

            if (player.y < 250) {
                //this.boss.setTint(0x00FF00)
                this.bossVulnerable = true
            }
            else {
                //this.boss.setTint(0xFFFFFF)
                this.bossVulnerable = false
            }
        }

        /*if (this.bossAttacking) {
            this.bossAttacking = false
            this.boss.anims.play('boss-attack')
        }*/
        

        this.physics.world.collide(player, this.ground, this.onGround, null, this)
        this.physics.world.overlap(player, this.boss, this.inRange, null, this)
        if (!this.bossAttacking && !this.attacking) {
            player.anims.play('player-idle')
            this.inRangeCheck = false
        }

        player.setVelocity(this.PLAYER_VELOCITY * this.playerX, this.PLAYER_VELOCITY * this.playerY)
        
        this.debug.text = this.bossAttacking + ' ' + this.maxJumpVelocity + ' ' + this.bossHealth + ' ' + this.playerHealth
    }

    onGround() {
        this.inAir = false
        this.maxJumpVelocity = false
        this.playerY = 0
    }

    inRange() {
        //console.log('in attack range')
        if (this.bossVulnerable && this.attacking) {
            //console.log('hurt boss')
            this.boss.setTint(0xFF8888)
            this.bossHealth--
            this.attacking = false
        } else {
            if (!this.bossVulnerable) {
                this.boss.setTint(0xFFFFFF)
            }
        }
        if (!this.bossVulnerable && !this.bossAttacking) {
            this.bossAttacking = true
            this.boss.anims.play('boss-attack')
            this.boss.once('animationcomplete', () => {
                player.anims.play('player-squashed')
                this.bossAttacking = false
            })
        }
        
    }
}