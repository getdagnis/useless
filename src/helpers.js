export function logStickersSortedByLength(stickers) {
  if (!stickers || stickers.length === 0) {
    console.warn("No stickers available.");
    return;
  }

  const sortedStickers = stickers.sort((a, b) => b.text.length - a.text.length);

  console.log("\n\n\n🔥🔥🔥 Stickers sorted by length:\n");
  sortedStickers.forEach((sticker, index) => {
    console.log(`${index + 1}. [${sticker.id}] (${sticker.text.length} chars) - ${sticker.text}`);
  });
}

export function getSticker(stickers, id) {
  if (!stickers || stickers.length === 0) {
    console.warn("No stickers available.");
    return;
  }

  const sticker = stickers.find((sticker) => sticker.id === id);

  if (!sticker) {
    console.warn("Sticker not found.");
    return;
  } else {
    return sticker;
  }
}

export function getStickerId(stickers, text) {
  if (!stickers || stickers.length === 0) {
    console.warn("No stickers available.");
    return;
  }

  const id = stickers.find((sticker) => sticker.text === text)?.id;

  if (!id) {
    console.warn("Sticker not found.");
    return;
  } else {
    return id;
  }
}

export function getStickerIndex(stickers, id) {
  if (!stickers || stickers.length === 0) {
    console.warn("No stickers available.");
    return;
  }

  const index = stickers.findIndex((sticker) => sticker.id === id);

  if (index === -1) {
    console.warn("Sticker not found.");
    return;
  } else {
    return index;
  }
}

export function getStickerByIndex(stickers, index) {
  if (!stickers || stickers.length === 0) {
    console.warn("No stickers available.");
    return;
  }

  const sticker = stickers[index];

  if (!sticker) {
    console.warn("Sticker not found.");
    return;
  } else {
    return sticker;
  }
}
