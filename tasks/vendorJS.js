import gulp from 'gulp'
import packageFiles from 'package-files'
import bowerFiles from 'bower-files'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'

gulp.task('vendorJS', vendorJSTask)

function vendorJSTask() {
  const devDependencies = [
    'mn-gh-page',
    // 'mn-form',
  ]

  const dependencies = packageFiles(devDependencies)
    .filter(dep => dep.endsWith('.js'))
    .map(item =>
      item.includes('document-register-element')
        ? item.replace('.node.js', '.js')
        : item
    )

  const bowerDeps = bowerFiles()
    .ext('js')
    .dev()
    .files

  return gulp
    .src(dependencies.concat(bowerDeps))
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs'))
}

