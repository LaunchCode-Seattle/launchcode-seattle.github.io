function defaultData() {
	var json = {};
	json.groups = [];
	json.groups[0] = {}
	json.groups[0].location = "City";
	json.groups[0].number = "5";
	json.groups[0].repoLocation = "username";
	json.groups[0].repoName = "RepoName";
	json.groups[0].projectName = "Repo Name";
	json.groups[0].members = [];
	json.groups[0].members[0] = {};
	json.groups[0].members[0].firstName = "Bob";
	json.groups[0].members[0].lastName = "Bobby";
	json.groups[0].members[0].userName = "bb";
	json.groups[0].members[1] = {};
	json.groups[0].members[1].firstName = "Charles";
	json.groups[0].members[1].lastName = "Charly";
	json.groups[0].members[1].userName = "cc";
	return JSON.stringify(json);
}

function loadData(callback) {
	if (location.hostname === "")
	{
		callback(defaultData());
	}
	else {
		var request = new XMLHttpRequest();
		request.overrideMimeType("application/json");
		request.open("GET", "data.json", true);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200) {
					callback(request.responseText);
				}
			}
		}
		request.send(null);
	}
}

function vueOnLoad(raw) {
	data = function() {
		return JSON.parse(raw);
	}
	new Vue({
		el: '#app',
		data: data,
		created: function() {
			this.expandData();
		},
		methods: {
			expandData() {
				this.groups.forEach((group) => {
					group.repoUrl = "http://github.com/" + group.repoLocation + "/" + group.repoName;
				});
			}
		}
	});
}

window.onload = function() {
	loadData(vueOnLoad);
}
