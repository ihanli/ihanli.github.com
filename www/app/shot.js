define(
	[
		'paper'
	],
	function( paper ) {
		'use strict';

		var _scale = 0.4;

		var _movements = [];

		var _shots = [];

		var _symbol;

		var Shot = function() {
			if (!( this instanceof Shot )) {
            	throw new TypeError( "Shot constructor can't be called as a function." );
        	}

        	var group,
        		mask = paper.Path.Rectangle( { size: Shot.SIZE } ),
	        	sprite = new paper.Raster( {
					source: '/images/sheet.png',
					position: [ -346, 282 ]
				} );

			group = new paper.Group( mask, sprite );
			group.clipped = true;
			group.bounds.size = Shot.SIZE;
			group.scale( _scale );

			_symbol = new paper.Symbol( group );
			group.remove();
		};

		Shot.SIZE = new paper.Size( 10, 54 );

		Shot.VELOCITY = 20;

		Shot.scaled_width = function() {
			return Shot.SIZE.width * _scale;
		};

		Shot.scaled_height = function() {
			return Shot.SIZE.height * _scale;
		};

		Shot.prototype.shots = function() {
			return _shots;
		};

		Shot.prototype.add = function( position, rotation, center ) {
			var shot = _symbol.place( position ),
				y_axis = new paper.Point( 0, Shot.VELOCITY );

			shot.rotate( rotation, center );
			y_axis.angle -= shot.rotation;
			y_axis.y *= -1;

			_movements.push( y_axis );
			_shots.push( shot );
		};

		Shot.prototype.move = function( index ) {
			_shots[ index ].translate( _movements[ index ] );
		};

		Shot.prototype.movement = function( index ) {
			return _movements[ index ];
		};

		Shot.prototype.movements = function() {
			return _movements;
		};

		return Shot;
	}
);