export default {
  set (key, value = '', days = 7) {
    if (!key) {
      console.error('no key to set cookie');
      return;
    }

    let expires = '';

    if (days) {
      let date = new Date();
      let expiresDate = days * 24 * 60 * 60 * 1000;

      date.setTime(date.getTime() + expiresDate);
      expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = `${key}=${value.toString() + expires}`;
  },

  get (key) {
    const cookieArr = document.cookie.split(';');

    for (let i = 0, length = cookieArr.length; i < length; i++) {
      let perCookie = cookieArr[i].trim();
      let indexOfSplitter = perCookie.trim().indexOf('=');
      let perCookieKey = perCookie.slice(0, indexOfSplitter);

      if (perCookieKey === key) {
        return perCookie.slice(indexOfSplitter + 1);
      }
    }

    return null;
  },

  remove (key) {
    document.cookie = `${key}=; Max-Age=-99999999;`;
  }
};
