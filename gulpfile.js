const gulp = require('gulp');
const browserSync = require('browser-sync').create()
const sass = require("gulp-sass"); // Sassをコンパイルするプラグインの読み込み
const packageImporter = require('node-sass-package-importer');
const sassGlob = require( 'gulp-sass-glob' );
// const autoprefixer = require('gulp-autoprefixer'); //ベンダープレフィックス補完
// const sourcemaps = require('gulp-sourcemaps'); //コンパイル前のソースコードを確認できるようにするためのコンパイル前後の関係を表したもの
// const cleanCSS = require('gulp-clean-css'); //cssファイル圧縮
// const rename = require('gulp-rename'); //ファイル名リネーム(圧縮した css のファイル名に.minを追加)
// const imagemin = require("gulp-imagemin"); //画像圧縮

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

const paths = {
  'src': {
    'scss': './src/style.scss',
    // 'scss': './src/scss/**/*.scss',
  },
  'dist': {
    'css': './dist/css/',
  }
};

gulp.task('sass', done => {
  gulp.src(paths.src.scss)
  .pipe(sassGlob() ) //importの読み込みを簡潔にする
  .pipe(sass({
      importer: packageImporter({
        extensions: ['.scss', '.css'] //scssファイルでcssの読み込みOK
      })
  }))
  // .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  // .pipe(autoprefixer({
  //   browsers: ['last 2 versions'],
  // }))
  // .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist.css))
  // .pipe(cleanCSS())
  // .pipe(rename({
  //   suffix: '.min',
  // }))
  .pipe(gulp.dest(paths.dist.css));
  done();
});

// // style.scssをタスクを作成する
// gulp.task('sass', function() {
//   // style.scssファイルを取得
//   return (
//     gulp
//       .src("./src/scss/**/*.scss")
//       // Sassのコンパイルを実行(圧縮)
//       .pipe(
//         sass({
//         outputStyle: "expanded"
//       })
//       // Sassのコンパイルエラーを表示
//         .on("error",sass.logError)
//       // cssフォルダー以下に保存
//       )
//       .pipe(gulp.dest("./dist/css"))
//   );
// });

//変更があった際に行う処理
gulp.task('watch', function (done) {
  gulp.watch('./*.html', gulp.task('bs-reload'));
  // gulp.watch('./css/*.css', gulp.task('bs-reload'));
  gulp.watch('./js/*.js', gulp.task('bs-reload'));
  gulp.watch('./src/**/*.scss', gulp.task('sass'));
  gulp.watch('./src/**/*.scss', gulp.task('bs-reload'));
})

//npx gulpと打ち込んだ時に行う処理
gulp.task('default', gulp.series(gulp.parallel('serve','sass','watch')));




// gulp.task('dev', () => {
//   gulp.watch(paths.src.scss, gulp.task('sass'));
// });
