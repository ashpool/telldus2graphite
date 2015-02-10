var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	mocha = require('gulp-mocha');

gulp.task('default', function () {
	// place code for your default task here
});

gulp.task('lint', function () {
	return gulp.src(['./lib/*.js', './bin/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('test', function () {
	return gulp.src('./test/telldus.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});