VUE 多页项目结构
=================

该项目是基于vue.js的多页架构，依赖插件：
---------------------------------
* vue2
* vuex2
* vue-router
* axios
* ejs
* fast-click
* mint-ui
* vux
* more...


## 如何开发
----------
```bash
$ npm install
```
# 开发模式【热替换】 端口：localhost:1234
$ npm run dev

# 打包
```bash
$ npm run build
```

# 打包单个页面
```bash
$ npm run build moduleName(模块名)
```
项目结构说明
----------
```
    src/
        assets/                         ---> 静态资源文件
            css                         ---> 样式
            img                         ---> 图片
        components/                     ---> 公共组件
        config/                         ---> 项目配置文件
        api/                            ---> 接口地址
        lib/                            ---> 公共文件，校验正则等
        resource/                       ---> axios文件
        router/                         ---> vue-router配置文件
        store/
            modules/                    ---> vuex 具体模块
            actions.js                  ---> vuex公共actions
            getters.js                  ---> vuex公共getters
            mutations.js                ---> vuex公共modules
            index.js                    ---> vuex store
        views/                          ---> 展示视图库
        module/                         ---> 多页面具体模块目录
            test/
                app.vue                 ---> 当前模块主入口
                index.ejs               ---> 当前模块ejs文件，名称不可修改
                main.js                 ---> 当前模块main.js，名称不可修改
                router.js               ---> 当前模块映射的router.js文件
            ***/                        ---> 更多模块...
        main.js                         ---> 入口文件
    static                              ---> 不需要被框架处理的静态资源，比如图片、字体文件、样式等
    build                               ---> 打包配置文件
    config                              ---> 配置文件
    .babelrc                            ---> babel 配置文件
    .editorconfig                       ---> 所有编译器代码风格一致配置文件
    .gitignore                          ---> gitignore
    .eslintignore                       ---> 忽略代码检查的资源
    .eslintrc                           ---> eslint配置
    package.json                        ---> package.json
    README.md                           ---> 本文件
```

### dll记录
```
webpack --config build/webpack.dll.conf.js -p
```