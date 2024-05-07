export function NumberArabic(num: number): string {
  const arabicSymbols: { [key: number]: string } = {
      0: "٠",
      1: "١",
      2: "٢",
      3: "٣",
      4: "٤",
      5: "٥",
      6: "٦",
      7: "٧",
      8: "٨",
      9: "٩"
  };

  const arabicSymbol = "۝"; 

  // Memisahkan setiap digit dari angka
  const digits = num.toString().split('').map(Number);
  
  // Mengonversi setiap digit menjadi simbol Arab
  const arabicDigits = digits.map(digit => {
      if (arabicSymbols[digit]) {
          return arabicSymbols[digit];
      } else {
          return digit;
      }
  });

  // Menggabungkan kembali simbol-simbol Arab dan angka menjadi satu string
  const arabicNumber = arabicSymbol + arabicDigits.join('');

  return arabicNumber;
}