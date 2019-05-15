const APIUtil = {
    followUser: id => {
        this.followState = 'following';
        $.ajax({
            method: "POST",
            url: `/users/${this.userId}/follow`,
            dataType: "json"
        }).then(() => {
            this.followState = 'followed';
            this.render();
        });
    },

    unfollowUser: id => {
        this.followState = 'unfollowing';
        $.ajax({
            method: "DELETE",
            url: `/users/${this.userId}/follow`,
            dataType: "json"
        }).then(() => {
            this.followState = 'unfollowed';
            this.render();
        });
    }
};



module.exports = APIUtil;