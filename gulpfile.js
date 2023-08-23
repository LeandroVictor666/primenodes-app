const { series, parallel} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const stripJs = require('gulp-strip-comments')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')


function tCss(callBack){
    gulp.src("./resources/nocompiled/css/style.css")
    .pipe(concat('styles.module.css'))
    .pipe(cssmin())
    .pipe(gulp.dest("./resources/css"));
    return callBack();
}

const process = series(tCss)
exports.taskCss = tCss;
exports.default = process;