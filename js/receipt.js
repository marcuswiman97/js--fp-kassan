/* Rena funktioner för kassan.
   Inga sidoeffekter eller ändringar av originaldata här.
*/

// Hitta en produkt med hjälp av dess ID.
export const findProduct = (products, id) => {
  return products.find((product) => product.id === id);
};

// Räkna ut priset för en rad (pris × antal).
export const lineTotal = (line, products) => {
  const product = findProduct(products, line.productId);
  return product.price * line.quantity;
};

// Räkna ut summan av alla rader med reduce().
export const subtotal = (lines, products) => {
  return lines.reduce((sum, line) => sum + lineTotal(line, products), 0);
};

// Räkna ut beloppet efter rabatt.
export const applyDiscount = (amount, code, codes) => {
  const rate = codes[code] ?? 0; // Ingen giltig kod = 0 rabatt.
  return amount * (1 - rate);
};

// Räkna ut momsdelen av ett pris inklusive moms.
export const vatOf = (amount, rate) => {
  return amount - amount / (1 + rate);
};

// Formatera en produktrad till text.
export const formatLine = (line, products) => {
  const { name } = findProduct(products, line.productId);

  return `${name} x${line.quantity} ${lineTotal(line, products).toFixed(2)} kr`;
};

// Skapa hela kvittot som en sträng.
export const formatReceipt = (lines, products, code, codes, vatRate) => {
  // Summa före rabatt.
  const beforeDiscount = subtotal(lines, products);

  // Summa efter rabatt.
  const total = applyDiscount(beforeDiscount, code, codes);

  // Hur mycket rabatten är värd.
  const discount = beforeDiscount - total;

  // Skapa en ny array med kvittorader.
  const rows = lines.map((line) => formatLine(line, products));

  // Skapa en rabattrad om rabatt finns.
  const discountRows =
    discount > 0 ? [`Rabatt (${code}): -${discount.toFixed(2)} kr`] : [];

  // Returnera kvittot som en enda sträng.
  return [
    ...rows,
    ...discountRows,
    `Totalt: ${total.toFixed(2)} kr (varav moms ${vatOf(total, vatRate).toFixed(
      2
    )} kr)`,
  ].join("\n");
};
