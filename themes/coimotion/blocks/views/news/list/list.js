ctrl.startup = function() {
	console.log('Loading the news/list block.');
	
	ctrl.embed('#embed', '/user/profile');
};

ctrl.doClick = function()  {
	console.log('click me...');
};