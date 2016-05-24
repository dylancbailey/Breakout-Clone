// Create the state that will contain the whole game
var mainState = {
  preload: function() {
    // Preload assets
    game.load.image('paddle', 'assets/paddle_10.png');
    game.load.image('brick', 'assets/tileOrange_01.png');
    game.load.image('ball', 'assets/ballYellow_10.png');
  },
  create: function() {
    // enable FPS
    game.time.advancedTiming = true;

    // Create the game
    game.stage.backgroundColor = '#3598db';
    // Start the physucs system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // Add the physics to all game objects
    game.world.enableBody = true;

    // create the left/right arrow keys
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    // Add the paddle at the bottom of the screen
    this.paddle = game.add.sprite(200, 400, 'paddle');

    // Scale down the sprite
    this.paddle.scale.x = 0.15;
    this.paddle.scale.y = 0.15;

    // Set the anchor of the paddle
    this.paddle.anchor.setTo(0.5, 0.5);

    // Make sure the paddle won't move when it hits the ball
    this.paddle.body.immovable = true;

    // Create a group that will contain all the bricks
    this.bricks = game.add.group();
    this.bricks.x = 35;
    this.bricks.y = 50;

    // Set the scale of the bricks
    this.bricks.scale.x = 0.3;
    this.bricks.scale.y = 0.3;

    // Add 25 bricks to the group (5 columns and 5 lines)
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        // Create the brick at the correct position
        var brick = game.add.sprite(55+i*200, 55+j*100, 'brick');

        // Make sure the brick won't move when the ball hits it
        brick.body.immovable = true;

        // Add the brick to the group
        this.bricks.add(brick);
      }
    }

    // Add the ball
    this.ball = game.add.sprite(200, 375, 'ball');

    // Set balls size
    this.ball.scale.x = 0.2;
    this.ball.scale.y = 0.2;

    // Set the balls anchor
    this.ball.anchor.setTo(0.5, 0.5);

    // Give the ball initial speed
    this.ball.body.velocity.x = 200;
    this.ball.body.velocity.y = 200;

    // Make sure the ball will bounce when colliding
    this.ball.body.bounce.setTo(1);
    this.ball.body.collideWorldBounds = true;

  },
  update: function() {
    // Update every 60 times per second

    // Move the paddle left/right when an arrow key is pressed
    if (this.left.isDown) {
      this.paddle.body.velocity.x = -300;
    } else if (this.right.isDown) {
      this.paddle.body.velocity.x = 300;
    } else {
      // Stop the paddle when no keys are pressed
      this.paddle.body.velocity.x = 0;
    }

  },

  render: function() {
      game.debug.text(game.time.fps, 2, 14, '#fff');
  },
};

// Initialize the game and start the state
var game = new Phaser.Game(400, 450, Phaser.AUTO);
game.state.add('main', mainState);
game.state.start('main');
