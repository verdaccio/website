window.dataLayer = window.dataLayer || [];

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TC389TN');

function addEvent(id, eventId, cb) {
	const button = document.getElementById(id);
	if (button) {
		button.addEventListener('click', function() {
			dataLayer.push({'event': eventId});
			if (cb) {
				cb();
			}
		});
	}
}

window.addEventListener('load', function() {
	addEvent('openjsworld', 'openjsworld', function() {
		window.open('https://openjsworld2020.sched.com/event/bwIo?iframe=no', '_blank');
	});
	addEvent('getstarted', 'getstarted');
	addEvent('contribute', 'contribute');
	addEvent('codeInstall', 'codeInstall');
	addEvent('goToGitHub', 'goToGitHub');
});