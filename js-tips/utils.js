var utils = {
	url: {
		set: function(key, value, url) {
			var reg = new RegExp('(' + key + ')=([^&]*)', 'ig');
			var url = url ? url : location.href;
			var result = reg.exec(url);
			if (result) {
				return url.replace(result[0], key + '=' + value);
			} else {
				var reg = /\?(.*)#(.*)/gi;
				var search = reg.exec(url);
				if (search !== null) {
					return url.replace(search[1], search[1] + '&' + key + '=' + value);;
				} else {
					return '';
				}
			}
		},
		get: function(str, url) {
			var reg = new RegExp('(' + str + ')=([^&]*)', 'ig');
			var url = url ? url : location.href;
			var result = reg.exec(url);
			console.log(result);
			if (result) {
				return result[2];
			} else {
				return '';
			}
		}
	},
	is: {
		android: function() {
			return window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Adr') > -1;
		},
		ios: function() {
			return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		},
		mobile: function() {
			return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
		},
		weixin: function() {
			return navigator.userAgent.indexOf('MicroMessenger') > -1;
		},
		qq: function() {
			return navigator.userAgent.match(/\sQQ/i) == " qq";
		}
	},
	searchBox: function(option, callback) {
		/**
			<!-- CSS -->
			.search {
	            position: relative;
	            padding-right: 40px;
	        }
	        .search .search-input {
	            border-right-color: transparent;
	            border-top-right-radius: 0;
	            border-bottom-right-radius: 0;
	        }
	        .search .search-icon {
	            position: absolute;
	            top: 0;
	            right: 1px;
	            height: 33px;
	            padding: 5px 5px;
	            background-color: #fff;
	            background-image: none;
	            border: 1px solid #ccc;
	            border-radius: 2px;
	            border-top-left-radius: 0;
	            border-bottom-left-radius: 0;
	        }
	        .search .search-icon:hover {
	            cursor: pointer;
	            color: #333;
	            background-color: #e6e6e6;
	            border-color: #adadad;
	        }

			<!-- HTML 布局(基于boostrap) -->
			<div class="col-sm-4 col-md-4">
	            <div class="search" id="service-search">
	              <input type="text" class="form-control search-input">
	              <span class="search-icon">搜索</span>
	            </div>
	        </div>
		*/
		var Search = {
			init: function(option, callback) {
				var DEFAULT = {
					el: '.search',
					placeholder: '请输入关键字搜索',
					searchTxt: '搜索',
					clear: false, // 搜索完毕后是否清空输入框
				};
				if ($.type(option) === 'function') {
					callback = option;
					option = {};
				}
				this.option = $.extend({}, DEFAULT, option);
				this.bindEvent(callback);
			},
			bindEvent: function(callback) {
				var _this = this,
					input = _this.option.el + ' .search-input',
					icon = _this.option.el + ' .search-icon',
					searchKey;

				// 初始化文字
				$(input).attr('placeholder', _this.option.placeholder);
				$(icon).text(_this.option.searchTxt);

				$(document).on('keydown', input, function(e) {
					if (e.keyCode == 13) {
						searchKey = $(input).val();
						handle(searchKey);
					}
				});

				$(document).on('click', icon, function(e) {
					searchKey = $(input).val();
					handle(searchKey);
				});

				function handle(searchKey) {
					if (_this.option.clear) {
						$(input).val('');
					}
					callback(searchKey);
				}
			},
			destroy: function() {
				var _this = this,
					input = _this.option.el + ' .search-input',
					icon = _this.option.el + ' .search-icon';
				$(document).off('keydown', input);
				$(document).off('click', icon);
			}
		};

		Search.init(option, callback);
	}
};