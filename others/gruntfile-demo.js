/*********************
说明：文件结构基于 HTML5Boilerplate:
 
+ index.html
 
- css
  + main.css
 
- js
  - vendor
  + main.js
 
+ img/
 
***************************/
 
/*global module:false*/
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        csslint: {
            /* 检查 CSS 语法 */
            src: ['css/**/*.css']
        },
        jshint: {
            /* 检查 js 语法 */
            all: ['Gruntfile.js', 'js/main.js', 'js/lib/*.js']
        },
        imagemin: {
            /* 压缩优化图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: 'img/' // 优化后的图片保存位置，默认覆盖
                    }
                ]
            }
        },
        concat: {
            /* 合并 CSS 文件 */
            css: {
                src: ['css/normalize.min.css', 'css/cssgrids-min.css', 'css/helper.css', 'css/main.css', '...'],
                /* 根据目录下文件情况配置 */
                dest: 'css/all.css'
            },
            js: {
                src: [''],
                /* 根据目录下文件情况配置 如果可以使用 require.js/LABjs 等配置更佳 */
                dest: 'js/all.js'
            }
        },
        cssmin: {
            /*压缩 CSS 文件为 .min.css */
            options: {
                keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
            },
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['all.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },
        uglify: {
            /* 最小化、混淆、合并 JavaScript 文件 */
            target: {
                files: {
                    'js/all.min.js': ['js/all.js']
                }
            },
            minjs: { //最小化、混淆所有 js/ 目录下的 JavaScript 文件
                files: [{
                    expand: true,
                    cwd: 'js/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'js/',
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            /* 监控文件变化并执行相应任务 */
            img: {
                files: ['img/**/*.{png,jpg,jpeg}'],
                options: {
                    livereload: true
                }
            },
            css: {
                options: {
                    event: ['changed', 'added'],
                    livereload: true
                },
                files: ['css/**/*.css']
            },
            js: {
                options: {
                    livereload: true
                },
                files: ['js/**/*.js']
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['*.html']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 定义默认任务
    grunt.registerTask('default', ['csslint', 'jshint', 'imagemin', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('dev', ['csslint', 'jshint']);
    grunt.registerTask('dest', ['imagemin', 'concat:css', 'cssmin', 'uglify:minjs']);
};