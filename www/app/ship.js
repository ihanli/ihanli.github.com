define(
	[
		'paper',
		'app/shot'
	],
	function( paper, Shot ) {
		'use strict';

		var _scale = 3;

		var y_axis = new paper.Point( 0, 1 );

		var _prev_rotation = 0;

		var _shot;

		var Ship = function( callback ) {
			if (!( this instanceof Ship )) {
            	throw new TypeError( "Ship constructor can't be called as a function." );
        	}

        	this.group = new paper.Group();

			var that = this,
				sprite = new paper.Raster( {
					source: '/images/sheet.png',
					position: [ 368, 220 ],
					opacity: 0
				} );

			sprite.onLoad = function() {
				var mask = paper.Path.Rectangle( { size: Ship.SIZE } );

				this.opacity = 1;

				that.group.addChild( mask );
				that.group.addChild( sprite );
				that.group.clipped = true;
				that.group.bounds.size = Ship.SIZE;
				that.group.scale( _scale );
				that.group.rotate( 180 );

				if (callback !== undefined && typeof callback === 'function') {
					callback();
				}
			};

			_shot = new Shot();
		};

		Ship.SIZE = new paper.Size( 102, 85 );

		Ship.prototype.width = function() {
			return this.group.children[0].bounds.width;
		};

		Ship.prototype.height = function() {
			return this.group.children[0].bounds.height;
		};

		Ship.prototype.distance = function( asteroid ) {
			return this.position().getDistance( asteroid.position() );
		};

		Ship.prototype.position = function( pos ) {
			if (pos !== undefined && pos) {
				this.group.position = pos;
			};

			return this.group.children[0].position;
		};

		Ship.prototype.directed_angle = function( point ) {
			return y_axis.getDirectedAngle( new paper.Point( point.x - this.position().x, this.position().y - point.y ) );
		};

		Ship.prototype.rotate = function( angle ) {
			this.group.rotate( angle - _prev_rotation, this.position() );
			_prev_rotation = angle;
		};

		Ship.prototype.shoot = function() {
			_shot.add(
				new paper.Point( this.position().x, this.position().y - Shot.scaled_height() ),
				_prev_rotation,
				this.position()
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