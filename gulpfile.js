var tmplFolder = 'tmpl'; //template folder
var srcFolder = 'src'; //source folder
var buildFolder = 'build'; //build folder


var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var combineTool = require('magix-combine');
var del = require('del');


combineTool.config({
    tmplFolder: tmplFolder,
    srcFolder: srcFolder,
    compressCssSelectorNames:true,
    cssSelectorPrefix: 'x',
    md5CssFileLen: 1,
    md5CssSelectorLen: 1
});

gulp.task('cleanSrc', function() {
    return del(srcFolder);
});
gulp.task('combine', ['cleanSrc'], function() {
    return combineTool.combine();
});
gulp.task('watch', ['combine'], function() {
    watch(tmplFolder + '/**/*', function(e) {
        console.log(e.path);
        if (fs.existsSync(e.path)) {
            combineTool.processFile(e.path);
        } else {
            combineTool.removeFile(e.path);
        }
    });
});

var uglify = require('gulp-uglify');
gulp.task('cleanBuild', function() {
    return del(buildFolder);
});
gulp.task('build', ['cleanBuild', 'combine'], function() {
    gulp.src(srcFolder + '/**/*.js')
        .pipe(uglify({
            compress: {
                drop_console: true
            },
            output: {
              ascii_only: true
            }
        }))
        .pipe(gulp.dest(buildFolder));
});