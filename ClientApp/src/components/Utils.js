export const _baseURL = "http://localhost:60567/api/salon";

export function pad(num, size) {
    let s = num + "";
    if (num < 10) {
      while (s.length < size) s = "0" + s;
    }
    return s;
  }

export function getIsoDate(hour, minute) {
    let separator = "-";
    let separatorBlank = " ";
    let separatorColon = ":";

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    let dt = `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}${separatorBlank}${hour}${separatorColon}${minute}`;

    //let dtISO = new Date(dt).toISOString();
    let dtISO = new Date(dt).toLocaleString();
    return dtISO;
  }

  Date.prototype.toLocaleString = function () {
    function pad(number) { return ('' + number).padStart(2, '0') }
    return `${this.getFullYear()}-${pad(this.getMonth() + 1)}-${pad(this.getDate())}T${pad(this.getHours())}:${pad(this.getMinutes())}:${pad(this.getSeconds())}`
}

  const buildArray = (cnt) => {
    var arr = [];

    for (let i = 0; i <= cnt; i++) {
      arr.push({ value: i < 10 ? `0${i}` : i, label: i < 10 ? `0${i}` : i });
    }

    return arr;
  };

  export const buildHourOptions = () => {
    return buildArray(23);
  };

  export const buildMinuteOptions = () => {
    return buildArray(59);
  };

