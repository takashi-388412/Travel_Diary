const gulp = require('gulp'); //gulp
const webpack = require("webpack");  //
const webpackStream = require("webpack-stream"); //webpackを
const browserSync = require('browser-sync').create() //画面をリロード
const imagemin = require("gulp-imagemin"); //画像圧縮
const sass = require("gulp-sass"); // Sassをコンパイルするプラグインの読み込み
const packageImporter = require('node-sass-package-importer');
const sassGlob = require( 'gulp-sass-glob' ); //sassをパーシャル化
const plumber = require( 'gulp-plumber' ); //error時に止めずに実行し続ける
const notify = require( 'gulp-notify' ); //error通知を出す
const sourcemaps = require('gulp-sourcemaps'); //コンパイル前のソースコードを確認できるようにするためのコンパイル前後の関係を表したもの
const cleanCSS = require('gulp-clean-css'); //cssファイル圧縮
const rename = require('gulp-rename'); //ファイル名リネーム(圧縮した css のファイル名に.minを追加)
const autoprefixer = require('gulp-autoprefixer'); //ベンダープレフィックス補完


//  browser 初期パス指定
gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html',
    },
  })
  done();
})
//  browserリロード更新 タスク
gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
})

//path 作成(sassコンパイル用)
const paths = {
  'src': {
    'scss': './src/style.scss',
    // 'scss': './src/scss/**/*.scss',
  },
  'dist': {
    'css': './dist/css/',
  }
};
// sassコンパイタスク
gulp.task('sass', done => {
  gulp.src(paths.src.scss)
    .pipe(sourcemaps.init()) //順番大切
    .pipe(plumber({ errorHandler: notify.onError('Error: &lt;%= error.message %&gt;') }))//watch中にエラーが起きても止まらない
    .pipe(sassGlob()) //importの読み込みを簡潔にする
    .pipe(sass({
      importer: packageImporter({
        extensions: ['.scss', '.css'] //scssファイルでcssの読み込みOK
      })
    }))
  // .pipe(sourcemaps.init())  //ここだと動作しない
    .pipe(sass({
      outputStyle: 'expanded',
    })
    .on('error', sass.logError))
  // .pipe(autoprefixer({
  //   browsers: ['last 2 versions'],
  // }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(paths.dist.css));
  done();
});

// // img 画像圧縮
// gulp.task("imagemin", () =>
//   gulp.src("img/**")  // 画像のマッチパターン
//       .pipe(imagemin())  // 画像の最適化処理
//       .pipe(gulp.dest("dist/img"))  // 最適化済みの画像を書き出すフォルダー
// );

//ファイル変更時に行うタスク
gulp.task('watch', function (done) {
  gulp.watch('./*.html', gulp.task('bs-reload'));
  // gulp.watch('./css/*.css', gulp.task('bs-reload'));
  gulp.watch('./js/*.js', gulp.task('bs-reload'));
  gulp.watch('./src/**/*.scss', gulp.task('sass'));
  gulp.watch('./src/**/*.scss', gulp.task('bs-reload'));
})

//npx gulpと打ち込んだ時に行う処理
gulp.task('default', gulp.series(gulp.parallel('serve', 'sass', 'watch')));
// gulp.task('default', gulp.series(gulp.parallel('serve', 'sass', 'watch','imagemin')));

// // npm run devで実行される
// gulp.task('dev', () => {
//   gulp.watch(paths.src.scss, gulp.task('sass'));
// });
