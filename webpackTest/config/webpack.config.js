const path = require('path')

module.exports = {
  entry: {
    //main: "../src/main.js" 进入config文件夹使用webpack就能打包成功。默认读取webpack.config.js
    main: "./src/main.js"//在根目录使用webpack --config=config/webpack.config.js能打包成功，相当于webpack.config.js文件在根目录。
  },
  output: {
    path: path.resolve(__dirname, "../dist"),//这个__dirname得到的文件所在路径，所以不管入口怎么写 都是../dist
    filename: "[name]-bundle.js"
  },
  mode: "development",
  //本地服务器
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules:[
      {
        test: /\.js/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/ //不处理node_modules下面的js
      },
      {
        test:/\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']//加载图片的时候需要配置
            }
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'imgs/[name]-bundle.[ext]'//会在dist文件夹下创建imgs存放图片
            }
          }
        ]
      }
    ]
  }
}