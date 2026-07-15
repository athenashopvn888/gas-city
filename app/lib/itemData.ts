export interface ItemEffects {
  effects: { emoji: string; label: string }[];
  description: string;
  metaDescription: string;
  consume: string;
}

const menuNotes = [
  { emoji: "*", label: "Menu Listed" },
  { emoji: "+", label: "Compare Details" },
  { emoji: "i", label: "Ask Staff" },
];

export function getItemData(category: string, name: string): ItemEffects {
  const cat = category.toUpperCase();

  if (cat === "EDIBLES") {
    return {
      effects: menuNotes,
      description: `${name} is listed in the edibles category at Gas City Cannabis. Compare the product name, package details, posted price, and item notes on the current menu before choosing.`,
      metaDescription: `Shop ${name} edibles in Toronto at Gas City Cannabis. Check the current menu and ask staff for current details before visiting.`,
      consume: "Review the package and current menu details. Ask staff if an item detail is unclear before choosing.",
    };
  }

  if (cat.includes("VAPE")) {
    return {
      effects: menuNotes,
      description: `${name} is listed in a vape category at Gas City Cannabis. Compare the format, product name, posted price, and menu notes before choosing.`,
      metaDescription: `Shop ${name} vape listings in Toronto at Gas City Cannabis. Check the current menu for product details before visiting.`,
      consume: "Review the package for format and compatibility details, and ask staff if an item detail is unclear.",
    };
  }

  if (cat === "CONCENTRATES") {
    return {
      effects: menuNotes,
      description: `${name} is listed in the concentrates category at Gas City Cannabis. Compare the product type, posted notes, price, and current menu details before choosing.`,
      metaDescription: `Shop ${name} concentrates in Toronto at Gas City Cannabis. Confirm current product details through the menu or staff.`,
      consume: "Review the package and ask staff when a concentrate format detail matters.",
    };
  }

  if (cat === "PREROLLS") {
    return {
      effects: menuNotes,
      description: `${name} is listed in the pre-roll category at Gas City Cannabis. Compare the format, pack details, item details, and current price before choosing.`,
      metaDescription: `Shop ${name} pre-rolls in Toronto at Gas City Cannabis. Use the current menu for product details before visiting.`,
      consume: "Review the package and ask staff if the format or pack detail is unclear.",
    };
  }

  if (cat === "MAGIC & OTHERS") {
    return {
      effects: menuNotes,
      description: `${name} is a specialty listing at Gas City Cannabis. Specialty items can vary, so use the current menu and staff for store-specific details.`,
      metaDescription: `Shop ${name} specialty listings in Toronto at Gas City Cannabis. Check the current menu before visiting.`,
      consume: "Review the package and ask staff if an item detail is unclear.",
    };
  }

  return {
    effects: menuNotes,
    description: `${name} is listed at Gas City Cannabis. Compare the current menu details and ask staff if the item note needs a current answer.`,
    metaDescription: `Shop ${name} in Toronto at Gas City Cannabis. Use the current menu or staff for current details before visiting.`,
    consume: "Review the package and current menu for item details.",
  };
}
