const gulp = require('gulp');
const browserSync = require('browser-sync').create()
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");

gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html',
    },
  })
  done();
})
gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
})

// style.scssをタスクを作成する
gulp.task('sass', function() {
  // style.scssファイルを取得
  return (
    gulp
      .src("scss/style.scss")
      // Sassのコンパイルを実行(圧縮)
      .pipe(
        sass({
        outputStyle: "expanded"
      })
      // Sassのコンパイルエラーを表示
        .on("error",sass.logError)
      // cssフォルダー以下に保存
      )
      .pipe(gulp.dest("css"))
  );
});
gulp.task('watch', function (done) {
  gulp.watch('./*.html', gulp.task('bs-reload'));
  gulp.watch('./css/*.css', gulp.task('bs-reload'));
  gulp.watch('./scss/*.scss', gulp.task('sass'));
  gulp.watch('./js/*.js', gulp.task('bs-reload'));
})

gulp.task('default', gulp.series('serve', 'watch'));
