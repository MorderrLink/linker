export default function checkDomain(url: string) {
    if (url.includes("youtube.com")) return "/youtube.png"
    if (url.includes("github.com")) return "/github.png"
    if (url.includes("google.com")) return "/google.png"
    if (url.includes("instagram.com")) return "/instagram.png"
    if (url.includes("mail.ru")) return "/mail.png"
    if (url.includes("soundcloud.com")) return "/soundcloud.png"
    if (url.includes("open.spotify.com")) return "/open.spotify.png"
    if (url.includes("t.me")) return "/telegram.png"
    if (url.includes("twitch.com")) return "/twitch.png"
    if (url.includes("vk.com")) return "/vk.png"
    if (url.includes("whatsapp.com")) return "/whatsapp.png"
    if (url.includes("avito.ru")) return "/avito.png"
    if (url.includes("booking.com")) return "/booking.png"
    if (url.includes("dzen.ru")) return "/dzen.png"
    if (url.includes("discord.com")) return "/discord.png"
    if (url.includes("wikipedia.org")) return "/wikipedia.png"
    if (url.includes("facebook.com")) return "/facebook.png"
    if (url.includes("clck.ru") || url.includes("ya.ru") || url.includes("yandex.ru")) return "/yandex.png"
    else {
        return "/internet.png"
    }
}