javascript:(function(e,a,g,h,f,c,b,d){
    if(!(f=e.jQuery)||g>f.fn.jquery||h(f))
    {
        c=a.createElement("script");
        c.type="text/javascript";
        c.src="http://ajax.googleapis.com/ajax/libs/jquery/"+g+"/jquery.min.js";
        c.onload=c.onreadystatechange=function(){
            if(!b&&(!(d=this.readyState)||d=="loaded"||d=="complete"))
            {
                h((f=e.jQuery).noConflict(1),b=1);
                f(c).remove()
            }
        };
        a.documentElement.childNodes[0].appendChild(c)
    }
})(window,document,"1.11.0",function($,L){
    /* YOUR JQUERY CODE GOES HERE */
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "http://eriktjacobsen.github.io/read4speed/css/bootstrap.min.css"
    }).appendTo("head");
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "http://eriktjacobsen.github.io/read4speed/css/speed.css"
    }).appendTo("head");
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "http://eriktjacobsen.github.io/read4speed/css/jquery-ui-1.10.4.custom.min.css"
    }).appendTo("head");
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz"
    }).appendTo("head");
    /*
    $.getScript( "http://eriktjacobsen.github.io/read4speed/js/bootstrap.min.js" );
    $.getScript( "http://eriktjacobsen.github.io/read4speed/js/jquery-ui-1.10.4.custom.min.js" );
    $.getScript( "http://eriktjacobsen.github.io/read4speed/js/jquery.hotkeys.min.js" );
    $.getScript( "http://eriktjacobsen.github.io/read4speed/js/speed.js" );
    */
    $.getScript( "http://eriktjacobsen.github.io/read4speed/js/combined.js",function(){
        $("<div>", {
            style: "height:288px;width:281px;z-index:1500;position:fixed;left:400px;top:25px;"
        }).addClass("read4speed").prependTo("body");
        $(".read4speed").draggable();

        $(".read4speed").load("http://eriktjacobsen.github.io/read4speed/module.html",function(){
            read4speed_init();
        });

    });

});

