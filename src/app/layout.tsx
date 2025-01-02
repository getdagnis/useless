import "../styles/globals.sass";
import "../styles/variables.sass";

// import { GPT_STICKERS } from "../constants";
// import { logStickersSortedByLength } from "../helpers";

export const metadata = {
  title: "Useless Stickers",
  description: "Let's stand together and be united by our Uselessness",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // console.log("🍌🥕 GPT Stickers", logStickersSortedByLength(GPT_STICKERS));

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
