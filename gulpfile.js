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
    addProjectNameAsVirtualRoot: true,
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
                target: 'es2018',
                module: ts.ModuleKind.ESNext
            }
        });
        str = str.outputText;
        return str;
    },
    resolveRequire(m) {
        if (m.mId == '~frontend') {
            m.mId = 'https://xinglie.github.io/frontend/build/fe.js';
        }
    },
    resolveVirtual(p) {
        if (p == '~fe') {
            return 'https://xinglie.github.io/frontend/build/';
        }
    },
    progress({ completed, file, total }) {
        console.log(file, completed + '/' + total);
    },
});

gulp.task('cleanSrc', function () {
    return del(srcFolder);
});
gulp.task('combine', gulp.series('cleanSrc', function () {
    return combineTool.combine().catch(e => {
        console.error('combine error', e);
    });
}));
gulp.task('watch', gulp.series('combine', function () {
    watch(tmplFolder + '/**/*', function (e) {
        if (fs.existsSync(e.path)) {
            combineTool.processFile(e.path).catch(e => {
                console.log('process file error', e);
            });
        } else {
            combineTool.removeFile(e.path);
        }
    });
}));

var uglify = require('gulp-terser');
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
                module: true,
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