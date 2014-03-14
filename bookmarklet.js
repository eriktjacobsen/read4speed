javascript:(function(e,a,g,h,f,c,b,d){
    if(!(f=e.jQuery)||g>f.fn.jquery||h(f))
    {
        c=a.createElement("script");
        c.type="text/javascript";
        c.src="https://ajax.googleapis.com/ajax/libs/jquery/"+g+"/jquery.min.js";
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
        href: "https://eriktjacobsen.github.io/read4speed/css/bootstrap.min.css"
    }).appendTo("head");
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://eriktjacobsen.github.io/read4speed/css/speed.css"
    }).appendTo("head");
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://eriktjacobsen.github.io/read4speed/css/jquery-ui-1.10.4.custom.min.css"
    }).appendTo("head");
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz"
    }).appendTo("head");

    $('<div class="read4speed" style="height:288px;width:285px;z-index:1500;position:fixed;left:400px;top:25px;"><div class="reader"><div class="row"><div class="prevBox"><span class="prevWord"></span></div></div><div class="row"><div class="wordBox"><span class="word"><span class="pre">We</span><span class="focus" style="color:red">l</span><span class="post">come</span></span></div></div><div class="row"><div class="nextBox"><span class="nextWord"><span class="nextPre"></span><span class="nextFocus"></span><span class="nextPost"></span></span></div></div><div class="row control-top"><button type="button" id="restart" class="btn btn-default"><span class="glyphicon glyphicon-fast-backward"></span></button><button type="button" id="stepback" class="btn btn-default"><span class="glyphicon glyphicon-step-backward"></span></button><button type="button" id="toggle" class="btn btn-default"><span class="glyphicon glyphicon-play"></span></button><button type="button" id="stepforward" class="btn btn-default"><span class="glyphicon glyphicon-step-forward"></span></button><button type="button" id="rewind" class="btn btn-default"><span class="glyphicon glyphicon-repeat"></span></button></div><div class="row control-bottom form-inline"><button type="button" id="previews" class="btn btn-default"><span class="glyphicon glyphicon-eye-open"></span></button><button type="button" id="zoom" class="btn btn-default"><span class="glyphicon glyphicon-zoom-in"></span></button><div class="context" style="display:none"><div class="contextContent"><span class="contextPre"></span> <span class="contextFocus"></span> <span class="contextPost"></span></div><div id="slider"></div></div><select id="speed" class="form-control"><option>250</option><option>300</option><option>400</option><option>500</option><option>600</option><option>700</option><option>800</option><option>900</option><option>1000</option></select></div><div class="row"><div class="input-group"><input type="text" class="form-control" id="newText"><span class="input-group-btn"><button id="loadText" class="btn btn-default" type="button">Load</button></span></div><!-- /input-group --></div></div></div>').prependTo("body");
    $.getScript( "https://eriktjacobsen.github.io/read4speed/js/combined.js",function(){
        $(".read4speed").draggable();
        read4speed_init();
    });
});

