let config = {
    type: Phaser.AUTO,
    // scale x4
    width: 864,
    height: 384,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Load , Title , Play , GameOver, Credits, SuddenDeath, Tutorial]
}

let game = new Phaser.Game(config)

let keyLEFT, keyRIGHT, keySPACE
let cursors
let { height, width , debug} = game.config

let hero
let boss

let player
let time
let healthbonus
let bgm

