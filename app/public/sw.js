if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let n={};const t=e=>s(e,r),d={module:{uri:r},exports:n,require:t};a[r]=Promise.all(c.map((e=>d[e]||t(e)))).then((e=>(i(...e),n)))}}define(["./workbox-ab57e048"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/267-ec4711088f0674da.js",revision:"ec4711088f0674da"},{url:"/_next/static/chunks/267-ec4711088f0674da.js.map",revision:"6315e60988838ab044f22b46570e51a9"},{url:"/_next/static/chunks/351-b89f150b0c75245d.js",revision:"b89f150b0c75245d"},{url:"/_next/static/chunks/351-b89f150b0c75245d.js.map",revision:"5fb53afa0af11e556f5181bef52d620d"},{url:"/_next/static/chunks/470-abe1949f8b303945.js",revision:"abe1949f8b303945"},{url:"/_next/static/chunks/470-abe1949f8b303945.js.map",revision:"339418614e7d3f1c55e08142f1fe5bc5"},{url:"/_next/static/chunks/478-ea579f229301e6b3.js",revision:"ea579f229301e6b3"},{url:"/_next/static/chunks/478-ea579f229301e6b3.js.map",revision:"cf9fc68ed290929e38c7edfb2859abd8"},{url:"/_next/static/chunks/556-527d172af597685e.js",revision:"527d172af597685e"},{url:"/_next/static/chunks/556-527d172af597685e.js.map",revision:"842e9dfd85e9f84bd5df5ebac4592d5b"},{url:"/_next/static/chunks/600-decaccb039bf02dc.js",revision:"decaccb039bf02dc"},{url:"/_next/static/chunks/600-decaccb039bf02dc.js.map",revision:"f9ce54a3b95e23e65d9fd9150f2f19c3"},{url:"/_next/static/chunks/628.80dab8e7b67146fb.js",revision:"80dab8e7b67146fb"},{url:"/_next/static/chunks/628.80dab8e7b67146fb.js.map",revision:"79c0b28ff2c255de92802fa192f6f92e"},{url:"/_next/static/chunks/710-bc142c1ff51f72c1.js",revision:"bc142c1ff51f72c1"},{url:"/_next/static/chunks/710-bc142c1ff51f72c1.js.map",revision:"0d8ca6f9941749cbd00c105af524ab26"},{url:"/_next/static/chunks/728-9dcd60df2548ba83.js",revision:"9dcd60df2548ba83"},{url:"/_next/static/chunks/728-9dcd60df2548ba83.js.map",revision:"d6216f79034bc7b331854f967593eb03"},{url:"/_next/static/chunks/821-1708695a8de32c3e.js",revision:"1708695a8de32c3e"},{url:"/_next/static/chunks/821-1708695a8de32c3e.js.map",revision:"51a21b5a50031e9ee1f2eed0c40ed6d8"},{url:"/_next/static/chunks/82f64d96.35f2ec259c279a3e.js",revision:"35f2ec259c279a3e"},{url:"/_next/static/chunks/82f64d96.35f2ec259c279a3e.js.map",revision:"2b29dc3658a2114425a69b65b7a2089f"},{url:"/_next/static/chunks/b451ad5c.562ac27cd5ebe1a8.js",revision:"562ac27cd5ebe1a8"},{url:"/_next/static/chunks/ebec3a01-d0c2a72318726857.js",revision:"d0c2a72318726857"},{url:"/_next/static/chunks/ebec3a01-d0c2a72318726857.js.map",revision:"e76f1d564b833185c305a8051943d85a"},{url:"/_next/static/chunks/framework-d557f881247be017.js",revision:"d557f881247be017"},{url:"/_next/static/chunks/framework-d557f881247be017.js.map",revision:"17f503d3af31042e4829efe83c2a67a0"},{url:"/_next/static/chunks/main-b8c6cea0a4cd8f8c.js",revision:"b8c6cea0a4cd8f8c"},{url:"/_next/static/chunks/main-b8c6cea0a4cd8f8c.js.map",revision:"2440b6d1fa653812395ccb4843d75e94"},{url:"/_next/static/chunks/pages/_app-3d3084217428f982.js",revision:"3d3084217428f982"},{url:"/_next/static/chunks/pages/_error-091718f9471b9570.js",revision:"091718f9471b9570"},{url:"/_next/static/chunks/pages/_error-091718f9471b9570.js.map",revision:"0c02770ea49d54683ba4b942b8b0306d"},{url:"/_next/static/chunks/pages/account-2e7b10818006454c.js",revision:"2e7b10818006454c"},{url:"/_next/static/chunks/pages/account-2e7b10818006454c.js.map",revision:"24b235d9a2a8fd34f704869b2fbb3674"},{url:"/_next/static/chunks/pages/appsumo-64d4d4dc1511f18b.js",revision:"64d4d4dc1511f18b"},{url:"/_next/static/chunks/pages/appsumo-64d4d4dc1511f18b.js.map",revision:"72e037304477852566199020c25c5016"},{url:"/_next/static/chunks/pages/capacity-9344965f72d727a3.js",revision:"9344965f72d727a3"},{url:"/_next/static/chunks/pages/capacity-9344965f72d727a3.js.map",revision:"b48b37f4ff33647653126eff8381c62c"},{url:"/_next/static/chunks/pages/email-auth-cd1dc97839368839.js",revision:"cd1dc97839368839"},{url:"/_next/static/chunks/pages/email-auth-cd1dc97839368839.js.map",revision:"6636ba0a09759a7efcb4df9082184499"},{url:"/_next/static/chunks/pages/focus-2695f1398231ff9c.js",revision:"2695f1398231ff9c"},{url:"/_next/static/chunks/pages/focus-2695f1398231ff9c.js.map",revision:"3cd551dd94a2f6cd93ba78ab3d0a4927"},{url:"/_next/static/chunks/pages/habits-cbdf888c137e1771.js",revision:"cbdf888c137e1771"},{url:"/_next/static/chunks/pages/habits-cbdf888c137e1771.js.map",revision:"7eb8cf8d938ab8fc2ed90f7690b308f5"},{url:"/_next/static/chunks/pages/home-dd9587bde7fc040e.js",revision:"dd9587bde7fc040e"},{url:"/_next/static/chunks/pages/home-dd9587bde7fc040e.js.map",revision:"209a1736d63da10fcfee61d9b70bf061"},{url:"/_next/static/chunks/pages/index-61ecb959eb457e43.js",revision:"61ecb959eb457e43"},{url:"/_next/static/chunks/pages/index-61ecb959eb457e43.js.map",revision:"a860ea7bf858bf7b58e21f68153ba18d"},{url:"/_next/static/chunks/pages/oauth-ab9d6a76093d3871.js",revision:"ab9d6a76093d3871"},{url:"/_next/static/chunks/pages/oauth-ab9d6a76093d3871.js.map",revision:"18f909ea2fbdfa4cadd0f3d4c63b72c7"},{url:"/_next/static/chunks/pages/privacy-policy-9ca509c5cce2cf62.js",revision:"9ca509c5cce2cf62"},{url:"/_next/static/chunks/pages/privacy-policy-9ca509c5cce2cf62.js.map",revision:"aea64f33d709d262428b157e26c435fc"},{url:"/_next/static/chunks/pages/projects-7a580d267a9edb8b.js",revision:"7a580d267a9edb8b"},{url:"/_next/static/chunks/pages/projects-7a580d267a9edb8b.js.map",revision:"0009b36dd1f8187623e99b2b2a28501e"},{url:"/_next/static/chunks/pages/projects/%5Bid%5D-1c7015e027c5f4e1.js",revision:"1c7015e027c5f4e1"},{url:"/_next/static/chunks/pages/projects/%5Bid%5D-1c7015e027c5f4e1.js.map",revision:"99182b60cf0a5c6c5052ce5e41c7e4ce"},{url:"/_next/static/chunks/pages/projects/create-6bea940e4925d11e.js",revision:"6bea940e4925d11e"},{url:"/_next/static/chunks/pages/projects/create-6bea940e4925d11e.js.map",revision:"8007561b56be76c47a0a121dbf0c0a0e"},{url:"/_next/static/chunks/pages/sessions-acbe7afb3a6f0d5c.js",revision:"acbe7afb3a6f0d5c"},{url:"/_next/static/chunks/pages/sessions-acbe7afb3a6f0d5c.js.map",revision:"e3c13ba3d3264f2af9ab00ad23903208"},{url:"/_next/static/chunks/pages/terms-of-service-c3172960169aec0f.js",revision:"c3172960169aec0f"},{url:"/_next/static/chunks/pages/terms-of-service-c3172960169aec0f.js.map",revision:"7510e038893272f3d0230b21c75aaf79"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/reactPlayerDailyMotion.c95dd87793f9c6ee.js",revision:"c95dd87793f9c6ee"},{url:"/_next/static/chunks/reactPlayerDailyMotion.c95dd87793f9c6ee.js.map",revision:"935bd21875bee73cca47d42dad5977a1"},{url:"/_next/static/chunks/reactPlayerFacebook.3dacff4ee0313cd2.js",revision:"3dacff4ee0313cd2"},{url:"/_next/static/chunks/reactPlayerFacebook.3dacff4ee0313cd2.js.map",revision:"587b4dacc75e16729e0b4fcaf659818c"},{url:"/_next/static/chunks/reactPlayerFilePlayer.e15a3ef4cd38a916.js",revision:"e15a3ef4cd38a916"},{url:"/_next/static/chunks/reactPlayerFilePlayer.e15a3ef4cd38a916.js.map",revision:"2507cd12ee0191b06555824acdb68893"},{url:"/_next/static/chunks/reactPlayerKaltura.299c29d5eafa4c54.js",revision:"299c29d5eafa4c54"},{url:"/_next/static/chunks/reactPlayerKaltura.299c29d5eafa4c54.js.map",revision:"67e710f246185274834a707337d2cdd7"},{url:"/_next/static/chunks/reactPlayerMixcloud.658d9dc5e589f96f.js",revision:"658d9dc5e589f96f"},{url:"/_next/static/chunks/reactPlayerMixcloud.658d9dc5e589f96f.js.map",revision:"d954276b6c5013ff6dc25fdfd6d28ed0"},{url:"/_next/static/chunks/reactPlayerPreview.d2f7ac9437be394a.js",revision:"d2f7ac9437be394a"},{url:"/_next/static/chunks/reactPlayerPreview.d2f7ac9437be394a.js.map",revision:"2032e77276acd7ba597dd00591b08d1a"},{url:"/_next/static/chunks/reactPlayerSoundCloud.be5ac3f3ea8f5597.js",revision:"be5ac3f3ea8f5597"},{url:"/_next/static/chunks/reactPlayerSoundCloud.be5ac3f3ea8f5597.js.map",revision:"d200110375835ea9cc039f5337de4e59"},{url:"/_next/static/chunks/reactPlayerStreamable.b93d46af7abd7e78.js",revision:"b93d46af7abd7e78"},{url:"/_next/static/chunks/reactPlayerStreamable.b93d46af7abd7e78.js.map",revision:"c653d05ff4f1bf8482cea806d50ce8fc"},{url:"/_next/static/chunks/reactPlayerTwitch.fb6959c05d17979f.js",revision:"fb6959c05d17979f"},{url:"/_next/static/chunks/reactPlayerTwitch.fb6959c05d17979f.js.map",revision:"2faae52d08c068fcfc7fffa70fc0df9d"},{url:"/_next/static/chunks/reactPlayerVidyard.417cbc16a0afe033.js",revision:"417cbc16a0afe033"},{url:"/_next/static/chunks/reactPlayerVidyard.417cbc16a0afe033.js.map",revision:"424e4dd8d69e8b50a6ce02e00c34205c"},{url:"/_next/static/chunks/reactPlayerVimeo.e2b01a9bcf034e32.js",revision:"e2b01a9bcf034e32"},{url:"/_next/static/chunks/reactPlayerVimeo.e2b01a9bcf034e32.js.map",revision:"30a1b61604c0c370bef5378ab7b9487c"},{url:"/_next/static/chunks/reactPlayerWistia.aafa6c00e9868d4b.js",revision:"aafa6c00e9868d4b"},{url:"/_next/static/chunks/reactPlayerWistia.aafa6c00e9868d4b.js.map",revision:"eda4ddfe499e5017ada76ee8db75436c"},{url:"/_next/static/chunks/reactPlayerYouTube.d3be62a15d762a1e.js",revision:"d3be62a15d762a1e"},{url:"/_next/static/chunks/reactPlayerYouTube.d3be62a15d762a1e.js.map",revision:"53aed2259a9aa1afdf7aae8c9bb7e899"},{url:"/_next/static/chunks/webpack-c1f328dfbcf3b4a9.js",revision:"c1f328dfbcf3b4a9"},{url:"/_next/static/chunks/webpack-c1f328dfbcf3b4a9.js.map",revision:"7b748afbfe68942a69d4f2cd5ff0965d"},{url:"/_next/static/css/381978429272531b.css",revision:"381978429272531b"},{url:"/_next/static/css/381978429272531b.css.map",revision:"e295e3b9454147e4ade16c45a52c9a68"},{url:"/_next/static/kGU4LyJ0SOnuN-PnuvuLy/_buildManifest.js",revision:"e90382a4589fb433037c7bc773b0cc0c"},{url:"/_next/static/kGU4LyJ0SOnuN-PnuvuLy/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/243816ba55de2c3c-s.woff2",revision:"2178181c6036bb92044ceebda69a8e70"},{url:"/_next/static/media/26fc07203f7fba4b-s.woff2",revision:"eefa9bb18e5824695f440b6f00065c04"},{url:"/_next/static/media/336ade822a94467f-s.woff2",revision:"aeec2de3d012721dd743a577cc1a4886"},{url:"/_next/static/media/78591b289fc3df32-s.woff2",revision:"2a987ca040d4658b33b8fb49901583ce"},{url:"/_next/static/media/7ab12a0efe3b6546-s.woff2",revision:"70996e67a17ae67b1ba17c6729beeae3"},{url:"/_next/static/media/b0bdc8e2e79609aa-s.woff2",revision:"aca16db6012a4c6263387b04e1889c9d"},{url:"/_next/static/media/b9b136a66ad923f2-s.woff2",revision:"6ce0af99c26d45e86ed85d6e3f568234"},{url:"/_next/static/media/cdbcea0e589a6ff7-s.p.woff2",revision:"9b0c6e151c40b34b5a20f95a7df9ba0a"},{url:"/audio/complete.mp3",revision:"925bf3428acb6bf89f08efb07eab26bf"},{url:"/audio/pristine-notificaiton.mp3",revision:"a2050abbc10430225cec1e60fd2af2e4"},{url:"/audio/proud-notification.mp3",revision:"e11b3b491b8a6e7ecb34e31ff6c3ad9f"},{url:"/audio/relax-notification.mp3",revision:"6d3a035961da6e7e4b2432a3469ea45c"},{url:"/audio/set_finished_0.mp3",revision:"d46d7db110874da77e094dcbc4bec8e6"},{url:"/images/beach.webp",revision:"a4c6a5091dc2796935adab7f9a353f14"},{url:"/images/dashboard.webp",revision:"80a7266e0049c886fd8ff897eadc6f8e"},{url:"/images/increaser.png",revision:"b48516b224a4a9bd91b5943df22dfe98"},{url:"/images/landing_mobile.webp",revision:"b813d89934a6b6fee6a31649cddef35a"},{url:"/images/logo/apple-icon-180.png",revision:"cce063f8402dd7bd718b97c15643cb03"},{url:"/images/logo/apple-splash-1125-2436.jpg",revision:"4d4e226902dc6d780c5c43d2159c499a"},{url:"/images/logo/apple-splash-1136-640.jpg",revision:"8e299f9d39e0c17205a4569027f6c623"},{url:"/images/logo/apple-splash-1170-2532.jpg",revision:"7f6c1faf96cb87d4272bd33571f8b5c9"},{url:"/images/logo/apple-splash-1179-2556.jpg",revision:"6a2c981730ca6f19953258f5b2d5ebcb"},{url:"/images/logo/apple-splash-1242-2208.jpg",revision:"77e26e1f08294e411c546f14585ec1c8"},{url:"/images/logo/apple-splash-1242-2688.jpg",revision:"0d88fe8e04ae675ebffdf50f8eba1ecf"},{url:"/images/logo/apple-splash-1284-2778.jpg",revision:"1efc2b5cb45b553ae2e4e3547bf76bcc"},{url:"/images/logo/apple-splash-1290-2796.jpg",revision:"7c84fff3ef954b168d91210660dd335f"},{url:"/images/logo/apple-splash-1334-750.jpg",revision:"406ae0d0e7d1caa1c4000117b55d7c01"},{url:"/images/logo/apple-splash-1536-2048.jpg",revision:"9abb6ad8bb348d9f824c3208b9224aaf"},{url:"/images/logo/apple-splash-1620-2160.jpg",revision:"2c84e33b1a4f83a75e1417e276d197fc"},{url:"/images/logo/apple-splash-1668-2224.jpg",revision:"3d2b706f906c793a5e6a61e4aada2745"},{url:"/images/logo/apple-splash-1668-2388.jpg",revision:"e2bf7a9d3395850abb77787522743616"},{url:"/images/logo/apple-splash-1792-828.jpg",revision:"9c90db44c8dee496d7251eb6233e18bd"},{url:"/images/logo/apple-splash-2048-1536.jpg",revision:"5ec17dab5b27ebb48284a4d7140d8cb3"},{url:"/images/logo/apple-splash-2048-2732.jpg",revision:"976f612fe1a4c68ec6f94261b98b2b88"},{url:"/images/logo/apple-splash-2160-1620.jpg",revision:"6b30811ee5ffa52700358afc0be59e5b"},{url:"/images/logo/apple-splash-2208-1242.jpg",revision:"5d085376ffa7b568d6f5011895d7e501"},{url:"/images/logo/apple-splash-2224-1668.jpg",revision:"047f29de278b50e1c77cc21b5cc50f71"},{url:"/images/logo/apple-splash-2388-1668.jpg",revision:"db535e2fa5631f3b059193754feec3f9"},{url:"/images/logo/apple-splash-2436-1125.jpg",revision:"ca7ee96dddbfe109a71892080fa6db31"},{url:"/images/logo/apple-splash-2532-1170.jpg",revision:"96591925a734127365170c259d17c2e0"},{url:"/images/logo/apple-splash-2556-1179.jpg",revision:"f255492e0e4d40bbbbfe27ab9161e9ba"},{url:"/images/logo/apple-splash-2688-1242.jpg",revision:"8479d30925ba9076b2b08732d921f8b4"},{url:"/images/logo/apple-splash-2732-2048.jpg",revision:"973cf25b42c0faccc360b3e42587fb40"},{url:"/images/logo/apple-splash-2778-1284.jpg",revision:"f67f5df1eb7b4ae472041058626f3e80"},{url:"/images/logo/apple-splash-2796-1290.jpg",revision:"cf90d4d9469c78fedb834eb9dbe34c7b"},{url:"/images/logo/apple-splash-640-1136.jpg",revision:"c95f865ba77a434f9842bab10c5351d1"},{url:"/images/logo/apple-splash-750-1334.jpg",revision:"645131d3d0e988de27856ea6c48bc1d8"},{url:"/images/logo/apple-splash-828-1792.jpg",revision:"a2f88d2594cec7b21b168d0b3f8d213d"},{url:"/images/logo/apple-splash-dark-1125-2436.jpg",revision:"e86c77d27b2abc6fd3c4f68c1fb356c1"},{url:"/images/logo/apple-splash-dark-1136-640.jpg",revision:"87d3c71dd62822e42c04a6a399119c1a"},{url:"/images/logo/apple-splash-dark-1170-2532.jpg",revision:"3cf3b18b20b425f72381d4ba59f5be10"},{url:"/images/logo/apple-splash-dark-1179-2556.jpg",revision:"363589064e17c4a6be8328f97555f9e2"},{url:"/images/logo/apple-splash-dark-1242-2208.jpg",revision:"22d65af39fcc22c44c5426fdb14f333e"},{url:"/images/logo/apple-splash-dark-1242-2688.jpg",revision:"d25bf4b7a386c2721b98720ec5b901f4"},{url:"/images/logo/apple-splash-dark-1284-2778.jpg",revision:"e308fb1a282bdf16ed61074cc2e075db"},{url:"/images/logo/apple-splash-dark-1290-2796.jpg",revision:"69439ed4afa0d6ec883cb234e99a493e"},{url:"/images/logo/apple-splash-dark-1334-750.jpg",revision:"071446f953cec4911642af28aeac2381"},{url:"/images/logo/apple-splash-dark-1536-2048.jpg",revision:"45b0b48a4ea9a18eed7643a06ebd30f3"},{url:"/images/logo/apple-splash-dark-1620-2160.jpg",revision:"794d3d17edf143113916563c9f8004ae"},{url:"/images/logo/apple-splash-dark-1668-2224.jpg",revision:"fb5e83a44a9cef0b746d97e4199d8576"},{url:"/images/logo/apple-splash-dark-1668-2388.jpg",revision:"569369ac0f50ee03646d80b2ea36adf8"},{url:"/images/logo/apple-splash-dark-1792-828.jpg",revision:"3421f36ce898e25b94caa9bc58b2a918"},{url:"/images/logo/apple-splash-dark-2048-1536.jpg",revision:"c222562904e9c32422204db6c42557a0"},{url:"/images/logo/apple-splash-dark-2048-2732.jpg",revision:"466e649f314f909e8120136113c75e73"},{url:"/images/logo/apple-splash-dark-2160-1620.jpg",revision:"d5e20314523c0443d84bb3363be2acc7"},{url:"/images/logo/apple-splash-dark-2208-1242.jpg",revision:"5f922feab90b9e9bb70959d92aedb05e"},{url:"/images/logo/apple-splash-dark-2224-1668.jpg",revision:"c4f735fd6b7f8e33f52f29b82aedb44e"},{url:"/images/logo/apple-splash-dark-2388-1668.jpg",revision:"006cba7efad406f7f8e046dc5984894f"},{url:"/images/logo/apple-splash-dark-2436-1125.jpg",revision:"2ecc26270273b542e86879757ac55e79"},{url:"/images/logo/apple-splash-dark-2532-1170.jpg",revision:"08df06da9961137c662da0dd66eeee76"},{url:"/images/logo/apple-splash-dark-2556-1179.jpg",revision:"6e52d4156dfc5a35d61a46eaf8c13a95"},{url:"/images/logo/apple-splash-dark-2688-1242.jpg",revision:"808d78b81919bf8b7f880cae88b1079e"},{url:"/images/logo/apple-splash-dark-2732-2048.jpg",revision:"d1908e2ad68dd1ff45355f087659ee02"},{url:"/images/logo/apple-splash-dark-2778-1284.jpg",revision:"d47944adc0ed52e7d7853a176e14565b"},{url:"/images/logo/apple-splash-dark-2796-1290.jpg",revision:"f3b6665b9192a59f43f71e89d907f223"},{url:"/images/logo/apple-splash-dark-640-1136.jpg",revision:"6f4de0f48a91fcf410f037e878502522"},{url:"/images/logo/apple-splash-dark-750-1334.jpg",revision:"39ec8386b45bf12244fef77d61231f11"},{url:"/images/logo/apple-splash-dark-828-1792.jpg",revision:"b6018001b8e20dcc315834c64008c75e"},{url:"/images/logo/favicon-196.png",revision:"59eefaf339dc1a5610cae7b87deb68b0"},{url:"/images/logo/manifest-icon-192.maskable.png",revision:"fb6754099d265ebd86ce400157112878"},{url:"/images/logo/manifest-icon-512.maskable.png",revision:"0468bdff7295e69fbbaa9a97629c0fa4"},{url:"/images/memoji-smile.webp",revision:"069b7354fab8331d33fcb280f32d40d9"},{url:"/images/mountains.webp",revision:"6788e5960e378901365e5cfe9e2be68f"},{url:"/images/stars.webp",revision:"f3bf434f970cab18cb686c6221558ea9"},{url:"/images/sunrise.webp",revision:"82fa22381677f802f1bc997334415bef"},{url:"/images/testimonials/adi_200.webp",revision:"77bbea08bc4ed54652211354fa740ffd"},{url:"/images/testimonials/aldo_200.webp",revision:"713248377c71f688fd046a4d5feaecf3"},{url:"/images/testimonials/alfredo_200.webp",revision:"8372ec0a9b8cba3e0c8dbc1ec8ca87d2"},{url:"/images/testimonials/andre_200.webp",revision:"be78920d788398a6d1840d73db9ae3c4"},{url:"/images/testimonials/athiya_200.webp",revision:"23730ab5a894d8b6399e276e947469ce"},{url:"/images/testimonials/chi_200.webp",revision:"1ed014b127558191e92c8c52c7ee1c64"},{url:"/images/testimonials/dalton_200.webp",revision:"9e63005dec0ff59c6982664325f2f5a8"},{url:"/images/testimonials/eugene_200.webp",revision:"67fa8be1b7f022ac5e5e88486928195c"},{url:"/images/testimonials/faith_200.webp",revision:"7750309b7fac7fbaddf02991380a1623"},{url:"/images/testimonials/gareth_200.webp",revision:"a66dcff8974987baeca8f07f78d80148"},{url:"/images/testimonials/maksim_200.webp",revision:"c94c0dc096c05844275f31120c4313a4"},{url:"/images/testimonials/mica_200.webp",revision:"4e0ded863a776ebc4df10e9e4709c2b3"},{url:"/images/testimonials/polina_200.webp",revision:"3b57701335aedf273a99de681f7c3e91"},{url:"/images/testimonials/prashant_200.webp",revision:"a900071e5024f46c23f73f8e3c343211"},{url:"/images/testimonials/semion_200.webp",revision:"a9b301465da2e692e81e89d8d8549d85"},{url:"/manifest.json",revision:"08f23a405cea08621a39c6e8cd428c2a"},{url:"/robots.txt",revision:"671f2f2f69f3940a56ff2da3d1ffb9ed"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
//# sourceMappingURL=sw.js.map
