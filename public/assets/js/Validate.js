class Validate {
	constructor() {
		this.success = true;
		this.error = this.form = this.auto = null;
	}

	autoForm (form, e = 1) {
		if (typeof form != "object") {
			this.error = 'this method expects the (this) object as argument!';
			return this;
		}
		// set the error to avoid the method giving error all the time;
		v.form = form;
		this.error = '';
		
		var f = this.form;
		var ftype = $(f).attr("enctype");
		var check = $(f).hasClass('validate-ignore');
		
		if (!check) {
			// disable the form from being submitted while validation is going on 
			this.disableBtn();
			this.validateTag(f, e);
			this.enableBtn();

			if (!this.error) {
				// check the form enctype here;
				if (this.empty(ftype)) this.auto = $(this.form).serialize();
				else this.auto = new FormData(this.form);
			}
		}
		return this;
	}

	validateTag(form, e) {
		$(form).children().each((i, tag) => {
			// loop through the elements
			switch (tag.tagName) {
				case 'INPUT':
					this.validateInput(tag);
				break;
				case 'SELECT':
					this.validateSelect(tag);
				break;
				case "TEXTAREA": 
					this.validateText(tag);
				break;
				default:
					this.validateTag(tag, e);
				break;
			} 
			if (this.error) {
				if (e == 1) return false;
			}
		});
	}

	validateInput (inp) {
		var name = $(inp).prev('label').html() || $(inp).next('label').html() || $(inp).attr('data-name') || $(inp).attr('name');
		var check = $(inp).hasClass('validate-ignore');
		if (!check) {
			if ($(inp).attr("data-validate")) {
				var json = $(inp).attr("data-validate");
				json = JSON.parse(json);
				this.dataValidate(inp, name, json);
			} else {
				var type = $(inp).attr('type');
				if (this.empty(inp)) this.error = name +" field cannot be empty!";
				else if (type == 'file') this.error = "Select a file to upload in " + name + "!";
				else {
					if (type == "number" || type == "tel") {
						if (isNaN(this.getInput(inp))) 
							this.error = 'Enter a numeric value for ' + name + '!';
					} else if (type == "email") {
						if (this.getInput(inp).indexOf('.') == -1 || this.getInput(inp).indexOf('@') == -1)
							this.error = 'Kindly provide a valid email address!';
					} else if (type == "checkbox") {
						name = "boxes";
						if (this.checkBox() === false) {
							this.error = "Select a value from the " + name + "!";
						}
					} else if (type == 'file') {
						var min = inp.attr('min');
						var max = inp.attr('max');
						var fc = this.fileCheck(inp);
						
						if (!this.empty(min) && !this.empty(max)) {
							if (fc < min)
								this.error = "Minimum of " + min + " files is required!"
							else if (fc > max)
								this.error = "Maximum of " + max + " files exceeded!";
						}
					}
				}
				if (this.error) this.pass = true;
			}
		}
		return this;
	}

	validateSelect (inp) {
		var name = $(inp).prev('label').html() || $(inp).next('label').html() || $(inp).attr('data-name') || $(inp).attr('name');
		var check = $(inp).hasClass('validate-ignore');

		if (!check) {
			if ($(inp).attr("data-validate")) {
				var json = $(inp).attr("data-validate");
				json = JSON.parse(json);
				this.dataValidate(inp, name, json);
				if (this.error) return;
			} else {
				if (this.empty(inp)) {
					this.error = "Select a value from " + name + "!";
				}
			}
			if (this.error) this.pass = true;
		}
		return this;
	}

	validateText (inp) {
		var name = $(inp).prev('label').html() || $(inp).next('label').html() || $(inp).attr('data-name') || $(inp).attr('name');
		var check = $(inp).hasClass('validate-ignore');

		if (!check) {
			if ($(inp).attr("data-validate")) {
				var json = $(inp).attr("data-validate");
				json = JSON.parse(json);
				this.dataValidate(inp, name, json);
				if (this.error) return;
			} else {
				if (this.empty(inp)) {
					this.error = name + "  field cannot be empty!";
				}
			}
			if (this.error) this.pass = true;
		}
		return this
	}

	dataValidate (input, name, rule) {
		if (!rule & !input) return false;
		if (typeof rule != 'object') return false;
		
		Object.keys(rule).forEach((r, i) => {
			if (this.error) return this.error;
			var con = this.getInput(input);
			switch (r) {
				case "required":
					if (this.empty(con)) this.error = name + ' field can not be empty!';
					break;
				case "email":
					if (con.indexOf('.') == -1 || con.indexOf('@') == -1) {
						this.error = 'Kindly provide a valid email address!';
					}
					break;
				case "number":
					if (isNaN(con)) {
						this.error = 'Enter a numeric value for ' + name + '!';
					}
					break;
				case "wordcount":
					var word = con.split(' ');
					if (Object.value(r) > word.length) {
						this.error = 'At least ' + rule[r] + ' word is required for ' + name;
					}
					break;
				case "min":
					if (typeof con == 'string')
						if (con.length < rule[r]) {
							this.error = 'Minimum of ' + rule[r] + ' chars is required for ' + name;
						}
					else if (typeof con == 'number')
						if (con < rule[r]) {
							this.error = name + ' should not be greater than ' + rule[r];
						}
					break;
				case "max":
					if (typeof con == 'string')
						if (con.length > rule[r]) {
							this.error = 'Minimum of ' + rule[r] + ' chars is required for ' + name;
						}
					else if (typeof con == 'number')
						if (con > rule[r]) {
							this.error = name + ' should not be greater than ' + rule[r];
						}
					break;
				case "match":
					if (!this.checkMatch(con, this.getInput(rule[r]))) {
						this.error = name + " do not match";
					}
					break;
				case "checkbox":
					if (this.checkBox() === false) {
						this.error = 'Select a value from ' + name;
					}
					break;
				case "file":
					if (!this.fileCheck(input)) {
						this.error = 'Kindly, select a file!';
					}
					break;
				case "fileMin":
					if (rule[r] > this.fileCheck(rule[r])) {
						this.error = 'Minimum of ' + val[c] + ' files is required!';
					}
					break;
				case "fileMax":
					if (this.fileCheck(rule[r]) > rule[r]) {
						this.error = 'Maximum of ' + rule[r] + ' files exceeded!';
					}
					break;
			}
			if (this.error) return this;
		});
	}

	// this method accepts only json from the server
	
	/**
	
	this method
	
	@param info === string or html object element
		in case you wanna use alert just use alert as an arg 'alert'
	@param code === object {toSend, success} 
		code to excute for $.ajax b4 and success 
	@param msg === object {ok, data}
		ok === message to show after successful request
		msg === where to display ajax result;
	@param r === redirection based on what the server is sending
		the server could return with {redirect: no-redirect or to any location on the server}
	*/

	withAuto (info = '.info', code = {toSend: '', success: ''}, msg = {ok: "Success!", data: ".result"}, r = '') {
		var ppt = {
			data: this.auto,
			beforeSend: () => {
				//(code.toSend)();
				if (info != "alert")
					info.html('Connecting to the server...');
				else
					alert('Connecting to the server...');

				if (msg.data) {
					$(msg.data).empty();
				}
			},
			success: e => {
				if (e.status == 'ok') {
					// checking options
					// run code on success
					(code.success)();
					// notify if alert or element
					if (info != 'alert')
						info.html(e.msg).css({"color": "#36a509"});
					else 
						alert(e.msg);
					// ends 
					
					// if data is requested from the server
					if (e.data) {
						info.empty();
						$(msg.data).html(e.data);
					}
					
					/* if the server issues a redirect in this case the server gives us 3 options
						1 = noredirect
						2 = true reload
						3 = location
					*/
					if (e.redirect === true)
						this.redirect();
					else if (e.redirect === 'noredirect')
						info.empty();
					else if (e.redirect)
						this.redirect(e.redirect);
				} else if (e.status === 'err'){
					// if the server does not send the error msg, fallback to default
					if (!e.msg) {
						if (info != 'alert')
								info.html(msg.err).css({'color': '#d80808', 'font-style': 'oblique'});
						else 
							alert(msg.err);
					} else {
						// server returns with err msg
						if (info != 'alert')
							info.html(e.msg).css({'color': '#d80808', 'font-style': 'oblique'});
						else
							alert(e.msg);
					}
				}
			},
			error: e => {
				if (e.status === 422) {
					info.html(Object.values(e.responseJSON.errors)[0]).css({'color': '#d80808', 'font-style': 'oblique'})
				} else if (e.status === 419)  {
					info.html('Csrf token has expired, refresh the page.').css({'color': '#d80808', 'font-style': 'oblique'})
				} else if (e.status === 500)  {
					info.html('Server error, contact Administrator!').css({'color': '#d80808', 'font-style': 'oblique'});
				} else if (e.status === 404) {
					info.html('The requested uri cannot be found on this server!').css({'color': '#d80808', 'font-style': 'oblique'});
				}	
			},
			type: 'post'
		}

		if (typeof v.auto == 'string')
			$.ajax(ppt);
		else
			$.ajax(ppt = {...ppt, contentType: false, processData: false, cache: false});
	}

	disableBtn (form = '') {
		if (form) $('#'+ form).find('button').attr('disabled', true);
		$(this.form).find('button').attr('disabled', true);
	}

	enableBtn (form) {
		if (form) $('#'+ form).find('button').attr('disabled', false);
		$(this.form).find('button').attr('disabled', false);
	}

	capFirst(str) {
		return str.replace(str, str[0].toUpperCase());
	}

	getInput(input) {
		if (typeof input == 'string') return $(input).val();
		else if (typeof input == 'object') return $(input).val();
		else return false;
	}

	empty(item) {
		if (typeof item == 'object') return this.empty(this.getInput(item));
		else if (typeof item == 'string')  {
			if (item == undefined || item == null || item.length == 0) return true;
			else if (item.trim().length == 0) return true;
			else return false
		} else if (typeof item == 'number') return getInput(item);
		else return true;	
	}

	checkBox(el) {
		if (this.empty($(el +':checked').val())) return false;
		else return true;
	}
	
	redirect(loc = '', delay = 2000) {
		if (loc === '') {
			setTimeout(() => {
				location.reload();
			}, delay);
		} else {
			setTimeout(() => {
				location = loc;
			}, delay);
		}
	}

	store(value, key) {
		var store = localStorage;
		if (typeof value === 'string') {
			switch (key) {
				case 'rm':
					store.removeItem(value);
					break;
				case 'get':
					return store.getItem(value);
			}
		} else {
			switch (key) {
				case 'set':
					store.setItem(value[0], value[1]);
					break;
			}
		}
	}

	checkMatch(field, toMatch) {
		var field = this.getInput(field);
		var toMatch = this.getInput(toMatch);

		if (field === toMatch) {
			return true;
		}
		return false;
	}

	fileCheck(field) {
		var f = $(field).get(0).files.length;
		if (f)
			return f;
		return false;
	}

	err () {
		return this.error;
	}

	toggleActive (obj) {
		$(obj).addClass('active').siblings().removeClass('active');
	}

	tabToggle (obj, cls = 'tab-items') {
		var id = $(obj).attr('href');
		$('.' + cls).children(id).show().siblings().hide();
	}

	dError(val) {
		alert(JSON.stringify(val));
	}
}
var v = new Validate();

// $.fn.validate = new Validate();