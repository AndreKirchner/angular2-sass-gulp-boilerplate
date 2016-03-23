'use strict';

// Prequisites
var gulp        = require('gulp');
var debug       = require('gulp-debug');
var inject      = require('gulp-inject');
var tsc         = require('gulp-typescript');
var tslint      = require('gulp-tslint');
var sourcemaps  = require('gulp-sourcemaps');
var del         = require('del');
var Config      = require('./gulpfile.config');
var tsProject   = tsc.createProject('tsconfig.json');
var browserSync = require('browser-sync');
var superstatic = require( 'superstatic' );
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

// Create config
var config      = new Config();

// Gulp CSS Compiling
gulp.task('styles', function() {
    gulp.src('./src/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));
});

// Gulp HTML Compiling
gulp.task('views', function() {
    gulp.src([config.listFilesHTML])
        .pipe(gulp.dest('./dist'));
});

// Gulp TypeScript Linter
gulp.task('ts-lint', function () {
	return gulp.src(config.listFilesTS).pipe(tslint()).pipe(tslint.report('prose'));
});

// Gulp TypeScript Compiler
gulp.task('compile-ts', function () {
	var sourceTsFiles = [
		config.listFilesTS,              
		config.libraryTypeScriptDefinitions
	];

	var tsResult = gulp.src(sourceTsFiles)
		               .pipe(tsc(tsProject));

	return tsResult.js.pipe(uglify()).pipe(gulp.dest('./dist/js/'));
});

// Gulp Cleaner
gulp.task('clean-ts', function (cb) {
	var typeScriptGenFiles = [
		config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
		config.tsOutputPath +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
		'!' + config.tsOutputPath + '/lib'
	];

	// delete the files
	del(typeScriptGenFiles, cb);
});

// Gulp Watcher
gulp.task('watch', function() {
	gulp.watch([config.listFilesTS],   ['ts-lint', 'compile-ts']);
	gulp.watch([config.listFilesSCSS], ['styles']);
	gulp.watch([config.listFilesHTML], ['views']);
});

// Serve task
gulp.task('serve', ['compile-ts', 'styles', 'views', 'watch'], function() {
	process.stdout.write('Starting browserSync and superstatic...\n');
	browserSync({
		port 			: 3000,
		files 			: ['**/*.html', '**/*.scss', '**/*.js'],
		injectChanges 	: true,
		logFileChanges 	: false,
		logLevel 		: 'silent',
		logPrefix 		: 'angular2typescript',
		notify 			: true,
		reloadDelay 	: 0,
		server 			: {
			baseDir: './dist',
			middleware: superstatic({ 
				debug: true
			})
		}
	});
});

gulp.task('default', ['ts-lint', 'compile-ts', 'styles', 'views']);