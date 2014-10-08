define(
	[
		'paper',
		'app/shot'
	],
	function( paper, Shot ) {
		'use strict';

		var _scale = 0.3;

		var y_axis = new paper.Point( 0, 1 );

		var group;

		var _position;

		var mask;

		var _prev_rotation = 0;

		var _shot;

		var Ship = function( x, y ) {
			if (!( this instanceof Ship )) {
            	throw new TypeError( "Ship constructor can't be called as a function." );
        	}

			var sprite = new paper.Raster( {
				source: '/images/sheet.png',
				position: [ 368, 220 ]
			} );

			mask = paper.Path.Rectangle( { size: Ship.SIZE } );

			_position = new paper.Point( x, Ship.scaled_height() / 2 + y );
			group = new paper.Group( mask, sprite );
			group.clipped = true;
			group.bounds.size = Ship.SIZE;
			group.scale( _scale );
			group.rotate( 180 );
			group.position = _position;

			_shot = new Shot();
		};

		Ship.SIZE = new paper.Size( 102, 85 );

		Ship.scaled_width = function() {
			return Ship.SIZE.width * _scale;
		};

		Ship.scaled_height = function() {
			return Ship.SIZE.height * _scale;
		};

		Ship.prototype.distance = function( asteroid ) {
			return _position.getDistance( asteroid.position() );
		};

		Ship.prototype.position = function() {
			return _position;
		};

		Ship.prototype.directed_angle = function( point ) {
			return y_axis.getDirectedAngle( new paper.Point( point.x - _position.x, _position.y - point.y ) );
		};

		Ship.prototype.rotate = function( angle ) {
			group.rotate( angle - _prev_rotation, mask.position );
			_prev_rotation = angle;
		};

		Ship.prototype.shoot = function() {
			_shot.add(
				new paper.Point( _position.x, _position.y - Shot.scaled_height() - 5 ),
				_prev_rotation,
				mask.position
			);
		};

		Ship.prototype.move_shot = function( index ) {
			_shot.move( index );
		};

		Ship.prototype.shots = function() {
			return _shot.shots();
		};

		Ship.prototype.shot = function( index ) {
			return _shot.shots()[ index ];
		};

		Ship.prototype.remove_shot = function( index ) {
			_shot.shots()[ index ].remove();
			_shot.shots().splice( 0, 1 );
			_shot.movements().splice( 0, 1 );
		};

		Ship.prototype.next_step = function( index ) {
			return _shot.shots()[ index ].position.add( _shot.movement( index ) );
		};

		return Ship;
	}
);