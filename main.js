// Global variables
var game = new Phaser.Game(480, 320, Phaser.AUTO, null,
    {preload: preload, create: create, update: update});
var ball;

function preload() {

  // Scales the game and aligns it to the middle
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;

  // Add the background color
  game.stage.backgroundColor = "#eee";

  // Load the ball
  game.load.image('ball', 'assets/ball.png');
}

function create() {

  // Create the physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Create the ball
  ball = game.add.sprite(50, 50, 'ball');
  // Add physics to the ball
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  // Allow the ball to collide with the edges of the screen
  ball.body.collideWorldBounds = true;
  // Enable bounce
  ball.body.bounce.set(1);
  // Move the ball via velocity
  ball.body.velocity.set(150, 150);

}

function update() {


}
