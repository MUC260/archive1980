# 部署与上线手册 ·《1980-08-04 档案馆》

本手册面向**不写代码的普通用户**，照着点就能把游戏挂到网上，全程免费。包含：三步部署、检查清单、验证清单、网址回填、短链方案、打包安卓 App、常见问题。

> 前置提醒：本会话没有 GitHub 凭证，无法代为部署，所以**部署这一步必须你自己在浏览器里点完**。下文每一步都写清了「点哪个按钮、填什么、在哪里看结果」。

---

## 一、部署到 GitHub Pages（三步走）

**你需要准备**：一个邮箱（注册 GitHub 用）、一台能上网的电脑、本项目整个文件夹。**费用**：0 元。GitHub Pages 对公开仓库免费，个人小站流量完全够用。

### 第 1 步 · 建仓库

1. 浏览器打开 `https://github.com`。
2. 没账号就点 **Sign up** 注册（邮箱 + 密码 + 验证邮件，约 2 分钟）；有账号直接 **Sign in**。
3. 登录后看页面**右上角**，点那个 **「+」** 图标 → 在下拉菜单里选 **New repository**。
4. 进入创建页面，只填这几项：
   - **Repository name**（仓库名）：填 `archive1980`　←　必须是**纯小写英文**，不要空格、不要中文。这个名字会出现在最终网址里。
   - **Description**：可以不填。
   - **Public / Private**：**必须选 Public**。选 Private 的话 GitHub Pages 需要付费才能用。
   - 下面的「Add a README file」「Add .gitignore」「Choose a license」**全部不要勾**（勾了后面会多一次合并麻烦）。
5. 点绿色按钮 **Create repository**。

### 第 2 步 · 上传文件

1. 建好仓库后，你会看到仓库首页，中间有一句「Get started by creating a new file or uploading an existing file」，点旁边的 **uploading an existing file** 链接；或者点页面上方的 **Add file** 按钮 → **Upload files**。
2. 打开你电脑上的项目文件夹 `D:\dev4\archive1980`，**全选里面的内容**（`index.html`、`manifest.json`、`sw.js`，以及 `assets`、`content` 两个文件夹）→ 直接拖进浏览器页面的虚线框里。
   - ⚠️ **拖「里面的东西」，不要拖外层文件夹本身**。判断标准：上传完成后，仓库根目录第一层必须能直接看到 `index.html`，而不是先看到一个 `archive1980` 文件夹再点进去才是 `index.html`。
   - ⚠️ 一次拖不进去就分两次：先传 `index.html`、`manifest.json`、`sw.js` 三个文件，Commit 之后再传 `assets` 和 `content` 两个文件夹。
3. 等进度条走完，页面下方 **Commit changes** 区域保持默认（提交信息随便，比如 `upload`），点绿色 **Commit changes**。
4. 上传完成后，回到仓库首页，确认列表里能看到 `index.html`、`assets`、`content` 等条目。

### 第 3 步 · 打开 Pages

1. 在仓库页面顶部一排标签里，点最右边的 **Settings**（齿轮图标）。
2. 左侧竖排菜单往下找，点 **Pages**（在「Code and automation」分组里）。
3. 在 **Build and deployment** 下：
   - **Source** 下拉框选 **Deploy from a branch**。
   - **Branch** 下拉框选 **`main`**，右边目录框选 **`/ (root)`**。
   - 点 **Save**。
4. **等 1–2 分钟**，刷新这个页面，顶部会出现一条绿色（或蓝色）提示：
   > Your site is live at `https://你的用户名.github.io/archive1980/`
   点这个网址就能打开游戏。
5. 如果 5 分钟后还是 404：回到仓库首页，确认默认分支是不是叫 `main`（有的账号默认叫 `master`，那就把 Pages 里选成 `master`）；确认 `index.html` 在根目录；再等几分钟（首次发布偶尔要 5–10 分钟）。

**你的最终网址格式**：`https://你的GitHub用户名.github.io/archive1980/`
（用户名就是你注册时用的英文 ID，登录后点右上角头像能看到。**记住这个网址，下一步要用。**）

---

## 二、部署前检查清单

上传之前，花 2 分钟对一遍，能省掉 90% 的「打开是白屏」：

| # | 检查项 | 怎么查 |
| --- | --- | --- |
| 1 | `index.html` 在**根目录** | 打开 `D:\dev4\archive1980`，第一层就能看到 `index.html`，不是藏在某个子文件夹里 |
| 2 | 所有文件名、文件夹名：**纯英文小写、无空格、无中文** | `assets`、`images`、`content`、`index.html`、`manifest.json`、`sw.js` 全部符合；图片名如 `loan-card-front.jpg` |
| 3 | 图片引用路径与真实文件名**大小写完全一致** | 在 `index.html` 里搜 `assets/images/`，逐个和 `assets\images\` 里的实际文件名核对 |
| 4 | 没有外部依赖 | 全文搜 `http://` 和 `https://`，除了注释和 `manifest` 里的标准字段，不应该有 CDN、字体、图床、第三方 API |
| 5 | `manifest.json`、`sw.js` 路径正确 | 两个文件都在根目录，`index.html` 里引用的是相对路径 `./manifest.json`、`./sw.js` 这种形式 |
| 6 | 强制 HTTPS | GitHub Pages 默认开启，Settings → Pages 里有「Enforce HTTPS」勾上即可 |
| 7 | 浏览器控制台无红色报错 | 本地双击 `index.html`，按 F12 → Console，刷新一次，看有没有红色错误 |
| 8 | 图片都真的存在 | 12 张图在 `assets\images\` 下，大小不为 0 KB |

---

## 三、部署后验证清单

拿到网址后，别急着发出去，按下面走一遍：

### 电脑端（Chrome / Edge）

- [ ] 打开 `https://你的用户名.github.io/archive1980/`，页面能正常显示，浏览器标签标题是「秦巴县档案馆·数字检索平台」。
- [ ] 首次打开有开机自检动画（绿色字符滚动），约 2–3 秒后进入主界面。
- [ ] 依次输入：`秦巴壹` → `陈望` → `水文观测站` → `基础气象观测`，四份档案都能调出，顶部时间依次推进到 06:00 / 12:00 / 17:00 / 19:00。
- [ ] 档案4 里那张图显示「图片加载失败」；**右键点击**这张图 → 变成写着 `183` 的信纸角。
- [ ] 输入 `183` → 调出档案5，信纸全文可见，「山洪」「渡口」「封存」三词和保底提示都在。
- [ ] 输入 `1577`（或 `1577公里`）→ 调出档案6，系统时间翻到「1980年8月5日 00:00」，灯闪一下、有钟声。
- [ ] 输入你的名字作为补录人 → 生成《781号档案补录凭证》，印章和编号 781 都在。
- [ ] 档案列表底部出现《你的名字·存在性登记》。
- [ ] **按 F5 刷新**：进度全部保留，且顶部系统日志变成「**欢迎回来，陈望。**」

### 手机端（真机，别只用开发者工具模拟）

- [ ] 手机浏览器打开同一个网址，把窗口缩到 375px 宽（iPhone SE / 12 mini 尺寸）不出现横向滚动条、按钮不被遮挡。
- [ ] 输入框能弹出中文键盘，**按回车直接触发检索**。
- [ ] 档案4 里那张破图，**长按约 2 秒**（按住不动，不要滑动）能切换成 `183`。
- [ ] 档案卡片展开／收起顺畅，字体不小于 14px，不需要放大才能读。
- [ ] 刷新后进度不丢。
- [ ] 可选：Safari「分享 → 添加到主屏幕」，图标和名称正常，从桌面图标打开是全屏（无浏览器地址栏）。

### 如果哪一条没过

跳到文末「七、常见问题」，那里按症状列了排查办法。

---

## 四、部署完成后必须做的收尾：回填真实网址

**这一步不做，入口素材就是废的。** 游戏本体能玩，但「从旧书里发现网址」这条现实线接不上。

把部署拿到的网址（假设是 `https://yourname.github.io/archive1980/`）回填到下面每一处：

| 位置 | 具体怎么改 |
| --- | --- |
| 1. `loan-card-back.jpg`（借书卡背面图） | 两种做法任选：<br>**A. 重新生成**：拿 `assets/image-prompts.md` 里借书卡背面的提示词，把网址一起写进提示词（要求「蓝黑钢笔手写，一行，居中」），生成后同名覆盖。<br>**B. 后期叠加**：把原图丢进任意在线图片编辑器（稿定设计、Canva、甚至系统画图），用一款手写风格字体把网址打在卡片中央，颜色取 `#1a2b4a` 左右的蓝黑，稍微旋转 1–2 度、降低一点不透明度，看起来才像手写。 |
| 2. `entry-kit.md` 里所有【部署后的真实网址】 | 全文搜索【部署后的真实网址】，逐个替换成真实地址。建议替换成**带 `https://` 的完整形式**，因为玩家要复制粘贴。 |
| 3. 二维码 | 见 `entry-kit.md` 第五节：用免费工具把网址转成二维码图，缩小后贴在借书卡图右下角或角落。 |
| 4. 你自己要发的笔记／帖子 | 正文里所有网址，统一替换。 |
| 5. 短链（可选） | 觉得 `https://xxx.github.io/archive1980/` 太长、太像「个人主页」，可以先去第二节做一条短链，然后用短链替代长网址回填——**但注意：短链一旦生成就不要改，改了所有已发布的素材都会失效。** |

**回填自检**：在手机上手动敲一遍借书卡图上的网址（不要复制），能一次打开游戏，说明字母、大小写、斜杠都没错。**这是最容易出错的一步**——`0`（数字零）和 `o`（字母）看错一个字母，玩家就进不来。

---

## 五、短链伪装三方案（可选）

目的：让入口网址看起来不像「某个人的 GitHub 主页」，更像一个真实存在的小网站。三种方案按成本从高到低排列。

### 方案 A：自定义域名（最像真的）

买一个便宜域名（`.top`/`.xyz` 首年通常几块到几十块），绑到 GitHub Pages 上。最终网址变成 `https://www.你的域名.com/`，或者干脆 `https://qinba-archive.xxx`。

**操作步骤**：

1. 在任意域名注册商（阿里云、腾讯云、Namecheap 等）买一个域名。
2. 域名后台添加 DNS 解析：4 条 `A` 记录指向 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`；再加一条 `CNAME`，主机记录填 `www`，记录值填 `你的用户名.github.io`。
3. 回到 GitHub 仓库 → Settings → Pages → **Custom domain** 填你的域名 → Save。
4. 等 DNS 生效（几分钟到几小时），Pages 页面勾上 **Enforce HTTPS**。
5. 用新域名重新回填借书卡图、二维码、文案。

**优点**：最像真实网站，可信度最高，网址可读、可记、可印在纸上；没有中间跳转。
**缺点**：要花钱（域名年费）；要等 DNS 生效；域名到期忘了续费，所有已发布的素材全部失效；备案问题（国内服务器才需要，GitHub Pages 不需要，但部分国内网络访问可能不稳）。

### 方案 B：免费短链服务（最省事）

用 is.gd、TinyURL、短链接生成器之类的免费服务，把长网址压成 `https://is.gd/xxxxx` 这种。

**操作步骤**：

1. 打开短链服务网站（如 `is.gd`、`tinyurl.com`）。
2. 把完整网址粘进去，可选填一个自定义后缀（如 `qinba1980`），生成。
3. 立刻复制生成的短链，**存到记事本里备份**（很多免费服务不提供管理后台，丢了就找不回）。
4. 用短链重新回填所有素材。

**优点**：1 分钟搞定，零成本，网址短到可以手写在借书卡上；改起来也快。
**缺点**：有跳转痕迹（懂的人一看就知道是短链，反而暴露「这是被人为包装过的链接」）；免费服务可能限流、失效、被墙；**无法保证长期可用**，一旦服务关停，你所有印出去的素材全废。不建议把它当作唯一入口。

### 方案 C：直接用默认 GitHub Pages 域名（最稳）

就是 `https://你的用户名.github.io/archive1980/`。

**操作步骤**：什么都不用做，部署完就是它。

**优点**：零成本、零维护、永久有效（只要仓库还在）；HTTPS 自带；不会被第三方服务拖累。
**缺点**：一眼能看出是 GitHub 个人站，真实感弱一些；网址偏长，手写在借书卡上要挤一挤。

**怎么选**：

- 只是自己玩、发给朋友 → **方案 C**，够用。
- 想让「旧书里翻出网址」这条线更可信、要发社交平台 → **方案 A**（预算允许）或 **方案 C + 二维码**（用二维码藏住网址长度）。
- **不建议只用方案 B**。短链适合当「二次入口」（比如印在二维码旁边做备用），不适合当唯一地址。

---

## 六、打包成安卓 App（可选进阶）

把网页装进一个 WebView 壳里，就能生成一个 `.apk` 安装包。**核心建议：壳里直接加载线上网址，不要把网页文件塞进安装包**——因为你的游戏是纯静态的，线上更新即时生效，塞进包里的版本以后改一次就要重新打包发一次。

### 方式一：HBuilderX（最简单，推荐新手）

1. 下载安装 **HBuilderX**（免费，官网 dcloud.io）。
2. 菜单 **文件 → 新建 → 项目 → 5+App**，模板选「默认模板」，项目名填 `qinba-archive`。
3. 打开项目里的 `manifest.json`（可视化界面），逐项配置：
   - **基础配置**：应用名称填「秦巴县档案馆」，AppID 点「重新获取」（需登录 DCloud 账号），版本名 `1.0.0`，版本号 `100`。
   - **图标配置**：上传 `assets/images/logo.png`，让工具自动生成各尺寸图标。
   - **启动界面**：可选，用 `archive-room.jpg` 做启动图更带感。
   - **模块权限配置**：这里**不要**勾任何敏感权限（不要定位、不要通讯录、不要存储读写）。这个游戏一个权限都不需要，勾了反而会被应用市场和安全软件盯上。
   - **源码视图**（右上角切到源码）里，关键配置项：
     - `"app-plus" → "launchwebview"` 或直接用 `plus.runtime.openWeb`；更常见的做法是在 `index.html` 里用 `plus.webview.create()` 加载线上网址。
     - `"runmode": "liberate"`（释放模式，性能更好）。
4. 在项目根目录的 `index.html` 里，把默认内容换成一段跳转脚本，让它一启动就加载线上网址：

   ```html
   <!DOCTYPE html>
   <html>
   <head><meta charset="utf-8"><title>秦巴县档案馆</title></head>
   <body>
   <script>
     // 等 5+ 环境就绪后，直接打开线上网址（全屏 WebView）
     document.addEventListener('plusready', function () {
       var wv = plus.webview.create(
         'https://你的用户名.github.io/archive1980/',   // ← 换成你的真实网址
         'main',
         { top: '0px', bottom: '0px' }
       );
       wv.show();
     }, false);
   </script>
   </body>
   </html>
   ```

5. 菜单 **发行 → 原生App-云打包**，选 Android，使用 DCloud 公共测试证书（免费）→ 打包 → 下载 `.apk`。
6. 把 apk 传到手机安装测试。

### 方式二：Android Studio（更可控，需要一点耐心）

1. 安装 **Android Studio**，新建 **Empty Views Activity** 项目。
2. `AndroidManifest.xml` 里加联网权限（**必须**，否则加载不了线上网址）：

   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   ```

   并在 `<application>` 上加 `android:usesCleartextTraffic="false"`（走 HTTPS 就不用开明文）。
3. 布局里放一个铺满屏幕的 `WebView`（`match_parent` × `match_parent`）。
4. Activity 里初始化 WebView，**这几个开关是关键**：

   ```java
   WebView wv = findViewById(R.id.webview);
   WebSettings s = wv.getSettings();

   // ① 允许 JS —— 游戏全部逻辑靠它，不开就是白屏
   s.setJavaScriptEnabled(true);

   // ② 允许 localStorage —— 存档（已解锁档案、补录人姓名、二周目状态）全靠它
   //    DOM Storage 默认是关的，必须显式打开，否则刷新就丢进度
   s.setDomStorageEnabled(true);

   // ③ 允许 WebAudio 播放 —— 环境音、调档"滴"声、终局钟声需要
   //    无需特殊开关，但必须允许媒体自动播放（见下面 setMediaPlaybackRequiresUserGesture）
   s.setMediaPlaybackRequiresUserGesture(false);

   // ④ 允许数据库存储（localStorage 的底层依赖之一，老机型保险起见）
   s.setDatabaseEnabled(true);

   // ⑤ 视口适配：让页面的 viewport 生效，375px 布局才不会错乱
   s.setUseWideViewPort(true);
   s.setLoadWithOverviewMode(true);

   // ⑥ 允许混合内容（仅在加载 http 页面时需要；线上是 https 就设 NEVER_ALLOW）
   s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);

   // ⑦ 长按图片：默认 WebView 会弹系统菜单，把长按交给网页自己处理
   wv.setLongClickable(false);          // 关掉原生长按菜单
   wv.setOnLongClickListener(v -> true); // 拦截，事件仍会传给网页 JS

   wv.loadUrl("https://你的用户名.github.io/archive1980/"); // ← 换成你的真实网址
   ```

5. 再加一个返回键处理，否则按返回会直接退出 App：

   ```java
   @Override
   public void onBackPressed() {
       if (wv.canGoBack()) { wv.goBack(); } else { super.onBackPressed(); }
   }
   ```

6. 菜单 **Build → Build Bundle(s)/APK(s) → Build APK(s)**，产物在 `app/build/outputs/apk/`。

### `file://` 和 `http(s)://` 的区别（务必看懂这一条）

| | `file://`（把网页文件塞进安装包） | `http(s)://`（加载线上网址，**推荐**） |
| --- | --- | --- |
| localStorage | 部分 WebView 内核在 `file://` 下会**禁用或隔离** localStorage，刷新就丢进度，甚至直接报错 | 正常，进度稳定保存 |
| Service Worker / PWA | `file://` 下基本不可用 | HTTPS 下正常 |
| Web Audio | `file://` 下自动播放策略更严格，容易没声音 | 正常 |
| 更新内容 | 改一次网页就要重新打包、重新分发 apk | 改完推上 GitHub，用户下次打开就是新版 |
| 跨域／资源加载 | 容易踩到同源策略坑 | 正常 |

**结论**：只要网页已经部署上线，App 壳就**只负责打开那个网址**，一行 `loadUrl` 搞定。这也是本项目推荐的做法。

### 打包提醒

- 应用名不要用「档案馆」「政府」「水利局」等字样，避免被误认为官方应用；建议用「秦巴档案」或干脆用「1980」这类中性名字。
- 不要申请任何敏感权限（定位、通讯录、短信、存储）。一个都不要。
- 自己玩／发给朋友可以直接装 apk；**不要上传到任何应用商店**——应用商店对「伪装成政府机构」的内容会直接拒绝甚至封号。
- 打包出来的 apk 只用于个人分发，不作为本项目正式交付物。

---

## 七、常见问题

### 图片不显示（最常见）

**症状**：页面能打开，但借书卡、书封、印章全是空白或灰色裂图。

**原因与处理**：
1. **大小写不一致**（占 90%）。GitHub Pages 跑在 Linux 上，`Logo.png` ≠ `logo.png`，`images/` ≠ `Images/`。把 `index.html` 里所有 `src="assets/images/xxx.png"` 和 `assets\images\` 里的实际文件名逐一比对，一个字母一个字母对。
2. **路径少了层级**。用了 `assets/images/xxx.png`，但实际文件在 `assets/images/archive/xxx.png`。
3. **上传时漏了 `assets` 文件夹**。回仓库首页看有没有 `assets` 目录；没有就重新 Upload files，注意**拖文件夹本身**（GitHub 网页上传支持拖文件夹，但有些浏览器会把它展开成散文件，导致路径层级丢失）。稳妥做法：用 GitHub Desktop 客户端上传，或在仓库里手动 **Add file → Create new file**，文件名直接写 `assets/images/logo.png`（斜杠会自动建目录）。
4. **文件名带空格或中文**。改成纯英文小写、用连字符 `-` 连接。
5. 本地能显示、线上不行 → 一定是 1 或 2。按 F12 看 Console 里的 404 报错，报错信息里会写出它到底在找哪个路径，照着一字不差地改。

### 长按不灵（隐藏图切不出来）

**症状**：手机长按档案4 的破图，什么也没发生。

**处理**：
1. **iOS 必须先禁用系统长按菜单**。页面的图片样式里要有：

   ```css
   .scan-thumb {
     -webkit-touch-callout: none;   /* 关掉 iOS 长按弹出的"存储图像/拷贝"菜单 */
     -webkit-user-select: none;      /* 关掉文字选中，否则长按会选中图片周围的字 */
     user-select: none;
     touch-action: manipulation;     /* 避免长按被识别成双击缩放 */
   }
   ```

2. **长按姿势**：按住图片**不要动**，约 2 秒；手指稍微一滑，浏览器就判定成「滚动页面」，事件不会触发。
3. **Safari 的特殊情况**：如果页面里同时有 `contextmenu` 监听和 `-webkit-touch-callout: default`，会互相打架。确保监听里 `e.preventDefault()`。
4. **兜底路径永远有效**：让玩家直接在搜索框输 `183`。档案4 正文里也写了「如显示加载失败，可尝试长按（或右键）图片重新调取」，所以卡住的玩家有出路。这也是为什么隐藏入口不能是**唯一**通路。
5. 电脑端：右键点击图片即可，不用长按。

### 刷新后进度丢失

**症状**：玩到一半刷新，档案全没了，又回到开机动画。

**处理**：
1. **无痕／隐私模式**：Chrome 无痕、Safari 无痕窗口关闭时会清空 localStorage。换普通窗口玩。
2. **浏览器设置里禁用了 Cookie 和网站数据**：Chrome → 设置 → 隐私和安全 → 第三方 Cookie／网站数据，允许本站存储。
3. **`file://` 双击打开**：部分浏览器对本地文件的 localStorage 隔离，关掉页面就清空。改用 `python -m http.server 8080` 起本地服务器。
4. **iOS「阻止所有 Cookie」**：设置 → Safari → 打开「阻止所有 Cookie」会导致 localStorage 失效，关掉它。
5. 换了设备／换了浏览器 → 进度不会同步，这是设计使然（没有后端，不收集数据）。
6. 想手动重置进度：F12 → Console → 输 `localStorage.clear()` → 回车 → 刷新。

### GitHub Pages 打开是 404

**症状**：网址打开显示「There isn't a GitHub Pages site here.」或 404 页面。

**处理**：
1. **先等**。首次发布要 1–10 分钟，刚 Save 完就打不开是正常的。刷新 Settings → Pages 页面，看顶部有没有绿色「Your site is live at …」。
2. **分支选错了**。仓库默认分支可能是 `master` 而不是 `main`。去仓库首页看分支下拉框写的是什么，Pages 里就选什么。
3. **目录选错了**。必须是 `/ (root)`。如果你的 `index.html` 在某个子文件夹里，要么选那个子文件夹，要么把文件挪到根目录。
4. **仓库是 Private**。免费账号的 Private 仓库不能开 Pages，改成 Public（Settings → 最下方 Danger Zone → Change visibility）。
5. **文件名不是 `index.html`**。GitHub Pages 只认根目录的 `index.html` 作为首页，`Index.html`、`home.html` 都不行。
6. **刚改完文件**。每次 Commit 后要重新等 1–2 分钟构建，构建期间可能短暂 404。
7. 还是不行：Settings → Pages 页面往下看有没有红色报错（比如构建失败），按提示改。

### 页面打开了但一片空白

1. F12 → Console 看红色报错。最常见是 `Uncaught SyntaxError`（改代码时漏了括号／逗号）。
2. 恢复办法：从备份里拿回原始 `index.html` 重新上传。**改代码前务必备份**。
3. 检查是不是用了 `localStorage` 但浏览器禁止了（Safari 无痕模式下 `localStorage.setItem` 会直接抛异常，导致整个脚本中断）。

### 环境音没有声音

1. 浏览器策略：**必须用户先点一下页面**（任何位置）才允许播放音频。这是浏览器的规定，不是 bug。
2. 手机静音开关（iOS 侧边拨片）拨到静音，网页音频也会没声。
3. 右上角有「环境音」开关，确认没被关掉（开关状态存在 localStorage 里，之前关过就会一直关着）。

### 二周目日志没变成「欢迎回来，陈望。」

1. 必须是**已经生成过凭证**之后刷新才会变。只解锁到档案5 不会变。
2. 检查 localStorage 里有没有归档标记：F12 → Application → Local Storage，找 `archive1980` 相关的 key。
3. 无痕模式下刷新不会保留，属正常。
