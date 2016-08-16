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
	}
};