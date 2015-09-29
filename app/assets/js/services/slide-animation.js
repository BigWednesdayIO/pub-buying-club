function slideAnimation ($q, $timeout, Velocity) {
	var hideAnimation;

	return {
		removeClass: function(element, className, done) {
			// Showing
			function show () {
				return Velocity(element, 'slideDown', {
					duration: 300,
					easing: 'ease-in-out',
					complete: done
				});
			}

			$timeout(function() {
				// Ensures that addClass is acted upon first
				$q.when(hideAnimation)
					.then(show);
			}, 0);
		},
		addClass: function(element, className, done) {
			// Hiding
			hideAnimation = Velocity(element, 'slideUp', {
				duration: 300,
				easing: 'ease-in-out',
				complete: done
			});
		}
	};
}

angular
	.module('app')
	.animation('.animate-slide', slideAnimation);
