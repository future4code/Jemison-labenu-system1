

export function ValidateDate(date: string) {

  const formatValidate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(date)

  if (!formatValidate) {

    return formatValidate
  
  } else {

    let parts: string[] = date.split("/");
    let day: number = parseInt(parts[0]);
    let month: number = parseInt(parts[1]);
    let year: number = parseInt(parts[2]);
    let validate: boolean = true;
    let msg: string = "";

    if ((month < 1) || (month > 12)) {
      msg += "Mês inválido.\n";
      validate = false;
    }
    else if ((year < 1970) || (year > 3000)) {
      msg += "Ano inválido.\n";
      validate = false;
    }
    else if ((day < 0) || (day > daysMonth(month, year))) {
      msg += "Dia inválido.\n";
      validate = false;
    }

    if (!validate) {
      return msg
    }
    else {
      return validate
    }

    function LeapYear(year: number) {
      return ((year % 4 == 0) && ((!(year % 100 == 0)) ||
        (year % 400 == 0)));
    }

    function daysMonth(month: number, year: number): number {
      var days_monthes: number[] = [31, 28, 31, 30, 31, 30, 31,
        31, 30, 31, 30, 31];

      var quant_days: number = days_monthes[month - 1];

      if ((LeapYear(year)) && (month == 2))
        quant_days = 29;

      return quant_days;
    }
  }
}


