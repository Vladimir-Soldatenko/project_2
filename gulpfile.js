// Для работы в новом проекте с Gulp нужно:
// 1) В новую папку нового проекта скопировать (папку src, файл gulpfile.js, package.json) из данного урока;
// 2) Через терминал зайти в новую папку и в терминале написать команду ( npm i );
// 3) После установки всего написать в терминале команду ( gulp );



// Таски для Галпа

let project_folder = 'dist';  //Папка для готового кода
let source_folder = '#src';    // Папка для разработки , рабочий код

let path = {                       //пути, откуда брать и куда сливать файлы 
    build: {         //пути для создания папок, файлов в папке dist
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',

    },
    src: {     //путь откуда брать файлы 
        html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],  //чтобы был только основной (1) html  //  ['!' + source_folder + '/_*.html'] - взять все файлы html, кроме('!') файлов html, которые начинаются на _
        css: source_folder + '/scss/*.{sass,scss}',
        js: source_folder + '/js/*.js',
        img: source_folder + '/img/**/*.{jpeg,jpg,webp,png,svg,ico,gif}',   // обрабатывать только картинки ,** - все вложеные папки, 
    },
    watch: {       //файлы за которыми нужно следить , чтобы обновлять их в браузере
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.{sass,scss}',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{jpeg,webp,png,svg,ico,gif}',
    },
    clean: './' + project_folder + '/'       // удаление файлов из папки dist, при обновлении файлов
}

//------------------------------------------------------------------------------
//     Подключение плагинов

const { src, dest, parallel } = require('gulp');   //require - запросить/вызвать  (gulp в данном случае)
const gulp = require('gulp');
const browsersync = require('browser-sync').create(); //плагин , который позволяет обновлять данные в браузере/ нужно сначала добавить в package.json командой : npm i browser - sync --save-dev
const fileinclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webp = require('gulp-webp');
const webpHtml = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
//------------------------------------------------------------------------------



function browserSync() {
    browsersync.init({         //инициализируем новое соединение
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false,
    });
}


function html() {
    return src(path.src.html)
        .pipe(fileinclude())   //fileinclude-склеить несколько файлов с помощью:  @@include('_header.html') 
        .pipe(webpHtml())
        .pipe(dest(path.build.html))    // скопировать файл html в папку dist, по build
        .pipe(browsersync.stream())     //запустить трансляцию в браузер, (обновить его в браузере)
}     //.pipe - переводится как труба, имеется в виду соединение как труб


function css() {
    return src(path.src.css)
        .pipe(
            scss()
            // outputStyle: 'expanded'
            // )
        )
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(cssmin({
            verbose: true
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}


function img() {
    return src(path.src.img)
        .pipe(newer(path.build.img))
        .pipe(webp())
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(newer(path.build.img))
        .pipe(imagemin())
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}


function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(concat('main.js'))
        .pipe(dest(path.build.js))
        // .pipe(babel())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        // .pipe(webpack({
        //     mode: "development"
        // }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}


function watchFiles() {
    gulp.watch([path.watch.html], html)    //отслеживание изменений /  [], html - значит, что после изменения запустить функцию html()
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], img)
}


function clean() {
    return del(path.clean);
}


// ------------------------------------------------------------------------
//                  Запуск внутри gulp написаных функций

let build = gulp.series(clean, gulp.parallel(html, css, img, js));  //series - последовательно /   сначала начинает работать clean, а потом параллельно запускается остальное
let watch = gulp.parallel(build, watchFiles, browserSync);  // parallel- паралельный запуск


exports.img = img;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;


