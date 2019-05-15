let FollowToggle = require('./follow_toggle.js');

$( () => {
    $('button').each( (index, el) => {
        new FollowToggle($(el));
    });
} );