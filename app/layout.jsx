import "./globals.sass";
import { GPT_STICKERS, STICKERS, TOP_10_STICKERS } from "../src/constants";
import { logStickersSortedByLength } from "../src/helpers";

export const metadata = {
  title: "Useless Stickers",
  description: "Let's stand together and be united by our Uselessness",
};

export default function RootLayout({ children }) {
  // console.log("🍌🥕 ", logStickersSortedByLength(STICKERS));
  // console.log("🍌🥕 ", logStickersSortedByLength(TOP_10_STICKERS));
  // console.log("🍌🥕 GPT Stickers", logStickersSortedByLength(GPT_STICKERS));

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
