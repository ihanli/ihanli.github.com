define(
	[
		'paper',
		'app/shot',
		'app/explosion'
	],
	function( paper, Shot, Explosion ) {
		'use strict';

		var _scale = 3;

		var y_axis = new paper.Point( 0, 1 );

		var _prev_rotation = 0;

		var _shot;

		var Ship = function( pos ) {
			if (!( this instanceof Ship )) {
            	throw new TypeError( "Ship constructor can't be called as a function." );
        	}

        	this._width;
        	this._height;
			this._explosion;
        	this._group = new paper.Group();

			var that = this,
				sprite = new paper.Raster( {
					source: '/images/sheet.png',
					position: [ 368, 220 ],
					opacity: 0
				} );

			sprite.onLoad = function() {
				var mask = paper.Path.Rectangle( { size: Ship.SIZE } );

				this.opacity = 1;

				that._group.addChild( mask );
				that._group.addChild( sprite );
				that._group.clipped = true;
				that._group.bounds.size = Ship.SIZE;
				that._group.scale( _scale );
				that._group.position = pos;
				that._group.rotate( 180, that.position() );

				that._width = that._group.children[0].bounds.width;
				that._height = that._group.children[0].bounds.height;

				that._explosion = Explosion.add( new paper.Point(
					that.position().x - 2 * that.width() - 1, that.position().y - 5.5 * that.height()
				) );
				that._explosion.scale( 2.5 );
			};

			_shot = new Shot();
		};

		Ship.SIZE = new paper.Size( 102, 85 );

		Ship.scaled_width = function() {
			return Ship.SIZE.width / _scale;
		};

		Ship.prototype.width = function() {
			return this._width ? this._width : ( Ship.SIZE.width / _scale );
		};

		Ship.prototype.height = function() {
			return this._height ? this._height : ( Ship.SIZE.height / _scale );
		};

		Ship.prototype.distance = function( asteroid ) {
			return this.position().getDistance( asteroid.position() );
		};

		Ship.prototype.position = function( pos ) {
			if (pos !== undefined && pos) {
				this.group.position = pos;
			};

			return this._group.children.length ? this._group.children[0].position : new paper.Point( 0, 0 );
		};

		Ship.prototype.directed_angle = function( point ) {
			return y_axis.getDirectedAngle( new paper.Point( point.x - this.position().x, this.position().y - point.y ) );
		};

		Ship.prototype.rotate = function( angle ) {
			this._group.rotate( angle - _prev_rotation, this.position() );
			_prev_rotation = angle;
		};

		Ship.prototype.shoot = function() {
			_shot.add(
				new paper.Point( this.position().x - 120, this.position().y + 2 * _shot.height() + 5 ),
				_prev_rotation,
				this.position()
			);
		};

		Ship.prototype.move_shot = function( index ) {
			_shot.move( index );
		};

		Ship.prototype.move_shot_to = function( index, pos ) {
			return _shot.position( index, pos );
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

		Ship.prototype.shot_movement = function( index ) {
			return _shot.movement( index );
		};

		Ship.prototype.remove = function() {
			this._explosion.attach( 'frame', Explosion.start_animation );
			this._group.remove();
		};

		return Ship;
	}
);