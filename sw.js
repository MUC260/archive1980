/* =========================================================================
   秦巴县档案馆 · 数字检索平台 —— Service Worker
   作用：让页面可以“添加到主屏幕”，并在断网时也能打开（离线可玩）。
   策略：
     - 首次安装时把核心文件（HTML / 清单 / 全部图片）缓存下来
     - 之后请求优先走缓存（cache-first），缓存没有再走网络
     - 版本号变化时清掉旧缓存，避免玩家看到过期的档案
   ========================================================================= */

/* 版本号：改动 index.html 或图片后，把这个数字 +1，玩家下次打开就会拿到新版 */
var CACHE_NAME = 'qinba-archive-1980-v7';

/* 需要预缓存的静态资源（相对路径，全部为本地文件，无外部依赖） */
var PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/images/logo.png',
  './assets/images/paper-texture.jpg',
  './assets/images/archive-room.jpg',
  './assets/images/seal.jpg',
  './assets/images/broken-image.jpg',
  './assets/images/letter-corner.jpg',
  './assets/images/loan-card-front.jpg',
  './assets/images/loan-card-back.jpg',
  './assets/images/book-cover.jpg',
  './assets/images/index-card.jpg',
  './assets/images/duty-log.jpg',
  './assets/images/letter-page.jpg',
  './assets/images/shouwenbu.jpg',
  './assets/images/jianbao.jpg',
  './assets/images/baihe-log.jpg',
  './assets/images/banqian.jpg'
];

/* 安装：预缓存核心资源。单张图片缺失不应让整个安装失败，所以逐个 add 并忽略错误 */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        PRECACHE.map(function (url) {
          return cache.add(new Request(url, { cache: 'reload' })).catch(function () {
            /* 某个文件不存在（例如图片还没放进去）时跳过，不影响整体可用 */
            return null;
          });
        })
      );
    }).then(function () {
      /* 立即接管，不用等旧页面关闭 */
      return self.skipWaiting();
    })
  );
});

/* 激活：清理旧版本缓存 */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) { return caches.delete(key); }
          return null;
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* 请求拦截：缓存优先，回退网络；网络失败时给 HTML 请求回退到首页缓存 */
self.addEventListener('fetch', function (event) {
  var req = event.request;

  /* 只处理 GET，且只处理本站资源 */
  if (req.method !== 'GET') { return; }

  event.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) { return hit; }

      return fetch(req).then(function (res) {
        /* 成功拿到的新资源顺手放进缓存（图片、字体等） */
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        /* 断网且缓存里没有：导航请求回退到首页，保证“离线也能进档案室” */
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
