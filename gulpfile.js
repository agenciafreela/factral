var gulp =        require('gulp');
var gutil =       require('gulp-util');
var concat =      require('gulp-concat');
var notify =      require('gulp-notify');
var connect =     require('gulp-connect');
var imagemin =    require('gulp-imagemin');
var cache =       require('gulp-cache');
var minifyCss =   require('gulp-minify-css');
var sourcemaps =  require('gulp-sourcemaps');
var sass =        require('gulp-sass');
var jshint =      require('gulp-jshint');
var uglify =      require('gulp-uglify');


gulp.task('default',['sass','javascript', 'imagescompress', 'watch', 'connectOnDev']);

// Task para assistir mudanças em arquivos
gulp.task('watch', function(){
  gulp.watch('app/src/scss/**/*.scss',['sass']);
  gulp.watch('app/src/scripts/**/*.js',['javascript']);
  gulp.watch('app/src/images/**/*',['imagescompress']);
  gulp.watch('app/views/**/*').on('change', function(event){
      gulp.src('app/views/**/*')
      //.pipe(notify('O arquivo ' + event.path + ' Foi alterado.'))
      .pipe(connect.reload())
  });
});

// Task para compilar o sass, concatenar os estilos num único arquivo, minificar e criar o sourcemap
gulp.task('sass', function(){
    gulp.src('app/src/scss/application.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", notify.onError(function (error) {
          return "Erro ao compilar o Sass: " + error.message;
        }))
        .pipe(concat('application.min.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write()) // Cria o sourcemap intrínseco ao application
        .pipe(gulp.dest('app/public/css'))
        //.pipe(notify('Sass Compilado, concatenado, minificado e com o SourceMap criado.'))
        .pipe(connect.reload());
});

// Task que verifica erros, compila e minifica o JavaScript
gulp.task('javascript', function(){
  gulp.src('app/src/scripts/*.js')
  .pipe(sourcemaps.init())
  .pipe(jshint({"predef": [ "angular"]}))
  .pipe(notify(function (file) {
      if (file.jshint.success) {
        return 'Scripts validados e comprimidos.'; //Don't show something if success
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      // return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }))
    .pipe(uglify({
      mangle: false
    }))
    .on('error', gutil.log)
    .pipe(concat('application.min.js'))
    .pipe(sourcemaps.write()) // Cria o sourcemap intrínseco ao application
    .pipe(gulp.dest('app/public/scripts'))
    .pipe(connect.reload());
});

gulp.task('imagescompress',function(){
  gulp.src('app/src/images/*')
      .pipe(cache(imagemin({ optimizatedLevel: 3, progressive: true, interlaced: true })))
      .pipe(gulp.dest('app/public/images'));

})

gulp.task( 'connectOnDev', function() {
  connect.server({
    root: 'app',
    port: 8080,
    livereload: true
  });
});
