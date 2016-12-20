import gulp from 'gulp'
import bowerFiles from 'bower-files'
import concat from 'gulp-concat'
import minifyCss from 'gulp-minify-css'

gulp.task('vendorCSS', vendorCSSTask)

function vendorCSSTask() {
  return gulp
    .src(bowerFiles().ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(minifyCss({keepSpecialComments: 0}))
    .pipe(gulp.dest('./dist'))
}
