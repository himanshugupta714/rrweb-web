export const isValidURL = (url: string): boolean => {
    const regex = new RegExp(/^(http|https):\/\/[^ "]+$/);
    return regex.test(url);
}