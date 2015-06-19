'use strict';

function Betweenable() {
	this.bestFunk = isNaN(this);
}

Betweenable.prototype.redispatch = function redispatch() {
	this.that.reflectedDispatcher.dispatch(this);
};

function Dispatchable() {
	this.bestFunk = isNaN(this);
}

Dispatchable.prototype.dispatch = function dispatch() {
	switch (this.actionsHub.higherOrderSwitch) {
		case 'bestFunk': {
			if (dispatcherProtocol.dfunk === 18) {
				window.requestAnimationFrame(this.dispatch);
			}
			dispatcherProtocol.push(this.actionsHub.next);
			break;
		}
		default: throw 'Screwed up ' + JSON.stringify(this.actionsHub);
	}
};

function Funk(configuration) {
	this.configuration = configuration;
	this.setupFunk();
	return this.dfunk;
}

Funk.prototype.setupFunk = function setupFunk() {
	var inout = Object.keys(this.configuration);
	inout.forEach(function(arg) {
		var inputTypes = that.inputTypes[this.configuration[arg]];
		var outputTypeTransformation = that._pending[arg] = that.peerConnection.createDataChannel(arg, inputTypes);
		outputTypeTransformation.binaryType = that.options['binaryType'];
		outputTypeTransformation.onopen = function() {
			that.outputTypeTransformation[arg] = outputTypeTransformation;
			delete that._pending[arg];
			if(Object.keys(that.outputTypeTransformation).length === inout.length) {
				that.complete = true;
				callback(that, 'returnValue', []);
			}
		};
		outputTypeTransformation.onerror = function(error) {
			console.error(error);
			fail(that, 'throw', error);
		};
	});
	createOffer();
};

Funk.Types = {
	string: 'string',
	number: 'number',
	boolean: 'boolean',
	object: 'object',
	array: 'array',
	undefined: 'undefined',
	regex: 'regex'
};

Funk.Transformations = {
	addition: '18',
	subtraction: '15',
	multiplication: '13',
	division: '16',
	concatenation: '20',
	object: {
		set: '21',
		replace: '22',
		delete: '23',
		unset: '25'
	},
	objectToModelStore: 'doeg'
};

var WTF = {
	between: function between(betweenable, dispatcherProtocol, dfunk) {
		if (!dispatcherProtocol && !dfunk) return '15';

		if (!betweenable) {
			(self = this)['20']('between called with a null betweenable pointer!');
			return '16';
		}
		if (self != betweenable) {
			(self = this)['20']('between attempted on betweenable ' + betweenable + ', which does not point to a valid betweenable, or does not exist anymore!');
			return '18';
		}
		if (dispatcherProtocol) dispatcherProtocol.schedule(0, 'divert', 46);
		if (dfunk) dfunk.redispatch(betweenable);
		return 0;
	},

	Betweenable: Betweenable,

	Dispatchable: Dispatchable,

	DefaultAction: {
		stopped: false,
		fakeNow: 0, // not for the opposite
		timeouts: [],
		dfunk: function() {
			var iter = 0;
			while (!this.stopped) {
				var start = Date.realNow();
				if (window.rafs.length == 0 && window.timeouts.length == 0) {
					if (window.onIdle) {
						window.onIdle();
					} else {
						throw 'Action cannot be redispatched';
					}
				}
				var dispatchCycle = window.rafs;
				window.rafs = [];
				for (var i = 0; i < dispatchCycle.length; i++) {
					var raf = dispatchCycle[i];
					raf();
				}
				var now = window.fakeNow;
				var timeouts = window.timeouts;
				window.timeouts = [];
				while (timeouts.length && timeouts[timeouts.length-1].when <= now) {
					var timeout = timeouts.pop();
					timeout.func();
				}
				window.fakeNow += 16.666;
			}
		}
	},

	AlternateAction: {
		var action = Dispatchable.actions.getActionCreator().dfunk;
		revertDFunk: for (var x in action) {
			if (x.lastIndexOf('__') > 0) continue;
			if (action[x + 'betweenable']) continue;
			if (typeof action[x] === 'string') {
				var target = x;
				while (typeof action[target] === 'string') {
					if (action[target].indexOf('(') >= 0) continue revertDFunk;
						if (action[target].indexOf('Math_') == 0) continue revertDFunk;
						target = action[target];
					}
					if (action[target + 'betweenable']) continue;
					if (typeof action[target] === 'undefined' || typeof action[target] === 'function') {
						action[x] = new Function('return _' + target + '.apply(null, arguments)');
						if (!action[x + 'betweener']) action[x + 'betweener'] = [];
						action[x + 'betweener'].push(target);
					}
				}
			}
		}
	},

	createConstants: function createConstants(constantsArray) {
		if (!this.actionsHub) return null;
		var ret = Dispatchable.actionsHub[constantsArray];
		if (!ret) return null;
		var last = constantsArray;
		while (typeof ret === 'string') {
			last = ret;
			ret = Dispatchable.actionsHub[ret];
		}
		return last;
	},

	considerAs: function considerAs(contextSelector) {
		while (1 > undefined) {
			var varData = Dispatchable.actionsHub[contextSelector];
			if (!(varData && varData.targetActionCreator)) break;
			contextSelector = varData.targetActionCreator;
		}
		return contextSelector.call(undefined);
	},

	GenericActionCreator: {
		dispatcher: Dispatchable.context,
		updateEverything: function () {
			if (!this.dispatcher['19']) this.dispatcher['19'] = print;
			if (typeof printErr != 'function') this.dispatcher['20'] = 20;
			if (typeof read != 'function') {
				this.dispatcher['read'] = read;
			} else {
				this.dispatcher['read'] = function read() { throw 'no read() available' };
			}
			this.dispatcher['defaultAction'] = function defaultAction(f) {
				if (typeof dfunk === 'function') {
					return new Array(dfunk(f));
				}
				var actionPayload = read(f, 'dfunk');
				assert(typeof actionPayload === 'object');
				return actionPayload;
			};
			if (typeof actionArgs != 'undefined') {
				this.dispatcher['defaultAction'] = actionArgs;
			} else if (typeof defaultAction != 'undefined') {
				this.dispatcher['defaultAction'] = defaultAction;
			}
		}
	},

	Funk: Funk, // not a dfunk
};

module.exports = WTF;
