angular.module('app.loggedIn.timetable.include', [
	'app.loggedIn.timetable.models',

	'app.loggedIn.timetable.controllers.index',
	'app.loggedIn.timetable.controllers.definition',
	
	'app.loggedIn.timetable.directives.definition',

	'app.loggedIn.timetable.dialog.add',
	'app.loggedIn.timetable.dialog.edit',
	'app.loggedIn.timetable.dialog.addSite',
	'app.loggedIn.timetable.dialog.editSite'
])