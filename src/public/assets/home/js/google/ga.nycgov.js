var _gaq = _gaq || [];

//not in use
//determine where we are and send request using appropriate id
/* var hostname = new RegExp("dev-web");
var on_nyc_gov = hostname.test(window.location);
if (on_nyc_gov) {
	_gaq.push(['_setAccount', 'xxxxx']);	
} else {
	_gaq.push(['_setAccount', 'yyyyy']);
} */	

_gaq.push(['_setAccount', 'UA-44670436-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; 
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 
'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; 
s.parentNode.insertBefore(ga, s);
})();


// *** GA4 Configuration ***
// check env
if (window.location.host.indexOf("nyc.gov") != -1) {
	// set ID for NYC.gov
	var GA4_ID = "G-X0W5WYPG3G";
} else {
	// set ID for csc.nycnet
	var GA4_ID = "G-RX85E7KWD4";
}

// load script and initialize GA4
var ga=document.createElement("script"); ga.async=true; ga.src="https://www.googletagmanager.com/gtag/js?id="+GA4_ID;   
var ga2=document.getElementsByTagName("script")[0]; ga2.parentNode.insertBefore(ga,ga2);

window.dataLayer = window.dataLayer || []; 
function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); 
gtag('config', GA4_ID); 