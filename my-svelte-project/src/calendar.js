let calendar_val = null;
let all_event = null;
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
		displayEventTime: false, // イベントの時刻を非表示にする
    });
    calendar.render();
	calendar_val = calendar;
});






// イベント表示
function show_event(){
	    // イベントを一括で取り出す
	var events = calendar_val.getEvents();
    events.forEach(function(event) {
        // console.log('Title: ' + event.title + ', Start: ' + event.start);
        console.log({"event": event, "event.title": event.title, "event.start": event.start});
    });
	all_event = events;
}
function add_event(Title="+", Date){
	// let date = new Date();
	// plus_day ? date.setDate(date.getDate() + plus_day) : null;
	calendar_val.addEvent({
		title: Title,
		allDay: false,
		start: Date,
	});
	show_event();
}

function delete_event(date){
    var events = calendar_val.getEvents();
    events.forEach(function(event) {
        if(event.start.getFullYear() === date.getFullYear() &&
           event.start.getMonth() === date.getMonth() &&
           event.start.getDate() === date.getDate() 
			//    秒まで一致しているか
		   &&
		   event.start.getHours() === date.getHours() &&
		   event.start.getMinutes() === date.getMinutes() &&
		   event.start.getSeconds() === date.getSeconds()
		){
			event.remove();
        }
    });
}




<button on:click={() => add_event()}>add_event</button>
<button on:click={() => show_event()}>show_event</button>


<!-- debag用(HTMLと変数をバインドしないとchromeのconsoleでapp.$$.ctxで表示されないため) -->
<span>{all_event}</span>
<span>{calendar_val}</span>

<!-- {#if dev_mode === false}
	<div id='calendar'></div>
{/if} -->
















#calendar{
	width: 100%;
	/* height: 20rem; */
	/* zindex -1 */
	z-index: -1;
}
