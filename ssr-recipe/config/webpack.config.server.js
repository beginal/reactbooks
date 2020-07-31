const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const webpack = require('webpack');
const getClientEnvironment = require('./env');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const publicUrl = paths.servedPath.slice(0 ,-1);
const env = getClientEnvironment(publicUrl);

module.exports = {
  mode: 'production', // 프로덕션 모드로 설정해서 최적화 옵션들을 활성화
  entry: paths.ssrIndexJs, // 엔트리 경로
  target: 'node', // node 환경에서 실행 될 것이라는걸 암시
  output: {
    path: paths.ssrBuild, // 빌드 경로
    filename: 'server.js', // 파일 이름
    chunkFilename: 'js/[name].chunk.js', // 정크 파일 이름
    publicPath: paths.servedPath, // 정적 파일이 제공될 경로
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            text: /\.(js|mjs|jsx|ts|tsx)$/,
            inclued: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-svgo![path]'
                      }
                    }
                  }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compart: false
            }
          },
          // CSS를 위한 처리
          {
            test: cssRegex,
            exclued: cssModuleRegex,
            // exportOnlyLocals: true 옵션을 설정해야 실제 CSS 파일을 생성하지 않는다.
            loader: require.resolve('css-loader'),
            options: {
              onlyLocals: true
            }
          },
          {
            test: cssModuleRegex,
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              onlyLocals: true,
              getLocalIdent: getCSSModuleLocalIdent
            }
          },
          // SASS 를 위한 처리
          {
            test: sassRegex,
            exclued: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  onlyLocals: true
                }
              },
              require.resolve('sass-loader')
            ]
          },
          // Sass + CSS Module를 위한 처리
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: true,
                  onlyLocals: true,
                  getLocalIndent: getCSSModuleLocalIdent
                }
              },
              require.resolve('sass-loader')
            ]
          },
          // url-loader를 위한 설정
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpg?g$/, /\.png$/ ],
            loader: require.resolve('url-loader'),
            options: {
              emitFile: false, // 파일을 따로 저장하지 않는 옵션
              limit: 10000, // 원래는 9.76KB가 넘어가면 파일로 저장하는데
                // emitFile값이 false일때는 경로만 준비하고 파일은 저장하지 않는다.
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          // 위에서 설정된 확장자를 제외한 파일들은 file-loader를 사용
          {
            loader: require.resolve('file-loader'),
            exclued: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/ ],
            options: {
              emitFile: false,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules']
    // react, react-dom/server 같은 라이브러리를 import 구문으로 불러오면  node_modules에서 찾아 사용한다.
    // 라이브러리를 불러오면 빌드할떄 결과물 파일 안에 해당 라이브러리 관련 코드가 함께 번들링된다.
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin(env.stringifed) // 환경변수를 주입해줍니다.
  ]
};