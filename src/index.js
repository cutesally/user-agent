define(function () {
    function factory (ua) {
        var mod = {
            // OS
            isAndroid: function () {
                return /android/i.test(ua);
            },
            isIOS: function () {
                return /(iPhone|iPod|iPad)/.test(ua);
            },
            isWinPhone: function () {
                return /Windows Phone ([\d.]+)/.test(ua);
            },

            // Version
            iOSVersion: function () {
                var match = /OS (\d+)_(\d+)/.exec(ua);
                return match ? [Number(match[1]), Number(match[2])] : [];
            },
            appleWebkitVersion: function () {
                var match = ua.match(/ applewebkit\/([0-9.]+)/i);
                return match ? match[1].split('.').map(parseFloat) : [];
            },
            baiduBoxVersion: function () {
                // 非手百版本号返回 0
                if (!this.isBaiduBox()) {
                    return 0;
                }
                var match = ua.match(/ baiduboxapp\/([0-9]+_)?([0-9.]+)/i);
                var version = /(iPhone|iPod|iPad)/.test(ua) ? match[2].split('.').reverse() : match[2].split('.');
                return version ? version.map(parseFloat) : [];
            },
            // 简单搜索版本号
            secrVersion: function () {
                // 非简单浏览器版本返回 0
                if (!this.isSearchCraft()) {
                    return 0;
                }
                var match = ua.match(/ SearchCraft\/([0-9]+_)?([0-9.]+)/i);
                var version = /(iPhone|iPod|iPad)/.test(ua) ? match[2].split('.') : match[2].split('.');
                return version ? version.map(parseFloat) : [];
            },
            // chrome 内核版本
            getChromeVersion: function () {
                // 非 chrome 内核，chrome 内核版本返回 0
                if (!this.isChromeDesktop() && !this.isChromeMobile()) {
                    return 0;
                }
                var match = ua.match(/ Chrome\/([0-9]+_)?([0-9.]+)/i);
                return match && match[2] ? match[2].split('.').map(parseFloat) : [];
            },

            // Browser
            isBaiduBox: function () {
                return /baiduboxapp/.test(ua);
            },
            isBaiduBoxLite: function () {
                return /lite baiduboxapp/.test(ua);
            },
            // isQQ 会判断是否 QQ 浏览器
            // 但 Android 平台的手机内置 QQ 的 UA 没有 QQBrowser 字段
            // 所以请使用 isQQApp || isWeixinApp || isQQBrowser 代替此接口
            isQQ: function () {
                return /QQBrowser/.test(ua);
            },
            isQQApp: function () {
                return /QQ\/[0-9]+/.test(ua);
            },
            isWeixinApp: function () {
                return /MicroMessenger/.test(ua);
            },
            // isQQBrowser 会判断是否 QQ 浏览器 但不包括 QQ 微信内置
            isQQBrowser: function () {
                return /QQBrowser/.test(ua) && !(/QQ\//.test(ua) || /MicroMessenger/.test(ua));
            },
            isBaiduBrowser: function () {
                return /baidubrowser/.test(ua);
            },
            isSearchCraft: function () {
                return /SearchCraft/i.test(ua);
            },
            isUC: function () {
                return /UCBrowser/.test(ua);
            },
            isChromeDesktop: function () {
                return /Chrome\//.test(ua);
            },
            isChromeMobile: function () {
                return /Chrome\/(\S*) Mobile/.test(ua);
            },
            // ios 上 chrome 不是 chrome 内核
            isCriOS: function () {
                return /CriOS/.test(ua);
            },
            isSogouMobile: function () {
                return /SogouMobileBrowser/.test(ua);
            },
            isMiuiBrowser: function () {
                return /MiuiBrowser\/(\S*)/.test(ua);
            },

            // kernel
            isWKWebview: function () {
                var webkitVersion = mod.appleWebkitVersion();
                return mod.isIOS() && webkitVersion[0] && webkitVersion[0] > 600;
            },
            isUIWebview: function () {
                var webkitVersion = mod.appleWebkitVersion();
                return mod.isIOS() && webkitVersion[0] && webkitVersion[0] <= 600;
            },

            // functionality
            use: factory
        };
        return mod;
    }

    return factory(navigator.userAgent);
});
