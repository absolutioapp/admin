import { Cookies } from 'react-cookie';

class CookieService {
    private cookies: Cookies;

    constructor() {
        this.cookies = new Cookies();
    }

    // Добавление/обновление cookie. Опция `options` позволяет задать дополнительные параметры cookie.
    public setCookie(name: string, value: any, options?: any): void {
        this.cookies.set(name, value, { path: '/', ...options });
    }

    // Получение значения cookie по имени.
    public getCookie(name: string): any {
        return this.cookies.get(name);
    }

    // Удаление cookie. Опция `options` позволяет задать дополнительные параметры (например, путь).
    public removeCookie(name: string, options?: any): void {
        this.cookies.remove(name, { path: '/', ...options });
    }
}

export default new CookieService();