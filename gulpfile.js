var gulp = require("gulp"),
	stylus = require("gulp-stylus"),
	jade = require("gulp-jade"),
	connect = require("gulp-connect"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify");

gulp.task('scripts', function() {
	return gulp.src('./app/js/*.js')
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
		.pipe(connect.reload());
});

gulp.task('stylus', function() {
	return gulp.src('./app/styles/style.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./build/css'))
		.pipe(connect.reload());
});

gulp.task('jade', function() {
	return gulp.src('./app/index.jade')
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('./build'))
		.pipe(connect.reload());
});

gulp.task('images', function() {
	return gulp.src('./app/img/*.jpg')
		.pipe(gulp.dest('./build/img/'));
});

gulp.task('watch', function() {
	gulp.watch('app/index.jade', ['jade'])
	gulp.watch('./app/js/*.js', ['scripts'])
	gulp.watch('./app/styles/*.styl', ['stylus'])
});

gulp.task('connect', function() {
	connect.server({
		port: 1337,
		livereload: true,
		root: 'build'
	})
});

gulp.task('default', ['scripts', 'jade', 'stylus', 'watch', 'connect', 'images'])