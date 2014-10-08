require(
	[
		'paper',
		'app/field'
	],
	function( paper, Field ) {
		'use strict';

		paper.project = new paper.Project( 'canvas' );

		/**
		 * @type {integer}
		 */
		var width = Math.floor( paper.view.size.height * 9 / 16 );

		/**
		 * @type {integer}
		 */
		var x = Math.floor( ( paper.view.size.width - width ) / 2 );

		/**
		 * @type {Field}
		 */
		var field = new Field( x, 0, width, paper.view.size.height );

		//paper.project.options.hitTolerance = 0;

		paper.view.onFrame = function() {
			field.animate();
		};
	}
);