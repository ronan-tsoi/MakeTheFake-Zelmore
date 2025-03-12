class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }
    init() {
        this.HERO_VELOCITY = 450
        this.BOSS_VELOCITY = 300
    }
    create() {

        cursors = this.input.keyboard.addKeys(
            {
            A:Phaser.Input.Keyboard.KeyCodes.A,
            D:Phaser.Input.Keyboard.KeyCodes.D,
            //SPACE:Phaser.Input.Keyboard.KeyCodes.SPACE,
            F:Phaser.Input.Keyboard.KeyCodes.F,
            W:Phaser.Input.Keyboard.KeyCodes.W,
            S:Phaser.Input.Keyboard.KeyCodes.S,
            LEFT:Phaser.Input.Keyboard.KeyCodes.LEFT,
            RIGHT:Phaser.Input.Keyboard.KeyCodes.RIGHT
        })

        //bg
        //this.bgsky = this.add.sprite(0,height, 'title-0').setOrigin(0,1)
        this.bgsky = this.add.tileSprite(0,height, 864, 384, 'title-0').setOrigin(0,1)
        this.bgmountains = this.add.sprite(0,height, 'title-1').setOrigin(0,1)
        this.bgtrees = this.add.sprite(0, height, 'trees').setOrigin(0,1).setScale(4)
        this.bgwalls = this.add.sprite(0, height, 'walls').setOrigin(0,1).setScale(4)

        this.ground = this.physics.add.sprite(0, height, 'ground').setOrigin(0,1).setScale(4)
        this.ground.body.setImmovable(true)
        
        //boss
        boss = this.physics.add.sprite(width-380, height-38, 'boss', 0).setOrigin(0,1).setScale(4)
        boss.body.setCollideWorldBounds(true)
        this.bossHealth = 12
        this.bossVulnerable = false
        this.bossAttacking = false
        //boss.play('boss-stomp')
        this.inRangeCheck = false

        this.bossX = 0
        this.bossY = 0

        //hero
        hero = this.physics.add.sprite(120, height-38, 'hero').setOrigin(0,1).setScale(4)
        hero.body.setCollideWorldBounds(true)
        this.inAir = false
        this.maxJumpVelocity = false
        this.heroHealth = 6

        this.heroX = 0
        this.heroY = 0

        this.health = this.add.sprite(20,20, 'hearts-6').setOrigin(0,0).setScale(4)
        this.heroHealth = 6

        this.cooldown = false
        this.attacking = false
        this.input.keyboard.on('keydown-F', () => {
            if (!this.cooldown) {
                this.cooldown = true
                this.attacking = true
                hero.anims.play(`hero-attack`)
                this.sound.play('attack')
                hero.once('animationcomplete', () => {
                    this.cooldown = false
                    this.attacking = false
                    hero.anims.play(`hero-attack`)
                    hero.anims.stop()
                })
        }
        })


        //this.add.text(10, 10, 'boss scene', textConfig)
        this.showDebugText = true
        this.debug = this.add.text(10, 50, '', textConfig)
        this.controls = this.add.text(width-200, 10, 'H toggle debug', {
            fontFamily: 'Courier',
            fontSize: '18px',
            color: '#FFFFFF',
            padding: {
                top: 5,
                bottom: 5,
            }
        })
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.input.keyboard.on('keydown-H', function() {
            this.showDebugText = this.showDebugText ? false : true
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

    }
    update() {
        this.bgsky.tilePositionX += 0.2

        if (cursors.A.isDown) {
            this.heroX = -1
            hero.setFlipX(true)
            hero.anims.play('hero-walk', true)
        } else if (cursors.D.isDown) {
            this.heroX = 1
            hero.setFlipX(false)
            hero.anims.play('hero-walk', true)
        } else {
            this.heroX = 0
        }
        if (cursors.W.isDown) {
            if (!this.maxJumpVelocity) {
                this.heroY -= 0.4
            }
            this.inAir = true

            if (this.heroY <= -1.8) {
                this.maxJumpVelocity = true
            }
        }

        if (cursors.LEFT.isDown) {
            this.bossX = -1
            boss.setFlipX(false)
            boss.anims.play('boss-walk', true)
        } else if (cursors.RIGHT.isDown) {
            this.bossX = 1
            boss.setFlipX(true)
            boss.anims.play('boss-walk', true)
        } else {
            this.bossX = 0
        }

        if (this.inAir) {
            this.heroY += 0.1

            if (hero.y < 250) {
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
        

        this.physics.world.collide(hero, this.ground, this.onGround, null, this)
        this.physics.world.overlap(hero, boss, this.inRange, null, this)
        if (!this.bossAttacking && !this.attacking) {
            //hero.anims.play('hero-idle')
            this.inRangeCheck = false
        }

        hero.setVelocity(this.HERO_VELOCITY * this.heroX, this.HERO_VELOCITY * this.heroY)
        boss.setVelocity(this.BOSS_VELOCITY * this.bossX, this.HERO_VELOCITY * this.bossY)

        
        //this.debug.text = this.bossAttacking + ' ' + this.maxJumpVelocity + ' ' + this.bossHealth + ' ' + this.heroHealth
        if (this.showDebugText) {
            this.debug.text = 'Boss Health: ' + this.bossHealth
        } else {
            this.debug.text = ''
        }
    }

    onGround() {
        this.inAir = false
        this.maxJumpVelocity = false
        this.heroY = 0
        hero.y = height-36
    }

    inRange() {
        //console.log('in attack range')
        if (this.bossVulnerable && this.attacking) {
            //console.log('hurt boss')
            //this.boss.setTint(0xFF8888)
            this.sound.play('hit')
            this.bossHealth--
            this.attacking = false
            if (this.bossHealth == 0) {
                boss.alpha = 0
                this.time.delayedCall(1500, () => {
                    this.scene.start('gameOverScene')
                })
            }
        } else {
            if (!this.bossVulnerable) {
                //this.boss.setTint(0xFFFFFF)
            }
        }
        if (!this.bossVulnerable && !this.bossAttacking) {
            this.bossAttacking = true
            boss.anims.play('boss-attack')
            boss.once('animationcomplete', () => {
                this.cameras.main.shake(300, .004)
                this.physics.world.overlap(hero, boss, this.landing, null, this)
                //hero.anims.play('hero-squashed')
                this.bossAttacking = false
            })
        }
        
    }
    landing() {
        this.heroHealth--
        this.sound.play('stomp')
        hero.anims.play('hero-squashed')
        if (this.heroHealth <= 0) {
            hero.alpha = 0
            this.time.delayedCall(1500, () => {
                this.scene.start('gameOverScene')
            })
        }
        else {
            this.health.setTexture('hearts-'+this.heroHealth)
        }
    }
}