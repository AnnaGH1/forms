'use strict';

const gulp = require('gulp');
const del = require('del/index');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const srcmaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const bs = require('browser-sync').create();

sass.compiler = require('node-sass');


gulp.task('clean', function () {
    return del('docs');
});

gulp.task('clean:html', function () {
    return del('docs/*.html');
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('docs'))
        .on('end', bs.reload);
});

gulp.task('clean:fonts', function () {
    return del('docs/fonts/*');
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
        .pipe(plumber())
        .pipe(gulp.dest('docs/fonts'))
        .on('end', bs.reload);
});

// gulp.task('style:libs', function () {
//     return gulp.src([
//         'node_modules/slick-carousel/slick/slick.css'
//     ])
//         .pipe(plumber())
//         .pipe(concat('all-libs.css'))
//         .pipe(gulp.dest('docs/css/libs'))
//         .pipe(bs.reload({
//             stream: true
//         }));
// });

gulp.task('style', function () {
    return gulp.src('src/sass/style.scss')
        .pipe(plumber())
        .pipe(srcmaps.init())
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename('style.min.css'))
        .pipe(srcmaps.write())
        .pipe(gulp.dest('docs/css'))
        .pipe(bs.reload({
            stream: true
        }));
});

gulp.task('js:libs', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/inputmask/dist/min/inputmask/inputmask.min.js',
        'node_modules/parsleyjs/dist/parsley.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
    ])
        .pipe(plumber())
        .pipe(concat('all-libs.js'))
        .pipe(gulp.dest('docs/js/libs'))
        .pipe(bs.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(srcmaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(srcmaps.write())
        .pipe(gulp.dest('docs/js'))
        .pipe(bs.reload({
            stream: true
        }));
});

gulp.task('serve', function () {
    bs.init({
        server: {
            baseDir: './docs'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', gulp.series(
        'clean:html',
        'html'
    ));
    gulp.watch('src/fonts/*', gulp.series(
        'clean:fonts',
        'fonts'
    ));
    gulp.watch('src/sass/**/*.scss', gulp.series('style'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
});


gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
        'html',
        'fonts',
        'style',
        'js',
    )
));

gulp.task('live-serve', gulp.parallel(
    'watch',
    'serve'
));
