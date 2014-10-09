define(
	[
		'paper',
		'app/text',
		'app/explosion'
	],
	function( paper, Text, Explosion ) {
		'use strict';

		var _scale = 0.3;

		var _group;

		var _mask;

		var _position;

		var _text;

		var _explosion;

		var _movement;

		var Asteroid = function( x, y, text ) {
			if (!( this instanceof Asteroid )) {
            	throw new TypeError( "Asteroid constructor can't be called as a function." );
        	}

        	var corrected_y = Asteroid.scaled_height() / 2 + y,
				sprite = new paper.Raster( {
					source: '/images/sheet.png',
					position: [ -4, -219 ]
				} );

			_mask = paper.Path.Rectangle( { size: Asteroid.SIZE } );

			_position = new paper.Point( x, corrected_y );
			_group = new paper.Group( _mask, sprite );
			_group.clipped = true;
			_group.bounds.size = Asteroid.SIZE;
			_group.scale( _scale );
			_group.position = _position;

			_text = new Text( x - text.length * Text.SPACING / 2, corrected_y + Asteroid.scaled_height() / 2 + 14, text );
			_explosion = Explosion.add( _position );
			_explosion.scale( 1.5 );

			_movement = new paper.Point( 0, Asteroid.VELOCITY );
			_movement.angle += Math.floor( Math.random() * 21 - 10 );
		};

		Asteroid.SIZE = new paper.Size( 88, 80 );

		Asteroid.VELOCITY = 3;

		Asteroid.scaled_width = function() {
			return Asteroid.SIZE.width * _scale;
		};

		Asteroid.scaled_height = function() {
			return Asteroid.SIZE.height * _scale;
		};

		Asteroid.prototype.rotate = function() {
			_group.rotate( 2, _mask.position );
		};

		Asteroid.prototype.position = function() {
			return _position;
		};

		Asteroid.prototype.remove = function() {
			_explosion.attach( 'frame', Explosion.start_animation );
			_group.remove();
		};

		Asteroid.prototype.text = function() {
			return _text;
		};

		Asteroid.prototype.move = function() {
			_group.translate( _movement );
			_explosion.translate( _movement );
			_text.move( _movement );
		};

		return Asteroid;
	}
);