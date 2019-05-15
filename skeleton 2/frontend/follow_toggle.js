const APITUtil = require('./api_util.js');

class FollowToggle {
    constructor($el) {
        this.el = $el;
        this.userId = $el.data('user-id');
        this.followState = $el.data('initial-follow-state');
        this.render = this.render.bind(this);
        // this.handleClick = this.handleClick.bind(this, e)
        this.render();
        this.el.on('click', this.handleClick.bind(this));
    }

    //followState = unfollowed => followed

    render() {
        if (this.followState === 'following' || 'unfollowing') {
            this.el.prop("disabled", true);

        } else if (this.followState === 'unfollowed') {
            this.el.text('Follow!');
            this.el.prop("disabled", false);
            
        } else if (this.followState === 'followed') {
            this.el.text('UnFollow!');
            this.el.prop("disabled", false);
        }
    }

    handleClick(e) {
        console.log('clicked');
        e.preventDefault();

        if (this.followState === 'unfollowed') {
            return APIUtil.followUser(this.userId).bind(this);

        } else if (this.followState === 'followed') {
            return APIUtil.unfollowUser(this.userId).bind(this);
        }
    }
}


module.exports = FollowToggle;