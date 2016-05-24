// Global variables
var game = new Phaser.Game(480, 320, Phaser.AUTO, null,
    {preload: preload, create: create, update: update});
var ball;
var paddle;

function preload() {

  // Scales the game and aligns it to the middle
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;

  // Add the background color
  game.stage.backgroundColor = "#eee";

  // Load the images
  game.load.image('ball', 'assets/ball.png');
  game.load.image('paddle', 'assets/paddle.png');
}

function create() {

  // Create the physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Create the ball
  ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
  // Set its anchor
  ball.anchor.setTo(0.5);
  // Add physics to the ball
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  // Allow the ball to collide with the edges of the screen
  ball.body.collideWorldBounds = true;
  // Enable bounce
  ball.body.bounce.set(1);
  // Move the ball up via velocity
  ball.body.velocity.set(150, -150);

  // Create the paddle
  paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
  // Set the anchor to the middle
  paddle.anchor.setTo(0.5, 1);
  // Enable physics on the paddle
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  // Make paddle immovable
  paddle.body.immovable = true;

}

function update() {

  // Check for a collision between the ball and paddle
  game.physics.arcade.collide(ball, paddle);

  // User input for paddle and sets it to the middle on start
  paddle.x = game.input.x || game.world.width*0.5;

}
