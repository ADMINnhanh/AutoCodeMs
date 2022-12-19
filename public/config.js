/*
 * @Author: xcl
 * @Date: 2022-03-09 09:21:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-31 11:22:11
 * @Description: 项目全局配置，如：服务、...
 */

// .env.local 本地的配置文件
// .env.online  线上的配置文件或者API MOC 
const env = ".env.online";

// .local.dev 本地开发环境下的库 *** 仇 192.168.8.102:1089
// .local.pro 本地生产环境下的库 *** 缪 192.168.0.42:1089
// .online.dev 线上开发环境下的库 *** console-mock.apipost.cn/mock/fc773004-a1d6-4073-9ac9-2a6fbd21896d
// .online.pro 线上生产环境下的库 *** 175.155.179.248:1089
const lib = ".online.pro";

// 本地 _APIlocal
const _APIlocal =
  lib == ".local.dev"
    ? `http://192.168.8.102:1089/generation/api/v1`
    : lib == ".local.pro"
      ? `http://192.168.0.42:1089/generation/api/v1`
      : ``;

// 线上 _APIonline
const _APIonline =
  lib == ".online.dev"
    ? `https://console-mock.apipost.cn/mock/fc773004-a1d6-4073-9ac9-2a6fbd21896d//generation/api/v1`
    : lib == ".online.pro"
      ? `http://175.155.179.248:1089/generation/api/v1`
      : ``;

// 本地 _WSlocal
const _WSlocal =
  lib == ".online.dev"
    ? `ws://192.168.8.102:1089/generation/api/v1/websocket`
    : lib == ".online.pro"
      ? `ws://192.168.0.42:1089/generation/api/v1/websocket`
      : ``;

// 线上 _WSonline
const _WSonline =
  lib == ".online.dev"
    ? `wss://console-mock.apipost.cn/mock/fc773004-a1d6-4073-9ac9-2a6fbd21896d//generation/api/v1/websocket`
    : lib == ".online.pro"
      ? `ws://175.155.179.248:1089/generation/api/v1/websocket`
      : ``;

// 线上 公共资源
const _RESOURCES = "";
// 项目的各种服务配置
const SERVER_CONFIG = {
  // api 
  baseUrl: env == ".env.local" ? _APIlocal : _APIonline,

  // websocket
  wsuri: env == ".env.local" ? _WSlocal : _WSonline,

  // 文件
  fileUrl: `http://175.155.179.248:1095/file`,

  // 公共资源
  resources: env == ".env.local" ? "./static" : _RESOURCES,
};

window.SERVER_CONFIG = SERVER_CONFIG;
