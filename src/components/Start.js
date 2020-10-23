import { Appearance } from "react-native";

export default (favorites) => {
  return `
<html lang="en"  class="${Appearance.getColorScheme()}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>个人收藏</title>
  </head>
  <body class="${Appearance.getColorScheme()}">
  </body>
</html>
    `;
};
