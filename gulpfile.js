/*
 * Script de tarefas do projeto
 */

var origem = "./src/*.js";
var destino = "./dist/";
var gulp = require("gulp");
var rename = require('gulp-rename');
var uglify = require("gulp-uglify");

gulp.task('compressjs', function () {
    gulp
            .src(origem)
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(destino));
});

/**
 * Monitorando as mudanças nos arquivos
 */
gulp.task("default", function () {
    gulp.watch(origem, ["compressjs"]);
});