
export const detectLanguage = (string: string):string=> {
    const englishChars = /[a-zA-Z]/;
    const spanishChars = /[áéíóúñ]/;
    const russianChars = /[а-яА-ЯЁё]/;

    let englishCount = 0;
    let ruCount = 0;
    let spanishCount = 0;

    for (const char of string) {
        if (englishChars.test(char)) {
            englishCount++;
        } else if (russianChars.test(char)) {
            ruCount++;
        } else if (spanishChars.test(char)) {
            spanishCount++;
        }
    }

    if (englishCount > ruCount && englishCount > spanishCount) {
        console.log("en")
        return "en";
    } else if (ruCount > englishCount && ruCount > spanishCount) {
        console.log("ru")
        return "ru";
    } else if (spanishCount > englishCount && spanishCount > ruCount) {
        console.log("es")
        return "es";
    } else {
        // Если ни один язык не преобладает, вернем "unknown"
        console.log("unknown")
        return "unknown";
    }
}