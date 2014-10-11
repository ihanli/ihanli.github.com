define(
	[
		'paper',
		'app/ship',
		'app/asteroid',
		'app/shot'
	],
	function( paper, Ship, Asteroid, Shot ) {
		'use strict';

		var shifted_origin = new paper.Point( 132, 121 );

		/*
		 * @type {integer}
		 */
		var stroke_width = 5;

		var asteroids = [];

		var tool = new paper.Tool();

		var released = true;

		var target = null;

		var ship;

		var target_index;

		var sort_by_distance = function( a, b ) {
			var da = ship.distance( a ),
				db = ship.distance( b );

			return ( ( da < db ) ? -1 : ( ( da > db ) ? 1 : 0 ) );
		};

		var set_target = function( event ) {
			if (released) {
				var i, len;

				released = false;

				if (!target) {
					len = asteroids.length;

					for (i = 0; i < len; i++) {
						if (asteroids[ i ].text().starts_with( event.key )) {
							target = asteroids[ i ];
							target_index = i;
							break;
						}
					}
				}
			}
		};

		var shoot = function( event ) {
			var letter;

			if (target) {
				letter = target.text().letter( ship.shots().length );

				if (letter.content === event.key) {
					ship.rotate( -1 * ship.directed_angle( letter.position ) );
					ship.shoot();
				}
			}

			released = true;
		};

		var Field = function( x, y, width, height ) {
			if (!( this instanceof Field )) {
            	throw new TypeError( "Field constructor can't be called as a function." );
        	}

			/*
			 * @type {Path.Rectangle}
			 */
			var r = new paper.Path.Rectangle( {
				point: [ x, Math.floor( y + stroke_width / 2 ) ],
				size: [ width, height - stroke_width ],
				strokeColor: 'white',
				strokeWidth: stroke_width
			} );

			ship = new Ship( function() {
				ship.position( new paper.Point(
					x - 77 + ( width - ship.width() ) / 2 - stroke_width,
					y - 28 + height - 1.5 * ship.height() - 2 * stroke_width
				) );
			} );

			var asteroid = new Asteroid( function() {
				asteroid.position( new paper.Point(
					x + ( width - asteroid.width() ) / 2,
					y - 55 + 3 * stroke_width
				) );
			}, 'paperjs' );

			asteroids.push( asteroid );
			asteroids.sort( sort_by_distance );
			tool.onKeyDown = set_target;
			tool.onKeyUp = shoot;
		};

		Field.prototype.animate = function() {
			var i,
				next_pos,
				test_result,
				len = asteroids.length;

			for (i = 0; i < len; i++) {
				asteroids[ i ].rotate();
				asteroids[ i ].move();
			}

			for (i = 0; i <  ship.shots().length; i++) {
				next_pos = ship.next_step( i );

				if (next_pos.y < target.text().letter_position().y + shifted_origin.y) {
					ship.shot( i ).position.x = target.text().letter_position().x - shifted_origin.x;
					ship.shot( i ).position.y = target.text().letter_position().y + shifted_origin.y - ship.shot( i ).bounds.height / 2;
				}

				test_result = ship.shot( i ).hitTest( new paper.Point(
					target.text().letter_position().x, target.text().letter_position().y - shifted_origin.y
				) );

				if (test_result) {
					ship.remove_shot( i );
					target.text().remove_letter( i );
					i--;

					if (!target.text().letters_available()) {
						target.remove();
						asteroids.splice( target_index, 1 );
						target = null;
					}
				}
				else {
					ship.move_shot( i );
				}
			}
		};

		return Field;
	}
);