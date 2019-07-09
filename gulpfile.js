var tmplFolder = 'tmpl'; //template folder
var srcFolder = 'src'; //source folder
var buildFolder = 'build'; //build folder


var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var combineTool = require('../magix-composer/index');
var del = require('del');
var ts = require('typescript');


combineTool.config({
    debug: true,
    tmplFolder: tmplFolder,
    srcFolder: srcFolder,
    projectName: 'xl',
    loaderType: 'module',
    galleries: {
        mxRoot: 'gallery/'
    },
    scopedCss: [
        './tmpl/style/index.css',
        './tmpl/os/theme/index.css'
    ],
    compileJSStart(content) {
        var str = ts.transpileModule(content, {
            compilerOptions: {
                lib: ['es7'],
                target: 'es6',
                module: ts.ModuleKind.ESNext
            }
        });
        str = str.outputText;
        return str;
    }
});

gulp.task('cleanSrc', function () {
    return del(srcFolder);
});
gulp.task('combine', gulp.series('cleanSrc', function () {
    return combineTool.combine().catch(e => {
        console.error(e);
    });
}));
gulp.task('watch', gulp.series('combine', function () {
    watch(tmplFolder + '/**/*', function (e) {
        console.log(e.path);
        if (fs.existsSync(e.path)) {
            combineTool.processFile(e.path);
        } else {
            combineTool.removeFile(e.path);
        }
    });
}));

var uglify = require('../gulp-terser-scoped/index');
gulp.task('cleanBuild', function () {
    return del(buildFolder);
});
gulp.task('build', gulp.series('cleanBuild', function () {
    combineTool.config({
        debug: false
    });


    return combineTool.combine().then(() => {
        return gulp.src(srcFolder + '/**/*.js')
            .pipe(uglify({
                compress: {
                    drop_console: true,
                    global_defs: {
                        DEBUG: false
                    }
                },
                output: {
                    ascii_only: true
                }
            }))
            .pipe(gulp.dest(buildFolder));
    });
}));
gulp.task('embed', (cb) => {
    let c = fs.readFileSync('./build/boot.js') + '';
    let index = fs.readFileSync('./index.html') + '';
    c = c.replace(/\$/g, '$&$&');
    index = index.replace(/<script[^>]*?>[\s\S]*?<\/script>/, '<script>' + c + '</script>');
    fs.writeFileSync('./index.html', index);

    let c1 = fs.readFileSync('./build/book.js') + '';
    let book = fs.readFileSync('./book.html') + '';
    c1 = c1.replace(/\$/g, '$&$&');
    book = book.replace(/<script[^>]*?>[\s\S]*?<\/script>/, '<script>' + c1 + '</script>');
    fs.writeFileSync('./book.html', book);
    cb();
});