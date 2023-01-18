

export function ConvertDate(date: string):string {

  let parts: string[] = date.split("/");
  let day: number = parseInt(parts[0]);
  let month: number = parseInt(parts[1]);
  let year: number = parseInt(parts[2]);

  let formatedDate = `${year}/${month}/${day}`

  return formatedDate

}