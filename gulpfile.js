var tmplFolder = 'tmpl'; //template folder
var srcFolder = 'src'; //source folder
var buildFolder = 'build'; //build folder


var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var combineTool = require('magix-combine');
var del = require('del');


combineTool.config({
    compressCss: false,
    tmplFolder: tmplFolder,
    srcFolder: srcFolder,
    compressCssSelectorNames: true,
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
gulp.task('build', ['cleanBuild'], function() {
    combineTool.config({
        compressCss: true
    });


    return combineTool.combine().then(() => {
        return gulp.src(srcFolder + '/**/*.js')
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
});
gulp.task('embed', () => {
    let c = fs.readFileSync('./build/boot.js') + '';
    let index = fs.readFileSync('./index.html') + '';
    c = c.replace(/\$/g, '$&$&');
    index = index.replace(/<script[^>]*?>[\s\S]*?<\/script>/, '<script>' + c + '</script>');
    fs.writeFileSync('./index.html', index);
});