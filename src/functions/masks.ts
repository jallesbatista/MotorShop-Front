export const brlCurrencyMask = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  e.target.value = value;
  return e;
};
