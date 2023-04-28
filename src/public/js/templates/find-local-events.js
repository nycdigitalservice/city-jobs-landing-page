{{#each_with_index items}}<li class="event-item clearfix" data-index="{{index}}">
    <a href="{{item.permalink}}" name="event-item-{{event_item_index item}}">
        <div class="event-icon marker-{{marker_index item}}">
            <span class="event-id"></span>
        </div>
        <div class="event-data">
            <h4>{{item.name}}</h4>
            <label><strong>{{format_date item.startDate item.endDate item.timePart item.allDay}}</strong></label>
        </div>
    </a>
</li>{{/each_with_index}}