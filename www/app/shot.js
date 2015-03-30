define(
	[
		'paper'
	],
	function( paper ) {
		'use strict';

		var _scale = 4;

		var _shots = [];

		var _movements = [];

		var Shot = function() {
			if (!( this instanceof Shot )) {
            	throw new TypeError( "Shot constructor can't be called as a function." );
        	}

        	this._symbol;
        	this._width;
        	this._height;

        	var that = this,
        		group = new paper.Group(),
        		mask = paper.Path.Rectangle( { size: Shot.SIZE } ),
	        	sprite = new paper.Raster( {
					source: '/images/sheet.png',
					position: [ -346, 282 ],
					opacity: 0
				} );

			sprite.onLoad = function() {
				this.opacity = 1;

				group.addChild( mask );
				group.addChild( sprite );
				group.clipped = true;
				group.bounds.size = Shot.SIZE;
				group.scale( _scale );

				that._width = group.children[0].bounds.width;
				that._height = group.children[0].bounds.height;

				that._symbol = new paper.Symbol( group );
				group.remove();
			};
		};

		Shot.SIZE = new paper.Size( 88, 80 );

		Shot.VELOCITY = 15;

		Shot.scaled_width = function() {
			return Shot.SIZE.width * _scale;
		};

		Shot.scaled_height = function() {
			return Shot.SIZE.height * _scale;
		};

		Shot.prototype.width = function() {
			return this._width;
		};

		Shot.prototype.height = function() {
			return this._height;
		};

		Shot.prototype.shots = function() {
			return _shots;
		};

		Shot.prototype.position = function( index, pos ) {
			if (pos !== undefined && pos) {
				_shots[ index ].position = pos;
			}

			return _shots[ index ].position;
		};

		Shot.prototype.add = function( position, rotation, center ) {
			var shot = this._symbol.place( position ),
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