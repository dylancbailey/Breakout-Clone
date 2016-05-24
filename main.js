// Global variables
var game = new Phaser.Game(480, 320, Phaser.AUTO, null,
    {preload: preload, create: create, update: update});
var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;
var scoreText;
var score = 0;
var lives = 3;
var livesText;
var lifeLostText;

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
  game.load.image('brick', 'assets/brick.png');

  // Load spritesheet
  game.load.spritesheet('ball', 'assets/wobble.png', 20, 20);
}

function create() {

  // Create the physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Create the ball
  ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
  ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);
  // Set its anchor
  ball.anchor.setTo(0.5);
  // Add physics to the ball
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  // Allow the ball to collide with the edges of the screen
  ball.body.collideWorldBounds = true;
  // Disable collision with the bottom edge
  game.physics.arcade.checkCollision.down = false;
  // Check bounds and alert game over
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(ballLeaveScreen, this);
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

  // Create the bricks
  initBricks();

  // Create the score/style
  textStyle = { font: '18px Arial', fill: '#0095DD' };
  scoreText = game.add.text(5, 5, 'Points: 0', textStyle);

  // Create the lives text
  livesText = game.add.text(game.world.width-5, 5, 'Lives: ' + lives, textStyle);
  livesText.anchor.set(1,0);
  lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, click to continue.', textStyle);
  lifeLostText.anchor.set(0.5);
  lifeLostText.visible = false;

}

function update() {

  // Check for a collision between the ball/paddle and brick/ball
  game.physics.arcade.collide(ball, paddle, ballHitPaddle);
  game.physics.arcade.collide(ball, bricks, ballHitBrick);

  // User input for paddle and sets it to the middle on start
  paddle.x = game.input.x || game.world.width*0.5;

}

// Holds all the information we need to create the bricks
function initBricks() {
  brickInfo = {
      width: 50,
      height: 20,
      count: {
          row: 7,
          col: 3
      },
      offset: {
          top: 50,
          left: 60
      },
      padding: 10
  }

  // Create an empty group
  bricks = game.add.group();

  for (c = 0; c < brickInfo.count.col; c++) {
    for (r = 0; r < brickInfo.count.row; r++) {
      // Create a new brick and add it to the group
      var brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
      var brickY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
      newBrick = game.add.sprite(brickX, brickY, 'brick');
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(0.5);
      bricks.add(newBrick);
    }
  }
}

function ballHitBrick(ball, brick) {
  // Play animations when the ball collides with brick
  ball.animations.play('wobble');

  // Add a tween to smoothly fade out brick
  var killTween = game.add.tween(brick.scale);

  // to() dfines the states of the object at the end of the tween
  // to(scale value, time, easing);
  killTween.to({ x:0, y:0 }, 150, Phaser.Easing.Linear.None);
  killTween.onComplete.addOnce(function() {
    brick.kill();
  }, this);
  killTween.start();

  // Incrument score by 10 per brick
  score += 10;
  scoreText.setText('Points: ' + score);

  // Check if no bricks are left and display win text
  var count_alive = 0;
  for (i = 0; i < bricks.children.length; i++) {
    if (bricks.children[i].alive == true) {
      count_alive++;
    }
  }

  if (count_alive == 0) {
    alert('You won the game!');
    location.reload();
  }
}

function ballLeaveScreen() {
  lives--;
  if (lives) {
    livesText.setText('Lives: ' + lives);
    lifeLostText.visible = true;
    ball.reset(game.world.width*0.5, game.world.height-25);
    paddle.reset(game.world.width*0.5, game.world.height-5);
    game.input.onDown.addOnce(function() {
      lifeLostText.visible = false;
      ball.body.velocity.set(150, -150);
    }, this);
  } else {
    alert('You lost! :(');
    location.reload();
  }
}

function ballHitPaddle(ball, paddle) {
  ball.animations.play('wobble');
}
