export default {
  gameWidth: 1200,
  gameHeight: 720,
  localStorageName: 'phaseres6webpack',
  webfonts: ['Bangers', 'Chinese Dragon'],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
},
  physics: {
    default: "matter",
    matter: {
        debug: true,
        showBody: true,
        showStaticBody: true
    },
    gravity: {
        y: 30
    }
  },
  plugins: {
    scene: [
        {
            plugin: PhaserMatterCollisionPlugin, //The plugin class
            key: "matterCollision", //Where to store in Scene.systems, such as scene.sys.matterCollision
            mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
        }
        // {
        //     plugin: AnimatedTiles, //The plugin class
        //     key: "AnimatedTiles", //Where to store in Scene.systems, such as scene.sys.matterCollision
        //     mapping: "AnimatedTiles" // Where to store in the Scene, e.g. scene.matterCollision
        // }
    ]
  }
}
