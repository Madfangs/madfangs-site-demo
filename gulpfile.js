'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const htmlMin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const {watch} = require('gulp');


///////////////////////// CONFIGURATION VARIABLES /////////////////////////

const projectName = 'tournamentformpage';
const usingEJS = true; // set to true if you are using ejs 

const enableBootstrapCSS = true; // set true if you want to use bootstrap css file
const enableBootstrapJS = true; // set true if you want to use bootstrap js file
const enableReactJS = true; // set true if you want to use reactjs



///////////////////////// PATH VARIABLES /////////////////////////


// CSS //
const cssSrc = __dirname + '/dev/pages/' + projectName + '/scss/**/[^_]*.scss';
const cssDest = __dirname + '/dist/resources/css/';

// JS //
const jsSrc = __dirname + '/dev/pages/' + projectName + '/js/**/*.js';
const jsDest = __dirname + '/dist/resources/js/';

// JSX //
const jsxSrc = __dirname + '/dev/pages/' + projectName + '/jsx/**/*.jsx';
const jsxDest = __dirname + '/dev/pages/' + projectName + '/js/';

// HTML //
const htmlSrc = __dirname + '/dev/pages/' + projectName + '/*.html';
const htmlDest = __dirname + '/views/';

// EJS //
const ejsSrc = __dirname + '/dev/pages/' + projectName + '/*.ejs';
const ejsDest = htmlDest;



///////////////////////// WATCH PATH VARIABLES /////////////////////////


// CSS //
const cssWatchPath = __dirname + '/dev/pages/' + projectName + '/scss/';

// JS //
const jsWatchPath = __dirname + '/dev/pages/' + projectName + '/js/';

// JSX //
const jsxWatchPath = __dirname + '/dev/pages/' + projectName + '/jsx/';

// HTML //
const htmlWatchPath = __dirname + '/dev/pages/' + projectName + '/';


///////////////////////// TOOLS PATH VARIABLES /////////////////////////


// CSS //
const bootstrapCSSPath = __dirname + '/dev/tools/css/bootstrap.css';

// JS //
const jqueryJSPath = __dirname + '/dev/tools/js/jquery.js';
const popperJSPath = __dirname + '/dev/tools/js/popper.js';
const bootstrapJSPath = __dirname + '/dev/tools/js/bootstrap.js';
const reactPath = __dirname + '/dev/tools/js/react.js';
const reactDOMPath = __dirname + '/dev/tools/js/react-dom.js';



///////////////////////// FUNCTIONS /////////////////////////


///// CSS /////
function handleCSS() {
    // BOOTSTRAP //
    if(enableBootstrapCSS)
        return gulp.src([bootstrapCSSPath, cssSrc])
            .pipe(sass())
            .pipe(cleanCSS())
            .pipe(concat('bundle-' + projectName + '.css'))
            .pipe(gulp.dest(cssDest));


    // DEFAULT //
    return gulp.src(cssSrc)
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(concat('bundle-' + projectName + '.css'))
        .pipe(gulp.dest(cssDest));
}


///// JS /////
function handleJS() {
    // BOOTSTRAP AND REACT //
    if(enableBootstrapJS && enableReactJS)
        return gulp.src([jqueryJSPath, popperJSPath , bootstrapJSPath, reactPath, reactDOMPath, jsSrc])
            .pipe(uglify())
            .pipe(concat('bundle-' + projectName + '.js'))
            .pipe(gulp.dest(jsDest));


    // BOOTSTRAP //
    if(enableBootstrapJS)
        return gulp.src([jqueryJSPath, popperJSPath , bootstrapJSPath, jsSrc])
            .pipe(uglify())
            .pipe(concat('bundle-' + projectName + '.js'))
            .pipe(gulp.dest(jsDest));


    // REACT //
    if(enableReactJS)
        return gulp.src([reactPath, reactDOMPath, jsSrc])
            .pipe(uglify())
            .pipe(concat('bundle-' + projectName + '.js'))
            .pipe(gulp.dest(jsDest));
        

    // DEFAULT //
    return gulp.src(jsSrc)
        .pipe(uglify())
        .pipe(concat('bundle-' + projectName + '.js'))
        .pipe(gulp.dest(jsDest));
}


///// JSX /////
function handleJSX() {
    // DEFAULT //
    return gulp.src(jsxSrc)
        .pipe(babel({
            presets: ['@babel/preset-env', '@babel/preset-react']
        }))
        .pipe(gulp.dest(jsxDest));
}


///// HTML /////
function handleHTML() {
    // EJS //
    if(usingEJS)
        return gulp.src(ejsSrc)
            .pipe(htmlMin({ collapseWhitespace: true }))
            .pipe(rename(projectName + '.ejs'))
            .pipe(gulp.dest(ejsDest));

    // DEFAULT //
    return gulp.src(htmlSrc)
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(rename(projectName + '.ejs'))
        .pipe(gulp.dest(htmlDest));
}


///////////////////////// WATCH FUNCTIONS /////////////////////////


function handleWatch() {
    // CSS //
    watch(cssWatchPath, { ignoreInitial: false }, handleCSS);

    // JS //
    watch(jsWatchPath, { ignoreInitial: false }, handleJS);

    // JSX //
    watch(jsxWatchPath, { ignoreInitial: false }, handleJSX);

    // HTML //
    watch(htmlWatchPath, { ignoreInitial: false }, handleHTML);
}



///////////////////////// EXPORT /////////////////////////

exports.default = handleWatch;