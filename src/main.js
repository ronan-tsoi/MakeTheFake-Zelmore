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
            debug: true
        }
    },
    scene: [ Load , Title , Play , GameOver]
}

let game = new Phaser.Game(config)

let keyLEFT, keyRIGHT, keySPACE
let cursors
let { height, width , debug} = game.config

let hero
let boss

let textConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    color: '#FFFFFF',
    padding: {
        top: 5,
        bottom: 5,
    }
}

