### Update manifest

```sh
npx pwa-asset-generator light-logo.svg ./public/images/logo --manifest ./public/manifest.json --opaque false --icon-only --favicon --type png --path-override ""
npx pwa-asset-generator light-logo.svg ./public/images/logo --manifest ./public/manifest.json --background "#ffffff" --icon-only --path-overrideh ""

npx pwa-asset-generator light-logo.svg ./public/images/logo --manifest ./public/manifest.json --background "#ffffff" --splash-only --path-override ""
npx pwa-asset-generator dark-logo.svg  ./public/images/logo --manifest ./public/manifest.json --background "#1a1a1a" --splash-only --path-override "" --dark-mode
```

### Generate screenshots for landing

```sh
cwebp -resize 1400 0 ./images/dashboard.png -o ./public/images/dashboard.webp
cwebp -resize 600 0 ./images/mobile.png -o ./public/images/landing_mobile.webp
```
