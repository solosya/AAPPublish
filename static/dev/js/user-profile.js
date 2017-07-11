(function ($) {
        
    $('.FollowUnfollowBlog, .followBlog').on('click', function (e) {
        e.preventDefault();
        var obj = $(this);
        var blogGuid = $(obj).data('guid');
        var status = $(obj).data('status');
        var state = (status === 'unfollow') ? 'follow' : 'unfollow';
        $.fn.followBlog({
            blogGuid: blogGuid,
            onSuccess: function (data) {
                $(obj).data('status', state);  
                var status = $(obj).data('status');
                $(obj).get(0).lastChild.nodeValue = " " + status.substr(0,1).toUpperCase()+status.substr(1);
                ($(obj).data('status') === 'follow') ? $(obj).html("Follow") : $(obj).html("Unfollow");
                var message = ($(obj).data('status') === 'follow') ? 'Blog unfollowed successfully' : 'Blog followed successfully';
                noty({
                    type: 'success',
                    text: message,
                    layout: 'topRight',
                    timeout: 2000,
                    dismissQueue: true,
                    animation: {
                        open: 'animated bounceInRight', // jQuery animate function property object
                        close: 'animated bounceOutRight', // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });               
            },
            beforeSend: function (obj) {
                $(obj).html('please wait...');
            }
        });
    });
    
    $('.FollowProfileUser, .followWriter, .followUser').on('click', function (e) {
        e.preventDefault();
        var obj = $(this);
        var userGuid = $(obj).data('guid');
        var status = $(obj).data('status');
        var state = (status === 'unfollow') ? 'follow' : 'unfollow';
        $.fn.followUser({
            userGuid: userGuid,
            onSuccess: function (data) {
                $(obj).data('status', state);  
                var status = $(obj).data('status');
                $(obj).get(0).lastChild.nodeValue = " " + status.substr(0,1).toUpperCase()+status.substr(1);
                ($(obj).data('status') === 'follow') ? $(obj).html("Follow") : $(obj).html("Unfollow");
                var message = ($(obj).data('status') === 'follow') ? 'User unfollowed successfully' : 'User followed successfully';
                noty({
                    type: 'success',
                    text: message,
                    layout: 'topRight',
                    timeout: 2000,
                    dismissQueue: true,
                    animation: {
                        open: 'animated bounceInRight', // jQuery animate function property object
                        close: 'animated bounceOutRight', // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                }); 
            },
            beforeSend: function (obj) {
                $(obj).html('please wait...');
            }
        });
    });
    
    

}(jQuery));


    


