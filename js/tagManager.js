window.dataLayer = window.dataLayer || [];

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TC389TN');

window.addEventListener('load', function() {
	const button = document.getElementById('openjsworld');
	if (button) {
		button.addEventListener('click', function() {
			dataLayer.push({'event': 'openjsword'});
			window.open('https://openjsworld2020.sched.com/event/bwIo?iframe=no', '_blank');
		});
	}

	const button2 = document.getElementById('getstarted')
	if (button2) {
		button2.addEventListener('click', function() {
			dataLayer.push({'event': 'getstarted'});
		});
	}

	const button3 = document.getElementById('contribute')
	if (button3) {
		button3.addEventListener('click', function() {
			dataLayer.push({'event': 'contribute'});
		});
	}

	const button4 = document.getElementById('codeInstall')
	if (button4) {
		button4.addEventListener('click', function() {
			dataLayer.push({'event': 'codeInstall'});
		});
	}
});