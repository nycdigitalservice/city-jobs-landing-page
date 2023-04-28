<div class="event-detail">
    <div class="event-detail-row hidden-phone clearfix">
        <div class="clearfix">
            <div class="detail">    
                <div class="location">
                    <h5><a href="{{permalink}}">{{name}}</a></h5>
                    <strong><span class="date">{{datePart}}, {{timePart}}</span></strong>
                    <p><span class="address">{{address}}, {{city}}</span></p>
                </div>     
            </div>
        </div>
        <div class="share clearfix">
            <a href="#" target="_blank"><span class="facebook_custom" data-url="{{permalink}}" data-title="{{name}}"></span></a>
			<a href="#" target="_blank"><span class="twitter_custom" data-url="{{permalink}}" data-title="{{name}}"></span></a>
			<a href="#" target="_blank"><span class='googleplus_custom' data-url='{{permalink}}' data-title="{{name}}"></span></a>
			<a href="#" target="_blank"><span class='tumblr_custom' data-url='{{permalink}}' data-title="{{name}}"></span></a>
			<a href="#"><span class="email_custom"  data-url='{{permalink}}' data-title="{{name}}"></span></a>            
            <label>Share</label>
        </div> 
    </div>
</div>
{{#if extendedDate}}{{parse_extended_date extendedDate}}{{/if}}
{{parse_desc desc}}
