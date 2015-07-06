"use strict";

window.Config = (function () {
    var child = {
        name: 'Aubrey',
        birthday: new Date('June 23, 2008 00:00:00'),
        addRange: 20,
        multRange: 10,
    };

    var prompts = [
        'Okay, here\'s a good one!',
        'This one is tough!',
        'Lets see if you can handle this one!',
        'Hmm, might be a little tricky!',
        'I think you can get this one!'
    ];

    var successes = [
        'Nice!',
        'Well done!',
        'Way to go!',
        'Amazing!',
        'Great job!',
        'Excellent!'
    ];

    var failures = [
        'Try again.',
        'No, not quite.',
        'Sorry, no.',
        'That isn\'t it.',
    ];

    return {
        child,
        prompts,
        successes,
        failures
    };
})();
