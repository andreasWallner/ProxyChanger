var buttons = require('sdk/ui/button/action');
var pref = require('sdk/preferences/service');
var sp = require('sdk/simple-prefs')
var _ = require('sdk/l10n').get;

// firefox uses the setting network.proxy.type
// to distinguish the currently configured proxy
// 0 ... no proxy
// 4 ... auto
// 5 ... system proxy
// 1 ... manual

function getIcon(proxy) {
	if(proxy == 0)
		return {
			'16': './proxy-16.png',
			'32': './proxy-32.png',
			'64': './proxy-64.png'
		};
	else
		return {
			'16': './proxy-enabled-16.png',
			'32': './proxy-enabled-32.png',
			'64': './proxy-enabled-64.png'
		};
}

function getBadge(proxy) {
	switch(proxy) {
		case 0: return null;
		case 1: return 'M';
		case 4: return 'A';
		case 5: return 'S';
	}
}

var button = buttons.ActionButton({
	id: 'proxy-toggle',
	label: _('button_label'),
	icon: getIcon(pref.get('network.proxy.type')),
	badge: getBadge(pref.get('network.proxy.type')),
	onClick: function(state) {
		var proxy = pref.get('network.proxy.type');
		if(proxy == 0)
			proxy = sp.prefs.enabledState * 1;
		else
			proxy = 0;

		pref.set('network.proxy.type', proxy);
		button.state("window", {
			icon: getIcon(proxy),
			badge: getBadge(proxy)
		});
	}
});
