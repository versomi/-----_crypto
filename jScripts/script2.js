// Загрузка текущих курсов криптовалют
var btc = document.getElementById("bitcoin");
var eth = document.getElementById("ethereum");
var doge = document.getElementById("dogecoin");

fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd")
    .then(response => response.json())
    .then(data => {
        btc.innerHTML = data.bitcoin.usd;
        eth.innerHTML = data.ethereum.usd;
        doge.innerHTML = data.dogecoin.usd;
    })
    .catch(error => console.error('Error:', error));


// локализации с i18next
const resources = {
    en: {
        translation: {
            "nav-home": "Home",
            "nav-about-us": "About us",
            "nav-contact-us": "Contact us",
            "nav-info-coins": "Info coins",
            "heading": "CRYPTO LIVE",
            "welcome-text": "Welcome to our website!",
            "explore-more": "EXPLORE MORE",
            "coin-bitcoin": "Bitcoin",
            "coin-ethereum": "Ethereum",
            "coin-dogecoin": "Dogecoin"
        }
    },
    ru: {
        translation: {
            "nav-home": "Главная",
            "nav-about-us": "О нас",
            "nav-contact-us": "Контакты",
            "nav-info-coins": "Информация о монетах",
            "heading": "КРИПТО ЛАЙВ",
            "welcome-text": "Добро пожаловать на наш сайт!",
            "explore-more": "УЗНАТЬ БОЛЬШЕ",
            "coin-bitcoin": "Биткоин",
            "coin-ethereum": "Эфириум",
            "coin-dogecoin": "Догикоин"
        }
    },
    he: {
        translation: {
            "nav-home": "דף הבית",
            "nav-about-us": "אודותינו",
            "nav-contact-us": "צור קשר",
            "nav-info-coins": "מידע על מטבעות",
            "heading": "קריפטו לייב",
            "welcome-text": "ברוכים הבאים לאתר שלנו!",
            "explore-more": "גלה עוד",
            "coin-bitcoin": "ביטקוין",
            "coin-ethereum": "אתריום",
            "coin-dogecoin": "דוג'קוין"
        }
    }
};

// Инициализация i18next
i18next.init({
    lng: 'en', // язык по умолчанию
    resources
}, function(err, t) {
    if (err) {
        console.error('Ошибка инициализации i18next:', err);
        return;
    }
    updateContent(); // Обновляем контент при загрузке страницы
});

// Функция для обновления текста на странице
function updateContent() {
    console.log('Обновление контента для языка:', i18next.language);

    // Обновляем элементы навигации
    const navItems = document.querySelectorAll('nav ul li a');
    navItems[0].innerHTML = i18next.t('nav-home');
    navItems[1].innerHTML = i18next.t('nav-about-us');
    navItems[2].innerHTML = i18next.t('nav-contact-us');
    navItems[3].innerHTML = i18next.t('nav-info-coins');

    // Обновляем заголовок и приветственный текст
    document.querySelector('h1').innerHTML = i18next.t('heading');
    document.querySelector('.content p').innerHTML = i18next.t('welcome-text');

    // Обновляем текст кнопки "EXPLORE MORE"
    document.getElementById('exploreMoreButton').innerHTML = i18next.t('explore-more');

    // Обновляем названия монет
    document.getElementById('coin-bitcoin-name').innerHTML = i18next.t('coin-bitcoin');
    document.getElementById('coin-ethereum-name').innerHTML = i18next.t('coin-ethereum');
    document.getElementById('coin-dogecoin-name').innerHTML = i18next.t('coin-dogecoin');

    // Обновляем текст кнопки смены языка
    document.getElementById('languageButton').innerHTML = i18next.language.toUpperCase();
}

// Список поддерживаемых языков
const languages = ['en', 'ru', 'he'];
let currentLangIndex = languages.indexOf(i18next.language);

// Добавляем обработчики событий для каждого элемента в списке языков
const languageLinks = document.querySelectorAll('#languageList li a');

languageLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedLanguage = this.getAttribute('data-lang');
        i18next.changeLanguage(selectedLanguage, function(err, t) {
            if (err) return console.error('Ошибка при смене языка:', err);
            currentLangIndex = languages.indexOf(selectedLanguage);
            updateContent();
        });
    });
});
