var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cssMin = require('gulp-css');
const imagemin = require('gulp-imagemin');
var Fontmin = require('fontmin');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('js', function(cb) {
    pump([
            gulp.src('lib/*.js'),
            uglify(),
            gulp.dest('client/dist/js')
        ],
        cb
    );
});

gulp.task('css', function() {
    return gulp.src('assets/css/*.css')
        .pipe(cssMin())
        .pipe(gulp.dest('client/dist/css'));
});

gulp.task('images', function() {
    gulp.src('assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('client/dist/img'))
});

gulp.task('fonts', function() {
    var fontmin = new Fontmin()
        .src('assets/fonts/*')
        .dest('client/dist/fonts');

    fontmin.run(function(err, files) {
        if (err) {
            throw err;
        }
    });
});

gulp.task('delete', function() {
  return del.sync('client/dist');
})

gulp.task('watch', function (){
  gulp.watch('assets/css/*.css', ['css']); 
  gulp.watch('lib/*.js', ['js']); 
});

//Run `gulp` for development
gulp.task('default', ['css', 'js', 'fonts', 'watch']);


//Run `gulp production` for production build
gulp.task('production', function(callback) {
  runSequence('delete', ['css', 'js', 'images', 'fonts'], callback);
});

