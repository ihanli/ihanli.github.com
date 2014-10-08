define(
	[
		'paper',
		'app/explosion'
	],
	function( paper, Explosion ) {
		'use strict';

		var letters = [];

		var _explosions = [];

		var Text = function( x, y, content ) {
			if (!( this instanceof Text )) {
            	throw new TypeError( "Text constructor can't be called as a function." );
        	}

        	var i,
        		letter,
        		len = content.length;

			for (i = 0; i < len; i++) {
				letter = new paper.PointText( {
					point: [x + i * Text.SPACING, y],
					content: content[ i ],
					fillColor: 'white'
				} );

				letters.push( letter );
				_explosions.push( Explosion.add( letter.position ) );
			}
		};

		Text.SPACING = 10;

		Text.prototype.starts_with = function( letter ) {
			return letters[0].content === letter;
		};

		Text.prototype.letter_position = function() {
			return new paper.Point( letters[0].position.x, letters[0].position.y );
		};

		Text.prototype.remove_letter = function( index ) {
			var x = _explosions.splice( index, 1 )[0];

			x.attach( 'frame', Explosion.start_animation );
			letters[ index ].remove();
			letters.splice( index, 1 );
		};

		Text.prototype.first_letter = function() {
			return letters.length ? letters[0].content : '';
		};

		Text.prototype.letters_available = function() {
			return !!letters.length;
		};

		Text.prototype.letter_object = function() {
			return letters.length ? letters[0] : null;
		};

		Text.prototype.letter = function( index ) {
			return letters.length ? letters[ index ] : null;
		};

		return Text;
	}
);