module.exports = function (grunt) {

  // 加载load-grunt-tasks插件
  require('load-grunt-tasks')(grunt);
  // 加载time-grunt插件
  require('time-grunt')(grunt);

  var config = {
    app: 'app',
    dist: 'dist',
    build: 'build'
  };

  // Project configruation
  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      },
    },

    copy: {
      dist_html: {
        files: {
          '<%= config.dist %>/index.html': '<%= config.app %>/index.html',
          '<%= config.dist %>/js/index.js': '<%= config.app %>/js/index.js'
        }
      }
    },

    clean: {
      // dist: '<%= config.dist %>/**/*'
      dist: {
        src: ['<%= config.dist %>/**/*', '<%= config.build %>/*'],
        // filter: function (filepath) {
        //   return (!grunt.file.isDir(filepath));
        // }
      },

      zip: {
        src: ['<%= config.build %>/*'],
        filter: function (filepath) {
          // return (filepath.indexOf('.zip') > -1);
          return filepath.match(/\w+\.zip/g);
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*js', 'test/**/*js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },

    concat: {
      options: {
        separator: '\n',
        banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
      },
      dist: {
        src: ['src/**/*js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    zip: {
      '<%= config.build %>/<%= grunt.template.today("yyyymmddhhMMss") %>.zip': '<%= config.app %>/**/*',
      '<%= config.build %>/<%= grunt.template.today("yyyymmddhhMMss") %>.min.zip': '<%= config.app %>/js/*'
    },


    qunit: {
      files: ['test/**/*.html']
    },

    log: {
      foo: [1, 23, 4],
      bar: 'hello world',
      baz: false
    }

  });

  // 加载包含"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表
  grunt.registerTask('default', ['uglify', 'concat']);

  // 注册日志任务
  grunt.registerMultiTask('log', 'Log Staff.', function () {
    grunt.log.writeln(this.target + ':' + this.data);
  });

  // 自定义任务
  grunt.registerTask('myTask', 'my "task" task description', function () {
    grunt.log.writeln('Currently running the default task');

    // 在任务内部，执行其他的任务
    grunt.task.run('log', 'zip');
  });

  // 自定义的压缩任务:删掉之前的zip文件，压缩文件
  grunt.registerTask('myZip', function () {
    grunt.task.run('clean:zip', 'zip');
  });

  grunt.log.ok(grunt.template.today('HH:MM:ss'));
  
  grunt.log('cancel pull');
};

