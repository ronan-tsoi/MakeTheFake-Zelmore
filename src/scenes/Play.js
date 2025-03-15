class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }
    init() {
        this.HERO_VELOCITY = 450
        this.BOSS_VELOCITY = 250
        this.TIMELIMIT = 3000
    }
    create() {

        cursors = this.input.keyboard.addKeys(
            {
            A:Phaser.Input.Keyboard.KeyCodes.A,
            D:Phaser.Input.Keyboard.KeyCodes.D,
            SPACE:Phaser.Input.Keyboard.KeyCodes.SPACE,
            SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,
            W:Phaser.Input.Keyboard.KeyCodes.W,
            S:Phaser.Input.Keyboard.KeyCodes.S,
            LEFT:Phaser.Input.Keyboard.KeyCodes.LEFT,
            RIGHT:Phaser.Input.Keyboard.KeyCodes.RIGHT,
            UP:Phaser.Input.Keyboard.KeyCodes.UP,
            DOWN:Phaser.Input.Keyboard.KeyCodes.DOWN
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
        //compound body
        this.bossHead = this.physics.add.sprite(boss.x + 104, boss.y-190).setOrigin(0,1)
        this.bossHead.setSize(240, 140)
        boss.body.setCollideWorldBounds(true)
        this.bossBody = this.physics.add.sprite(boss.x + 180, boss.y-84).setOrigin(0,1)
        this.bossBody.setSize(260, 200)
        this.bossGroup = this.add.group([this.bossHead, this.bossBody])
        this.bossHealth = 12
        this.bossVulnerable = false
        this.bossAttacking = false
        //boss.play('boss-stomp')
        this.inRangeCheck = false

        this.bossX = 0
        this.bossY = 0

        this.input.keyboard.on('keydown-DOWN', () => {
            this.bossX = 0
            if (!this.bossAttacking) {
                this.bossAttacking = true
                boss.anims.play('boss-attack')
                boss.once('animationcomplete', () => {
                    if (this.heroHealth > 1) {
                        this.cameras.main.shake(300, .004)
                    }
                    //this.cameras.main.shake(300, .004)
                    if (!this.bossVulnerable) {
                        this.physics.world.overlap(this.heroBody, boss, this.landing, null, this)
                    }
                    //this.physics.world.overlap(hero, boss, this.landing, null, this)
                    //hero.anims.play('hero-squashed')
                    this.bossAttacking = false
                })
            }
        })
        this.input.keyboard.on('keydown-UP', () => {
            this.bossX = 0
            if (!this.bossAttacking) {
                this.bossAttacking = true
                this.fireball = new Fireball(this, boss.x, 130)
                this.time.delayedCall(800, () => {
                    this.bossAttacking = false
                }, null, this)
            }
        })

        //hero
        hero = this.physics.add.sprite(120, height-38, 'hero').setOrigin(0,1).setScale(4)
        //compound body
        this.heroBody = this.physics.add.sprite(hero.x+12, hero.y-26).setOrigin(0,1)
        this.heroBody.setSize(56,80)
        this.heroAttackRange = this.physics.add.sprite(hero.x+32, hero.y-18).setOrigin(0,1)
        this.heroAttackRange.setSize(74,44)
        hero.body.setCollideWorldBounds(true)
        this.inAir = false
        this.maxJumpVelocity = false
        this.heroHealth = 6

        this.heroX = 0
        this.heroY = 0

        this.health = this.add.sprite(20,20, 'hearts-6').setOrigin(0,0).setScale(4)
        this.heroHealth = 6
        this.lowHealthTween = this.tweens.add({
            targets: this.health,
            duration: 50,
            repeat: -1,
            paused: true,
            yoyo: true,
            x: 24

        })

        this.cooldown = false
        this.attacking = false
        this.input.keyboard.on('keydown-SPACE', () => {
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

        this.clock = this.time.delayedCall(this.TIMELIMIT, () => {
            this.scene.start('suddenDeathScene')
        }, null, this)
        this.timerDisplay = this.add.bitmapText(width/2, 30, 'upheaval', '', 72, 1).setOrigin(0.5)


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

        //hero controls
        if (cursors.A.isDown) {
            this.heroX = -1
            hero.setFlipX(true)
            if (!this.attacking) {
                hero.anims.play('hero-walk', true)
            }
        } else if (cursors.D.isDown) {
            this.heroX = 1
            hero.setFlipX(false)
            if (!this.attacking) {
                hero.anims.play('hero-walk', true)
            }
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

        if (this.inAir) {
            this.heroY += 0.1

            if (hero.y < 250) {
                this.bossVulnerable = true
            }
            else {
                this.bossVulnerable = false
            }
        }

        //boss controls
        if (!this.bossAttacking) {
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
            if (cursors.UP.isDown) {
                this.bossX = 0
            }
        }

        this.physics.world.collide(hero, this.ground, this.onGround, null, this)
        this.physics.world.overlap(this.heroAttackRange, this.bossGroup, this.heroAttack, null, this)
        if (!this.bossAttacking && !this.attacking) {
            this.inRangeCheck = false
        }

        hero.setVelocity(this.HERO_VELOCITY * this.heroX, this.HERO_VELOCITY * this.heroY)
        this.heroBody.setVelocity(this.HERO_VELOCITY * this.heroX, this.HERO_VELOCITY * this.heroY)
        this.heroAttackRange.setVelocity(this.HERO_VELOCITY * this.heroX, this.HERO_VELOCITY * this.heroY)
        if (hero.flipX) {
            this.heroBody.x = hero.x+40
            this.heroAttackRange.x = hero.x+20
            this.heroBody.y = hero.y-26
            this.heroAttackRange.y = hero.y-18
        } else {
            this.heroBody.x = hero.x+12
            this.heroAttackRange.x = hero.x+32
            this.heroBody.y = hero.y-26
            this.heroAttackRange.y = hero.y-18
        }
        boss.setVelocity(this.BOSS_VELOCITY * this.bossX, this.HERO_VELOCITY * this.bossY)
        this.bossHead.setVelocity(this.BOSS_VELOCITY * this.bossX, this.HERO_VELOCITY * this.bossY)
        this.bossBody.setVelocity(this.BOSS_VELOCITY * this.bossX, this.HERO_VELOCITY * this.bossY)
        if (boss.flipX) {
            this.bossHead.x = boss.x + 216
            this.bossBody.x = boss.x + 138
        } else {
            this.bossHead.x = boss.x + 104
            this.bossBody.x = boss.x + 180
        }

        if (this.fireball) {
            this.fireball.update()
        }

        this.countdown = (this.TIMELIMIT/1000) - Math.round(this.clock.getElapsed()/1000)
        this.timerDisplay.text = this.countdown
        
        //this.debug.text = this.bossAttacking + ' ' + this.maxJumpVelocity + ' ' + this.bossHealth + ' ' + this.heroHealth
        if (this.showDebugText) {
            this.debug.text = this.bossHealth + '\n' + this.heroHealth
        } else {
            this.debug.text = ''
        }
    }

    onGround() {
        this.inAir = false
        this.maxJumpVelocity = false
        this.heroY = 0
        hero.y = height-36
        //this.heroBody.y = hero.y-26
        //this.heroAttackRange.y = hero.y-18
    }

    /*inRange() {
        //player attack
        if (this.bossVulnerable && this.attacking) {
            this.sound.play('hit')
            this.bossHealth--
            this.attacking = false
            if (this.bossHealth == 0) {
                this.cameras.main.shake(600, .02)
                boss.alpha = 0
                player = 'HERO'
                time = (this.TIMELIMIT/1000) - Math.round(this.clock.getElapsed()/1000)
                healthbonus = this.heroHealth*2
                this.time.delayedCall(1000, () => {
                    this.scene.start('gameOverScene')
                })
            }
        } 
        //boss attack
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
        
    }*/
    heroAttack() {
        //player attack
        if (this.attacking) {
            hero.anims.play(`hero-attack`)
            this.sound.play('hit')
            this.bossHealth--
            boss.setTint(0xFF6666)
            this.time.delayedCall(250, () => {
                boss.setTint(0XFFFFFF)
            })
            this.attacking = false
            if (this.bossHealth == 0) {
                this.cameras.main.shake(600, .02)
                boss.alpha = 0
                player = 'HERO'
                time = (this.TIMELIMIT/1000) - Math.round(this.clock.getElapsed()/1000)
                healthbonus = this.heroHealth*2
                this.time.delayedCall(1000, () => {
                    this.scene.start('gameOverScene')
                })
            }
        } 
    }
    landing() {
        this.heroHealth--
        this.sound.play('stomp')
        hero.anims.play('hero-squashed', true)
        hero.setTint(0xFF6666)
        this.time.delayedCall(400, () => {
            hero.setTint(0XFFFFFF)
        })
        if (this.heroHealth <= 0) {
            this.health.setTexture('hearts-0')
            this.cameras.main.shake(600, .02)
            hero.alpha = 0
            player = 'BOSS'
            time = (this.TIMELIMIT/1000) - Math.round(this.clock.getElapsed()/1000)
            healthbonus = this.bossHealth
            this.time.delayedCall(1000, () => {
                this.scene.start('gameOverScene')
            })
        }
        else {
            this.health.setTexture('hearts-'+this.heroHealth)
            if (this.heroHealth == 1) {
                this.lowHealthTween.restart()
                this.health.x = 20
            }
        }
    }
    etc() {

    }
}