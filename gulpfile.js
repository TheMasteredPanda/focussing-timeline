const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const fs = require('fs');
const path = require('path')


gulp.task('sass', function () {
     return gulp.src('src/styles/main.scss')
        .pipe(sass())
        // .pipe(cleanCss())
        .pipe(gulp.dest('./build/styles'))
        .pipe(browserSync.stream());
});

gulp.task('bundle-js', function () {
    let scripts = [];

    function walk(currentPath) {
        let files = fs.readdirSync(currentPath);

        for (const file in files) {
            if (files.hasOwnProperty(file)) {
                const entry = files[file];
                let entryPath = path.join(currentPath, entry);
                if (fs.statSync(`./${entryPath}`).isFile()) {
                    if (entry.split('.').pop() !== 'js') continue;
                    scripts.push(entryPath);
                } else {
                    walk(entryPath);
                }
            }
        }
    }

    walk('src/scripts');
    scripts.sort((a, b) => {return a.includes('vendors') ? -1 : 1});
    return gulp.src(scripts).pipe(concat('main.js'))
    // .pipe(minify({noSource: true}))
    .pipe(gulp.dest('build/scripts'))
    .pipe(browserSync.stream());
})

gulp.task('serve', gulp.series(gulp.parallel('sass', 'bundle-js'), function () {
    browserSync.init({server: {
        baseDir: "build/", 
        index: 'index.html', 
        port: 5500
    }});

    gulp.watch('./src/styles', gulp.series('sass'));
    gulp.watch('./src/scripts', gulp.series("bundle-js"));
    gulp.watch('./build/*').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));