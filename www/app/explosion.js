define(
	[
		'paper'
	],
	function( paper ) {
		'use strict';

		var _scale = 0.4;

		var Explosion = function() {
			if (!( this instanceof Explosion )) {
            	throw new TypeError( "Explosion constructor can't be called as a function." );
        	}
		};

		Explosion.SIZE = new paper.Size( 46, 46 );

		Explosion.start_animation = function() {
			if (this.opacity) {
				this.remove();
			}
			else {
				this.opacity = 1;
			}
		};

		Explosion.add = function( position ) {
			var mask = paper.Path.Rectangle( { size: Explosion.SIZE } ),
				sprite = new paper.Raster( {
					source: '/images/sheet.png',
					position: [ -69, -149 ]
				} ),
				group = new paper.Group( mask, sprite );

			group.clipped = true;
			group.bounds.size = Explosion.SIZE;
			group.scale( _scale );
			group.opacity = 0;
			group.position = position;

			return group;
		};

		return Explosion;
	}
);