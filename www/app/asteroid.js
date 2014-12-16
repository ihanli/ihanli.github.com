define(
	[
		'paper',
		'app/text',
		'app/explosion'
	],
	function( paper, Text, Explosion ) {
		'use strict';

		var _scale = 3.3;

		var _position;

		var _text;

		var _explosion;

		var Asteroid = function( callback, text ) {
			if (!( this instanceof Asteroid )) {
            	throw new TypeError( "Asteroid constructor can't be called as a function." );
        	}

        	this._explosion;
        	this._ready = false;
        	this._group = new paper.Group();
        	this._movement = new paper.Point( 0, Asteroid.VELOCITY );

        	var that = this,
				sprite = new paper.Raster( {
					source: '/images/sheet.png',
					position: [ -4, -219 ],
					opacity: 0
				} );

			sprite.onLoad = function() {
				var mask = paper.Path.Rectangle( { size: Asteroid.SIZE } );

				this.opacity = 1;

				that._group.addChild( mask );
				that._group.addChild( sprite );
				that._group.clipped = true;
				that._group.bounds.size = Asteroid.SIZE;
				that._group.scale( _scale );

				if (callback !== undefined && typeof callback === 'function') {
					callback();
				}

				that._explosion = Explosion.add( new paper.Point(
					that._group.position.x - that.width() + 2, that._group.position.y - 3
				) );
				that._explosion.scale( 1.5 );

				_text = new Text(
					that.position().x - text.length * Text.SPACING / 2,
					that.position().y + that.height() / 2 + 14, text
				);

				that._ready = true;
			};
		};

		Asteroid.SIZE = new paper.Size( 88, 80 );

		Asteroid.VELOCITY = 3;

		Asteroid.prototype.width = function() {
			return this._group.children[0].bounds.width;
		};

		Asteroid.prototype.height = function() {
			return this._group.children[0].bounds.height;
		};

		Asteroid.prototype.position = function( pos ) {
			if (pos !== undefined && pos) {
				this._group.position = pos;
			};

			return this._group.children.length ? this._group.children[0].position : null;
		};

		Asteroid.prototype.rotate = function() {
			if (this._ready) {
				this._group.rotate( 2, this.position() );
			}
		};

		Asteroid.prototype.remove = function() {
			this._explosion.attach( 'frame', Explosion.start_animation );
			this._group.remove();
		};

		Asteroid.prototype.text = function() {
			return _text;
		};

		Asteroid.prototype.move = function() {
			if (this._ready) {
				this._group.translate( this._movement );
				this._explosion.translate( this._movement );
				_text.move( this._movement );
			};
		};

		Asteroid.prototype.movement = function() {
			return this._movement;
		};

		Asteroid.prototype.angle = function( angle ) {
			this._movement.angle = angle;

			return this._movement.angle;
		};

		return Asteroid;
	}
);