
var jqmBox = $({});
jqmBox.extend({

	popup: null,

	tmpl: '<div data-role="popup" id="jqmBox" data-theme="c" class="ui-corner-all [cssClasses]">'+
				'<p class="jqmbox-message"></p></div>',

	tmplConfirmButtons: '<div><a>Yes</a> <a class="jqmbox-close">No</a></div>',

	body: function(cssClasses) {
		cssClasses = cssClasses || '';
		var self = this;
		var popup = $.mobile.activePage.find('#jqmBox');
			popup.remove();
		// if(popup.size() === 0) {
			var htmlContent = this.tmpl.replace('[cssClasses]', cssClasses);
			popup = $(htmlContent);
			$.mobile.activePage.append(popup);
			popup.popup({ transition: "pop", overlayTheme: "a" });
			popup.popup({
				afterclose: function( event, ui ) {
					// alert('afterclose');
					self.trigger('jqmboxclose');
				}
			});
		// }	

		this.popup = popup;
		return popup;
	},

	setClass: function(classNameArgs) {
		if(this.popup !== null) {
			for(var i=0; i<arguments.length; i++) {
				this.popup.addClass(arguments[0]);
			}
		}
	},

	dismissable: function(popup) {
		var self = this;
		popup.find('.jqmbox-dismiss, .jqmbox-close').click(function() {
			popup.popup('close');
			// self.trigger('jqmboxclose');
		});
	},

	info: function(message) {
		var popup = this.body('jqmbox-info');
			popup.find('.jqmbox-message').html(message);
			popup.popup('open');
			this.dismissable(popup);
	},

	alert: function(message) {
		var popup = this.body('jqmbox-alert');
			popup.find('.jqmbox-message').html(message);
			popup.popup('open');
			this.dismissable(popup);
	},

	error: function(message) {
		var popup = this.body('jqmbox-error');
			popup.find('.jqmbox-message').html(message);
			popup.popup('open');
			this.dismissable(popup);
	},

	confirm: function(message, accept, cancel) {
		var response = confirm(message);
		if(response === true) {
			callback = accept;
		} else {
			callback = cancel;
		}

		if(typeof callback == 'function') {
			callback.apply(null);
		}

		// var confirmButtons = $(this.tmplConfirmButtons);
		// var popup = this.body('jqmbox-confirm');
		// 	popup.find('.jqmbox-message').html(message);
		// 	popup.find('.jqmbox-message').after(confirmButtons);
		// 	popup.popup('open');

		// 	this.dismissable(popup);
	}
});
