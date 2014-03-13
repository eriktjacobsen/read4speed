function read4speed_init(){

    function offset_word (word)
    {
        if (typeof word != "string" || word == "")
        {
            return false;
        }
        // Figure out breaking point
        var split = 0;
        if (word.length == 1)
        {
            split = 1;
        } else if (word.length < 6)
        {
            if (word[1].match(/[^a-zA-Z]/) && word.length == 2)
            {
                split = 1;
            }else
            {
                split = 2;
            }
        } else if (word.length < 10)
        {
            split = 3;
        } else if (word.length < 14)
        {
            split = 4;
        }

        /* Set boxes equal to value */

        $(".read4speed .pre").text(word.substring(0,split-1));
        $(".read4speed .focus").text(word.substring(split-1,split));
        $(".read4speed .post").text(word.substring(split));


        /* Now Calculate Pixel Position */
        var start = 70;
        var pre   = $(".read4speed .pre").width();
        var focus = $(".read4speed .focus").width();

        //console.log("pre: " + pre);
        //console.log("focus: " + focus);

        focus = focus / 2;
        focus = focus.toFixed();

        var offset = (start - pre - focus);
        //console.log("offset: " + offset);

        $(".read4speed .word").css("left",offset);
    }

    function offset_peek (word)
    {
        if (typeof word != "string" || word == "")
        {
            return false;
        }
        // Figure out breaking point
        var split = 0;
        if (word.length == 1)
        {
            split = 1;
        } else if (word.length < 6)
        {
            if (word[1].match(/[^a-zA-Z]/) && word.length == 2)
            {
                split = 1;
            }else
            {
                split = 2;
            }
        } else if (word.length < 10)
        {
            split = 3;
        } else if (word.length < 14)
        {
            split = 4;
        }

        /* Set boxes equal to value */

        $(".read4speed .nextPre").text(word.substring(0,split-1));
        $(".read4speed .nextFocus").text(word.substring(split-1,split));
        $(".read4speed .nextPost").text(word.substring(split));


        /* Now Calculate Pixel Position */
        var start = 70;
        var pre   = $(".read4speed .nextPre").width();
        var focus = $(".read4speed .nextFocus").width();

        focus = focus / 2;
        focus = focus.toFixed();

        var offset = (start - pre - focus);
        //console.log("offset: " + offset);

        $(".read4speed .nextWord").css("left",offset);
    }

    function breakup_text( raw_text )
    {
        var raw_words = raw_text.split(/[\s]+/);

        var words = [];

        for (var i=0;i<raw_words.length;i++)
        {
            var line = raw_words[i].replace(/^\s+|\s+$/g, '');
            if (line == "" || line == "\t")
            {
                continue;
            } else if (line.length < 14)
            {
                words.push(line);
            } else
            {
                var start;
                var remain;

                if (line.match(/-/))
                {
                    var splitpoint = line.indexOf("-") + 1;

                    words.push(line.substring(0,splitpoint));
                    start  = splitpoint;
                    remain = line.length - splitpoint;
                }
                else
                {
                    words.push(line.substring(0,6)+"-");
                    start  = 6;
                    remain = line.length - 6;
                }

                while (remain > 8)
                {
                    if (line.substring(start,start+8).match(/-/))
                    {
                        var splitpoint = line.indexOf("-") + 1;

                        words.push(line.substring(start,start + splitpoint));
                        start  += splitpoint;
                        remain -= splitpoint;
                    }else
                    {
                        words.push(line.substring(start,start + 4) + "-");
                        start += 4;
                        remain -= 4;
                    }
                }
                words.push(line.substring(start));
            }
        }
        //console.debug(words);
        return words;
    }

    function increment_word ()
    {
        //console.log("idx: "+idx);
        //console.log("words.length: "+words.length);
        if (idx > -1 && idx < words.length - 1)
        {
            var prev_offset = $(".read4speed .word").css("left");
            idx++;
            offset_word(words[idx]);

            $(".read4speed .prevWord").text(words[idx-1]);
            $(".read4speed .prevWord").css("left",prev_offset);
            if (idx < words.length - 1)
            {
                offset_peek(words[idx+1]);
            }else
            {
                /* This means last word, so reset */
                $(".read4speed .nextPre").text("");
                $(".read4speed .nextFocus").text("");
                $(".read4speed .nextPost").text("");
                if (play == true)
                {
                    window.clearInterval(timer);
                    play = false;
                    $(".read4speed #toggle span").removeClass("glyphicon-pause");
                    $(".read4speed #toggle span").addClass("glyphicon-play");
                }
            }
        }else if (idx == -1)
        {
            $(".read4speed .prevWord").text("");
            idx++;
            offset_word(words[idx]);
            offset_peek(words[idx+1]);
        }
    }

    var idx = 0;

    console.log("Text: "+$(".read4speed #fullText").text());
    var words = breakup_text($(".read4speed #fullText").text());
    var play = false;

    $(window).load(function() {
        offset_word(words[0]);
    });

    var timer;
    $(".read4speed #toggle").click(function(){

        if (play == false)
        {
            var timing = 60 / $(".read4speed #speed").val() * 1000;
            //console.log("timing: "+timing);
            timer = window.setInterval(function(){increment_word();},timing);
            //console.debug(timer);
            play = true;
            $(".read4speed #toggle span").removeClass("glyphicon-play");
            $(".read4speed #toggle span").addClass("glyphicon-pause");
        }else
        {
            //console.log("Trying to Clear Timer");
            window.clearInterval(timer);
            console.debug(timer);
            play = false;
            $(".read4speed #toggle span").removeClass("glyphicon-pause");
            $(".read4speed #toggle span").addClass("glyphicon-play");
        }
    });

    $(".read4speed #rewind").click(function (){
        if (idx > 14)
        {
            idx -= 15;
        }else
        {
            idx = -1;
        }

        increment_word();
    });

    $(".read4speed #restart").click(function (){
        idx = -1;
        increment_word();
    });
    $(".read4speed #speed").change(function (){
        if (play == true)
        {
            var timing = 60 / $(".read4speed #speed").val() * 1000;
            window.clearInterval(timer);
            timer = window.setInterval(function(){increment_word();},timing);
        }
    });

    $(".read4speed #loadText").click(function(){
        if (play == true)
        {
            window.clearInterval(timer);
            play = false;
            $(".read4speed #toggle span").removeClass("glyphicon-pause");
            $(".read4speed #toggle span").addClass("glyphicon-play");
        }
        words = breakup_text($(".read4speed #newText").val());
        idx = -1;
        increment_word();
        $(".read4speed #newText").val("");
    });

    $(".read4speed #stepback").click(function(){
        if (idx > 0)
        {
            idx -= 2;
        }
        increment_word();
    });

    $(".read4speed #stepforward").click(function(){
        increment_word();
    });

    $(".read4speed #previews").click(function(){
        if ($(".read4speed #previews span").hasClass("glyphicon-eye-close"))
        {
            $(".read4speed #previews span").removeClass("glyphicon-eye-close");
            $(".read4speed #previews span").addClass("glyphicon-eye-open");

            $(".read4speed .prevWord").show();
            $(".read4speed .nextWord").show();
        }else
        {
            $(".read4speed #previews span").removeClass("glyphicon-eye-open");
            $(".read4speed #previews span").addClass("glyphicon-eye-close");

            $(".read4speed .prevWord").hide();
            $(".read4speed .nextWord").hide();
        }
    });

    function scrollContext()
    {
        //console.log("Scroll ["+$(".read4speed .contextContent").scrollTop()+"] Position ["+$(".read4speed .contextFocus").position().top+"]");

        var scroll   = $(".read4speed .contextContent").scrollTop();
        var position = $(".read4speed .contextFocus").position().top;
        var lineheight = parseInt($(".read4speed .contextContent").css('line-height'),10);

        /* Now, fine tune it */

        var i = 0
        while (($(".read4speed .contextFocus").position().top > 95 ||
                $(".read4speed .contextFocus").position().top < 75) && i++ < 5)
        {
            var scroll = $(".read4speed .contextContent").scrollTop();


            if ($(".read4speed .contextFocus").position().top > 95)
            {
                $(".read4speed .contextContent").scrollTop(scroll + lineheight);
            }else if ($(".read4speed .contextFocus").position().top < 75)
            {
                $(".read4speed .contextContent").scrollTop(scroll - lineheight);
            }

        }
    }

    function setContext(word_idx)
    {
        var pre_words  = words.slice(0, word_idx).join(" ");
        var post_words = words.slice(word_idx+1, words.length).join(" ");

        $(".read4speed .contextPre").text(pre_words);
        $(".read4speed .contextPost").text(post_words);
        $(".read4speed .contextFocus").text(words[word_idx]);
        scrollContext();
    }

    $(".read4speed #zoom").hover(function(){

        if (play == true)
        {
            window.clearInterval(timer);
        }
        setContext(idx);


        var percent    = 1 - (idx / words.length);
        var new_slider = Math.round(percent * 100);

        $(".read4speed #slider").slider( "option", "value", new_slider );

        $(".read4speed .context").show();
        $(".read4speed .contextContent").scrollTop($(".read4speed .contextFocus").position().top - 85);
        scrollContext();
    },function(){
        if (play == true)
        {
            var timing = 60 / $(".read4speed #speed").val() * 1000;
            timer = window.setInterval(function(){increment_word();},timing);
        }
        $(".read4speed .context").fadeOut()
    });

    $(".read4speed .context").hover(function(){
        if (play == true)
        {
            window.clearInterval(timer);
            play = false;
            $(".read4speed #toggle span").removeClass("glyphicon-pause");
            $(".read4speed #toggle span").addClass("glyphicon-play");
        }
        $(".read4speed .context").stop();
        $(".read4speed .context").show(0);

    },function(){
        $(".read4speed .context").fadeOut()
    });

    function refreshContext()
    {
        var percent = 1 - $(".read4speed #slider").slider("value") / 100;

        var new_idx = Math.round(words.length * percent);
        setContext(new_idx);
        idx = new_idx - 1;
        increment_word();
    }

    $( "#slider" ).slider({
        slide: refreshContext,
        //change: refreshContext,
        orientation: "vertical",
        value: 100
    });

    $(document).bind('keyup', 'space', function(){
        if (play == false)
        {
            var timing = 60 / $(".read4speed #speed").val() * 1000;
            timer = window.setInterval(function(){increment_word();},timing);
            play = true;
            $(".read4speed #toggle span").removeClass("glyphicon-play");
            $(".read4speed #toggle span").addClass("glyphicon-pause");
        }else
        {
            window.clearInterval(timer);
            play = false;
            $(".read4speed #toggle span").removeClass("glyphicon-pause");
            $(".read4speed #toggle span").addClass("glyphicon-play");
        }
    });

    $(document).bind('keydown', 'down', function(){
        increment_word();
    });

    $(document).bind('keydown', 'right', function(){
        increment_word();
    });

    $(document).bind('keydown', 'up', function(){
        idx -= 2;
        increment_word();
    });

    $(document).bind('keydown', 'left', function(){
        idx -= 2;
        increment_word();
    });


}
