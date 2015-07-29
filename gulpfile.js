'use strict';

var del = require('del'),
	gulp = require('gulp'), 
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'), 
	minifyCss = require('gulp-minify-css'),
	maps = require('gulp-sourcemaps');

gulp.task("concatScripts", function() {
	return gulp.src([
		'app/app.js',
		'app/bower_components/jquery/jquery.js',
		'app/bower_components/angular/angular.js'
		])
		.pipe(concat("index.js"))
		.pipe(gulp.dest("app"));
});

gulp.task("minifyScripts", ["concatScripts"], function () {
	return gulp.src('app/index.js')
	.pipe(uglify())
	.pipe(rename('index.min.js'))
	.pipe(gulp.dest("app"));
});

gulp.task("compileSass", function () {
	return gulp.src('scss/app.scss')
	.pipe(maps.init())
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(rename('app.min.css'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['compileSass']);
	gulp.watch('app/app.js', ['concatScripts']);
})

gulp.task('cleanDist', function() {
	del('dist');
});

gulp.task("build", [
	"concatScripts",
	"minifyScripts",
	"compileSass"], function() {
		return gulp.src([
			"css/app.min.css",
			"js/index.min.js",
			"index.html",
			"img/**",
			"fonts/**"
			], { 
				base: './'})
			.pipe(gulp.dest('dist'))
	});

gulp.task('serve', ['watch']);

gulp.task("default", ["cleanDist"], function() {
	gulp.start('build');
});
/*
gulp.task("StartUp", function() {
	console.log("Startup...");
});



*/