var gulp = require('gulp');
var flatten = require('gulp-flatten');

gulp.task('copyScriptToLib', function() {
    gulp.src('./bower_components/jquery/dist/jquery.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./bower_components/angular/angular.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./bower_components/angular-resource/angular-resource.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./bower_components/angular-ui-router/release/angular-ui-router.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./node_modules/requirejs/require.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./node_modules/oauth-1.0a/oauth-1.0a.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./bower_components/socket.io-client/dist/socket.io.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./bower_components/angular-local-storage/dist/angular-local-storage.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./bower_components/jquery-ui/jquery-ui.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));

    gulp.src('./bower_components/angular-ui-sortable/sortable.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./js/lib/'));
});

gulp.task('copyCSSToLib', function() {
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(flatten())
        .pipe(gulp.dest('./css/'));
});

gulp.task('copyFontsToLib', function() {
    gulp.src('./bower_components/bootstrap/dist/fonts/*.{ttf,woff,woff2,eot,svg}')
        .pipe(flatten())
        .pipe(gulp.dest('./fonts/'));
});