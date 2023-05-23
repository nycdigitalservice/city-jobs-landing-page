$(function() {
    $("#theForm").submit(function() {
        var finalInput = $("#subj").val().split(" ").join("||");
        location = "https://a127-jobs.nyc.gov/index_new.html?keyword=" + encodeURIComponent(finalInput);
        return false;
    });
});

$('#linkVid1').click(function(event) {
    var src = '/assets/home/videos/jobs/video1.mp4';
    $('#ex1 iframe').attr('src', src);
    $("#ex1").modally();
});

if($('div.modally').length>0){
console.log("has modal div");
    $('div.modally').on($.modally.BEFORE_CLOSE, function(event, modal) {
      $('#ex1 iframe').attr('src', "about:blank");
    });
}

$('#accordion').find('.accordion-toggle').click(function(){
    //Expand or collapse this panel
    $(this).next().slideToggle('fast');
    //Hide the other panels
    $(".accordion-content").not($(this).next()).slideUp('fast');
});

$('#accordion2').find('.accordion-toggle').click(function(){
    //Expand or collapse this panel
    $(this).next().slideToggle('fast');
    //Hide the other panels
    $(".accordion-content").not($(this).next()).slideUp('fast');
});

function showSubTopic(theTopic){
    if(theTopic=="Job Search"||theTopic=="Job Requirements"||theTopic=="Application Submission"||theTopic=="Pre-Employment Forms"||theTopic=="Website Error"){
        var theSub='<div class="container"><div class="span12"><div class="control-group"><label class="control-label">Subtopic<span class="required"></span>';
        theSub=theSub+'<select name="Subtopic" ><option value=""></option>';
        if(theTopic=="Job Search"){
            theSub=theSub+'<option value="Cannot Find Posting">Cannot Find Posting</option>';
        }else if(theTopic=="Job Requirements"){
            theSub=theSub+'<option value="Eligibility Requirements">Eligibility Requirements</option>';
            theSub=theSub+'<option value="Residency Requirements">Residency Requirements</option>';
        }else if(theTopic=="Application Submission"){
            theSub=theSub+'<option value="Application Help">Application Help</option>';
            theSub=theSub+'<option value="Resume/Cover Letter Upload">Resume/Cover Letter Upload</option>';
            theSub=theSub+'<option value="Email Confirmation">Email Confirmation</option>';
        }else if(theTopic=="Pre-Employment Forms"){
            theSub=theSub+'<option value="No Notification">No Notification</option>';
            theSub=theSub+'<option value="Unable to Save">Unable to Save</option>';
        }else if(theTopic=="Website Error"){
            theSub=theSub+'<option value="Prefix Error">Prefix Error</option>';
        }
        theSub=theSub+'</select></label></div></div></div>';
        $("#subtopic").html(theSub);
    }else{
        $("#subtopic").html("");
    }
}
