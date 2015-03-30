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

		var WORDS = {
			piupiu: ['rails', 'raphaeljs', 'processing', 'canvas', 'html5', 'wordless', 'communication', 'storytelling', 'graph', 'tree']
		};

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
			var letter,
				time,
				v;

			if (target) {
				letter = target.text().letter( ship.shots().length );

				if (letter.content === event.key) {
					var dp = letter.position.subtract( ship.position() ),
						cosinus = Math.cos( ( target.movement().angle - 90 ) * Math.PI / 180 ),
						d2v = Math.pow( Shot.VELOCITY, 2 ) - Math.pow( Asteroid.VELOCITY, 2 ),
						a = -2 * dp.length * Asteroid.VELOCITY * cosinus,
						divisor = 2 * d2v,
						sqrt = Math.sqrt( Math.pow( 2 * dp.length * Asteroid.VELOCITY * cosinus, 2 ) + 4 * Math.pow( dp.length, 2 ) * d2v ),
						t = ( a + sqrt ) / divisor,
						t2 = ( a - sqrt ) / divisor;

					// Take the lowest positive value
					if (t < 0) {
						t = t2;
					}
					else if (t > 0 && t2 > 0) {
						t = Math.min( t, t2 );
					}

					ship.rotate( -1 * ship.directed_angle( letter.position.add( target.movement().multiply( t ) ) ) );
					ship.shoot();
				}
			}

			released = true;
		};

		var Field = function( x, y, width, height ) {
			if (!( this instanceof Field )) {
            	throw new TypeError( "Field constructor can't be called as a function." );
        	}

			var i,
				angle,
				asteroid,
				pos,
				ship_pos,
				project = window.location.href.match( /\?level=([a-zA-Z]{3,})(&|$)/ )[1],
				len = WORDS[ project ].length,
				r = new paper.Path.Rectangle( {
					point: [ x, Math.floor( y + stroke_width / 2 ) ],
					size: [ width, height - stroke_width ],
					strokeColor: 'white',
					strokeWidth: stroke_width
				} );

			ship_pos = new paper.Point(
				x + shifted_origin.x - 37 + ( width - Ship.scaled_width() ) / 2 + 2 * stroke_width,
				y + height
			);
			ship = new Ship( ship_pos );

			for (i = 0; i < 2; i++) {
				pos = new paper.Point(
					Math.floor( Math.random() * (width - 2 * Asteroid.scaled_width()) + x + Asteroid.scaled_width() ),
					y - 55 + 3 * stroke_width
				);
				angle = Math.ceil( 180 / Math.PI * Math.atan( (ship_pos.y - pos.y) / (ship_pos.x - pos.x) ) );

				asteroids.push( new Asteroid( pos, WORDS[ project ][ i ], angle < 0 ? angle + 180 : angle ) );
			}

			/*ship = new Ship( function() {
				ship.position( new paper.Point(
					x + shifted_origin.x - 37 + ( width - ship.width() ) / 2 + 2 * stroke_width,
					y + height
				) );

						var pos = new paper.Point(
								Math.floor( Math.random() * (width - 2 * Asteroid.scaled_width()) + x + Asteroid.scaled_width() ),
								y - 55 + 3 * stroke_width
							),
							angle = Math.ceil( 180 / Math.PI * Math.atan( (ship.position().y - pos.y) / (ship.position().x - pos.x) ) );

						if (angle < 0) {
							angle += 180;
						}

				for (i = 0; i < 2; i++) {
					asteroid = new Asteroid( function() {

						//asteroid.position( pos );

						asteroid.angle( angle );
					}, WORDS[ project ][ i ], pos );

					asteroids.push( asteroid );
				}
			} );*/

			asteroids.sort( sort_by_distance );
			tool.onKeyDown = set_target;
			tool.onKeyUp = shoot;
		};

		Field.prototype.animate = function() {
			var i, j, l,
				next_pos,
				test_result,
				len = asteroids.length;

			for (i = 0; i < len; i++) {
				if (asteroids[ i ].position().x > 0 && ship.position().x > 0) {
					next_pos = asteroids[ i ].position().add( asteroids[ i ].movement() );

					if (asteroids[ i ].position().getDistance( ship.position() ) < (ship.height() / 3 + asteroids[ i ].height() / 3)) {
						for (j = 0; j < ship.shots().length; j++) {
							ship.remove_shot( j );
						}

						while (asteroids[ i ].text().letter_object()) {
							asteroids[ i ].text().remove_letter( 0 );
						}

						ship.remove();
						asteroids.splice( i, 1 )[0].remove();

						continue;
					}
				}

				asteroids[ i ].rotate();
				asteroids[ i ].move();
			}

			for (i = 0; i <  ship.shots().length; i++) {
				next_pos = ship.next_step( i );

				if (next_pos.y < target.text().letter_position().y + shifted_origin.y) {
					ship.move_shot_to( i, target.text().letter_position() );
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