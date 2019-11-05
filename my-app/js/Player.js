class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    const x = game.config.width / 2;
    const y = game.config.height / 1.2;

    super(scene, x, y, "pinkMonster");
  }
}
