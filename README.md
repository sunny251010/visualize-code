# Visualize Code

Visualize Code là website học lập trình bằng tiếng Việt, tập trung vào giải thích trực quan, lộ trình học rõ ràng và nội dung có thể học mà không cần đăng nhập.

Nền tảng hiện tại dùng [Docusaurus](https://docusaurus.io/) và React.

## Installation

```bash
npm install
```

## Local Development

```bash
npm.cmd run start
```

Trên Windows PowerShell, dùng `npm.cmd` nếu `npm` bị chặn bởi Execution Policy.

## Build

```bash
npm.cmd run build
```

Lệnh này tạo static site trong thư mục `build/`.

## GitHub Pages

Repo đang cấu hình GitHub Pages với:

- `url: https://sunny251010.github.io`
- `baseUrl: /visualize-code/`
- `organizationName: sunny251010`
- `projectName: visualize-code`

Deploy bằng Docusaurus:

```bash
npm.cmd run deploy
```

Lệnh deploy sẽ build site và đẩy nội dung lên nhánh `gh-pages`.
